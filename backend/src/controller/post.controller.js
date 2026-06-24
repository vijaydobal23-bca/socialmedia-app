const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const identifyUser = require("../middleware/auth.middleware");
const likeModel = require("../model/like.model");
const followModel = require("../model/follow.model");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imageKit.files.upload({
    file: await toFile(req.file.buffer, "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    mediaUrl: file.url,
    mediaType: req.file.mimetype.startsWith("video/") ? "video" : "image",
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created sucessfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Post fetched sucessfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findOne({ user: postId });

  if (!post) {
    return res.status(404).json({
      message: "Post is not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forrbidden content",
    });
  }

  return res.status(200).json({
    message: "Post fetched sucessfullly",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  return res.status(200).json({
    message: "Liked this post",
  });
}

async function unlikePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });
  if (!isLiked) {
    return res.status(400).json({
      message: "Post did'nt like",
    });
  }

  await likeModel.findOneAndDelete({
    _id: isLiked._id,
  });

  return res.status(200).json({
    message: "Post unliked",
  });
}

async function getFeedController(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        post: post._id,
        user: user.username,
      });
      post.isLiked = Boolean(isLiked);

      const likeCount = await likeModel.countDocuments({
        post: post._id,
      });
      post.likeCount = likeCount;

      if (post.user && post.user.username) {
        const isFollowing = await followModel.findOne({
          follower: user.username,
          followee: post.user.username,
        });
        post.user.isFollowing = Boolean(isFollowing);
      }

      return post;
    }),
  );

  res.status(200).json({
    message: "Post featched sucessfully",
    posts,
  });
}


async function likedPostsController(req ,res){
  const username = req.user.username;
  
  const likedPost = await likeModel.find({user:username});

  const postIds = likedPost.map(like => like.post);

  const likedPosts = await postModel.find({ 
    _id: { $in: postIds }
  }).populate("user");

  return res.status(200).json({
    message:"Liked posts featched sucessfully",
    likedPosts
  })
} 


async function deletePostController(req, res) {
  const postId = req.params.postId;
  const user = req.user;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "The post is not available",
    });
  }

  // 1. Verify that the logged-in user is the owner of the post
  if (post.user.toString() !== user.id) {
    return res.status(403).json({
      message: "You are not authorized to delete this post",
    });
  }

  // 2. Delete the post and its associated likes
  await postModel.findByIdAndDelete(postId);
  await likeModel.deleteMany({ post: postId });
  
  // (Optional) You can also add code here to delete the media from ImageKit using imageKit.deleteFile() if you store the fileId in your postModel

  res.status(200).json({
    message: "The post was deleted successfully",
  });
}



module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController,
  unlikePostController,
  likedPostsController,
  deletePostController
};
