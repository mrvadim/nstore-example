const express = require("express");
const categories = require("./categories.router");
const products = require("./products.router");
const users = require("./users.router");
const uploadController = require("../controllers/upload.controller");

const router = express.Router();
const root = { location: "root" };

router.get("/", (req, res) => res.json(root));
router.use("/categories", categories);
router.use("/users", users);
router.use("/products", products);

router.post("/uploads", uploadController.uploadFile);

module.exports = router;
