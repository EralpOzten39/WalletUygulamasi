const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String
    }
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;