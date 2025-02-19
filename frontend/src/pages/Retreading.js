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

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePatternSelect = (pattern) => {
        setFormData({ ...formData, tirePattern: pattern });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        axios.post('http://localhost:5000/api/Retreading/submit', data)
            .then(response => {
                console.log('Form submitted:', response.data);
                // Add any additional logic after successful form submission
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });
    };

    return (
        <div>
            <NewNavbar />
            <div className="retreading-container-body">
                <div className="retreading-container">
                    <form onSubmit={handleSubmit} className="retreading-form">
                        <h2 className="title">Retreading Service</h2>
                        <div className="input-group">
                            <input type="text" name="sizeCode" placeholder="Size Code" onChange={handleChange} required />
                            <input type="text" name="wheelDiameter" placeholder="Wheel Diameter (inches)" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <input type="text" name="tireWidth" placeholder="Tire Width (mm)" onChange={handleChange} required />
                            <input type="text" name="tireBrand" placeholder="Tire Brand Name" onChange={handleChange} required />
                        </div>

                        <h3>Select Your Tire Pattern</h3>
                        <div className="tire-patterns">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div key={num} className="pattern-item">
                                    <img src={require(`../assets/pattern/pattern${num}.jpg`)} alt={`Tire Pattern ${num}`} className="pattern-image" />
                                    <button 
                                        type="button" 
                                        className={`pattern-btn ${formData.tirePattern === num ? 'selected' : ''}`} 
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
                                <input type="file" name="insidePhoto" accept="image/*" onChange={handleChange} hidden />
                            </label>
                            <label className="upload-box">
                                <FaUpload className="upload-icon" />
                                Upload Outside Photo
                                <input type="file" name="outsidePhoto" accept="image/*" onChange={handleChange} hidden />
                            </label>
                        </div>

                        <h3>Preferred Completion Date</h3>
                        <input type="date" name="completionDate" onChange={handleChange} required className="date-picker" />

                        <h3>Tire Structure Information</h3>
                        <div className="radio-group">
                            {["Nylon", "Iron Wire", "Not Sure"].map((option) => (
                                <label key={option} className="radio-option">
                                    <input type="radio" name="tireStructure" value={option} onChange={handleChange} />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <h3>Additional Notes</h3>
                        <textarea name="notes" placeholder="Tell us what you need" onChange={handleChange} className="notes-box"></textarea>

                        <button type="submit" className="submit-btn">
                            <FaCheckCircle className="submit-icon" /> Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RetreadingService;