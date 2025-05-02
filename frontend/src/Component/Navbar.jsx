import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false); // State for the Register window
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Email:", email, "Password:", password);
        setShowLogin(false); // Close the login form after submission
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Register Email:", registerEmail, "Password:", registerPassword);
        setShowRegister(false); // Close the register form after submission
    };

    return (
        <nav className="navbar">
            <h2>Job Recommendations</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                    <button 
                        className="login-button" 
                        onClick={() => {
                            setShowLogin(!showLogin);
                            setShowRegister(false); // Close register form if open
                        }}
                    >
                        Login
                    </button>
                </li>
            </ul>
            {showLogin && (
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
                                setShowRegister(true);
                                setShowLogin(false); // Close login form
                            }}
                        >
                            Register
                        </span>
                    </p>
                </div>
            )}
            {showRegister && (
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
                                setShowLogin(true);
                                setShowRegister(false); // Close register form
                            }}
                        >
                            Login
                        </span>
                    </p>
                </div>
            )}
        </nav>
    );
};

export default Navbar;