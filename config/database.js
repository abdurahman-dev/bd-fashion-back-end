const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.DB_LOCAL_URL, {
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

module.exports = connectDatabase;
