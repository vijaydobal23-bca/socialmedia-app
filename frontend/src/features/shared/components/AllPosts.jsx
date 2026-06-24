import { usePost } from "../../posts/hook/usePost";
import { useEffect } from "react";
import "./allposts.scss";
import DeletePost from "../../posts/pages/DeletePost";

const AllPosts = ()=>{
  const {userPosts ,loading,handleGetPosts} = usePost();

  useEffect(() => {
    handleGetPosts();
  }, []);

  if (!userPosts) {
    return <div className="all-posts">Loading posts...</div>;
  }

  return (
    <div className="all-posts">
      <h1>Your Posts</h1>
      <div className="posts-container">
        {
          userPosts.map((post)=>{
            return(
              <div 
                className="posts" 
                key={post._id}
                style={{position: "relative"}}
                onMouseEnter={(e)=>{
                  const btn = e.currentTarget.querySelector('.delete-btn');
                  if(btn) btn.style.display="block";
                  const vid = e.currentTarget.querySelector('video');
                  if(vid) vid.play();
                }}
                onMouseLeave={(e)=>{
                  const btn = e.currentTarget.querySelector('.delete-btn');
                  if(btn) btn.style.display="none";
                  const vid = e.currentTarget.querySelector('video');
                  if(vid) vid.pause();
                }}
              >
                <div className="delete-btn" style={{position:"absolute" ,top:"50%" , right:"50%" , zIndex:"10" , transform:"translate(50%,-50%)", display:"none"}} >
                  <DeletePost postId={post._id}/>
                </div>
                {post.mediaType === "video" ? (
                  <video 
                    src={post.mediaUrl} 
                    muted 
                    loop 
                  ></video>
                ) : (
                  <img src={post.mediaUrl} alt="" />
                )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllPosts;