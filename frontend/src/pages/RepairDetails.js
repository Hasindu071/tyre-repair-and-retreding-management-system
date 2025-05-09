import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRepairDetails } from "../services/orderServices";
import "../styles/RepairDetails.css";

const RepairDetails = () => {
    const { id } = useParams();
    const [repair, setRepair] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepairDetails = async () => {
            try {
                const data = await getRepairDetails(id);
                setRepair(data);
            } catch (error) {
                // Error logging is handled in the service file
            }
        };

        fetchRepairDetails();
    }, [id]);

    if (!repair) {
        return <div>Loading repair details...</div>;
    }

    return (
        <div className="repair-page">
            <div className="repair-details-container">
            <div className="cut-icon" onClick={() => navigate(-1)}>
                ✖
            </div>
                <h2>Repair Details - ID: {repair.id}</h2>
                <p><strong>Puncture Size:</strong> {repair.punctureSize}</p>
                <p><strong>Tire Brand:</strong> {repair.tireBrand}</p>
                <p><strong>Internal Structure:</strong> {repair.internalStructure}</p>
                <p><strong>Patches Applied:</strong> {repair.patchesApplied}</p>
                <p><strong>Receive Date:</strong> {repair.receiveDate}</p>
                <p><strong>Notes:</strong> {repair.notes}</p>
                <div className="repair-images">
                    {repair.insideDamagePhoto && (
                        <img
                            src={`http://localhost:5000${repair.insideDamagePhoto}`}
                            alt="Inside Damage"
                            style={{ width: '16cm', height: '16cm' }}
                        />
                    )}
                    {repair.outsideDamagePhoto && (
                        <img
                            src={`http://localhost:5000${repair.outsideDamagePhoto}`}
                            alt="Outside Damage"
                            style={{ width: '16cm', height: '16cm' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RepairDetails;