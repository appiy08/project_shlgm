const mongoose = require("mongoose");
const User = require("../models/userModel");

// Get User
const getUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      status: 404,
      message: "No such user found!",
      data: null,
    });
  }

  try {
    const user = await User.findById(userId)
      .select("-password -createdAt -updatedAt")
      .populate("defaultAddress");
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "User data retrieved successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      status: 404,
      message: "No such user found!",
      data: null,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password -createdAt -updatedAt");
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      status: 404,
      message: "No such user found!",
      data: null,
    });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Add Address
const addAddress = async (req, res) => {
  const { userId, address } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      status: 404,
      message: "Invalid user ID!",
      data: null,
    });
  }

  try {
    const user = await User.findById(userId).select(
      "-password -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }

    user.addresses.push(address);
    await user.save();

    res.status(201).json({
      status: 201,
      message: "Address added successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Get Addresses
const getAddress = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({
      status: 404,
      message: "Invalid user ID!",
      data: null,
    });
  }

  try {
    const user = await User.findById(userId).select("addresses");
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Addresses retrieved successfully!",
      data: user.addresses,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(addressId)
  ) {
    return res.status(404).json({
      status: 404,
      message: "Invalid user or address ID!",
      data: null,
    });
  }

  try {
    const user = await User.findById(userId).select(
      "-password -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }

    user.addresses = user.addresses.filter(
      (address) => address._id.toString() !== addressId
    );

    await user.save();

    res.status(200).json({
      status: 200,
      message: "Address deleted successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Set Default Address
const setDefaultAddress = async (req, res) => {
  const { userId, addressId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(addressId)
  ) {
    return res.status(404).json({
      status: 404,
      message: "Invalid user or address ID!",
      data: null,
    });
  }

  try {
    const user = await User.findById(userId).select(
      "-password -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "No such user found!",
        data: null,
      });
    }

    const addressExists = user.addresses.id(addressId);
    if (!addressExists) {
      return res.status(404).json({
        status: 404,
        message: "Address not found!",
        data: null,
      });
    }

    user.defaultAddress = addressId;
    await user.save();

    res.status(200).json({
      status: 200,
      message: "Default address set successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  addAddress,
  getAddress,
  deleteAddress,
  setDefaultAddress,
};
