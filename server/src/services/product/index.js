const productController = require('./product-controller');
const upload = require('../../middlewares/image');

const product = require('express').Router();

product.get("/all", productController.getAllProducts);
product.post("/create", upload.single('image'), productController.createProduct);
product.delete("/delete/:id", productController.deleteProduct);
product.patch("/update/:id", upload.single('image'), productController.updateProduct);

module.exports = product