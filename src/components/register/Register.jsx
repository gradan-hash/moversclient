import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import newRequests from "../../API/Newrequest";

function Register() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequests.post("/register");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <div className="loggedin">
          <strong>
            <Link to="/login">login</Link>
          </strong>
        </div>
        <span>
          <Link to="/serviceprovidersregister">
            register as service provider
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
