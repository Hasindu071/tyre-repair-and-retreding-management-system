import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerSidebar from "../components/CustomerSidebar";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import "../styles/Retreading.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import TyreSpecsImg from "../assets/Tyre_specs.png";
import { getAllPatterns, submitRetreadingForm } from "../services/orderServices";

const RetreadingService = () => {
    const { userID } = useAuth();
    const userId = userID;

    const [formData, setFormData] = useState({
        sizeCode: "",
        wheelDiameter: "",
        tireWidth: "",
        tireBrand: "",
        tirePattern: "",
        completionDate: null,
        tireStructure: "",
        notes: "",
        needDeliveryService: "",
        insidePhoto: null,
        outsidePhoto: null
    });

    const [patterns, setPatterns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [inputError, setInputError] = useState(null);

    useEffect(() => {
        const fetchPatterns = async () => {
            const patternsData = await getAllPatterns();
            setPatterns(patternsData);
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
        // Validation for number fields
        if (
            (name === "sizeCode" && (value < 0 || value > 100)) ||
            (name === "wheelDiameter" && (value < 0 || value > 100)) ||
            (name === "tireWidth" && (value < 0 || value > 1000))
        ) {
            setInputError("Value out of allowed range.");
            return;
        } else {
            setInputError(null);
        }
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
            data.append("userId", userId);
        }

        try {
            await submitRetreadingForm(data);
            setResponseMessage({ type: 'success', message: 'Form submitted successfully!' });

            // Scroll to top after successful submission
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setFormData({
                sizeCode: "",
                wheelDiameter: "",
                tireWidth: "",
                tireBrand: "",
                tirePattern: "",
                completionDate: null,
                tireStructure: "",
                notes: "",
                needDeliveryService: "",
                insidePhoto: null,
                outsidePhoto: null
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setResponseMessage({ type: 'error', message: 'Error submitting form. Please try again.' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

                        <table className="retreading-table">
                        <tbody>
                            <tr>
                            <td colSpan={2}>
                                <img
                                src={TyreSpecsImg}
                                alt="Retreading Service"
                                className="retreading-image"
                                />
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="form-group-retreading">
                                <label htmlFor="sizeCode">Aspect Ratio</label>
                                <input
                                    id="sizeCode"
                                    type="number"
                                    name="sizeCode" 
                                    placeholder="Aspect Ratio"
                                    value={formData.sizeCode}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                    max={100}
                                />
                            </div>
                            </td>
                            <td>
                                <div className="form-group-retreading">
                                <label htmlFor="wheelDiameter">Wheel Diameter (cm)</label>
                                <input
                                    id="wheelDiameter"
                                    type="number"
                                    name="wheelDiameter"
                                    placeholder="Wheel Diameter (cm)"
                                    value={formData.wheelDiameter}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                    max={100}
                                />
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="form-group-retreading">
                                <label htmlFor="tireWidth">Tire Width (mm)</label>
                                <input
                                    id="tireWidth"
                                    type="number"
                                    name="tireWidth"
                                    placeholder="Tire Width (mm)"
                                    value={formData.tireWidth}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                    max={1000}
                                />
                                </div>
                            </td>
                            <td>
                                <div className="form-group-retreading">
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
                            </td>
                            </tr>
                        </tbody>
                        </table>


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
                        <div className="form-group-retreading">
                        <br /><br />
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
                                        checked={formData.tireStructure === option}
                                        onChange={handleChange}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <hr />
                        <h3>Additional Notes</h3>
                        <div className="form-group-retreading">
                        <br /><br />
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
                        <div className="form-group-retreading">
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
                                <option value="">Select option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <hr />
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
