import React, { useEffect } from "react";
import "../shared/nav.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const Nav = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="nav-bar">
      <div className="instagram">
        <img
          className="insta-text"
          src="https://img.magnific.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
        />
        <p className="insta-text">Instagram</p>
      </div>

      <div className="profile-image">
        {user && (
          <>
            <img className="profile-img" src={user.profileImage || ""} alt="" />
            <p>{user.username}</p>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
