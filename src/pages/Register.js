import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

// ✅ Use live backend URL
const BASE_URL = "https://smart-expense-tracker-1-ybx9.onrender.com";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // ✅ Updated API URL
      const res = await axios.post(
        `${BASE_URL}/api/auth/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Store token + user info if backend returns it
      if (res.data.token) {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ user: res.data.user, token: res.data.token })
  );
}

      setMessage(res.data.message || "Registered successfully!");
      setIsSuccess(true);

      // Reset form
      setName("");
      setEmail("");
      setPassword("");

      // Navigate after 1.5s
      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Registration failed");
      setIsSuccess(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "14px",
              color: "#2575fc",
              fontWeight: "bold"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit">Register</button>

        {message && (
          <p className={isSuccess ? "success" : ""}>{message}</p>
        )}

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>

      </form>
    </div>
  );
};

export default Register;