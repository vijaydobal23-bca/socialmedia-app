const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})

async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }

  const hashedPAssword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hashedPAssword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.cookie("token", token, cookieOptions);
  res.status(201).json({
    message: "User Registerd sucesfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const identifier = username || email;

  const user = await userModel
    .findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })
    .select("+password");
  if (!user) {
    return res.status(404).json({
      message: "User not Found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  const cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "User login sucessfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}


async function editProfile(req ,res){
  const {bio} = req.body;

  const updateData = {};
  if (bio !== undefined) {
    updateData.bio = bio;
  }

  if (req.file) {
    const file = await imageKit.files.upload({
       file: await toFile(req.file.buffer, "file"),
       fileName: "user-Profile",
       folder: "cohort-2-insta-clone/user-profile",  
     });
    updateData.profileImage = file.url;
  }
  
  const userId = req.user.id;
  const user = await userModel.findByIdAndUpdate(userId , updateData, {
    new:true
  });
  if(!user){
    return res.status(404).json({
      message:"User not Found"
    })
  }

  res.status(200).json({
    message:"Profile updated sucesfully",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage,
    }
  })
}

async function logoutController(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  editProfile,
  logoutController,
};
