import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/Repairing.css"; // Import CSS file

const RepairServiceForm = () => {
  const [formData, setFormData] = useState({
    patchesApplied: "",
    punctureSize: "",
    tireBrand: "",
    internalStructure: "",
    receiveDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <NewNavbar />
    <div className="repair-service-container">
      <h2 className="title">Repair Service (Fixing Punctures / Patches)</h2>
      <form onSubmit={handleSubmit} className="repair-form">
        
        {/* Tire Details */}
        <div className="input-group">
          <input
            type="text"
            name="patchesApplied"
            placeholder="Number of Patches Applied"
            value={formData.patchesApplied}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="punctureSize"
            placeholder="Puncture Size"
            value={formData.punctureSize}
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

        {/* Tire Structure Information */}
        <div className="section">
          <h3>Tire Structure Information</h3>
          <label>
            <input
              type="radio"
              name="internalStructure"
              value="Nylon"
              onChange={handleChange}
            />{" "}
            Nylon
          </label>
          <label>
            <input
              type="radio"
              name="internalStructure"
              value="Iron Wire"
              onChange={handleChange}
            />{" "}
            Iron Wire
          </label>
          <label>
            <input
              type="radio"
              name="internalStructure"
              value="Not Sure"
              onChange={handleChange}
            />{" "}
            I am not sure
          </label>
        </div>

        {/* Image Upload Section */}
        <div className="image-upload-section">
          <h3>Repair Your Tire Photos</h3>
          <div className="image-upload">
            <label className="upload-box">Tyre Inside Damage Photo</label>
            <label className="upload-box">Tyre Outside Damage Photo</label>
          </div>
        </div>

        {/* Calendar Selection */}
        <div className="section">
          <h3>You Need Receive Date</h3>
          <input type="date" name="receiveDate" onChange={handleChange} required />
        </div>

        {/* Notes Section */}
        <div className="section">
          <h3>Service Status</h3>
          <textarea
            name="notes"
            placeholder="Tell us what you need"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  </div>
  );
};

export default RepairServiceForm;
