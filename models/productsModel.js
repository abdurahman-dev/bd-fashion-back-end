const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, 'Please enter product name'],
      maxLength: [100, 'name must be under the 100 Characters'],
    },
    productDescription: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    productPrice: {
      type: Number,
      required: [true, 'Enter the price of the products'],
      default: 0.0,
    },
    productStock: {
      type: Number,
      required: [true, 'Give the total stock of the products'],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    productImage: [{
       url:{
        type: String,
        required: [true, 'At last One image need'],
       }
      },
    ],
    productCategory: {
      type: String,
      required: [true, 'Please select the category for the products'],
    },
    productSubCategory: {
      type: String,
      required: [true, 'Please select the SubCategory for the products'],
    },
    productSellerName: {
      type: String,
      required: [true, 'please enter the product seller'],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    productPriceDiscount:String,
    reviews: [
      {
        reviewBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // tags:{
    //         onSale:{
    //             type:Boolean,
    //             required:true,
    //             default:false
    //         },
    //         new:{
    //             type:Boolean,
    //             required:true,
    //             default:false
    //         },
    //         flashSale:{
    //             type:Boolean,
    //             required:true,
    //             default:false
    //         },
    //     }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
