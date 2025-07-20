const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/carpooling");

const clientSchema = mongoose.Schema({
    username: String,
    location: String,
    destination: String
    // number: String      
});

module.exports = mongoose.model("client", clientSchema);
