import React, { useEffect, useState } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/OnwerproductInquiries.css";
import { getWorkerStockDecreases } from "../services/productServices";

const OwnerProductInquiries = () => {
    const [decreaseRecords, setDecreaseRecords] = useState([]);

    useEffect(() => {
        fetchDecreaseRecords();
    }, []);

    const fetchDecreaseRecords = async () => {
        try {
            const data = await getWorkerStockDecreases();
            setDecreaseRecords(data);
        } catch (error) {
            console.error("Error fetching worker stock decreases:", error);
            toast.error("Error fetching worker stock decreases");
        }
    };

    // Group records by productName
    const groupedRecords = decreaseRecords.reduce((acc, record) => {
        if (!acc[record.productName]) {
            acc[record.productName] = [];
        }
        acc[record.productName].push(record);
        return acc;
    }, {});

    return (
        <div>
            <OwnerSidebar />
            <div className="worker-stock-decreases-container">
                <h2 className="title-stock-decreases">Worker Stock Decrease Records</h2>
                <table className="decrease-table">
                    <thead>
                        <tr>
                            <th>Record ID</th>
                            <th>Product Name</th>
                            <th>Worker Name</th>
                            <th>Decrease Amount</th>
                            <th>Decrease Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedRecords).length === 0 ? (
                            <tr>
                                <td colSpan="5">No records found.</td>
                            </tr>
                        ) : (
                            Object.entries(groupedRecords).map(([productName, records]) => {
                                // Calculate total decrease for the current product
                                const totalDecrease = records.reduce(
                                    (sum, rec) => sum + Number(rec.decrease_amount),
                                    0
                                );
                                return (
                                    <React.Fragment key={productName}>
                                        {records.map((record, index) => (
                                            <tr key={record.id}>
                                                <td>{record.id}</td>
                                                {index === 0 && (
                                                    <td rowSpan={records.length + 1}>{productName}</td>
                                                )}
                                                <td>{record.workerName}</td>
                                                <td>{record.decrease_amount}</td>
                                                <td>{record.decrease_date}</td>
                                            </tr>
                                        ))}
                                        <tr key={`${productName}-total`}>
                                            <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>
                                                Total:
                                            </td>
                                            <td style={{ fontWeight: "bold" }}>{totalDecrease}</td>
                                            <td></td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OwnerProductInquiries;