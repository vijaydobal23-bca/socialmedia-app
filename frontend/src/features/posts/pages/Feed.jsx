import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hook/usePost";
import StoryFeed from "../../stories/components/StoryFeed";

const Feed = () => {
  const { feed, loading, handleGetFeed , handleLike, handleUnLike } = usePost();
  
  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
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
        <StoryFeed />
        <div className="posts">
          {
            feed.map((post) => {
              return (
                <Post key={post._id} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike} />
              )
            })
          }
        </div>
      </div>
    </main>
  );
};

export default Feed;
