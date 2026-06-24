const followModel = require("../model/follow.model");
const userModel = require("../model/user.model");


async function followUserController(req ,res){

const followerUsername = req.user.username;
const followeeUsername = req.params.username;

if(followerUsername == followeeUsername){
  return res.status(400).json({
    message:"You cant follow yourself"
  })
}

const isFolloweeExists = await userModel.findOne({
  username:followeeUsername
})

if(!isFolloweeExists){
  return res.status(400).json({
    message:"User does not exists"
  })
}

const isAlreadyFollowing = await followModel.findOne({
  follower:followerUsername,
  followee:followeeUsername
})

if(isAlreadyFollowing){
  return res.status(400).json({
    message:"You are aloready following this user"
  })
}

const followRecords = await followModel.create({
  follower:followerUsername,
  followee:followeeUsername
})


res.status(201).json({
  message:`you are now following ${followeeUsername}`,
  follow:followRecords
})





}

async function unfollowUserController(req ,res){
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
  });

  if(!isUserFollowing){
    return res.status(200).json({
      message:`you are not following ${followeeUsername}`
    })
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  res.status(200).json({
    message:"You have unfollowed this user"+followeeUsername
  })

}

async function searchUserController(req, res) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json({ users: [] });
    }

    const users = await userModel.find({
      username: { $regex: q, $options: "i" }
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getFollowersController(req, res) {
  try {
    const { username } = req.params;
    const follows = await followModel.find({ followee: username });
    const followerUsernames = follows.map(f => f.follower);
    
    const followers = await userModel.find({
      username: { $in: followerUsernames }
    }).select("username profileImage bio");

    res.status(200).json({ followers });
  } catch (error) {
    console.error("Error getting followers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getFollowingController(req, res) {
  try {
    const { username } = req.params;
    const follows = await followModel.find({ follower: username });
    const followingUsernames = follows.map(f => f.followee);
    
    const following = await userModel.find({
      username: { $in: followingUsernames }
    }).select("username profileImage bio");

    res.status(200).json({ following });
  } catch (error) {
    console.error("Error getting following:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  searchUserController,
  getFollowersController,
  getFollowingController
}