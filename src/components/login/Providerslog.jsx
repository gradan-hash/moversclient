import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";

function Providerslogin() {
  const [loginData, setLoginData] = useState({
    email: "",
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
    console.log(loginData); 
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={loginData.email}
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
          <Link to="/providerdashboard">Login</Link>
        </button>
        <div className="loggedin">
          <strong>
            <Link
              to="/serviceprovidersregister"
              style={{ textDecoration: "none" }}>
              register
            </Link>
          </strong>
        </div>
        <span>
          <Link to="/login">login as a client</Link>
        </span>
      </form>
    </div>
  );
}

export default Providerslogin;
