const Address = require("../models/addressModel");

// Add Address
const addAddress = async (req, res) => {
  const { userId, address } = req.body;

  try {
    let userAddress = await Address.findOne({ userId });
    if (!userAddress) {
      userAddress = new Address({ userId, address });
    } else {
      userAddress.address = address;
    }

    await userAddress.save();

    res.status(200).json({
      status: 200,
      message: "Address added successfully",
      data: userAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Address
const getAddress = async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching address for userId: ${userId}`);

  try {
    const address = await Address.findOne({ userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Address retrieved successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addAddress, getAddress };
