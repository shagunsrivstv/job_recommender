import React, { useState, useContext } from "react";
import "../styles/ResumeUpload.css";
import { AuthContext } from "../Component/AuthContext";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); // Tracks the message to display
  const { isLoggedIn } = useContext(AuthContext); // Access login state from context

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("pdf")) {
      setFile(selectedFile);
      setMessage(""); // Clear any previous messages
    } else {
      setMessage("Only PDF files are allowed.");
    }
  };

  const handleUpload = () => {
    if (!isLoggedIn) {
      setMessage("Please log in first to upload your resume.");
      return;
    }

    if (file) {
      setMessage(`File "${file.name}" uploaded successfully!`);
    } else {
      setMessage("Please select a file to upload.");
    }
  };

  return (
    <div className="resume-upload">
      {/* 🔹 Banner Image */}
      <div className="resume-banner">
        <img
          src={`${process.env.PUBLIC_URL}/resume.jpg`}
          alt="New Image Description"
        />
      </div>

      <h2>Upload Your Resume</h2>
      <p>Boost your career by uploading a resume that stands out!</p>

      <div className="drop-zone">
        <p>Drag & Drop your resume here or</p>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
      </div>

      {file && (
        <p className="file-info">
          Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      )}

      <button onClick={handleUpload} disabled={!file} className="upload-btn">
        Upload Resume
      </button>

      {/* 🔹 Message Display */}
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default ResumeUpload;