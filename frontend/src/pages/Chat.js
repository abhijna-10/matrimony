import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      setUserId(user._id);
      fetchMessages(user._id);
    }
  }, []);

  const fetchMessages = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/message/${id}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!receiverId || !text) {
      alert("Please enter both Receiver ID and Message");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/message", {
        sender_id: userId,
        receiver_id: receiverId,
        message: text
      });
      alert("Message sent!");
      setText("");
      fetchMessages(userId); // refresh
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Chat Panel</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Enter Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />

      <textarea
        className="border p-2 rounded w-full mb-3"
        rows={3}
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Message
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Messages:</h3>
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2 p-3 border rounded bg-gray-50">
            <p><strong>To:</strong> {msg.receiver_id}</p>
            <p>{msg.message}</p>
            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
