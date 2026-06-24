const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/post.controller");
const multer = require("multer");
const identifyUser = require("../middleware/auth.middleware");


const upload = multer({
  storage: multer.memoryStorage(),
});

postRouter.post("/",upload.single("image"), identifyUser,
  postController.createPostController,
);

postRouter.get("/" , identifyUser, postController.getPostController);

postRouter.get("/details/:postId" ,identifyUser,postController.getPostDetailsController); 

postRouter.post("/like/:postId",identifyUser,postController.likePostController);
postRouter.post("/unlike/:postId",identifyUser,postController.unlikePostController);
postRouter.get("/liked-posts",identifyUser,postController.likedPostsController);
postRouter.get("/feed",identifyUser,postController.getFeedController
);
postRouter.delete("/delete/:postId",identifyUser,postController.deletePostController);

module.exports = postRouter;

