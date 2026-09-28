const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const galleryController = require("../controllers/galleryController");

// Public route: Get all gallery photos
router.get("/", galleryController.getAllGallery);

// Admin routes: Upload & Delete photo
router.post("/", verifyAdmin, upload.single("photo"), galleryController.createGalleryItem);
router.delete("/:id", verifyAdmin, galleryController.deleteGalleryItem);

module.exports = router;