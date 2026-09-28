const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", verifyAdmin, upload.single("coverImage"), createBlog);
router.put("/:id", verifyAdmin, upload.single("coverImage"), updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);

module.exports = router;