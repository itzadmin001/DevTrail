const MarkDownModel = require("../Models/MarkDownModel");

async function CreateMarkDown(req, res) {
    const { title, content, id } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
    }
    try {
        const newMarkDown = new MarkDownModel({
            title,
            content,
            tags: req.body.tags || [],
            Visibility: req.body.Visibility || 'public',
            user: id
        });
        await newMarkDown.save();
        return res.status(201).json({ message: "MarkDown created successfully.", data: newMarkDown });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error creating MarkDown." });
    }
}

async function GetMarkDowns(req, res) {

    const { id } = req.user;

    try {
        const markdowns = await MarkDownModel.find({ user: id });
        if (!markdowns) {
            return res.status(404).json({ message: "No MarkDowns found for this user." });
        }
        return res.status(200).json({ message: "MarkDowns retrieved successfully.", data: markdowns });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error retrieving MarkDowns." });
    }

}

module.exports = { CreateMarkDown, GetMarkDowns }