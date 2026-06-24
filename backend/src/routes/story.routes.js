const express = require("express");
const {Router} = require("express");
const identifyUser = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware")
const storyController = require("../controller/story.controller");

const storyRoutes = express.Router();

storyRoutes.post("/",identifyUser,upload.single("media"),storyController.createStoryController);
storyRoutes.get("/",identifyUser,storyController.viewStoryController);

module.exports = storyRoutes; 