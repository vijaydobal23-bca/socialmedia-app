import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true
});

export async function followUser(username) {
  const response = await api.post(`/follow/${username}`);
  return response.data;
}

export async function unfollowUser(username) {
  const response = await api.post(`/unfollow/${username}`);
  return response.data;
}

export async function searchUsers(query) {
  const response = await api.get(`/search?q=${query}`);
  return response.data;
}

export async function getFollowers(username) {
  const response = await api.get(`/followers/${username}`);
  return response.data.followers;
}

export async function getFollowing(username) {
  const response = await api.get(`/following/${username}`);
  return response.data.following;
}
