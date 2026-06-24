import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router-dom";
const DeletePost = ({postId})=>{
    const {handleDeletePost} = usePost();
    const navigate = useNavigate();
  return (
    <>
    
    <button onClick={()=>handleDeletePost(postId)} style={{cursor:"pointer",padding:"0.5rem",borderRadius:"1rem",
      border:"none",backgroundColor:"#ff0000",color:"white",textAlign:"center",fontWeight:"bold"}}>Delete</button>
    </>
  );
}

export default DeletePost;