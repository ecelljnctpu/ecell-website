const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});

const teamController = require("../controllers/teamController");

router.get("/", teamController.getAllTeam);
router.post("/", upload.single("photo"), teamController.createTeamMember);
router.delete("/:id", teamController.deleteTeamMember);

module.exports = router;