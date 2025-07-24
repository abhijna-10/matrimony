import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-3 flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/match">Match</Link>
    <Link to="/chat">Chat</Link>
  </nav>
);
export default Navbar;
