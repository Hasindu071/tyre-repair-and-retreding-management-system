import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/RepairDetails.css";

const RepairDetails = () => {
    const { id } = useParams();
    const [repair, setRepair] = useState(null);

    useEffect(() => {
        const fetchRepairDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/Repairing/getRepair/${id}`);
                setRepair(response.data);
            } catch (error) {
                console.error("Error fetching repair details:", error);
            }
        };

        fetchRepairDetails();
    }, [id]);

    if (!repair) {
        return <div>Loading repair details...</div>;
    }

    return (
        <div>
            <div className="repair-details-container">
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