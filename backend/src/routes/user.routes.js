const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller"); 
 
const identifyUser = require("../middleware/auth.middleware");

userRouter.post("/follow/:username" ,identifyUser, userController.followUserController);

userRouter.post("/unfollow/:username" ,identifyUser , userController.unfollowUserController);

userRouter.get("/search", identifyUser, userController.searchUserController);

userRouter.get("/followers/:username", identifyUser, userController.getFollowersController);

userRouter.get("/following/:username", identifyUser, userController.getFollowingController);

module.exports = userRouter;