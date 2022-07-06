const asyncHandler = require("express-async-handler");
const Song = require("../models/Song");

const getAllSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  if (!songs) {
    res.status(400);
    res.json({ message: "No Songs found." });
  }

  return res.status(200).json(songs);
});

const addNewSong = asyncHandler(async (req, res) => {
  const { title, fileName } = req.body;

  if (!title || !fileName) {
    res.status(400);
    res.json({ message: "All data is required!" });
  }

  const song = await Song.create({
    title,
    fileName,
  });
  if (!song) {
    res.status(400);
    res.json({ message: "Error when adding new Song." });
  }

  return res.status(200).json({ ...song._doc });
});

module.exports = { getAllSongs, addNewSong };
