const mongoose = require("mongoose");
module.exports = mongoose.model("Gallery", new mongoose.Schema({
  // title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  eventTag: { type: String, default: "Summit" },
}, { timestamps: true }));