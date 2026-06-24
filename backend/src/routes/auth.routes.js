const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth.controller");
const upload = require("../middleware/upload.middleware");
const identifyUser = require("../middleware/auth.middleware");

authRouter.post("/register", authController.registerController);

authRouter.post("/login" ,authController.loginController);
authRouter.get("/get-me",identifyUser ,authController.getMeController);
authRouter.put("/edit-profile",identifyUser , upload.single("profileImage") , authController.editProfile);
authRouter.post("/logout", authController.logoutController);

module.exports = authRouter; 