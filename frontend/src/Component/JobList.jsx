import React from "react";
import "../styles/JobCard.css";

const jobs = [
    { id: 1, title: "Software Engineer", company: "Google", location: "Remote" },
    { id: 2, title: "Frontend Developer", company: "Microsoft", location: "New York" },
];

const JobList = () => {
    return (
        <div className="job-list">
            <h2>Available Jobs</h2>
            {jobs.map((job) => (
                <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p>{job.company} - {job.location}</p>
                    <button>Apply Now</button>
                </div>
            ))}
        </div>
    );
};

export default JobList;
