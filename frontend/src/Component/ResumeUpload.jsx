import React, { useState } from "react";
import "../styles/ResumeUpload.css";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("pdf")) {
      setFile(selectedFile);
      setPdfPreviewUrl(URL.createObjectURL(selectedFile)); // Create preview
      setErrorMessage(""); // Clear any previous error
    } else {
      setErrorMessage("Only PDF files are allowed.");
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    setIsUploading(true);
    setErrorMessage(""); // Clear any previous error
  
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/resume/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (res.ok) {
        const data = await res.json();
  
        // Validate the response structure
        if (data.resume_id && data.name && data.email && data.skills) {
          setUploadSuccess(true);
          setResumeId(data.resume_id);
          localStorage.setItem("resumeId", data.resume_id);
          setParsedData(data);
        } else {
          throw new Error("Invalid response structure from the server.");
        }
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setErrorMessage("An error occurred while uploading. Please try again.");
    }
  
    setIsUploading(false);
  };
  // Navigate to recommendations
  const handleViewRecommendations = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="resume-upload">
      {/* Banner Image */}
      <div className="resume-banner">
        <img
          src={`${process.env.PUBLIC_URL}/resume.jpg`}
          alt="Job Success"
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

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="upload-btn"
      >
        {isUploading ? (
          <>
            <span className="spinner" /> Uploading...
          </>
        ) : (
          "Upload Resume"
        )}
      </button>

      {uploadSuccess && parsedData && (
        <div className="parsed-output">
          <h3>Resume Parsed Successfully</h3>
          <p><strong>Name:</strong> {parsedData.name}</p>
          <p><strong>Email:</strong> {parsedData.email}</p>
          <p><strong>Skills:</strong> {parsedData.skills.join(", ")}</p>

          <button onClick={handleViewRecommendations} className="upload-btn view-btn">
            View Job Recommendations
          </button>
        </div>
      )}

      {pdfPreviewUrl && (
        <div className="pdf-preview">
          <h4>PDF Preview:</h4>
          <iframe src={pdfPreviewUrl} title="PDF Preview" width="100%" height="400px" />
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;