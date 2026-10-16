const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      default: "Startup & Innovation",
      enum: [
        "Startup & Innovation",
        "E-Summit Highlights",
        "Case Study",
        "Tech & AI",
        "Founder Stories",
      ],
    },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, default: "E-Cell JNCTPU Team" },
    authorContact: { type: String, default: "ecell@jnctbhopal.ac.in" }, // Email / LinkedIn / Phone
    publishDate: { type: Date, default: Date.now }, // Custom ya upload date
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedByIps: [{ type: String }],
    views: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);