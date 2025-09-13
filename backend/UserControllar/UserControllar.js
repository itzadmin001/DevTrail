const User = require('../Models/UserModel');
const UserModel = require("../Models/UserModel");
const MarkDownModel = require("../Models/MarkDownModel");

async function getProfile(req, res) {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            profileUrl: user.profileUrl,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// add this function to export list
async function GetPublicProfile(req, res) {
    try {
        const userId = req.params?.id;
        if (!userId) return res.status(400).json({ message: "User id required." });

        const user = await UserModel.findById(userId).select("_id displayName avatar bio");
        if (!user) return res.status(404).json({ message: "User not found." });

        // return public markdowns only
        const publicMarkdowns = await MarkDownModel.find({
            user: userId,
            Visibility: { $regex: /^public$/i } // case-insensitive public
        }).sort({ createdAt: -1 });

        return res.status(200).json({ message: "Public profile retrieved.", data: { user, markdowns: publicMarkdowns } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching public profile." });
    }
}

module.exports = {
    getProfile,
    GetPublicProfile
}
