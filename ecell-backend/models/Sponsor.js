const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tier: {
      type: String, // e.g. "Title Sponsor", "Platinum", "Gold", "Silver", "Associate"
      default: "Associate Sponsor",
    },
    logoUrl: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsor", sponsorSchema);