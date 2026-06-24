import axios from 'axios';

const api = axios.create({
  baseURL:"http://localhost:3000/api/auth",
  withCredentials:true
});

 

export async function login(username ,password){
  const response = await api.post("/login" ,{
    username,password
  });

  return response.data;
}

export async function register(username , email , password) {
  const response = await api.post("/register" ,{
    username,
    email,
    password
  });

  return response.data;
}


export async function getMe() {
  const responce = await api.get("get-me");
  return responce.data;
}


export async function editProfile(bio , profileImage){
  const formData = new FormData();
  if (bio) formData.append("bio", bio);
  if (profileImage) formData.append("profileImage", profileImage);

  const response = await api.put("edit-profile" , formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function logout() {
  const response = await api.post("/logout");
  return response.data;
}


