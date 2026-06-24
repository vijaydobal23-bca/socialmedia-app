import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import "./editProfile.scss"

const EditProfile = ()=>{
  const {handleEditProfile} = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEditProfile(bio, profileImage);
    navigate(-1);
  };

  return(
    <main className="edit-profile-page">
      <div className="form-container">
        <h1>Edit Profile</h1>
        <form className="editProfile" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter new bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
          <label htmlFor="file" className="file-label">Select New Profile Image</label>
          <input type="file" hidden id="file" onChange={(e) => setProfileImage(e.target.files[0])}/>
          <button type="submit" className="button">Save Changes</button>
        </form>
      </div>
    </main>
  )
}

export default EditProfile;