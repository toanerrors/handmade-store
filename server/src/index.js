const express = require('express');
const cors = require('cors');
require('dotenv').config()

const config = require('./config');
const { connect } = require('./libs/db');

connect(config.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/category', require('./services/category'));
app.use('/product', require('./services/product'));

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(config.PORT, () => {
  console.log(`Server đang chạy ở http://localhost:${config.PORT}`);
})