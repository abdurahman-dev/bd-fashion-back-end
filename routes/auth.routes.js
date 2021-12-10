const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  userProfile,
  UpdatePassword,
  userProfileUpdate,
  getAllUsers,
  userById,
  deleteUserById,
  updateUserById
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/profile/me').get(isAuthenticatedUser, userProfile);
router.route('/profile/me/update').put(isAuthenticatedUser, userProfileUpdate);
router.route('/password/update').put(isAuthenticatedUser,UpdatePassword);
// router.route('/password/forgot').post(forgotPassword);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/delete/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUserById);
router.route('/admin/user/:id')
      .get(isAuthenticatedUser,authorizeRoles('admin'),userById)
      .put(isAuthenticatedUser,authorizeRoles('admin'),updateUserById);


module.exports = router;
