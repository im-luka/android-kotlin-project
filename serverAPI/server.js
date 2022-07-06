require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = require("./config/port");
const mongoose = require("mongoose");
const connectionDB = require("./config/db");

const usersRoute = require("./routes/usersRoute");
const newsRoute = require("./routes/newsRoute");
const videosRoute = require("./routes/videosRoute");
const songsRoute = require("./routes/songsRoute");

// Connect to MongoDB
connectionDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", usersRoute);
app.use("/api/news", newsRoute);
app.use("/api/videos", videosRoute);
app.use("/api/songs", songsRoute);

// Check DB connection and run server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});
