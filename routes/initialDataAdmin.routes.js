const express = require('express');
const {
  initialDataAdmin,
} = require('../controllers/initialDataAdmin.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
var cors = require('cors');

const router = express.Router();
const corsOptions={
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

router.route('/initialData').get(
  cors(corsOptions),
  isAuthenticatedUser,
  authorizeRoles('admin'),
  initialDataAdmin
);

module.exports = router;
