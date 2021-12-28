const Product = require('../models/productsModel');
const ErrorHandler = require('../utilies/ErrorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utilies/APIFeatures');
const cloudinary = require('../utilies/cloudinary');

//Create new product => /api/v1/admin/product/create
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  let pdImg = [];
  if (req.body.productImg.length > 0) {
    pdImg = req.body.productImg.map((file) => {
      return { url: file };
    });
  }
  req.body.productImage = pdImg;

  const pd = await Product.create(req.body);
  const pds = await Product.find({});

  res.status(201).json({
    success: true,
    product: pds,
  });
});

//get all products with out any query
exports.products = catchAsyncError(async (req, res, next) => {
  const countProducts = await Product.countDocuments();
  const pd = await Product.find({});
  res.status(200).json({
    success: true,
    products: pd,
    countProducts,
  });
});
// get all the products => /api/v1/products ? keyword="..."
exports.allProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const countProducts = await Product.countDocuments();

  const apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
    countProducts,
  });
});
// get single product by it's id => /api/v1/product/:id
exports.singleProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update single product by it's id => /api/v1/admin/product/update/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  try {
    const PdId = req.params.id;
    let product = await Product.findById(PdId);
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndUpdate(PdId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete single product by it's id => /api/v1/admin/product/update/:id
exports.DeleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const PdId = req.params.id;
    let product = await Product.findById(PdId);
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndDelete(PdId);
    res.status(200).json({
      success: true,
      message: 'Deletes product successfully',
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//create new review => api/v1/review
exports.reviews = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    reviewBy: req.user._id,
    name: req.user.name,
    comment,
    rating: Number(rating),
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (item) => item.reviewBy.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((item) => {
      if (item.reviewBy._id.toString() === req.user._id.toString()) {
        item.rating = rating;
        item.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }
  product.numOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, item) => Number(item.rating) + acc, 0) /
    product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all review of a product
exports.allReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(
    (item) => item._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = review.length;
  const ratings =
    review.reduce((acc, item) => Number(item.rating) + acc, 0) / review.length;
  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
