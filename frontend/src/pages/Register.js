// src/pages/Register.js

import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    mobile: "",
    religion: "",
    marital_status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", formData);
      alert("User registered successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <input name="gender" placeholder="Gender" onChange={handleChange} /><br />
      <input name="dob" placeholder="Date of Birth (YYYY-MM-DD)" onChange={handleChange} /><br />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} /><br />
      <input name="religion" placeholder="Religion" onChange={handleChange} /><br />
      <input name="marital_status" placeholder="Marital Status" onChange={handleChange} /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
