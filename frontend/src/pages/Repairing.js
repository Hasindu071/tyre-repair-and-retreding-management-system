import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload } from "react-icons/fa";
import NewNavbar from "../components/Navbars/CustomerRegiNavBar";
import "../styles/Repairing.css"; 
import axios from 'axios';

const RepairServiceForm = () => {
  const [formData, setFormData] = useState({
    patchesApplied: "",
    punctureSize: "",
    tireBrand: "",
    internalStructure: "",
    receiveDate: "",
    notes: "",
    insideDamagePhoto: null,
    outsideDamagePhoto: null
  });

  const [previewImages, setPreviewImages] = useState({
    insideDamagePhoto: null,
    outsideDamagePhoto: null
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    return () => {
      if (previewImages.insideDamagePhoto) URL.revokeObjectURL(previewImages.insideDamagePhoto);
      if (previewImages.outsideDamagePhoto) URL.revokeObjectURL(previewImages.outsideDamagePhoto);
    };
  }, [previewImages]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviewImages((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, internalStructure: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/Repairing/submit', data);
      setSuccessMessage("Form submitted successfully!");
      console.log('Response:', response.data);
      setFormData({
        patchesApplied: "",
        punctureSize: "",
        tireBrand: "",
        internalStructure: "",
        receiveDate: "",
        notes: "",
        insideDamagePhoto: null,
        outsideDamagePhoto: null
      });
      setPreviewImages({ insideDamagePhoto: null, outsideDamagePhoto: null });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NewNavbar />
      <div className="repair-service-container-body">
        <div className="repair-service-container">
          <h3 className="repair-title">Repair Service (Fixing Punctures / Patches)</h3>

          {successMessage && <div className="alert alert-info">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="repair-form">
            
            {/* Tire Details */}
            <div className="repair-input-group">
              <input type="text" name="patchesApplied" placeholder="Number of Patches Applied" value={formData.patchesApplied} onChange={handleChange} required />
              <input type="text" name="punctureSize" placeholder="Puncture Size" value={formData.punctureSize} onChange={handleChange} required />
              <input type="text" name="tireBrand" placeholder="Tire Brand Name" value={formData.tireBrand} onChange={handleChange} required />
            </div>

            {/* Tire Structure Information */}
            <div className="repair-section">
              <h3>Tire Structure Information</h3>
              <div className="repair-radio-group">
                {["Nylon", "Iron Wire", "Not Sure"].map((option) => (
                  <label key={option}>
                    <input type="radio" name="internalStructure" value={option} checked={formData.internalStructure === option} onChange={handleRadioChange} />
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
                <label className="repair-upload-box">
                  {previewImages.insideDamagePhoto ? (
                    <img src={previewImages.insideDamagePhoto} alt="Inside Damage" className="uploaded-image" />
                  ) : (
                    <>
                      <FaUpload className="upload-icon" />
                      <span>Inside Damage Photo</span>
                    </>
                  )}
                  <input type="file" name="insideDamagePhoto" accept="image/*" onChange={handleChange} hidden />
                </label>

                {/* Outside Damage Photo Upload */}
                <label className="repair-upload-box">
                  {previewImages.outsideDamagePhoto ? (
                    <img src={previewImages.outsideDamagePhoto} alt="Outside Damage" className="uploaded-image" />
                  ) : (
                    <>
                      <FaUpload className="upload-icon" />
                      <span>Outside Damage Photo</span>
                    </>
                  )}
                  <input type="file" name="outsideDamagePhoto" accept="image/*" onChange={handleChange} hidden />
                </label>

              </div>
            </div>

            {/* Calendar Selection */}
            <div className="repair-section">
              <h3>Expected Receive Date</h3>
              <input type="date" name="receiveDate" value={formData.receiveDate} onChange={handleChange} required className="repair-date-picker" />
            </div>

            {/* Notes Section */}
            <div className="repair-section">
              <h3>Additional Notes</h3>
              <textarea name="notes" placeholder="Tell us what you need" value={formData.notes} onChange={handleChange} className="repair-notes-box"></textarea>
            </div>

            <button type="submit" className="repair-submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepairServiceForm;
