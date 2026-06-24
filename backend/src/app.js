const express = require("express");
require("dotenv").config(); 
const cookiePaseer = require("cookie-parser");
const cors = require("cors");
  
 
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
const storyRouter = require("./routes/story.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookiePaseer());
app.use(cors({
  credentials:true,
  origin:true
}));
 
app.get("/" ,(req ,res)=>{
  res.send("Hello server");
});
 
app.use("/api/auth" ,authRouter);
app.use("/api/post" , postRouter);
app.use("/api/users",userRouter); 
app.use("/api/story",storyRouter);
module.exports = app;