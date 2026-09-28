const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const speakerController = require("../controllers/speakerController");

// Public route: Get all speakers
router.get("/", speakerController.getAllSpeakers);

// Admin routes: Add & Delete speaker
router.post("/", verifyAdmin, upload.single("photo"), speakerController.createSpeaker);
router.delete("/:id", verifyAdmin, speakerController.deleteSpeaker);

module.exports = router;