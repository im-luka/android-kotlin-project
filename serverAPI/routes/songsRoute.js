const express = require("express");
const router = express.Router();
const { getAllSongs, addNewSong } = require("../controllers/songsController");

// Get all Songs
router.get("/", getAllSongs);

// Add new Song
router.post("/", addNewSong);

module.exports = router;
