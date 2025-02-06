import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './NavBar'; // Import the Navbar component

const HowItWorks = () => {
    return (
        <div>
            <Navbar /> {/* Add the Navbar component here */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">How It Works</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Step 1</h5>
                                <p className="card-text">Description of the first step in your process.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Step 2</h5>
                                <p className="card-text">Description of the second step in your process.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Step 3</h5>
                                <p className="card-text">Description of the third step in your process.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;