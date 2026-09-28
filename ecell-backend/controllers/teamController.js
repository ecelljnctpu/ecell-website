const Team = require("../models/Team");
const { cloudinary } = require("../config/cloudinary");

// Saare members fetch
exports.getAllTeam = async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Team fetch error", error: error.message });
  }
};

// Member add karein
exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, sessionYear, linkedinUrl, photoUrl, imageUrl } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name field is required" });
    }

    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    let finalImageUrl = photoUrl || imageUrl || "";

    if (file) {
      if (file.path) {
        finalImageUrl = file.path;
      } else if (file.buffer) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype || "image/jpeg"};base64,${b64}`;

        const uploadRes = await cloudinary.uploader.upload(dataURI, {
          folder: "ecell/team",
        });
        finalImageUrl = uploadRes.secure_url;
      }
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: "Profile photo missing ya upload fail hua" });
    }

    // Atlas Document Structure
    const newMemberData = {
      name: name.trim(),
      role: (role || "Core Team").trim(),
      sessionYear: sessionYear || "2024-27",
      photoUrl: finalImageUrl,
      imageUrl: finalImageUrl,
      linkedinUrl: linkedinUrl ? linkedinUrl.trim() : "",
    };

    const newMember = new Team(newMemberData);
    const saved = await newMember.save();
    return res.status(201).json(saved);

  } catch (error) {
    console.error("TEAM_SAVE_ERROR:", error);
    // EXACT error message client ko bhejo taaki popup me pata chale
    return res.status(500).json({
      message: error.message || "Failed to save team member",
    });
  }
};

// Member delete karein
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};