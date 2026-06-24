const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    mediaUrl: String,

    mediaType: {
        type: String,
        enum: ["image", "video"]
    },

    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 
    }
});

const storyModel = mongoose.model("Story",storySchema);
module.exports = storyModel;