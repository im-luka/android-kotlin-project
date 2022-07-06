const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(`Error when connecting to DB: ${error.message}`.red);
  }
};

module.exports = connectionDB;
