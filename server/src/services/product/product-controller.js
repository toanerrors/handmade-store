const Product = require('./product-schema');
const config = require('../../config');

module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async createProduct(req, res) {
    try {
      if (req.file) {
        req.body.image = config.SERVER_URL + "/" + req.file.path;
      }
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async updateProduct(req, res) {
    try {
      if (req.file) {
        req.body.image = config.SERVER_URL + "/" + req.file.path;
      } else {
        delete req.body.image
      }
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}