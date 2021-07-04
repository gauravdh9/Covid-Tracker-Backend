const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addUser = async (user) => {
  try {
    const newUser = new User(user);
    await newUser.save();
    return { message: "Registered Succesfuly" };
  } catch (err) {
    throw new Error(err);
  }
};

exports.userLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not present");
    }
    if (password.localeCompare(user.password) != 0) {
      throw new Error("Your passowrd is incorrect");
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return { token, user };
  } catch (err) {
    throw new Error(err);
  }
};
