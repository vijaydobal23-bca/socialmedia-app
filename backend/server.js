const app = require("./src/app");
const connectDb = require("./src/config/db");
connectDb();    

app.listen(3000,(req ,res)=>{
  console.log("Server is Starting on port 3000");
})  