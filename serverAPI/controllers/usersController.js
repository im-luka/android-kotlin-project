const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, image } = req.body;

  if (!username || !password || !image) {
    res.status(400);
    res.json({
      message:
        "Username, password and image are required when creating new user.",
    });
  }

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    image,
  });
  if (!user) {
    res.status(400);
    res.json({ message: "Error when creating new user." });
  }

  return res.status(200).json({ ...user._doc });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    res.json({ message: "Username and password are required for log in." });
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    res.json({ message: "User does not exists." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400);
    res.json({ message: "Password is invalid." });
  }

  return res.status(200).json({ ...user._doc });
});

module.exports = { registerUser, loginUser };
