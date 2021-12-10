const Users = require('../models/userModel');
const ErrorHandler = require('../utilies/ErrorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utilies/jwtToken');

// Create new user =>api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'samples/people/smiling-man',
      url: 'https://res.cloudinary.com/dpqv2divs/image/upload/v1635170992/samples/people/smiling-man.jpg',
    },
  });
  sendToken(user, 201, res);
});

//forget password => api/v1/password/forgot
// exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
//     const email=req.body
//    const user= await User.findOne({email})
//    if(!user){
//        return next(new ErrorHandler('User not found with this email',403))
//    }
//    //get reset token
//    const reestToken=user.getResetPasswordToken()
//    await user.save({validateBeforeSave:false})

//    //create reset password url

// })

// Login user =>api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check empty filed or not
  if (!email || !password) {
    return next(
      new ErrorHandler('Enter the filed by valid email and password', 400)
    );
  }
  //check email match with database
  const user = await Users.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  //check password match or not
  const isPasswordMatched = await user.comparedPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  sendToken(user, 200, res);
});

// Logged user info =>api/v1/profile/me
exports.userProfile = catchAsyncError(async (req, res, next) => {
  const { email } = req.user;

  //check email match with database
  const user = await Users.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('Invalid User', 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Logged user info =>api/v1/profile/me/update
exports.userProfileUpdate = catchAsyncError(async (req, res, next) => {
  const user = await Users.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update password => api/v1/password/update
exports.UpdatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmedPassword } = req.body;
  const user = await Users.findById(req.user.id).select('+password');
  const isValidUser = await user.comparedPassword(oldPassword);
  if (!isValidUser) {
    return next(new ErrorHandler("Old password don't match", 401));
  }
  if (newPassword !== confirmedPassword) {
    return next(new ErrorHandler("confirmedPassword don't match", 401));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Login out user =>api/v1/logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});

// Only access by admin

//Get all users =>api/v1/user
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await Users.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user =>api/v1/admin/user/:id
exports.userById = catchAsyncError(async (req, res, next) => {
  const users = await Users.findById(req.params.id);
  res.status(200).json({
    success: true,
    users,
  });
});

//update single user =>api/v1/admin/user/:id
exports.updateUserById = catchAsyncError(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  if (req.body.email) {
    user.email = req.body.email;
  }
  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.role) {
    user.role = req.body.role;
  }
  user.save();
  res.status(200).json({
    success: true,
    user,
  });
});

//delete single user =>api/v1/admin/user/delete/:id
exports.deleteUserById = catchAsyncError(async (req, res, next) => {
  const user = await Users.findByIdAndDelete({_id:req.params.id});
  res.status(200).json({
    success: true,
    message: 'User Delete successfully',
    user
  });
});
