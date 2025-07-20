const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/carpooling");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    number: String      
});

module.exports = mongoose.model("user", userSchema);
