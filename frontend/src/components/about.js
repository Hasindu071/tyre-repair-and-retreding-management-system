import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './NavBar'; // Import the Navbar component
import background from '../assets/background.png'; 
import '../styles/about.css';

const About = () => {
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Navbar /> {/* Add the Navbar component here */}
            <div className="overlay">
                <section className="about-section">
                    <h2>Welcome to Ryak Tyres</h2>
                    <p>Ryak Tyres is a leading tyre repair and retreading center located in Yatiyana, Matara. Managed by Mr. Mohan Liyanapathirana, we specialize in servicing lorries and buses, offering premium tyre repair and retreading solutions to extend the lifespan of heavy-duty tyres.</p>
                </section>
                <section className="team-section">
                    <h2>Our Team</h2>
                    <p>We have a dedicated team of six skilled workers who handle tyre inspections, repairs, and retreading with precision and expertise. Our team is committed to providing high-quality service and ensuring customer satisfaction.</p>
                </section>
                <section className="facility-section">
                    <h2>Our Facility & Equipment</h2>
                    <p>Ryak Tyres is equipped with advanced machinery, including:</p>
                    <ul>
                        <li>Cleaning machines for thorough tyre preparation</li>
                        <li>Tyre connector for attaching new tread</li>
                        <li>Boiling machine for final retreading</li>
                    </ul>
                    <p>With these specialized tools, we guarantee top-tier results and efficient service.</p>
                </section>
                <section className="mission-section">
                    <h2>Our Commitment</h2>
                    <p>At Ryak Tyres, we strive to provide reliable, cost-effective, and environmentally friendly tyre solutions. Our services support local transport operators by enhancing the durability of their tyres and promoting sustainability in the industry.</p>
                </section>
                <footer>
                    <p>&copy; Ryak Tyres. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default About;