import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const seniority = localStorage.getItem("seniority") || "";

  const isLoggedIn = !!token;
  const isSenior = seniority.toLowerCase().includes("senior");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Aptivora</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isLoggedIn ? (
          <>
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
    </nav>
  );
}
