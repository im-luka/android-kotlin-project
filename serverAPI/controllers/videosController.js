const asyncHandler = require("express-async-handler");
const Video = require("../models/Video");

const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find();
  if (!videos) {
    res.status(400);
    res.json({ message: "No Videos found." });
  }

  return res.status(200).json(videos);
});

const addNewVideo = asyncHandler(async (req, res) => {
  const { title, link } = req.body;

  if (!title || !link) {
    res.status(400);
    res.json({ message: "All data is required!" });
  }

  const video = await Video.create({
    title,
    link,
  });
  if (!video) {
    res.status(400);
    res.json({ message: "Error when adding new Video." });
  }

  return res.status(200).json({ ...video._doc });
});

module.exports = { getAllVideos, addNewVideo };
