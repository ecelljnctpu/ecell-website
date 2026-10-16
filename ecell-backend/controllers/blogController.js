const Blog = require("../models/Blog");
const { cloudinary } = require("../config/cloudinary");

// 1. Get all blogs with search & filter
exports.getAllBlogs = async (req, res) => {
  try {
    const { search, category, sort, limit } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search,$options: "i" } },
        { excerpt: { $regex: search,$options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    let sortOption = { createdAt: -1 }; // default: latest
    if (sort === "most_liked") sortOption = { likes: -1 };
    if (sort === "trending") sortOption = { views: -1, likes: -1 };

    let blogsQuery = Blog.find(query).sort(sortOption);
    if (limit) blogsQuery = blogsQuery.limit(parseInt(limit));

    const blogs = await blogsQuery.exec();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
  }
};

// 2. Get single blog by ID & increment views
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

// 3. Create blog (Admin only)
exports.createBlog = async (req, res) => {
  try {
    const { title, category, excerpt, content, author, authorContact, publishDate } = req.body;
    const file = req.file || (req.files && req.files[0]);

    if (!file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    let imageUrl = "";
    if (file.path) {
      imageUrl = file.path;
    } else if (file.buffer) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype || "image/jpeg"};base64,${b64}`;
      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "ecell/blogs",
      });
      imageUrl = uploadRes.secure_url;
    }

    const newBlog = new Blog({
      title,
      category,
      excerpt,
      content,
      author: author || "E-Cell JNCTPU Team",
      authorContact: authorContact || "",
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      imageUrl,
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
};

// 4. Like / Unlike blog
exports.likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const clientIp = req.ip || req.connection.remoteAddress;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const alreadyLiked = blog.likedByIps.includes(clientIp);

    if (alreadyLiked) {
      blog.likes = Math.max(0, blog.likes - 1);
      blog.likedByIps = blog.likedByIps.filter((ip) => ip !== clientIp);
    } else {
      blog.likes += 1;
      blog.likedByIps.push(clientIp);
    }

    await blog.save();
    res.status(200).json({ likes: blog.likes, isLiked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: "Like action failed", error: error.message });
  }
};

// 5. Add comment
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: "Name and comment are required" });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.unshift({ name, comment, createdAt: new Date() });
    await blog.save();

    res.status(201).json({ comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to post comment", error: error.message });
  }
};

// 6. Delete blog (Admin only)
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};