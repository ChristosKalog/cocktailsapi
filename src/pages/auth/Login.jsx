import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService from "../../services/authService"; // Adjust the path as needed
import { useAuth } from "../../context/AuthContext"; // Import useAuth

import ButtonComponent from "../../components/ui/ButtonComponent";

import styles from "../../styles/Login.module.css"; // Import CSS module for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from Auth context

  // Check local storage for saved user data
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setPassword(user.password); // Make sure you securely handle this
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await authService.login(username, password);

      if (user) {
        login(user); // Update authentication context

        if (rememberMe) {
          // Store user data in localStorage for persistence
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          // Clear any stored session in localStorage if "Remember Me" is unchecked
          localStorage.removeItem("user");
        }

        navigate("/"); // Redirect to the dashboard
      }
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Welcome Back</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            autoComplete="on"
          />
        </div>
        <div className={styles.formGroupCheckbox}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>


        <ButtonComponent type="sumbit" category="login">
          Log In
        </ButtonComponent>
      </form>
      <Link to="/register">New User? Register Here</Link>
    </div>
  );
};

export default Login;
