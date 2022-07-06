const mongoose = require("mongoose");

const songsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Song", songsSchema);
