const mongoose =require('mongoose')
const validator =require('validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        trim:true,
        minlength:[3, 'Name must be upper then 3 characters'],
        maxLength:[30, 'Name can not be upper then 30 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter you email'],
        unique:true,
        trim:true,
        validate:[validator.isEmail,'Please enter valid email']
    },
    password:{
        type:String,
        required:true,
        minlength:[5,'Password must be greater then 5'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    userBio:String,
    userCountry:String,
    userWebSite:String,
    userShippingInfo:{
        userShippingCountry:String,
        userStreet:String,
        userCityState:String,
        userCity:String,
        userZipCode:String,
    },
   role:{
        type:String,
        required:true,
        default:'user'
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpired:Date
},{
    timestamps:true
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

//compared password
userSchema.methods.comparedPassword =async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

//return jwt
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_TIME })
}



//generate password reset token
userSchema.methods.getResetPasswordToken=function(){
    //generate token
    const resetToken=crypto.randomBytes(20).toString('hex')
    //has and set resetPassword token
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token expire time
    this.resetPasswordExpired=Date.now()+30*60*1000
    return resetToken
}



module.exports=mongoose.model('Users',userSchema)