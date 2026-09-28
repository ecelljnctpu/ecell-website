const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "Core Team",
    },
    sessionYear: {
      type: String,
      default: "2024-27",
    },
    photoUrl: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    strict: false, // Taaki koi extra ya purani field error na feke
  }
);

module.exports = mongoose.model("Team", teamSchema);