const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

dotenv.config({ path: 'config/config.env' });

//handle uncaught error
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down due to uncaughtException`);
  process.exit(1);
});

//database connection
connectDatabase();

app.get('/', (req, res) => {
  res.send('Hello bro!');
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.PORT}, ${process.env.NODE_ENV} mode.`
  );
});

//handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error : ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejections');
  server.close(() => {
    process.exit(1);
  });
});
