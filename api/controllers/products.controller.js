const db = require("../database");
const utils = require("../utils");

module.exports = {
  getAllProducts: async (request, response) => {
    // const SQL = `select * from products ORDER BY product_id ASC limit 5`;
    const SQL = `select * from products p where p.in_stock = true ORDER BY random() limit 5`;
    try {
      const result = await db.any(SQL, []);
      utils.devLog("getAllProducts", result, false);
      response.status(200).json(result);
    } catch (e) {
      console.error("error", e);
      response.status(400).json({ error: e });
    }
  },

  getRandomProducts: async (request, response) => {
    utils.devLog("getRandomProducts");
    const SQL = "select * from random_products_limit_5";

    try {
      const result = await db.any(SQL, []);
      response.status(200).json(result);
    } catch (e) {
      console.error("error", e);
      response.status(400).json({ error: e });
    }
  },
  // getProductsbyCategory: async (request, response) => {
  //   const { slug } = request.params;
  //   console.log("slug", slug);
  //   const columns = [
  //     "p.product_id",
  //     "c.label",
  //     "p.name",
  //     "p.label",
  //     "p.image",
  //     "price",
  //     "count(u.comment) n_comments"
  //   ].join(", ");

  //   const sql = `select ${columns} from products p
  //   left join users_products u using(product_id)
  //   left join categories c using(category_id)
  //   where c.label = $1 group by p.product_id, c.label`;

  getProductsByCategory: async (request, response) => {
    const { category } = request.params;
    const { limit, offset } = request.query;

    const columns = [
      "p.product_id",
      "p.name",
      "p.url p_url",
      "p.image",
      "p.price",
      "p.in_stock",
      "p.specs",
    ].join(", ");

    const sql1 = `select ${columns} from products p
    left join categories c using(category_id)
    where c.url = $1 order by p.product_id ASC
    offset $2 limit $3
    `;

    const sql2 = `select count(p.product_id), c.name cat_name, c.url cat_url 
    from products p
    left join categories c using(category_id)
    where c.url = $1
    group by c.name, c.url`;

    await db
      .tx(async (t) => {
        const products = await t.any(sql1, [category, offset, limit]);
        const info = await t.any(sql2, category);
        utils.devLog("getProductsByCategory", { products, info }, false);
        return { products, info };
      })
      .then((data) => response.status(200).json(data))
      .catch((error) => {
        console.log("error", error);
        response.status(400).json({ error });
      });

    // try {
    //   const result = await db.any(sql1, [category, offset, limit]);
    //   response.status(200).json(result);
    // } catch (e) {
    //   response.status(400).json({ error: e.message });
    // }
  },

  getProductsByCategoryFilter: (request, response) => {
    utils.devLog("getProductsByCategoryFilter");
    const { category } = request.params;
    const { limit, offset, filter } = request.query;
    console.log('category:', category);
    console.log('limit:', limit);
    console.log('offset:', offset);
    console.log('filter:', filter);


    response.status(200).json({ result: "OK" });
  },

  getProductByUrl: async (request, response) => {
    utils.devLog("getProductByUrl");

    const { url } = request.params;
    console.log('url', url);
    const columns = [
      "p.product_id",
      "p.name",
      "p.url",
      "p.image",
      "p.description",
      "p.price",
      "p.in_stock",
      "count(u.comment) cmnts",
      "count(u.wishlist) filter (where u.wishlist) wish",
    ].join(", ");
    const SQL = `
    select
	    p.product_id,
	    p.name,
	    p.image,
	    p.description,
      p.specs,
      p.price,
      p.in_stock,
      count(up.comment) comments_count,
      json_agg(json_build_object(
        'fname', u.first_name, 
        'lname', u.last_name, 
        'email', u.email, 
        'comment', up."comment", 
        'created_at', up.created_at
      )) as comments
    from products p
    left join users_products up using(product_id)
    left join users u using(user_id)
    where p.url = $1
    group by p.product_id`;

    try {
      const result = await db.one(SQL, url);
      response.status(200).json(result);
    } catch (e) {
      response.status(400).json({ error: e.message });
    }
  },

  update: (request, response) => {
    //* **************** */
    // TODO
    //* **************** */
    response.status(200).json({ result: "not implemented" });
  },
};
