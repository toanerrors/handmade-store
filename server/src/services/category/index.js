const upload = require('../../middlewares/image');
const categoryController = require('./category-controller');

const category = require('express').Router();

category.get("/all", categoryController.getAllCategories);
category.post("/create", upload.single('image'), categoryController.createCategory);
category.delete("/delete/:id", categoryController.deleteCategory);
category.patch("/update/:id", upload.single('image'), categoryController.updateCategory);

module.exports = category