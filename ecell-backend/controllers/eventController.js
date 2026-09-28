const Event = require("../models/Event");
const uploadBuffer = require("../utils/uploadToCloudinary");

// GET /api/events (Public - supports ?category=upcoming)
exports.getEvents = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const events = await Event.find(filter).sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/events (Admin Only - Multipart Form Data)
exports.createEvent = async (req, res) => {
  try {
    let bannerUrl = "";
    if (req.file) {
      bannerUrl = await uploadBuffer(req.file.buffer, "events");
    }

    const event = await Event.create({
      ...req.body,
      bannerUrl,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/events/:id (Admin Only)
exports.updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.bannerUrl = await uploadBuffer(req.file.buffer, "events");
    }
    const updated = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/events/:id (Admin Only)
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};