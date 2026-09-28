const mongoose = require("mongoose");
module.exports = mongoose.model("Speaker", new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  // company: { type: String, required: true },
  photoUrl: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  // topic: { type: String, default: "" },
}, { timestamps: true }));