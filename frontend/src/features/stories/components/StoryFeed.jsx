import React, { useEffect, useRef, useState } from "react";
import { useStory } from "../hooks/useStory";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/story.scss";

const StoryFeed = () => {
  const { stories, loading, handleGetStories, handleUploadStory } = useStory();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  
  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
    handleGetStories(); 
  }, []);
  console.log(stories)
 
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleUploadStory(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const openStory = (story) => {
    setActiveStory(story);
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  return (
    <>
      <div className="story-feed-container">
        {/* Current User Upload Button */}
        <div className="story-item" onClick={handleUploadClick}>
          <div className="story-avatar" style={{ background: "none" }}>
            <img src={user?.profileImage || "https://ik.imagekit.io/dg6bqyh0h/default.jpg"} alt="Your Story" />
            <div className="add-icon">+</div>
          </div>
          <div className="story-username">Your story</div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            style={{ display: "none" }} 
            accept="image/*,video/*"
          />
        </div>

        {/* Following Stories */}
        {loading && <div style={{ fontSize: "12px", marginLeft: "10px" }}>Loading stories...</div>}
        
        {!loading && stories && stories.map((story) => (
          <div className="story-item" key={story._id} onClick={() => openStory(story)}>
            <div className="story-avatar">
              <img src={story.user?.profileImage || "https://ik.imagekit.io/dg6bqyh0h/default.jpg"} alt="Story" />
            </div>
            <div className="story-username">{story.user?.username || "User"}</div>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="story-viewer-modal">
          <button className="close-button" onClick={closeStory}>&times;</button>
          <div className="story-media-container">
            {activeStory.mediaType === "video" ? (
              <video src={activeStory.mediaUrl} autoPlay controls></video>
            ) : (
              <img src={activeStory.mediaUrl} alt="Story content" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StoryFeed;
