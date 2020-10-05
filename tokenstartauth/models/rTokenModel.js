const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: {type: String, required: true, unique: true},
    expires: {type: Date, required: true},
    isExpired: {type: Boolean, required: true},
    created: {type: Date, default : Date.now},
    createdByIp: {type: String, required: true},
    isActive: {type: Boolean, required: true}
});

module.exports = User = mongoose.model("tokens", tokenSchema);

