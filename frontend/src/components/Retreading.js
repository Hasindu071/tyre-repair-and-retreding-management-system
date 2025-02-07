import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Import the Navbar component
import "../styles/Retreading.css";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div>
            <Navbar />
        <div className="retreading-container">
            <h2 className="title">Retreading Service</h2>
            <form onSubmit={handleSubmit} className="retreading-form">
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
                        <button type="button" key={num} className={`pattern-btn ${formData.tirePattern === num ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, tirePattern: num })}>
                            {num}
                        </button>
                    ))}
                </div>

                <h3>Add Photos of Your Tire</h3>
                <div className="upload-section">
                    <input type="file" name="insidePhoto" accept="image/*" className="upload-box" onChange={handleChange} />
                    <input type="file" name="outsidePhoto" accept="image/*" className="upload-box" onChange={handleChange} />
                </div>

                <h3>Preferred Completion Date</h3>
                <input type="date" name="completionDate" onChange={handleChange} required className="date-picker" />

                <h3>Tire Structure Information</h3>
                <div className="radio-group">
                    <label><input type="radio" name="tireStructure" value="Nylon" onChange={handleChange} /> Nylon</label>
                    <label><input type="radio" name="tireStructure" value="Iron Wire" onChange={handleChange} /> Iron Wire</label>
                    <label><input type="radio" name="tireStructure" value="Not Sure" onChange={handleChange} /> I'm not sure</label>
                </div>

                <h3>Notes</h3>
                <textarea name="notes" placeholder="Tell us what you need" onChange={handleChange} className="notes-box"></textarea>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>      
    </div>
    );
};

export default RetreadingService;