import React, { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Requests from "../../API/Providerequest";

function ProvidersReg() {
  const [formData, setFormData] = useState({
    companyname: "",
    companytype: "", // added companyType
    phonenumber: "",
    email: "",
    password: "",
    location: "", // added location
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
      const res = await Requests.post("/register", formData);
      console.log(res.data);
      toast.success(res.data);

      if (res.data === "success") {
        navigate("/serviceproviderslogin");
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
        <label htmlFor="companyname">Company Name</label>
        <input
          type="text"
          name="companyname"
          id="companyname"
          value={formData.companyname}
          onChange={handleChange}
          required
        />

        <label htmlFor="companytype">Company Type</label>
        <select
          name="companytype"
          id="companytype"
          value={formData.companytype}
          onChange={handleChange}
          required>
          <option value="">Select Type</option>
          <option value="Individual">Individual</option>
          <option value="Partnership">Partnership</option>
          <option value="Corporation">Corporation</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          {/* Add more options as needed */}
        </select>

        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          id="phonenumber"
          value={formData.phonenumber}
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
          type="password" // Changed to password type for security
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location (Main Office)</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
        <div className="loggedin">
          Already have an account?{" "}
          <strong>
            <Link to="/serviceproviderslogin">Login here</Link>
          </strong>
        </div>
        <span>
          Looking to register as a client?{" "}
          <Link to="/register">Register here</Link>
        </span>
      </form>
    </div>
  );
}

export default ProvidersReg;
