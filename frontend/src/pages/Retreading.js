import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerSidebar from "../components/CustomerSidebar"; // Sidebar component
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import "../styles/Retreading.css";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext"; 

const RetreadingService = () => {
        const { user } = useAuth(); // Get user details from context
        const userId = user?.id; // Extract user ID from context

    const [formData, setFormData] = useState({
        sizeCode: "",
        wheelDiameter: "",
        tireWidth: "",
        tireBrand: "",
        tirePattern: "",
        completionDate: null, // Date object for date picker
        tireStructure: "",
        notes: "",
        needDeliveryService: "",
        insidePhoto: null,
        outsidePhoto: null
    });
    const [patterns, setPatterns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    // Fetch tire patterns on mount
    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const res = await axios.get("http://localhost:5000/patterns/getAll");
                if (res.data && res.data.length > 0) {
                    setPatterns(res.data);
                } else {
                    setPatterns([]);
                }
            } catch (error) {
                console.error("Error fetching patterns:", error);
                setPatterns([]);
            }
        };
        fetchPatterns();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files[0]) {
            const file = files[0];
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                return;
            }
            setFormData(prevData => ({
                ...prevData,
                [name]: file
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleCompletionDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            completionDate: date
        }));
    };

    const handlePatternSelect = (patternId) => {
        setFormData(prevData => ({
            ...prevData,
            tirePattern: patternId.toString()
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === "completionDate" && formData.completionDate) {
                data.append(key, formData.completionDate.toISOString().split("T")[0]);
            } else {
                data.append(key, formData[key]);
            }
        });
        setLoading(true);

        if (userId) {
            data.append("userId", userId); // Append user ID
            console.log("User ID:", userId);
        }
        
        try {
            await axios.post('http://localhost:5000/Retreading/submit', data);
            setResponseMessage({ type: 'success', message: 'Form submitted successfully!' });
            setFormData({
                sizeCode: "",
                wheelDiameter: "",
                tireWidth: "",
                tireBrand: "",
                tirePattern: "",
                completionDate: null,
                tireStructure: "",
                needDeliveryService: "",
                notes: "",
                insidePhoto: null,
                outsidePhoto: null
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setResponseMessage({ type: 'error', message: 'Error submitting form. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <CustomerSidebar />
            <div className="retreading-container-body">
                <div className="retreading-container">
                    <form onSubmit={handleSubmit} className="retreading-form">
                        <h2 className="title-retreading">Retreading Service</h2>
                        
                        {responseMessage && (
                            <div className={`alert alert-${responseMessage.type === 'success' ? 'success' : 'danger'}`}>
                                {responseMessage.message}
                            </div>
                        )}

                        <div className="input-group">
                            <div className="form-group">
                                <label htmlFor="sizeCode">Size Code</label>
                                <input 
                                    id="sizeCode"
                                    type="number" 
                                    name="sizeCode" 
                                    placeholder="Size Code" 
                                    value={formData.sizeCode} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wheelDiameter">Wheel Diameter (cm)</label>
                                <input 
                                    id="wheelDiameter"
                                    type="number" 
                                    name="wheelDiameter" 
                                    placeholder="Wheel Diameter (cm)" 
                                    value={formData.wheelDiameter} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="form-group">
                                <label htmlFor="tireWidth">Tire Width (mm)</label>
                                <input 
                                    id="tireWidth"
                                    type="number" 
                                    name="tireWidth" 
                                    placeholder="Tire Width (mm)" 
                                    value={formData.tireWidth} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tireBrand">Tire Brand Name</label>
                                <input 
                                    id="tireBrand"
                                    type="text" 
                                    name="tireBrand" 
                                    placeholder="Tire Brand Name" 
                                    value={formData.tireBrand} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>

                        <h3>Select Your Tire Pattern</h3>
                        <div className="tire-patterns">
                            {patterns.length > 0 
                                ? patterns.map(pattern => (
                                    <div key={pattern.id} className="pattern-item">
                                        <img 
                                            src={pattern.imageUrl} 
                                            alt={`Tire Pattern ${pattern.id}`} 
                                            className="pattern-image" 
                                        />
                                        <button 
                                            type="button" 
                                            className={`pattern-btn ${formData.tirePattern === pattern.id.toString() ? 'selected' : ''}`} 
                                            onClick={() => handlePatternSelect(pattern.id)}
                                        >
                                            {pattern.id}
                                        </button>
                                    </div>
                                ))
                                : [1, 2, 3, 4, 5, 6].map(num => (
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
                                ))
                            }
                        </div>
                        <hr />
                        <h3>Add Photos of Your Tire</h3>
                        <div className="upload-section">
    <label className="upload-box">
        {formData.insidePhoto ? (
            <img 
                src={URL.createObjectURL(formData.insidePhoto)} 
                alt="Inside Preview" 
                className="photo-preview" 
            />
        ) : (
            <>
                <FaUpload className="upload-icon" />
                Upload Inside Photo
            </>
        )}
        <input 
            type="file" 
            name="insidePhoto" 
            accept="image/*" 
            onChange={handleChange} 
            hidden 
        />
    </label>
    <label className="upload-box">
        {formData.outsidePhoto ? (
            <img 
                src={URL.createObjectURL(formData.outsidePhoto)} 
                alt="Outside Preview" 
                className="photo-preview" 
            />
        ) : (
            <>
                <FaUpload className="upload-icon" />
                Upload Outside Photo
            </>
        )}
        <input 
            type="file" 
            name="outsidePhoto" 
            accept="image/*" 
            onChange={handleChange} 
            hidden 
        />
    </label>
</div>
                        <hr />
                        <h3>Preferred Completion Date</h3>
                        <div className="form-group">
                            <ReactDatePicker
                                id="completionDate"
                                selected={formData.completionDate}
                                onChange={handleCompletionDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select a date"
                                className="date-picker-retreading"
                                required
                                minDate={new Date()}
                            />
                        </div>
                        <hr />

                        <h3>Tire Structure Information</h3>
                        <div className="radio-group">
                            {["Nylon", "IronWire", "NotSure"].map(option => (
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
                        <hr />
                        <h3>Additional Notes</h3>
                        <div className="form-group">
                            <textarea 
                                id="notes"
                                name="notes" 
                                placeholder="Tell us what you need" 
                                value={formData.notes} 
                                onChange={handleChange} 
                                className="notes-box"
                            ></textarea>
                        </div>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="needDeliveryService">
                                <h3>Need Delivery Service?</h3>
                            </label>
                            <select
                                id="needDeliveryService"
                                name="needDeliveryService"
                                value={formData.needDeliveryService}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">Select option</option> {/* <-- Added */}
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            
                            <hr />
                        </div>

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