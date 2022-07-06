const express = require("express");
const router = express.Router();
const { getAllNews, addNewNews } = require("../controllers/newsController");

// Get all News
router.get("/", getAllNews);

// Add new News
router.post("/", addNewNews);

module.exports = router;
