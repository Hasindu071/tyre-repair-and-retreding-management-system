import React from 'react';
import Navbar from './NavBar'; // Import the Navbar component
import '../styles/about.css';

const About = () => {
    return (
        <div>
            <Navbar /> {/* Add the Navbar component here */}
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
                    <p className="text-gray-700 text-lg text-center">
                        Welcome to Ryak Tires Retread & Repair! We specialize in high-quality tire retreading and repair services,
                        ensuring durability and cost-effectiveness for all your vehicle needs.
                    </p>
                    <div className="mt-6 text-gray-600">
                        <h3 className="text-xl font-semibold">Our Mission</h3>
                        <p className="mt-2">To provide sustainable and affordable tire solutions, reducing waste and enhancing vehicle performance.</p>
                    </div>
                    <div className="mt-6 text-gray-600">
                        <h3 className="text-xl font-semibold">Why Choose Us?</h3>
                        <ul className="list-disc pl-6 mt-2">
                            <li>High-quality retreading process</li>
                            <li>Cost-effective tire solutions</li>
                            <li>Eco-friendly practices</li>
                            <li>Experienced professionals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;