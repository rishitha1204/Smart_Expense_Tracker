import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // 👈 NEW

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setMessage(res.data.message);
      setIsSuccess(true);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      console.log(err); // 👈 VERY IMPORTANT (see real error in console)
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

        {/* 👁️ PASSWORD WITH TOGGLE */}
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