import {
  getFeed,
  createPost,
  likePost,
  unlikePost,
  getPosts,
  getLikedPosts,
  deletePost
} from "../services/post.api";

import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, feed, setFeed,userPosts,setUserPosts,likedPosts,setLikedPosts } = context;

  const handleGetFeed = async () => { 
    setLoading(true);
    try {
      const data = await getFeed();
      setFeed(data.posts.reverse());
    } catch (error) {
      console.error("Failed to get feed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    try {
      const data = await createPost(imageFile, caption);
      setFeed([data.post, ...feed]);
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    setFeed((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, isLiked: true, likeCount: (p.likeCount || 0) + 1 }
          : p
      )
    );
    try {
      await likePost(postId);
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  const handleUnLike = async (postId) => {
    setFeed((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, isLiked: false, likeCount: Math.max((p.likeCount || 1) - 1, 0) }
          : p
      )
    );
    try {
      await unlikePost(postId);
    } catch (error) {
      console.error("Failed to unlike post", error);
    }
  };


  const handleGetLikedPosts = async()=>{ 
      setLoading(true);
      try {
        const data = await getLikedPosts();
        setLikedPosts(data.likedPosts);
      } catch (error) {
        console.error("Failed to get liked posts", error);
      } finally {
        setLoading(false);
      }
  }
  const handleGetPosts = async ()=>{
    setLoading(true);
    try {
      const data = await getPosts();
      setUserPosts(data.posts.reverse());
    } catch (error) {
      console.error("Failed to get posts", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDeletePost = async(postId)=>{
    setLoading(true);
    try {
      await deletePost(postId);
      setUserPosts(prev => prev.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnLike,
    userPosts,
    handleGetPosts,
    handleGetLikedPosts,
    likedPosts,
    handleDeletePost
  };
};
