import { useContext } from "react";
import { UserContext } from "../user.context";
import { followUser, unfollowUser, searchUsers } from "../services/user.api";

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  const { loading, setLoading, following, setFollowing } = context;

  const handleFollow = async (username) => {
    setLoading(true);
    try {
      const data = await followUser(username);
      return data;
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (username) => {
    setLoading(true);
    try {
      const data = await unfollowUser(username);
      return data;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUsers = async (query) => {
    setLoading(true);
    try {
      const data = await searchUsers(query);
      return data.users;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    following,
    setFollowing,
    handleFollow,
    handleUnfollow,
    handleSearchUsers
  };
};
