const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    name:{
      type:String,
      required:true
    },
    Street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  orderItems: [
    {
      productName: { type: String, required: true },
      qnt: { type: Number, required: true },
      productImage: { type: String, required: true },
      productPrice: { type: Number, required: true },
      ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
    paymentInfo: {
        id: String,
        success: String,
    },
    paidAt:Date,
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    TexPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
  },
  orderStatus:{
      type:String,required:true,default:'processing'
  },
  deliveredAt:{
      type:Date,
      default:Date.now()
  }
},{
    timestamps:true
});

module.exports = new mongoose.model('Orders', orderSchema);
