import axios from "axios";

const api = axios.create({
  baseURL:"https://socialmedia-app-9woe.onrender.com/api/post",
  withCredentials:true
})


export async function getFeed(){
  const response = await api.get("/feed");
  return response.data;
}   


export async function createPost(imageFile , caption){
   const formData = new FormData();
   formData.append("image",imageFile);
   formData.append("caption" , caption);


  const response = await api.post("/",formData);
  return response.data;
} 

export async function likePost (postId){
  const response = await api.post("/like/"+postId);
  return response.data;
}

export async function unlikePost(postId){
  const response = await api.post("/unlike/"+postId);
  return response.data;
}

export async function getPosts(){
  const response = await api.get("/");
  return response.data;
} 


export async function getLikedPosts(){
  const response = await api.get("/liked-posts");
  return response.data;
}

export async function deletePost(postId){
  const response = await api.delete(`/delete/${postId}`);
  return response.data;
}