const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { get } = require("lodash");
// Dependencies End
// Code Begin
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["buyer", "seller", "user"],
    default: "buyer",
  },
  agreement: { type: Boolean, required: true },
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
