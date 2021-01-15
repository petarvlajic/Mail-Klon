const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { Console } = require("console");

// @route   GET /test
// @desc    Test route
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @desc        Register user
// @route       POST /api/v1/auth/register
// @access      Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc        Delete user
// @route       Delete /api/v1/auth/users/:id
// @access      Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.user.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email $ password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password mathces
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc        Clear Bearer
// @route       POST /test/clear
// @access      Private

exports.clearBearer = asyncHandler(async (req, res, next) => {
  console.log("Uspesno");
  res.status(200).json({
    msg: "Kao uspelo",
  });
});

// @desc        Log user out / clear cookie
// @route       GET /api/v1/auth/logout
// @access      Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: false,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

//
// Get token from model, create cookie and send response
//
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignetJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ user, token: token });
};
