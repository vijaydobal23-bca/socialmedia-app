import React from 'react'
import "./createpost.scss";
import { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePost } from '../hook/usePost';


const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  const navigate = useNavigate();

  const {loading,handleCreatePost} = usePost();


  if(loading){
    return(
      <main>
        <h1>Creating post...</h1>
      </main>
    )
  }

  async function handleSubmit(e){
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];

    await handleCreatePost(file,caption);
    navigate("/")

  }




  return (
  <main className='create-post-page'>
    <div className='form-container'>
      <h1>Create Post</h1>

      <form onSubmit={(e)=>{handleSubmit(e)}}>

        <label className = "post-image-label" htmlFor="postImage">Select Image or Video</label>

        <input hidden type="file" name='postImage' id="postImage" accept="image/*,video/*" ref={postImageInputFieldRef}  />

        <input type="text" name = "caption" id='caption' placeholder='Enter Caption Here' value={caption} onChange={(e)=>{
          setCaption(e.target.value)
        }}/>
        <button className='button primary-button'>Create Post</button>
      </form>
    </div>
  </main>
  )
}

export default CreatePost
