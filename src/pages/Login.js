import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

// ✅ Use your live backend URL
const BASE_URL = "https://smart-expense-tracker-1-ybx9.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Save token + user info here
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ user: data.user, token: data.token })
      );

      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Login failed. Please try again.");
  }
};

  return (
    <div>
      <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;