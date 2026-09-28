const JoinApplication = require("../models/JoinApplication");

// POST /api/join (Public: Students fill this form)
exports.submitApplication = async (req, res) => {
  try {
    const application = await JoinApplication.create(req.body);
    res.status(201).json({ message: "Application submitted successfully!", application });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/join/all (Admin Only: View student applications)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JoinApplication.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/join/:id (Admin Only)
exports.deleteApplication = async (req, res) => {
  try {
    await JoinApplication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};