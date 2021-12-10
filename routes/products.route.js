const express = require('express');
const router = express.Router();
const {
  products,
  allProducts,
  newProduct,
  singleProduct,
  updateProduct,
  DeleteProduct,
  reviews,
  allReviews,
  deleteReview,
} = require('../controllers/productsController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//read all products
router.route('/allProducts').get(products);
//read all products
router.route('/products').get(allProducts);
//read single product by it's id
router.route('/product/:id').post(singleProduct);
// create new products
router
  .route('/admin/product/create')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
// update products by id
router
  .route('/admin/product/:id')
  .post(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
// delete products by id
router
  .route('/admin/product/delete/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), DeleteProduct);
//review
router.route('/review').put(isAuthenticatedUser, reviews);
router.route('/reviews').get(isAuthenticatedUser, allReviews);
router.route('/review/delete').post(isAuthenticatedUser, deleteReview);

module.exports = router;
