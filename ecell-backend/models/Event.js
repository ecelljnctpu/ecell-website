const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["upcoming", "current", "past"],
      default: "upcoming",
    },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    registrationLink: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);