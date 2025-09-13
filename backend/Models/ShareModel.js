const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    markdown: { type: mongoose.Schema.Types.ObjectId, ref: "MarkDown", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Share", ShareSchema);