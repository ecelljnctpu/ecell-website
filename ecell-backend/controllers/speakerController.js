const Speaker = require("../models/Speaker");
const { cloudinary } = require("../config/cloudinary");

// Get all speakers
exports.getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find().sort({ createdAt: -1 });
    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({ message: "Speakers fetch karne me error", error: error.message });
  }
};

// Add new speaker
exports.createSpeaker = async (req, res) => {
  try {
    const { name, designation, linkedinUrl, role, company } = req.body;

    if (!req.file && !req.body.photoUrl && !req.body.imageUrl) {
      return res.status(400).json({ message: "Please select a speaker photo" });
    }

    let uploadedUrl = req.body.photoUrl || req.body.imageUrl;

    // Buffer to Cloudinary upload
    if (req.file) {
      if (req.file.path) {
        uploadedUrl = req.file.path;
      } else if (req.file.buffer) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: "ecell/speakers",
        });
        uploadedUrl = uploadResponse.secure_url;
      }
    }

    // Saare possible schema field names provide kar diye gaye hain taaki validation fail na ho
    const newSpeaker = new Speaker({
      name,
      designation: designation || role || "Speaker",
      role: role || designation || "Speaker",
      company: company || "",
      imageUrl: uploadedUrl,
      photoUrl: uploadedUrl,
      photo: uploadedUrl,
      image: uploadedUrl,
      linkedinUrl: linkedinUrl || "",
      linkedin: linkedinUrl || "",
    });

    const savedSpeaker = await newSpeaker.save();
    return res.status(201).json(savedSpeaker);
  } catch (error) {
    console.error("Speaker Upload Error:", error);
    return res.status(500).json({ 
      message: "Speaker add karne me error", 
      error: error.message 
    });
  }
};

// Delete speaker
exports.deleteSpeaker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSpeaker = await Speaker.findByIdAndDelete(id);
    if (!deletedSpeaker) {
      return res.status(404).json({ message: "Speaker nahi mila" });
    }
    res.status(200).json({ message: "Speaker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};