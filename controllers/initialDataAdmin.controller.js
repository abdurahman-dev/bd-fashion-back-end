const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require('../models/productsModel');
const Users = require('../models/userModel');
const Orders = require('../models/ordersModel');
const Category=require('../models/categoryModel');
const SubCategory=require('../models/subCategoryModel')

exports.initialDataAdmin = catchAsyncError(async (req, res, next) => {
    const categories= await Category.find({})
    const products= await Product.find({})
    const users= await Users.find({})
    const orders= await Orders.find({})
    const subcategories= await SubCategory.find({})
    res.status(200).json({
      success: true,
      orders,
      categories,products,users,subcategories
    });
  });