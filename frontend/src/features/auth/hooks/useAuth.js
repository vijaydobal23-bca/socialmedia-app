import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,getMe, editProfile, logout } from "../services/auth.api";

export const useAuth = ()=>{
  const context = useContext(AuthContext);
  const {user , setUser , loading ,setLoading} = context;

  const handleLogin = async(username ,password)=>{
    setLoading(true);
    try {
      const response = await login(username ,password);
      setUser(response.user);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);  
    }
  }

    const handleRegister = async(username , email , password)=>{
      setLoading(true);
      try {
        const response = await register(username , email, password);
        setUser(response.user);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Registration failed");
      } finally {
        setLoading(false);
      }
    }

    const handleGetMe = async()=>{
      setLoading(true);
      try {
        const response = await getMe();
        await setUser(response.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    const handleEditProfile = async(bio , profileImage)=>{
      setLoading(true);
      const response = await editProfile(bio , profileImage);
      setUser(response.user);
      setLoading(false);
    }

    const handleLogout = async () => {
      setLoading(true);
      await logout();
      setUser(null);
      setLoading(false);
    };

    return{
      user,
      loading,
      handleLogin,
      handleRegister,
      handleGetMe,
      handleEditProfile,
      handleLogout
    }
}
