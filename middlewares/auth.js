const ErrorHandler = require("../utilies/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require('jsonwebtoken')
const User =require('../models/userModel')

exports.isAuthenticatedUser= catchAsyncError(async(req,res,next)=>{
    const {authorization}= req.headers;
    const token=authorization
    if(!token){
        return next (new ErrorHandler('need to login first'))
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        return next(new ErrorHandler('unexpected user'))
    }
    req.user=await User.findById(decode.id)
    next()
})

exports.authorizeRoles=(...roles)=>{  
   return (req,res,next)=>{
       if(!roles.includes(req.user.role)){
        next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403))
       }
       next()
   }
}