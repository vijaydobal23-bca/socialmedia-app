import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getFollowers, getFollowing } from "../services/user.api";
import Follow from "./Follow";
import "./search.scss"; 

const NetworkList = () => {
  const { username } = useParams();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const isFollowers = location.pathname.includes('/followers');
  const title = isFollowers ? 'Followers' : 'Following';

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (isFollowers) {
          const followersList = await getFollowers(username);
          setUsers(followersList || []);
        } else {
          const followingList = await getFollowing(username);
          setUsers(followingList || []);
        }
      } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [username, isFollowers, title]);

  return (
    <main className="search-page">
      <div className="search-container">
        <h2>{username}'s {title}</h2>
        
        {loading && <p className="status-text">Loading...</p>}
        
        <div className="search-results">
          {users.map((user) => (
            <div key={user._id || user.username} className="search-result-item">
              <div className="user-info">
                <img src={user.profileImage || "https://ik.imagekit.io/dg6bqyh0h/default.jpg"} alt={user.username} className="profile-img" />
                <span>{user.username}</span>
              </div>
              <Follow username={user.username} />
            </div>
          ))}
          {!loading && users.length === 0 && (
            <p className="status-text">No {title.toLowerCase()} found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default NetworkList;
