const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  addNewVideo,
} = require("../controllers/videosController");

// Get all Videos
router.get("/", getAllVideos);

// Add new Video
router.post("/", addNewVideo);

module.exports = router;
