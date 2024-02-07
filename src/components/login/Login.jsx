import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData); // Typically, you would handle authentication here
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

        <button type="submit">Login</button>
        <div className="loggedin">
          <strong>
            <Link to="/register">register</Link>
          </strong>
        </div>
      </form>
    </div>
  );
}

export default Login;
