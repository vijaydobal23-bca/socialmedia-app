import { useState } from "react";
import { createContext } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState(null);

  const [feed, setFeed] = useState(null);
  const [userPosts,setUserPosts] = useState(null);
  const [likedPosts , setLikedPosts] = useState([]);

  return (
    <PostContext.Provider value={{loading ,setLoading,post , setPost,feed ,setFeed ,userPosts ,setUserPosts ,userPosts,setUserPosts ,likedPosts , setLikedPosts}}>
      {children}
    </PostContext.Provider>
  ) 
 
};
