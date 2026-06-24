import React from "react";
import { usePost } from "../hook/usePost";
import Follow from "../../users/pages/Follow";
import { useAuth } from "../../auth/hooks/useAuth";

const Post = ({post, loading, handleLike, handleUnLike }) => {
  const { user } = useAuth();

  return (
    <div className="post">
      <div className="user">
        <div className="left-side">
          <div className="img-wrapper">
            <img src={post.user.profileImage} alt="" />
          </div>
          <div className="post-details">
            <p className="username">{post.user.username}</p>
            {user && user.username !== post.user.username && (
              <>
                <span className="dot">•</span>
                <div className="follow"><Follow username={post.user.username} initialIsFollowing={post.user.isFollowing} /></div>
              </>
            )}
          </div>
        </div>
        <div className="right-side">
          <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </div>
      </div>
      
      <div className="image-container">
        {post.mediaType === "video" ? (
          <video src={post.mediaUrl} controls autoPlay loop muted></video>
        ) : (
          <img src={post.mediaUrl} alt="" />
        )}
      </div>

      <div className="icons">
        <div className="left">
          <button>
            <svg
              className={post.isLiked ? "like active" : "like"}
              onClick={() => {
                post.isLiked ? handleUnLike(post._id) : handleLike(post._id);
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={post.isLiked ? "#ed4956" : "currentColor"}
            >
              {post.isLiked ? (
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              ) : (
                <path d="M12 8.81056L13.6352 6.48845C14.2721 5.58412 15.3179 5 16.5 5C18.433 5 20 6.567 20 8.5C20 11.3788 18.0407 14.1215 15.643 16.3358C14.4877 17.4027 13.3237 18.2603 12.4451 18.8521C12.2861 18.9592 12.1371 19.0571 11.9999 19.1456C11.8627 19.0571 11.7137 18.9592 11.5547 18.8521C10.6761 18.2604 9.51216 17.4028 8.35685 16.3358C5.95926 14.1216 4 11.3788 4 8.5C4 6.567 5.567 5 7.5 5C8.68209 5 9.72794 5.58412 10.3648 6.48845L12 8.81056ZM10.5557 3.92626C9.68172 3.3412 8.63071 3 7.5 3C4.46243 3 2 5.46243 2 8.5C2 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 22 16 22 8.5C22 5.46243 19.5376 3 16.5 3C15.3693 3 14.3183 3.3412 13.4443 3.92626C12.8805 4.3037 12.3903 4.78263 12 5.33692C11.6097 4.78263 11.1195 4.3037 10.5557 3.92626Z"></path>
              )}
            </svg>
          </button>
          <button>
            <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </button>
          <button>
            <svg aria-label="Share Post" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
          </button>
        </div>
        <div className="right">
          <button>
            <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
          </button>
        </div>
      </div>
      <div className="bottom">
        <p className="likes-count">{post.likeCount || 0} likes</p>
        <p className="caption"><span className="username">{post.user.username}</span> {post.caption}</p>
      </div>
    </div>
  );
}; 

export default Post;
