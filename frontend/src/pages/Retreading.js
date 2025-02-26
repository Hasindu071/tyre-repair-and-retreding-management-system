import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Navbar component
import { FaUpload, FaCheckCircle } from "react-icons/fa"; // Importing icons
import "../styles/Retreading.css";
import axios from 'axios'; // Import axios for HTTP requests

const RetreadingService = () => {
    const [formData, setFormData] = useState({
        sizeCode: "",
        wheelDiameter: "",
        tireWidth: "",
        tireBrand: "",
        tirePattern: "",
        completionDate: "",
        tireStructure: "",
        notes: "",
        insidePhoto: null,
        outsidePhoto: null
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null); // For feedback

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        // File validation for image uploads
        if (type === "file" && files[0]) {
            const file = files[0];
            const fileType = file.type.split("/")[0];
            if (fileType !== "image") {
                alert("Please upload a valid image file.");
                return;
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handlePatternSelect = (pattern) => {
        setFormData((prevData) => ({
            ...prevData,
            tirePattern: pattern.toString(), // Ensure pattern is stored as a string
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        setLoading(true);  // Set loading to true during submission

        try {
            await axios.post('http://localhost:5000/Retreading/submit', data);
            setResponseMessage({ type: 'success', message: 'Form submitted successfully!' });
            // Reset form here if needed
            setFormData({
                sizeCode: "",
                wheelDiameter: "",
                tireWidth: "",
                tireBrand: "",
                tirePattern: "",
                completionDate: "",
                tireStructure: "",
                notes: "",
                insidePhoto: null,
                outsidePhoto: null
            });
        } catch (error) {
            setResponseMessage({ type: 'error', message: 'Error submitting form. Please try again.' });
        } finally {
            setLoading(false);  // Reset loading state after submission
        }
    };

    return (
        <div>
            <NewNavbar />
            <div className="retreading-container-body">
                <div className="retreading-container">
                    <form onSubmit={handleSubmit} className="retreading-form">
                        <h2 className="title">Retreading Service</h2>
                        
                        {responseMessage && (
                            <div className={`alert alert-${responseMessage.type === 'success' ? 'success' : 'danger'}`}>
                                {responseMessage.message}
                            </div>
                        )}

                        <div className="input-group">
                            <input 
                                type="text" 
                                name="sizeCode" 
                                placeholder="Size Code" 
                                value={formData.sizeCode} 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="wheelDiameter" 
                                placeholder="Wheel Diameter (inches)" 
                                value={formData.wheelDiameter} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="text" 
                                name="tireWidth" 
                                placeholder="Tire Width (mm)" 
                                value={formData.tireWidth} 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="tireBrand" 
                                placeholder="Tire Brand Name" 
                                value={formData.tireBrand} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <h3>Select Your Tire Pattern</h3>
                        <div className="tire-patterns">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div key={num} className="pattern-item">
                                    <img 
                                        src={require(`../assets/pattern/pattern${num}.jpg`)} 
                                        alt={`Tire Pattern ${num}`} 
                                        className="pattern-image" 
                                    />
                                    <button 
                                        type="button" 
                                        className={`pattern-btn ${formData.tirePattern === num.toString() ? 'selected' : ''}`} 
                                        onClick={() => handlePatternSelect(num)}
                                    >
                                        {num}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <h3>Add Photos of Your Tire</h3>
                        <div className="upload-section">
                            <label className="upload-box">
                                <FaUpload className="upload-icon" />
                                Upload Inside Photo
                                <input 
                                    type="file" 
                                    name="insidePhoto" 
                                    accept="image/*" 
                                    onChange={handleChange} 
                                    hidden 
                                />
                            </label>
                            <label className="upload-box">
                                <FaUpload className="upload-icon" />
                                Upload Outside Photo
                                <input 
                                    type="file" 
                                    name="outsidePhoto" 
                                    accept="image/*" 
                                    onChange={handleChange} 
                                    hidden 
                                />
                            </label>
                        </div>

                        <h3>Preferred Completion Date</h3>
                        <input 
                            type="date" 
                            name="completionDate" 
                            value={formData.completionDate} 
                            onChange={handleChange} 
                            required 
                            className="date-picker" 
                        />

                        <h3>Tire Structure Information</h3>
                        <div className="radio-group">
                            {["Nylon", "Iron Wire", "Not Sure"].map((option) => (
                                <label key={option} className="radio-option">
                                    <input 
                                        type="radio" 
                                        name="tireStructure" 
                                        value={option} 
                                        onChange={handleChange} 
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <h3>Additional Notes</h3>
                        <textarea 
                            name="notes" 
                            placeholder="Tell us what you need" 
                            value={formData.notes} 
                            onChange={handleChange} 
                            className="notes-box"
                        ></textarea>

                        <button 
                            type="submit" 
                            className="submit-btn" 
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : <><FaCheckCircle className="submit-icon" /> Submit</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RetreadingService;
