import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Don't show public navbar on dashboard pages
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="logo">Aptivora</h2>

      <div className="nav-links">
        <Link to="/home">Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
