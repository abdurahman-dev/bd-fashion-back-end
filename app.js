const express = require('express');
const cookieParse = require('cookie-parser');
const errorMiddleWare = require('./middlewares/error');
const cors = require('cors');

const app = express();
//{
//     credentials: true,
//     origin:"https://db-fashion.vercel.app" "http://localhost:3000"
//  }
app.use(cors({ credentials: true, origin: 'https://db-fashion.vercel.app' }));
app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParse());

//Import all routes
const productsRoute = require('./routes/products.route');
const userRoute = require('./routes/auth.routes');
const orderRoute = require('./routes/orders.routes');
const categoryRoute = require('./routes/category.routes');
const initialDataAdminRoute = require('./routes/initialDataAdmin.routes');

//use routes
app.use('/api/v1', productsRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', categoryRoute);
app.use('/api/v1', initialDataAdminRoute);

//error handling middleWare
app.use(errorMiddleWare);

module.exports = app;

// {
//     credentials: true,
//     origin:'https://db-fashion.vercel.app'
// }
