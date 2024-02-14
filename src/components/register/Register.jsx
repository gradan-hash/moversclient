import React, { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    phonenumber: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequests.post("/register", formData);
      console.log(res);
      toast.success(res.data);

      if (res.data === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("error check your details");
    }
  };

  return (
    <div className="register-container">
      <Toaster />
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
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          id="phonenumber"
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
