const mongoose=require('mongoose')

const subCategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Provide Subcategory Name'],
        unique:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },

},{
  timestamps:true
})

module.exports= new mongoose.model('SubCategory',subCategorySchema)