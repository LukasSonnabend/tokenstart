const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    displayname: {type: String, unique: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true, minlength: 5},
    ownProjects: {type: Array, default: []},
    backedProjects: {type: Array, default: []}
});

module.exports = User = mongoose.model("users", userSchema);

