import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Resigter";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";
import Profile from "./features/shared/components/Profile";
import EditProfile from "./features/shared/components/EditProfle";
import Search from "./features/users/pages/Search";
import Layout from "./features/shared/components/Layout";
import LikedPosts from "./features/shared/components/LikedPosts";
import NetworkList from "./features/users/pages/NetworkList";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Feed/>
      },
      {
        path: "/create-post",
        element: <CreatePost/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/edit-profile",
        element: <EditProfile/>
      },
      {
        path: "/search",
        element: <Search/>
      },
      {
        path:"/liked-posts",
        element:<LikedPosts/>
      },
      {
        path: "/:username/followers",
        element: <NetworkList/>
      },
      {
        path: "/:username/following",
        element: <NetworkList/>
      }
    ]
  }
]);