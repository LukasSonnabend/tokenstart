const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {type: String, required: true, unique: true},
    projectPictureURL: {type: String, required: true},
    tokenChain: {type: String, required: true},
    category: {type: String, required: true},
    sDescription: {type: String, unique: true},
    lDescription: {type: String, unique: true},
    date: {type: Date, default : Date.now},
    tokenName: {type: String, required: true},
    tokenShort: {type: String, required: true, maxlength: 3},
    tokenSupply: {type: Number, required: true},
    smallestTradable: {type: Number, required: true},
    toOwner: {type: Number, required: true},
    projectOwnerName: {type: String, required: true},
    projectOwnerDescription: {type: String, required: true},
    projectOwnerID: {type: String, required: true}
});

module.exports = Project = mongoose.model("projects", projectSchema);