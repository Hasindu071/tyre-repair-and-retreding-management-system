import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload } from "react-icons/fa"; // Added icon for upload
import NewNavbar from "../components/Navbars/CustomerRegiNavBar";
import "../styles/Repairing.css"; // Import CSS file

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
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <NewNavbar />
      <div className="repair-service-container-body">
      <div className="repair-service-container">
        <h3 className="repair-title">Repair Service (Fixing Punctures / Patches)</h3>
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
              <label><input type="radio" name="internalStructure" value="Nylon" onChange={handleChange} /> Nylon</label>
              <label><input type="radio" name="internalStructure" value="Iron Wire" onChange={handleChange} /> Iron Wire</label>
              <label><input type="radio" name="internalStructure" value="Not Sure" onChange={handleChange} /> I am not sure</label>
            </div>
          </div>

          {/* Image Upload Section */}
          {/* Image Upload Section */}
        <div className="repair-section">
          <h3>Upload Tire Damage Photos</h3>
          <div className="repair-image-upload">
            
            {/* Inside Damage Photo Upload */}
            <label className="repair-upload-box">
              {formData.insideDamagePhoto ? (
                <img src={formData.insideDamagePhoto} alt="Inside Damage" className="uploaded-image" />
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
              {formData.outsideDamagePhoto ? (
                <img src={formData.outsideDamagePhoto} alt="Outside Damage" className="uploaded-image" />
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
            <input type="date" name="receiveDate" onChange={handleChange} required className="repair-date-picker" />
          </div>

          {/* Notes Section */}
          <div className="repair-section">
            <h3>Additional Notes</h3>
            <textarea name="notes" placeholder="Tell us what you need" value={formData.notes} onChange={handleChange} className="repair-notes-box"></textarea>
          </div>

          <button type="submit" className="repair-submit-button">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RepairServiceForm;
