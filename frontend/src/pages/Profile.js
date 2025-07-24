import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    user_id: "",
    bio: "",
    education: "",
    income: "",
    profession: "",
    location: "",
    religion: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      setProfile((prev) => ({ ...prev, user_id: user._id }));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/profile", profile);
      alert("Profile created successfully!");
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="bio" placeholder="Short Bio" value={profile.bio} onChange={handleChange} className="border p-2 rounded" required />
        <input name="education" placeholder="Education" value={profile.education} onChange={handleChange} className="border p-2 rounded" />
        <input name="income" placeholder="Income" value={profile.income} onChange={handleChange} className="border p-2 rounded" />
        <input name="profession" placeholder="Profession" value={profile.profession} onChange={handleChange}/>
         <input name="location" placeholder="Location" value={profile.location} onChange={handleChange} className="border p-2 rounded" />
        <input name="religion" placeholder="Religion" value={profile.religion} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
