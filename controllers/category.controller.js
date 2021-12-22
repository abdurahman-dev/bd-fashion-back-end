const catchAsyncError=require('../middlewares/catchAsyncError')
const Category=require('../models/categoryModel')
const ErrorHandler = require('../utilies/ErrorHandler')

exports.AddCategory=catchAsyncError(async(req,res,next)=>{
  
 const catInfo={
    createdBy:req.user._id,
       name:req.body.name,
       image:req.body.image
   }
const cat=  new Category({...catInfo})
const category=await cat.save()
res.status(201).json({
    success: true,
    category
  });
}) 

exports.getCategory=catchAsyncError(async(req,res,next)=>{
  const cat= await Category.find({})
  console.log(cat);
  res.status(200).json({
    success:true,
    categories:cat
  })
})

exports.UpdateCategory=catchAsyncError(async(req,res,next)=>{
    try{
        const catId=req.params.id
       let cat=await Category.findByIdAndUpdate(catId,{name:req.body.name},{
        new:true
       })
           if(!cat){
            return next(new ErrorHandler('Category not found', 404));
           }
        res.status(201).json({
            success: true,
            cat
          });
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
          });
    }
   }) 