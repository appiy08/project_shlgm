const Address = require("../models/addressModel");

// Add Address
const addAddress = async (req, res) => {
  const { userId, address } = req.body;

  try {
    let userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      userAddress = new Address({ userId, addresses: [address] });
    } else {
      userAddress.addresses.push(address);
    }

    await userAddress.save();

    res.status(200).json({
      status: 200,
      message: "Address added successfully",
      data: userAddress,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Get Address
const getAddress = async (req, res) => {
  const { userId } = req.params;

  try {
    const address = await Address.findOne({ userId });

    if (!address) {
      return res.status(404).json({
        status: 404,
        message: "Address not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Addresses retrieved successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({
        status: 404,
        message: "Address not found",
      });
    }

    userAddress.addresses = userAddress.addresses.filter(
      (address) => address._id.toString() !== addressId
    );

    await userAddress.save();

    res.status(200).json({
      status: 200,
      message: "Address deleted successfully",
      data: userAddress,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = { addAddress, getAddress, deleteAddress };