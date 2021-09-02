const express = require("express");
const productsController = require("../controllers/products.controller");
const router = express.Router();

router.get("/", productsController.getAllProducts); // получение массива всех продуктов @param  { } @return { status, object }
router.get("/random", productsController.getRandomProducts);
router.get("/bycategory/:category",productsController.getProductsByCategory); // получение массива продуктов в категории @param  { get: categories.url } @return { status, object }
router.get("/bycategory/:category/filter",productsController.getProductsByCategoryFilter);
router.get("/:url", productsController.getProductByUrl);

module.exports = router;

// router.get("/:product_id", productsController.getProductById);
// router.get('/all', itemsController.getAll);
// router.get('/count', isAdmin, itemsController.getCount);

// router.get('/:id/comments', itemsController.getByIdComments);
// router.get('/search/:text', itemsController.getBySearchText);

/**
 * создание товара
 * @param  { post: email, password }
 * @return { status, object }
 **/
// router.post('/', isAdmin, itemsController.create);

/**
 * обновление товара
 * @param  { post: email, password }
 * @return { status, object }
 **/
// TODO router.put('/items/:id', verifyAdmin, items.updateItem)

/**
 * удаление товара
 * @param  { post:  }
 * @return { status, object }
 **/
// router.delete('/:id', isAdmin, itemsController.delete);
// router.get("/categories/:id", productsController.getProductsbyCategory);
