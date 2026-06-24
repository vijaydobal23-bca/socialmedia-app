import { useState } from "react";
import { useUser } from "../hook/useUser";

const Follow = ({username, initialIsFollowing = false}) => {
  const [following, setFollowing] = useState(initialIsFollowing);
  const { handleFollow, handleUnfollow, loading } = useUser();

  const toggleFollow = async () => {
    if (following) {
      await handleUnfollow(username);
      setFollowing(false);
    } else {
      await handleFollow(username);
      setFollowing(true);
    }
  };

  return (
   <button onClick={toggleFollow} disabled={loading} className="followbtn">
      {following ? "Unfollow" : "Follow"} 
   </button>
  )
}

export default Follow