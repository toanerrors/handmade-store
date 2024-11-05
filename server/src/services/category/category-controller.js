const config = require('../../config');
const Category = require('./category-schema');

module.exports = {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async createCategory(req, res) {
    try {
      const logo = req.file;

      if (logo) {
        req.body.logo = config.SERVER_URL + "/" + logo.path;
      }

      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async updateCategory(req, res) {
    try {
      const logo = req.file;
      if (logo) {
        req.body.logo = config.SERVER_URL + "/" + logo.path;
      }
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}