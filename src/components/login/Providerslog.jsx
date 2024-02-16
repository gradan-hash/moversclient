import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import Requests from "../../API/Providerequest";
import toast, { Toaster } from "react-hot-toast";

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Requests.post("/login", loginData);
      console.log(res.data);
      if (res.data.msg === "login success") {
        navigate("/providerdashboard");
      }
      toast.success("successs");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="login-container">
      <Toaster />
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
