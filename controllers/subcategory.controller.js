const catchAsyncError = require('../middlewares/catchAsyncError')
const SubCategory=require('../models/subCategoryModel')
const ErrorHandler = require('../utilies/ErrorHandler')

exports.createSubcat=catchAsyncError(async (req,res,next)=>{
    const catInfo={
        createdBy:req.user._id,
           name:req.body.name
       }
    const sub=new SubCategory({...catInfo})
   const subcategory=await sub.save()
    res.status(201).json({
        success: true,
        subcategory
      });
})
exports.updateCreateSubcat=catchAsyncError(async (req,res,next)=>{
    const subId=req.params.id
    
    const subcategory=await SubCategory.findByIdAndUpdate(subId,{name:req.body.name},{
        new:true
    })
   if(!subcategory){
       return (next(new ErrorHandler("Can't find any subcategory",404)))
   }
    res.status(201).json({
        success: true,
        subcategory
      });
})