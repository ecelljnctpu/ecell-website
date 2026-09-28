const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const verifyAdmin = require("../middleware/authMiddleware");
const { submitApplication, getAllApplications, deleteApplication } = require("../controllers/joinController");

// 🔥 Form spam limiter: 1 ghante me ek IP se maximum 3 baar submit ho sakega
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { message: "Aapne kaafi baar form submit kar diya hai. Kripya 1 ghante baad try karein." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public: Apply with rate limit
router.post("/", formLimiter, submitApplication);

// Protected
router.get("/all", verifyAdmin, getAllApplications);
router.delete("/:id", verifyAdmin, deleteApplication);

module.exports = router;