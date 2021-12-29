const express=require('express')
const { initialDataAdmin } = require('../controllers/initialDataAdmin.controller')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
var cors = require('cors')

const router=express.Router()

router.route('/initialData').get(cors(),isAuthenticatedUser,authorizeRoles('admin'),initialDataAdmin)

module.exports=router