import axios from "axios";

const api = axios.create({
  baseURL: "https://socialmedia-app-9woe.onrender.com/api/story",
  withCredentials: true
});

export async function getStories() {
  const response = await api.get("/");
  return response.data;
}

export async function uploadStory(file) {
  const formData = new FormData();
  formData.append("media", file);

  const response = await api.post("/", formData);
  return response.data;
}
