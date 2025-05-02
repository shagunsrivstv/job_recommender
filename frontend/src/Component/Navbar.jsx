import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        // Add login logic here
        setShowLogin(false); // Close the login form after submission
    };

    return (
        <nav className="navbar">
            <h2>Job Recommendations</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                    <button 
                        className="login-button" 
                        onClick={() => setShowLogin(!showLogin)}
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
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;