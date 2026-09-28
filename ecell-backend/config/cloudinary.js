const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer ko memory storage me configure karenge taaki RAM me buffer rahe
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize:20 * 1024 * 1024 }, // 20 MB max limit
});

module.exports = { cloudinary, upload };