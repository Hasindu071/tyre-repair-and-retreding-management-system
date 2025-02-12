import React, { useState, useEffect } from "react";
import "../styles/WorkerStocks.css";
import NewNavbar from "../components/Navbars/WorkerRegiNavBar";

const WorkerStocks = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        // Fetch the updated stock levels from API or database
        fetch("/api/stocks") // Replace with actual API endpoint
            .then(response => response.json())
            .then(data => setStocks(data))
            .catch(error => console.error("Error fetching stocks:", error));
    }, []);

    return (
        <div>
            <NewNavbar />
            <div className="worker-stocks-container">
                <h2 className="stocks-title">Current Stock Levels</h2>
                <div className="stocks-grid">
                    {stocks.length > 0 ? (
                        stocks.map((stock, index) => (
                            <div key={index} className="stock-card">
                                <h3>{stock.productName}</h3>
                                <p>Category: {stock.category}</p>
                                <p>Available Quantity: <span className="stock-quantity">{stock.quantity}</span></p>
                            </div>
                        ))
                    ) : (
                        <p className="no-stocks">No stock data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkerStocks;