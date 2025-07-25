import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../components/NavBar';
import backgroundVideo from '../assets/background.mp4';
import '../styles/HowItWorks.css';

const Howitworks = () => {
    return (
        <div className="video-wrapper">
            <div className="content-overlay">
                <Navbar />
                <div className="content-work">
                    <h2>How It Works</h2>
                    <p>At Ryak Tyres, our tyre repair and retreading process ensures high-quality and sustainable solutions for lorries and buses. Here's how our system works:</p>
                    
                    <div className="steps">
                        <div className="step">
                            <h3>1. Tyre Inspection</h3>
                            <p>Our experts carefully inspect tyres for damages, tread wear, and suitability for retreading.</p>
                        </div>
                        <div className="step">
                            <h3>2. Cleaning & Preparation</h3>
                            <p>Tyres undergo a thorough cleaning process to remove dirt and debris before retreading.</p>
                        </div>
                        <div className="step">
                            <h3>3. Retreading Process</h3>
                            <p>Using our advanced tyre connector and boiling machine, we attach a new tread securely.</p>
                        </div>
                        <div className="step">
                            <h3>4. Final Quality Check</h3>
                            <p>Each tyre is tested for safety, durability, and quality assurance before returning to the customer.</p>
                        </div>
                    </div>
                    <video className="bg-video" autoPlay loop muted playsInline>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
                </div>
                <footer>
                    <p>&copy; Ryak Tyres. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Howitworks;