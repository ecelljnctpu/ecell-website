const Gallery = require("../models/Gallery");
const { cloudinary } = require("../config/cloudinary");

exports.getAllGallery = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: "Gallery fetch karne me error", error: error.message });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const { eventName, date } = req.body;

    if (!req.file && !req.body.photoUrl && !req.body.imageUrl) {
      return res.status(400).json({ message: "Please select an image file" });
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
          folder: "ecell/gallery",
        });
        uploadedUrl = uploadResponse.secure_url;
      }
    }

    // Yahan imageUrl aur photoUrl dono set kar diye gaye hain
    const newGalleryItem = new Gallery({
      eventName,
      date,
      imageUrl: uploadedUrl,
      photoUrl: uploadedUrl,
    });

    const savedItem = await newGalleryItem.save();
    return res.status(201).json(savedItem);
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};