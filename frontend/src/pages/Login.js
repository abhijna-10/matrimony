import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/user/login", credentials);
    alert("Login successful!");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/profile"); // 👈 redirect to profile page
  } catch (err) {
    alert("Login failed: " + (err.response?.data?.msg || err.message));
  }
};

  return (
    <div>
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={credentials.email}
      /><br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={credentials.password}
      /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
