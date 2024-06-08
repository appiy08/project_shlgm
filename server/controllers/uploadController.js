const Image = require("../models/imageModel");

const handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Create a new Image document
  const image = new Image({
    filename: req.file.filename,
    url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
  });

  await image.save();

  res.send({
    message: "File uploaded successfully",
    imageUrl: image.url,
  });
};

module.exports = { handleUpload };
