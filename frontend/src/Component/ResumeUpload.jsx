import React, { useState } from "react";
import "../styles/ResumeUpload.css";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);


  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile && selectedFile.type.includes("pdf")) {
    setFile(selectedFile);
    setPdfPreviewUrl(URL.createObjectURL(selectedFile));  // ✅ create preview
  } else {
    alert("Only PDF files are allowed.");
  }
};


  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadSuccess(true);
        setResumeId(data.resume_id);
        localStorage.setItem("resumeId", data.resume_id);
        setParsedData(data);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading.");
    }

    setIsUploading(false);
  };

  const handleViewRecommendations = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="resume-upload">
      {/* 🔹 Banner Image */}
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
          <p><strong>Skills:</strong> {parsedData.skills}</p>

          <button onClick={handleViewRecommendations} className="upload-btn view-btn">
            View Job Recommendations
          </button>
        </div>
      )}

    </div>
  );
};

export default ResumeUpload;
