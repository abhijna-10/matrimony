import React, { useEffect, useState } from "react";
import axios from "axios";

const Match = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      setCurrentUserId(user._id);
      fetchProfiles(user._id);
    }
  }, []);

  const fetchProfiles = async (id) => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile");
     setProfiles(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const sendRequest = async (receiver_id) => {
    try {
      await axios.post("http://localhost:5000/api/match", {
        sender_id: currentUserId,
        receiver_id,
      });
      alert("Match request sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending match request");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Browse Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profiles.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <p><strong>Bio:</strong> {p.bio}</p>
            <p><strong>Education:</strong> {p.education}</p>
            <p><strong>Profession:</strong> {p.profession}</p>
            <p><strong>Location:</strong> {p.location}</p>
            <button
              onClick={() => sendRequest(p.user_id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Match Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Match;
