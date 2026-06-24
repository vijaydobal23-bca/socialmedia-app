import React, { useEffect, useState } from "react";
import "./profile.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import {useNavigate, Link} from "react-router-dom";
import AllPosts from "./AllPosts";
import { getFollowers, getFollowing } from "../../users/services/user.api";
import { usePost } from "../../posts/hook/usePost";

const Profile = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  
  // To get posts count
  const { userPosts, handleGetPosts } = usePost();

  useEffect(() => {
    if (user) {
      const fetchCounts = async () => {
        try {
          const followers = await getFollowers(user.username);
          const following = await getFollowing(user.username);
          if (followers) setFollowersCount(followers.length);
          if (following) setFollowingCount(following.length);
        } catch (error) {
          console.error("Error fetching network counts", error);
        }
      };
      fetchCounts();
      handleGetPosts();
    }
  }, [user]);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (!user) {
    return <div className="profile">Loading profile...</div>;
  }

  const postsCount = userPosts ? userPosts.length : 0;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-top">
          <div className="image-container">
            <img src={user.profileImage} alt="profile" />
          </div>

          <div className="stats-actions-container">
            <div className="network-stats">
              <div className="stat">
                <b>{postsCount}</b>
                <span>posts</span>
              </div>
              <Link to={`/${user.username}/followers`} className="stat">
                <b>{followersCount}</b>
                <span>followers</span>
              </Link>
              <Link to={`/${user.username}/following`} className="stat">
                <b>{followingCount}</b>
                <span>following</span>
              </Link>
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
                Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="profile-bio">
          <h3 className="username">{user.username}</h3>
          <p className="bio-text"><b>Bio : </b>{user.bio}</p>
        </div>
      </div>

      <div className="posts-section-divider"></div>

      <AllPosts />
    </div>
  );
};

export default Profile;
