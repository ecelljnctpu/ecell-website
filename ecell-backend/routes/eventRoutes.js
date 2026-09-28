const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// Public: All visitors can view
router.get("/", getEvents);

// Protected: Only Admin can create, edit, or delete
router.post("/", verifyAdmin, upload.single("banner"), createEvent);
router.put("/:id", verifyAdmin, upload.single("banner"), updateEvent);
router.delete("/:id", verifyAdmin, deleteEvent);

module.exports = router;