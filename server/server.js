// Imports Begin
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const middlewares = require("./middlewares");
// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require('./routes/uploadRoutes');
// Dependencies End
// Code Begin

// App
const app = express();
const port = process.env.PORT || 5050;

// Middlewares
app.use(middlewares);

app.use((req, res, next) => {
  console.log(req?.path, req?.method);
  next();
});

// Serve the uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API's Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use('/api', uploadRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    // Listen for Request
    app.listen(port, () => {
      console.log(`Server connect with Database & Running on Port : ${port}`);
      console.log(`Base URL : http://localhost:${port}/api`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
