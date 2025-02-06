import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './NavBar'; // Import the Navbar component
import background from '../assets/background.png'; 
import '../styles/about.css';

const Howitworks = () => {
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Navbar /> {/* Add the Navbar component here */}
            
        </div>
    );
};

export default Howitworks;