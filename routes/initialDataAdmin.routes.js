const express=require('express')
const { initialDataAdmin } = require('../controllers/initialDataAdmin.controller')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const router=express.Router()

router.route('/initialData').get(isAuthenticatedUser,authorizeRoles('admin'),initialDataAdmin)

module.exports=router