const MarkDownModel = require("../Models/MarkDownModel");
const ShareModel = require("../Models/ShareModel");
const crypto = require("crypto");
const User = require("../Models/UserModel");

async function CreateMarkDown(req, res) {
    const { title, content, tags = [], visibility = 'public', id } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
    }
    try {
        const newMarkDown = new MarkDownModel({
            title,
            content,
            tags,
            Visibility: visibility,
            user: id
        });
        await newMarkDown.save();
        return res.status(201).json({ message: "MarkDown created successfully.", data: newMarkDown });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating MarkDown." });
    }
}

async function GetAllMarkDowns(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        const markdowns = await MarkDownModel.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "MarkDowns retrieved successfully.", data: markdowns });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving MarkDowns." });
    }
}

async function GetSingleMarkDown(req, res) {
    try {
        const userId = req.user?.id;
        const requestedId = req.params?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        const markdown = await MarkDownModel.findOne({ _id: requestedId, user: userId });
        if (!markdown) {
            return res.status(404).json({ message: "MarkDown not found." });
        }
        return res.status(200).json({ message: "MarkDown retrieved successfully.", data: markdown });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving MarkDown." });
    }
}

// create a share token valid for 10 minutes
async function CreateShareLink(req, res) {
    try {
        const ownerId = req.user?.id;
        const markdownId = req.params?.id;
        if (!ownerId) return res.status(401).json({ message: "Unauthorized." });
        const markdown = await MarkDownModel.findOne({ _id: markdownId, user: ownerId });
        if (!markdown) return res.status(404).json({ message: "MarkDown not found or not owned by you." });

        const token = crypto.randomBytes(16).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const share = new ShareModel({
            token,
            markdown: markdown._id,
            owner: ownerId,
            expiresAt
        });
        await share.save();

        return res.status(201).json({ message: "Share token created.", data: { token, expiresAt } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating share token." });
    }
}

// public endpoint to retrieve shared markdown + owner (no auth)
async function GetSharedMarkDown(req, res) {

    try {
        const token = req.params?.token;
        const share = await ShareModel.findOne({ token }).populate({
            path: "markdown",
            model: MarkDownModel
        }).populate({
            path: "owner",
            model: User,
            select: "_id displayName email avatar bio"
        });

        if (!share) return res.status(404).json({ message: "Share link not found." });
        if (new Date() > new Date(share.expiresAt)) {
            return res.status(410).json({ message: "Share link has expired." });
        }

        const md = share.markdown;
        if (!md) return res.status(404).json({ message: "Shared markdown not found." });

        // Only allow showing via share if the markdown is public
        const visibility = String(md.Visibility || "").toLowerCase();
        if (visibility !== "public") {
            return res.status(403).json({ message: "Markdown is not public." });
        }

        // Count how many markdowns owner has (fast count)
        const ownerCount = await MarkDownModel.countDocuments({ user: share.owner._id });

        return res.status(200).json({
            message: "Shared content retrieved.",
            data: {
                markdown: md,
                owner: share.owner,
                expiresAt: share.expiresAt,
                ownerCount
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving shared markdown." });
    }
}

module.exports = {
    CreateMarkDown,
    GetAllMarkDowns,
    GetSingleMarkDown,
    CreateShareLink,
    GetSharedMarkDown
};