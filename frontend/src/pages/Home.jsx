import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero">
                <video 
                    className="hero-video" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={`${process.env.PUBLIC_URL}/analytics.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-content">
                    <h1 className="animated-text">Find Your Dream Job Effortlessly</h1>
                    <p className="animated-text">Discover top opportunities tailored to your skills and preferences.</p>
                    <a href="/jobs" className="cta-button">Browse Jobs</a>
                </div>
            </div>

            <section className="features">
                <h2>Why Choose Us?</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Personalized Recommendations</h3>
                        <p>Get job suggestions based on your skills, experience, and preferences.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Top Companies</h3>
                        <p>Explore opportunities from leading companies around the world.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Easy Application Process</h3>
                        <p>Apply to jobs with just a few clicks and track your applications easily.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <p>"This platform helped me land my dream job in just two weeks!"</p>
                        <span>- Sarah M.</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"The personalized recommendations are spot on. Highly recommend!"</p>
                        <span>- John D.</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"A seamless experience from start to finish. Thank you!"</p>
                        <span>- Emily R.</span>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2025 JobRecommendation. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;