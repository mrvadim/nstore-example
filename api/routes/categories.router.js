const express = require("express");
const categoriesController = require("../controllers/categories.controller");
const router = express.Router();

router.get("/", categoriesController.getEnabledCategories);
router.get("/all", categoriesController.getAllCategories);
router.get("/random", categoriesController.getRandomCategories);
router.post("/", categoriesController.createCategory); // создание категории @param  { post: parent_id,name,url,show,image } @return { status, object }
router.delete("/:category_id", categoriesController.deleteCategory); // удаление категории @param  { post: category_id } @return { status, object }
router.put("/:category_id", categoriesController.updateCategory); // изменение категории @param  { post: parent_id, name, label, show } @return { status, object }

module.exports = router;
