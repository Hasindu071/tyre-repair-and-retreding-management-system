import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUpload } from "react-icons/fa";
import CustomerSidebar from "../components/CustomerSidebar"; // Assuming you have a sidebar component
import "../styles/Repairing.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const RepairServiceForm = () => {
    const { user } = useAuth(); // Get user details from context
    const userId = user?.id; // Extract user ID from context

    const [formData, setFormData] = useState({
        patchesApplied: "",
        punctureSize: "",
        tireBrand: "",
        internalStructure: "",
        receiveDate: null,
        notes: "",
        needDeliveryService: "",
        insideDamagePhoto: null,
        outsideDamagePhoto: null
    });

    const [previewImages, setPreviewImages] = useState({
        insideDamagePhoto: null,
        outsideDamagePhoto: null
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            if (previewImages.insideDamagePhoto)
                URL.revokeObjectURL(previewImages.insideDamagePhoto);
            if (previewImages.outsideDamagePhoto)
                URL.revokeObjectURL(previewImages.outsideDamagePhoto);
        };
    }, [previewImages]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, [name]: file }));
            setPreviewImages((prev) => ({
                ...prev,
                [name]: URL.createObjectURL(file)
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRadioChange = (e) => {
        setFormData((prev) => ({ ...prev, internalStructure: e.target.value }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, receiveDate: date }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.patchesApplied.trim() ||
            !formData.punctureSize.toString().trim() ||
            !formData.tireBrand.trim() ||
            !formData.internalStructure.trim() ||
            !formData.receiveDate) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const patches = Number(formData.patchesApplied);
        if (!Number.isInteger(patches)) {
            toast.error("Number of patches applied must be a whole number.");
            return;
        }

        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (formData.insideDamagePhoto && !validImageTypes.includes(formData.insideDamagePhoto.type)) {
            toast.error("Inside Damage Photo must be a valid image file (jpeg, png, or gif).");
            return;
        }
        if (formData.outsideDamagePhoto && !validImageTypes.includes(formData.outsideDamagePhoto.type)) {
            toast.error("Outside Damage Photo must be a valid image file (jpeg, png, or gif).");
            return;
        }

        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, key === "receiveDate" && formData.receiveDate
                ? formData.receiveDate.toISOString().split("T")[0]
                : formData[key]);
        });
        console.log("Form Data:", formData);

        if (userId) {
            data.append("userId", userId); // Append user ID
            console.log("User ID:", userId);
        }

        try {
            const response = await axios.post("http://localhost:5000/Repairing/submit", data);
            toast.success("Form submitted successfully!");
            console.log("Response:", response.data);

            setFormData({
                patchesApplied: "",
                punctureSize: "",
                tireBrand: "",
                internalStructure: "",
                receiveDate: null,
                notes: "",
                needDeliveryService: "",
                insideDamagePhoto: null,
                outsideDamagePhoto: null
            });
            setPreviewImages({
                insideDamagePhoto: null,
                outsideDamagePhoto: null
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to submit the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <CustomerSidebar />
            <div className="repair-service-container-body">
                <div className="repair-service-container">
                    <h3 className="repair-title">Repair Service (Fixing Punctures / Patches)</h3>
                    <form onSubmit={handleSubmit} className="repair-form">
                        <div className="repair-input-group">
                            <div className="form-group">
                                <label htmlFor="patchesApplied">Number of Patches Applied</label>
                                <input
                                    id="patchesApplied"
                                    type="number"
                                    name="patchesApplied"
                                    placeholder="Enter number of patches"
                                    value={formData.patchesApplied}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="punctureSize">Puncture Size (cm)</label>
                                <input
                                    id="punctureSize"
                                    type="number"
                                    name="punctureSize"
                                    placeholder="Enter puncture size"
                                    value={formData.punctureSize}
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
                                    placeholder="Enter tire brand name"
                                    value={formData.tireBrand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="repair-section">
                            <h3>Tire Structure Information</h3>
                            <div className="repair-radio-group">
                                {["Nylon", "Iron Wire", "Not Sure"].map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name="internalStructure"
                                            value={option}
                                            checked={formData.internalStructure === option}
                                            onChange={handleRadioChange}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        {/* Image Upload Section */}
                        <div className="repair-section">
                            <h3>Upload Tire Damage Photos</h3>
                            <div className="repair-image-upload">
                                {/* Inside Damage Photo Upload */}
                                <label
                                    className="repair-upload-box"
                                    style={
                                        previewImages.insideDamagePhoto
                                            ? {
                                                  backgroundImage: `url(${previewImages.insideDamagePhoto})`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                              }
                                            : {}
                                    }
                                >
                                    {!previewImages.insideDamagePhoto && (
                                        <>
                                            <FaUpload className="upload-icon" />
                                            <span>Inside Damage Photo</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        name="insideDamagePhoto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </label>

                                {/* Outside Damage Photo Upload */}
                                <label
                                    className="repair-upload-box"
                                    style={
                                        previewImages.outsideDamagePhoto
                                            ? {
                                                  backgroundImage: `url(${previewImages.outsideDamagePhoto})`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                              }
                                            : {}
                                    }
                                >
                                    {!previewImages.outsideDamagePhoto && (
                                        <>
                                            <FaUpload className="upload-icon" />
                                            <span>Outside Damage Photo</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        name="outsideDamagePhoto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="repair-section">
                            <h3>Expected Receive Date</h3>
                            <ReactDatePicker
                                selected={formData.receiveDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select a date"
                                className="repair-date-picker"
                                required
                                minDate={new Date()}
                            />
                        </div>
                        
                        {/* Notes Section */}
                        <div className="repair-section">
                            <label htmlFor="notes">
                                <h3>Additional Notes</h3>
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                placeholder="Tell us what you need"
                                value={formData.notes}
                                onChange={handleChange}
                                className="repair-notes-box"
                            ></textarea>
                        </div>

                        <div className="repair-section">
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

                        </div>

                        <button type="submit" className="repair-submit-button" disabled={loading}>
                        <FaUpload className="repair-upload-icon" /> &nbsp;
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RepairServiceForm;
