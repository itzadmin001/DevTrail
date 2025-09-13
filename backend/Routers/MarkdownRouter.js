const express = require("express");
const { VerifyUser } = require("../Middlewares/UserAuth");
const {
    CreateMarkDown,
    GetAllMarkDowns,
    GetSingleMarkDown,
    CreateShareLink,
    GetSharedMarkDown
} = require("../UserControllar/MarkDownControllar");

const MarkdownRouter = express.Router();

MarkdownRouter.post("/create", VerifyUser, CreateMarkDown);
// public shared route (no auth)
MarkdownRouter.get("/shared/:token", GetSharedMarkDown);
// authenticated routes
MarkdownRouter.get("/", VerifyUser, GetAllMarkDowns);
MarkdownRouter.get("/:id", VerifyUser, GetSingleMarkDown);
MarkdownRouter.post("/:id/share", VerifyUser, CreateShareLink);

module.exports = { MarkdownRouter }