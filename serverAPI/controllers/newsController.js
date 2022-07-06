const asyncHandler = require("express-async-handler");
const News = require("../models/News");

const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  if (!news) {
    res.status(400);
    res.json({ message: "No News found." });
  }

  return res.status(200).json(news);
});

const addNewNews = asyncHandler(async (req, res) => {
  const { title, description, image, user } = req.body;

  if (!title || !description || !image || !user) {
    res.status(400);
    res.json({ message: "All data is required!" });
  }

  const news = await News.create({
    title,
    description,
    image,
    user,
    time: new Date().toString().substring(0, 24),
  });
  if (!news) {
    res.status(400);
    res.json({ message: "Error when creating new News." });
  }

  return res.status(200).json({ ...news._doc });
});

module.exports = { getAllNews, addNewNews };
