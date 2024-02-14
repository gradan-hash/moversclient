import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import newRequests from "../../API/Newrequest";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequests.post("/login");
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={loginData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          <Link to="/dashboard">Login</Link>
        </button>
        <div className="loggedin">
          <strong>
            <Link to="/register" style={{ textDecoration: "none" }}>
              register
            </Link>
          </strong>
        </div>
        <span>
          <Link to="/serviceproviderslogin">login as service provider</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
