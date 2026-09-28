const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { adminLogin } = require("../controllers/authController");

// Brute-force protection: 15 mins me max 5 attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts. Please try again after 15 minutes." },
});

router.post("/login", loginLimiter, adminLogin);

module.exports = router;