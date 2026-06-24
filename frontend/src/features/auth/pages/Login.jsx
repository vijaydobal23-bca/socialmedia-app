import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
 
const Login = () => {
  const { user, loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username , password);
    navigate("/");
  };

  if(loading){
    return (
      <main className="auth-main">
        <h1>Loading ....</h1>
      </main>
    )
  }

  return (
    <main className="auth-main">
      <div className="auth-forms">
        <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            onInput={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Dont have an account ? <Link to="/register">Create one</Link>
        </p>
      </div>
      </div>
    </main>
  );
};

export default Login;
