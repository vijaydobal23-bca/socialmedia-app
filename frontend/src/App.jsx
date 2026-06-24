import { Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./app.routes";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContext, PostContextProvider } from "./features/posts/post.context";
import { UserContextProvider } from "./features/users/user.context";

function App(){
return(
  <>
  <AuthProvider>
   <PostContextProvider>
    <UserContextProvider>
     <RouterProvider router = {router}></RouterProvider>
    </UserContextProvider>
   </PostContextProvider>
  </AuthProvider>
  
  </>
)
}

export default App;