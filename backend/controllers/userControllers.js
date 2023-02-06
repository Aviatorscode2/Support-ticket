const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
// Description: This file contains all the functions that are used to handle the user routes
// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler (async(req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // Check for existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create salt & hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hash,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  // Check if user and password matches
  if (user && (await bcrypt.compare(password.toString(), user.password))) {
    console.log(user.password);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
  else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Get logged in user profile
// @route GET /api/users/me
// @access Private

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user);
});

// gererate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
