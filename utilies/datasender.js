const dotenv = require('dotenv');
const mongoose = require('mongoose');
const data = require('../data/product.json');
const Product = require('../models/productsModel');

dotenv.config({ path: '../config/config.env' });

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(`mongodb://localhost:27017/bd-fashion`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,             
      })
      .then((data) => {
        console.log(`connected database with the host: ${data.connection.host}`);
      });
  } catch (err) {
    console.log(err);
  }
};

connectDatabase()

const fakeDataSender = async () => {
  try {
    await Product.deleteMany();
    console.log('all data are deleted');
    await Product.insertMany(data)
    console.log('all data are inserted');
    process.exit()
  } catch (err) {
    console.log(err.message);
    process.exit()
  }
};

fakeDataSender();
