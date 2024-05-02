const { get, set, omit } = require("lodash");
const mongoose = require("mongoose");
// Model
const User = require("../models/userModel");
// Dependencies End

// Get User
const getUser = async (req, res) => {
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      message: "No such user found!",
      data: null,
    });
  }

  try {
    const user = await User.findById(_id);
    const finalUser = omit(user, ["password", "created_at", "updated_at"]);
    if (!finalUser) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "User data get successfully!",
        data: finalUser,
      });
    }
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

module.exports = {getUser}