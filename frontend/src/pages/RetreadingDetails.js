import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRetreadingDetails } from "../services/orderServices";
import "../styles/RetreadingDetails.css";

const RetreadingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [retreading, setRetreading] = useState(null);

    useEffect(() => {
        const fetchRetreadingDetails = async () => {
            try {
                const data = await getRetreadingDetails(id);
                setRetreading(data);
            } catch (error) {
                console.error("Error fetching retreading details:", error);
            }
        };

        fetchRetreadingDetails();
    }, [id]);

    if (!retreading) {
        return <div>Loading retreading details...</div>;
    }

    return (
        <div>
            <div className="retreading-details-container">
                <div className="cut-icon-retreading" onClick={() => navigate(-1)}>
                    ✖
                </div>
                <h2>Retreading Details - ID: {retreading.id}</h2>
                <p><strong>Size Code:</strong> {retreading.sizeCode}</p>
                <p><strong>Wheel Diameter:</strong> {retreading.wheelDiameter}</p>
                <p><strong>Tire Width:</strong> {retreading.tireWidth}</p>
                <p><strong>Tire Brand:</strong> {retreading.tireBrand}</p>
                <p><strong>Tire Pattern:</strong> {retreading.tirePattern}</p>
                <p><strong>Completion Date:</strong> {retreading.completionDate}</p>
                <p><strong>Tire Structure:</strong> {retreading.tireStructure}</p>
                <p><strong>Notes:</strong> {retreading.notes}</p>
                <div className="retreading-images">
                    {retreading.insidePhoto && (
                        <img
                            src={`http://localhost:5000${retreading.insidePhoto}`}
                            alt="Inside"
                            style={{ width: '16cm', height: '16cm' }}
                        />
                    )}
                    {retreading.outsidePhoto && (
                        <img
                            src={`http://localhost:5000${retreading.outsidePhoto}`}
                            alt="Outside"
                            style={{ width: '16cm', height: '16cm' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RetreadingDetails;