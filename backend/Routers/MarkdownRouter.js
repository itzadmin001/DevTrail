const express = require("express");
const { VerifyUser } = require("../Middlewares/UserAuth");
const { CreateMarkDown, GetMarkDowns } = require("../UserControllar/MarkDownControllar");

const MarkdownRouter = express.Router();




MarkdownRouter.post("/create", VerifyUser, CreateMarkDown);
MarkdownRouter.get("/", VerifyUser, GetMarkDowns);



module.exports = { MarkdownRouter }