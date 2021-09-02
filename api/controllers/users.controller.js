const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");
const utils = require("../utils");
const SALTROUNDS = 8;
console.log("mode:", process.env.NODE_ENV);

function userColumns(arr) {
  let columnsArray = [
    "user_id",
    "role_id",
    "first_name",
    "last_name",
    "email",
    "active",
    "gender",
    "reg_date",
    "last_login",
    "birthday",
    "address",
    "avatar"
  ];
  if (arr) columnsArray.push(arr);
  return columnsArray.join(",");
}

module.exports = {
  getUser: async (request, response) => {
    const { id } = request.params;
    utils.devLog("(auth) getUser:" + id);
    const sql = `SELECT ${userColumns()} FROM users where user_id = $1`;

    try {
      const result = await db.one(sql, id);
      response.status(200).json({ user: result });
    } catch (e) {
      response.status(400).json({ error: e.message });
      console.error("error_log:", e.message);
    }
  },

  // admin
  getUsers: async (request, response) => {
    utils.devLog("getUsers");

    const sql = `SELECT ${userColumns()} FROM users order by user_id ASC`;

    try {
      const result = await db.any(sql);
      response.status(200).json(result);
    } catch (e) {
      response.status(400).json({ error: e.message });
      console.error("error_log:", e.message);
    }
  },

  getUserId: async (request, response) => {
    const { id } = request.params;
    utils.devLog("getUserId:" + id);
    const SQL = `SELECT ${userColumns()} FROM users where user_id = $1`;

    try {
      const result = await db.one(SQL, id);
      response.status(200).json(result);
    } catch (e) {
      response.status(400).json({ error: e.message });
      console.error("error_log:", e.message);
    }
  },

  getUserAddons: async (request, response) => {
    const { id } = request.params;
    utils.devLog("getUserAddons:" + id);

    const SQL1 = `SELECT p.product_id, p.name, p.image, p.price, p.in_stock FROM users_products up join products p using(product_id) where up.user_id = $1 and up.wishlist is true`;
    const SQL2 = `SELECT p.product_id, p.name, up.comment FROM users_products up join products p using(product_id) where up.user_id = $1 and up.comment is not null`;

    await db
      .tx(async t => {
        const wishlist = await t.any(SQL1, id);
        const comments = await t.any(SQL2, id);
        return { wishlist, comments };
      })
      .then(data => response.status(200).json(data))
      .catch(error => {
        console.log("error", error);
        response.status(400).json({ error });
      });
  },

  createUser: async (request, response) => {
    utils.devLog("createUser");

    const { name, email, password } = request.body;
    const columns = ["first_name", "email", "password"].join(", ");
    const sql = `INSERT INTO users(${columns}) VALUES($1, $2, $3)`;

    if (!name || typeof name === "undefined")
      return response
        .status(400)
        .json({ error: "login", message: "empty name" });
    else if (!email || typeof email === "undefined")
      return response
        .status(400)
        .json({ error: "login", message: "empty email" });
    else if (!password || typeof password === "undefined")
      return response
        .status(400)
        .json({ error: "login", message: "empty password" });
    else {
      const hash = bcrypt.hashSync(password, SALTROUNDS);
      try {
        const result = await db.result(sql, [name, email, hash]);
        return response
          .status(201)
          .json({ message: "create user success", result: result.rowCount });
      } catch (error) {
        console.error({ error });
        if (error.code === "23505")
          response.status(400).json({ message: "email exists" });
      }
    }
  },

  loginUser: (request, response) => {
    utils.devLog("loginUser");

    const { email, password } = request.body;
    const secret = process.env.SECRET || "1234567890";
    const sql = `SELECT ${userColumns("password")} FROM users WHERE email = $1`;
    db.one(sql, email)
      .then(result => {
        let passwordValid = bcrypt.compareSync(password, result.password);
        if (!passwordValid)
          return response
            .status(401)
            .json({ error: "login", message: "wrong password" });
        if (!result.active)
          return response
            .status(401)
            .json({ error: "login", message: "user is not active" });

        let token = jwt.sign(
          { user_id: result.user_id, role_id: result.role_id },
          secret
        );
        delete result.password;
        return response.status(200).json(Object.assign(result, { token }));
      })
      .catch(error => {
        console.error(error.message);
        return response
          .status(404)
          .json({ error, message: "email is not found" });
      });
  },

  updateUser: async (request, response) => {
    utils.devLog("updateUser");

    const a = { ...request.body, user_id: request.params.id };
    const allowedColumns = [
      "first_name",
      "last_name",
      "gender",
      "birthday",
      "address",
      "avatar"
    ];
    let arg = [];
    for (const prop in a) {
      if (allowedColumns.includes(prop)) {
        arg.push(`${prop} = $(${prop})`);
      }
    }
    if (!arg.length)
      return response
        .status(400)
        .json({ error: "update", message: "nothing change" });
    arg = arg.join(",");
    const sql = `update users set ${arg} where user_id = $(user_id) returning * `;
    try {
      const result = await db.one(sql, a);
      delete result.password;
      response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(400).json({ error });
    }
  },

  // admin
  deleteUser: async (request, response) => {
    const { id } = request.params;
    const sql = `DELETE FROM users WHERE user_id = $1`;
    try {
      const result = await db.result(sql, id);
      utils.devLog("deleteUser", { id, result }, true);
      if (result.rowCount)
        response
          .status(200)
          .json({ result: result.rowCount, message: "user deleted" });
      else response.status(404).send({ result: result.rowCount });
    } catch (error) {
      utils.devLog("deleteUser", { id, error }, true);
      console.error("error_log:", error.message);
      response.status(400).json({ error: error.message });
    }
  },

  // admin
  activateUser: async (request, response) => {
    utils.devLog("activateUser");

    const sql = `update users set active = $(state) where user_id = $(id) returning * `;
    try {
      let result = await db.result(sql, request.body);
      response
        .status(200)
        .json({ result: result.rowCount, message: "user's state changed" });
    } catch (e) {
      response.status(400).json({ error: e.message });
      console.error("error_log:", e.message);
    }
  },

  changePassword: async (request, response) => {
    utils.devLog("changePassword");

    const { id } = request.params;
    const { password } = request.body;

    const hash = bcrypt.hashSync(password, SALTROUNDS);
    const sql = "update users set password = $(password) where user_id = $(id)";

    try {
      const result = await db.result(sql, { id: id, password: hash });
      response
        .status(200)
        .json({ result: result.rowCount, message: "password updated" });
    } catch (error) {
      console.log(error.message);
      response.status(400).json({ error });
    }
  }
};
