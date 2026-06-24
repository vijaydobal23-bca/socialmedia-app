const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption:{
    type:String,
    default:""
  },

  mediaType:{
    type:String,
    required:[true , "Media type is required for creating a post"],
    enum:["image","video"],
    default:"image"
  },

  mediaUrl:{
    type:String,
    required:[true , "Media url is required for creating a post"]
  },

  user:{
    ref:"users",
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"User id is Required"]
  }
})


const postModel = mongoose.model("posts" , postSchema);
module.exports = postModel;