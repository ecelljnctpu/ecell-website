const Blog = require("../models/Blog");
const uploadBuffer = require("../utils/uploadToCloudinary");

// GET /api/blogs (Public)
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/blogs/:slug (Public - Single blog post)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/blogs (Admin Only)
exports.createBlog = async (req, res) => {
  try {
    let coverImageUrl = "";
    if (req.file) {
      coverImageUrl = await uploadBuffer(req.file.buffer, "blogs");
    } else {
      return res.status(400).json({ message: "Cover image is required" });
    }

    // Auto-generate clean slug from title if not provided
    const slug = req.body.slug
      ? req.body.slug.toLowerCase().trim().replace(/[\s\W-]+/g, "-")
      : req.body.title.toLowerCase().trim().replace(/[\s\W-]+/g, "-");

    const existingSlug = await Blog.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({ message: "Slug already exists, please provide a unique slug" });
    }

    const tags = req.body.tags
      ? Array.isArray(req.body.tags)
        ? req.body.tags
        : req.body.tags.split(",").map((t) => t.trim())
      : [];

    const blog = await Blog.create({
      title: req.body.title,
      slug,
      content: req.body.content,
      author: req.body.author,
      coverImageUrl,
      tags,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/blogs/:id (Admin Only)
exports.updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.coverImageUrl = await uploadBuffer(req.file.buffer, "blogs");
    }

    if (req.body.tags && typeof req.body.tags === "string") {
      updateData.tags = req.body.tags.split(",").map((t) => t.trim());
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/blogs/:id (Admin Only)
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};