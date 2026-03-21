import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // better than window.location
  };

  return (
    <nav className="navbar">
      <h2>💰 Smart Expense Tracker</h2>

      <div className="links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span style={{ margin: "0 1rem" }}>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;