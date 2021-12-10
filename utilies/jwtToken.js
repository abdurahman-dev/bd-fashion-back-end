//create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const userInfo = {
    name: user.name,
    role: user.role,
    email: user.email,
    avatar: {
      ...user.avatar,
    },
    userShippingInfo: {
      ...user.userShippingInfo,
    },
    userBio: user.userBio,
    userCountry: user.userCountry,
    userWebSite: user.userWebSite,
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    userInfo,
    token,
  });
};

module.exports = sendToken;
