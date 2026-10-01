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
      default: "Member", // Example: Lead, Co-Lead, Member
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Leader",
        "Technical Team",
        "Corporate Relations Team",
        "Social Media & Designing Team",
        "Research & Development Team",
        "Operation and Management Department",
      ],
      default: "Leader",
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