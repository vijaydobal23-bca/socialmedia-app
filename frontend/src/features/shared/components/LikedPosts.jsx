import React, { useEffect } from 'react'
import { usePost } from '../../posts/hook/usePost';
import "../../posts/style/feed.scss";
import Post from "../../posts/components/Post";

const LikedPosts = () => {
  const { likedPosts, loading, handleGetLikedPosts, handleLike, handleUnLike } = usePost();
  
  useEffect(() => {
    handleGetLikedPosts();
  }, []);

  if (loading || !likedPosts) {
    return (
      <main className="feed-page">
        <div className="spinner-container">
          <div className="instagram-spinner"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {
            likedPosts.map((post) => {
              return (
                <Post key={post._id} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike} />
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

export default LikedPosts

