import React from "react";
import "../styles/TyreServicePage.css"; // Import the CSS file
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Assuming you have a Navbar component

const TyreServicePage = () => {
    return (
        <div>
            <NewNavbar />
        <div className="service-container">
            {/* Header Section */}
            <header className="service-header">
                <h1>🚗 Tyre Repair & Retreading Services</h1>
                <p>Quality tyre repair and retreading services for long-lasting performance.</p>
            </header>

            {/* Tyre Repair Section */}
            <section className="repair-section">
                <h2>🔧 Tyre Repair Services</h2>
                <p>We offer professional tyre repair services including puncture fixes, alignment, and balancing.</p>
                <ul>
                    <li>✅ Puncture Repair</li>
                    <li>✅ Wheel Balancing</li>
                    <li>✅ Tyre Rotation</li>
                    <li>✅ Rim Repair</li>
                </ul>
            </section>

            {/* Tyre Retreading Section */}
            <section className="retreading-section">
                <h2>🔄 Tyre Retreading Process</h2>
                <p>Extend the life of your tyres with our expert retreading process.</p>
                <ol>
                    <li>🛠️ <strong>Inspection</strong> - Checking tyre quality.</li>
                    <li>🛠️ <strong>Buffing</strong> - Removing worn-out tread.</li>
                    <li>🛠️ <strong>Application</strong> - Adding new rubber tread.</li>
                    <li>🛠️ <strong>Curing</strong> - Heat treatment for bonding.</li>
                </ol>
            </section>
        </div>
    </div>
    );
};

export default TyreServicePage;