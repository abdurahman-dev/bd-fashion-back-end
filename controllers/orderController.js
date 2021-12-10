const Orders = require('../models/ordersModel');
const Product = require('../models/productsModel');
const ErrorHandler = require('../utilies/ErrorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

//create new orders =>api/v1/order/new
exports.newOrderController = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    TexPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Orders.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    TexPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

//get single orders => api/v1/order/id
exports.getSingleOder = catchAsyncError(async (req, res, next) => {
  const order = await Orders.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No order found with this ID', 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
//get  orders => api/v1/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const order = await Orders.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    totalOrders: order.length,
    order,
  });
});
// get all orders by admin => api/v1/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Orders.find({});
  let totalAmount = 0;
  orders.forEach((element) => {
    totalAmount += element.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    totalAmount,
    orders,
  });
});

// update orders delivary statud by admin => api/v1/admin/orders/update/id
exports.updateOrders = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;

  const order = await Orders.findById(req.params.id);

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('This order already delivered', 400));
  }

  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item.productId);
    product.stock = product.stock - item.quantity;
    // if(product.stock <0){
    //       return next(new ErrorHandler(`this is no ${item.quantity} product`,400))
    // }
    await product.save({ validateBeforeSave: false });
  });
  order.orderStatus = status;
  await order.save();
  res.status(200).json({
    success: true,
  });
});

// update orders delivary statud by admin => api/v1/admin/orders/delete/id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('This is no order with This ID', 400));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});
