const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const authMiddleware = require("../middleware/authMiddleware"); // Apka JWT middleware
const blogController = require("../controllers/blogController");

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/:id/like", blogController.likeBlog);
router.post("/:id/comment", blogController.addComment);

// Admin-Only Routes
router.post("/", authMiddleware, upload.single("image"), blogController.createBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;