import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false); // Toggles the login form
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Toggles the register form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(); // Set the user as logged in
      setShowLoginForm(false); // Close the login form
    } else {
      alert("Please enter both email and password.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerEmail && registerPassword) {
      alert("Registration successful! Please log in.");
      setShowRegisterForm(false); // Close the register form
      setShowLoginForm(true); // Open the login form
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <nav className="navbar">
      <h2>Job Recommendations</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li>
          {!isLoggedIn ? (
            <>
              <button
                className="login-button"
                onClick={() => {
                  setShowLoginForm(!showLoginForm);
                  setShowRegisterForm(false); // Close register form if open
                }}
              >
                Login
              </button>
              {showLoginForm && (
                <div className="login-form">
                  <form onSubmit={handleLoginSubmit}>
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
                  </form>
                  <p className="toggle-form">
                    New user?{" "}
                    <span
                      className="register-link"
                      onClick={() => {
                        setShowRegisterForm(true);
                        setShowLoginForm(false); // Close login form
                      }}
                    >
                      Register
                    </span>
                  </p>
                </div>
              )}
              {showRegisterForm && (
                <div className="register-form">
                  <form onSubmit={handleRegisterSubmit}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                    <button type="submit">Register</button>
                  </form>
                  <p className="toggle-form">
                    Already have an account?{" "}
                    <span
                      className="login-link"
                      onClick={() => {
                        setShowLoginForm(true);
                        setShowRegisterForm(false); // Close register form
                      }}
                    >
                      Login
                    </span>
                  </p>
                </div>
              )}
            </>
          ) : (
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;