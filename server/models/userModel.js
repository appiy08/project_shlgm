const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { get } = require("lodash");

// Dependencies End
const { Schema } = mongoose;

const AddressSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },
  agreement: { type: Boolean, required: true },
  addresses: [AddressSchema],
  defaultAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not a valid email");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Invalid email");
  }

  const match = await bcrypt.compare(password, get(user, "password", ""));

  if (!match) {
    throw new Error("Invalid password");
  }

  return user;
};

// Static Signup Method
userSchema.statics.signup = async function ({
  name,
  email,
  password,
  role,
  agreement,
}) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPassword,
    role,
    agreement,
  });

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
