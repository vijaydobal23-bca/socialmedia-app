const ImageKit = require("@imagekit/nodejs");
const followModel = require("../model/follow.model");
const storyModel = require("../model/story.model");
const userModel = require("../model/user.model");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function createStoryController(req ,res){
    try{
      const{id} = req.user;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const buffer = req.file;

      const mediaType = buffer.mimetype && buffer.mimetype.startsWith("video") ? "video" : "image";

      const file = await imagekit.files.upload({
        file: buffer.buffer.toString("base64"), 
        fileName: buffer.originalname || "story",
        folder: "cohort-2-insta-clone/stories",
      });
 
      const story = await storyModel.create({
        mediaUrl:file.url,
        mediaType,
        user:id
      })

      if(!story){
        return res.status(400).json({
          message:"Failed to create story"
        })
      }

      return res.status(201).json({
        message:"Story created sucessfully",
        story
      })
    }catch(err){
      return res.status(400).json({
        message:"Error creating story",
        error:err.message
      })
    }
}


async function viewStoryController(req,res){
  try{
    const user = req.user;
    if(!user){
      return res.status(400).json({
        mesage:"Please login first"
      })
    }    

    const follows = await followModel.find({ follower: user.username });
    const followingUsernames = follows.map(f => f.followee);
    
    const followingUsers = await userModel.find({ username: { $in: followingUsernames } });
    const followingIds = followingUsers.map(u => u._id);

    // Include the user's own stories
    followingIds.push(user.id);

    const story = await storyModel.find({
      user: {$in: followingIds}
    }).populate({
      path:"user",
      select:"_id username profileImage"
    })

    const follower = await userModel.findById(user.id);
    
    if (follower) {
      for (let s of story) {
        if (!s.viewers) s.viewers = [];
        const hasViewed = s.viewers.some(v => v.toString() === follower._id.toString());
        if (!hasViewed) {
          s.viewers.push(follower._id);
          await s.save();
        }
      }
    }

    return res.status(200).json({
      message:"Stories fetched successfully",
      story: story,
      follower
    })
  }catch(err){
    return res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
}

module.exports = {createStoryController,viewStoryController}; 