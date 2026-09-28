const mongoose = require("mongoose");

const joinApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true }, // e.g. "1st Year", "2nd Year"
    domainOfInterest: {
      type: String,
      enum: ["Technical", "Marketing & PR", "Events & Logistics", "Design & Video", "Content & Sponsorship"],
      required: true,
    },
    aboutECell: { type: String, required: true },
    whyJoin: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JoinApplication", joinApplicationSchema);