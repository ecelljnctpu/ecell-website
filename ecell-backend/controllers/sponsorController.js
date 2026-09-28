const Sponsor = require("../models/Sponsor");
const { cloudinary } = require("../config/cloudinary");

// Saare sponsors fetch karein
exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json({ message: "Sponsors fetch error", error: error.message });
  }
};

// Naya sponsor upload karein (Buffer to Cloudinary)
exports.createSponsor = async (req, res) => {
  try {
    const { name, tier, websiteUrl } = req.body;

    if (!req.file && !req.body.logoUrl && !req.body.imageUrl) {
      return res.status(400).json({ message: "Please provide a sponsor logo" });
    }

    let logoUrl = req.body.logoUrl || req.body.imageUrl;

    if (req.file) {
      if (req.file.path) {
        logoUrl = req.file.path;
      } else if (req.file.buffer) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: "ecell/sponsors",
        });
        logoUrl = uploadResponse.secure_url;
      }
    }

    const newSponsor = new Sponsor({
      name,
      tier: tier || "Associate Sponsor",
      logoUrl,
      websiteUrl: websiteUrl || "",
    });

    const savedSponsor = await newSponsor.save();
    return res.status(201).json(savedSponsor);
  } catch (error) {
    console.error("Sponsor Upload Error:", error);
    return res.status(500).json({ message: "Sponsor upload failed", error: error.message });
  }
};

// Sponsor delete karein
exports.deleteSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sponsor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Sponsor not found in DB" });
    }
    return res.status(200).json({ message: "Sponsor deleted successfully from DB" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Delete failed", error: error.message });
  }
};