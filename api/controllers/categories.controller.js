const db = require("../database");
const utils = require("../utils");

module.exports = {
  getEnabledCategories: async (request, response) => {
    utils.devLog("getEnabledCategories");

    const sql = `WITH RECURSIVE r AS (
      SELECT category_id, parent_id, active, name, url, 0 as level
      FROM categories
      WHERE parent_id is null
      union
      SELECT c.category_id, c.parent_id, c.active, c.name, c.url, r.level + 1
      FROM categories c
      JOIN r ON c.parent_id = r.category_id
    )
    SELECT r.category_id, r.parent_id, COUNT(p.name) products_count, r.name, r.url
    FROM r
    LEFT JOIN products p USING(category_id)
    GROUP BY r.category_id, r.parent_id, r.name, r.url
    ORDER BY r.category_id ASC`;

    try {
      const result = await db.any(sql, []);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  getAllCategories: async (request, response) => {
    utils.devLog("getAllCategories");

    const sql = `with recursive r as (
      select category_id, parent_id, show, name, url, image, 0 as level
      from categories where parent_id is null
      union
      select c.category_id, c.parent_id, c.show, c.name, c.url, c.image, r.level + 1
      from categories c join r on c.parent_id = r.category_id
    ) select * from r order by r.category_id asc`;

    try {
      const result = await db.any(sql, []);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  getRandomCategories: async (request, response) => {
    utils.devLog("getRandomCategories");
    const SQL2 = `select c2.category_id, c2.name, c2.url from categories c1
    join categories c2 on c1.category_id = c2.parent_id
    where c1.parent_id is not null
    order by random() 
    limit 5`;
    const SQL = 'select * from random_categories_limit_5'; 
    try {
      const result = await db.any(SQL, []);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },

  createCategory: async (request, response) => {
    utils.devLog("createCategory");

    const {
      parent_id = null,
      name,
      url,
      show = false,
      image = null
    } = request.body;

    if (!name || !url) {
      return response.status(400).json({ message: "input name" });
    }
    const sql = `INSERT INTO categories(parent_id,name,url,show, image)
                VALUES($1,$2,$3,$4,$5)
                returning *`;
    try {
      const result = await db.one(sql, [parent_id, name, url, show, image]);
      response.status(200).json(result);
    } catch (e) {
      response.status(400).json({
        error: e.message,
        message: `category '${name}' or url '${url}' are exist`
      });
    }
  },

  deleteCategory: async (request, response) => {
    utils.devLog("deleteCategory");

    const { category_id } = request.params;
    const sql = `DELETE FROM categories WHERE category_id = $1`;
    try {
      const result = await db.result(sql, category_id);
      if (result.rowCount) return response.status(200).json(result);
      else return response.status(404).json({ message: "already deleted" });
    } catch (e) {
      response.status(400).json({
        error: e.message,
        message: "not empty category"
      });
    }
  },

  updateCategory: async (request, response) => {
    utils.devLog("updateCategory");

    const { category_id } = request.params;
    const { name, url } = request.body;
    let arg = [];
    for (const prop in request.body) {
      arg.push(`${prop} = $(${prop})`);
    }
    arg = arg.join(",");
    const sql = `update categories set ${arg} where category_id = $(category_id) returning *`;

    try {
      const result = await db.one(sql, { ...request.body, category_id });
      response.status(200).json(result);
    } catch (e) {
      console.error(e);
      response.status(400).json({
        error: e.message,
        message: `category '${name}' or url '${url}' are exist`
      });
    }
  }
};
