const express = require('express');
const {
  initialDataAdmin,
} = require('../controllers/initialDataAdmin.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const cors = require('cors');

const router = express.Router();
const corsOptions = {
  origin: 'https://db-fashion.vercel.app',
  optionsSuccessStatus: 200,
};

router
  .route('/initialData')
  .get(isAuthenticatedUser, authorizeRoles('admin'), initialDataAdmin);

module.exports = router;
