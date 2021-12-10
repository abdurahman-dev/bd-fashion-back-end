const express=require('express')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const{AddCategory,getCategory,UpdateCategory}=require('../controllers/category.controller')
const { createSubcat, updateCreateSubcat } = require('../controllers/subcategory.controller')

const router=express.Router()
router.route('/createCategory').post(isAuthenticatedUser,authorizeRoles('admin'),AddCategory)
router.route('/categories').get(getCategory)
router.route('/updateCategory/:id').post(isAuthenticatedUser,authorizeRoles('admin'),UpdateCategory)
router.route('/createSubcategory').post(isAuthenticatedUser,authorizeRoles('admin'),createSubcat)
router.route('/updateSubcategory/:id').post(isAuthenticatedUser,authorizeRoles('admin'),updateCreateSubcat)

module.exports=router