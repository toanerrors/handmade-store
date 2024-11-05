const mongoose = require('mongoose');

async function connect(MONGO_URI) {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI chưa được định nghĩa');
    }
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Kết nối đến MongoDB thành công');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  connect
}