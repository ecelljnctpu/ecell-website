const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  getAllSponsors,
  createSponsor,
  deleteSponsor,
} = require("../controllers/sponsorController");

router.get("/", getAllSponsors);
router.post("/", upload.single("logo"), createSponsor);
router.delete("/:id", deleteSponsor);

module.exports = router;