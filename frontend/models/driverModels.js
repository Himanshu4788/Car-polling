const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  username: String,
  location: String,
  destination: String
});

module.exports = mongoose.model("driver", driverSchema);
