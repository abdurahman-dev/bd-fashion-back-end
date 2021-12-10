const express=require('express')
const {isAuthenticatedUser,authorizeRoles}=require('../middlewares/auth')
const {newOrderController,getSingleOder,myOrders,allOrders,updateOrders,deleteOrder}=require('../controllers/orderController')

const router=express.Router()

//create new order
router.route('/order/new').post(isAuthenticatedUser,newOrderController)
//get single order by id
router.route('/order/:id').get(isAuthenticatedUser,getSingleOder)
//get orders by logged user
router.route('/orders/me').get(isAuthenticatedUser,myOrders)
//get all orders by admin
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),allOrders)
//update order status by admin
router.route('/admin/orders/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrders)
//delete order by admin
router.route('/admin/orders/delete/:id').get(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)


module.exports=router