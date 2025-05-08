import React, { useState, useEffect } from "react";
import "../styles/WorkerStocks.css";
import WorkerSideBar from "../components/WorkerSideBar";
import axios from "axios";

const WorkerStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [decreaseValues, setDecreaseValues] = useState({});

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/getProducts');
            setStocks(response.data);
        } catch (error) {
            console.error("Error fetching stocks:", error);
        }
    };

    const handleInputChange = (id, value) => {
        setDecreaseValues(prevValues => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleStockDecrease = async (id) => {
        const decreaseAmount = decreaseValues[id];
        if (!decreaseAmount || isNaN(decreaseAmount) || decreaseAmount < 0) {
            alert("Please enter a valid decrease amount");
            return;
        }
        const currentStock = stocks.find(stock => stock.id === id)?.stock || 0;
        if (decreaseAmount > currentStock) {
            alert("Decrease amount cannot be greater than available stock");
            return;
        }

        // Retrieve workerId from localStorage instead of hardcoding it.
        const storedWorkerId = localStorage.getItem("workerId");
        if (!storedWorkerId) {
            alert("Worker not logged in");
            return;
        }
        const workerId = parseInt(storedWorkerId, 10);

        try {
            // Call the endpoint to decrease stock and record the worker's decrease.
            const response = await axios.put(`http://localhost:5000/products/decreaseStock/${id}`, {
                workerId,
                decreaseAmount
            });
            alert(response.data.message);

            // Update local stocks state using the updated stock from the response.
            const updatedStock = response.data.updatedStock;
            const updatedStocks = stocks.map(stock =>
                stock.id === id ? { ...stock, stock: updatedStock } : stock
            );
            setStocks(updatedStocks);
        } catch (error) {
            console.error("Error updating stock:", error);
            alert("Error updating stock");
        }
    };

    return (
        <div>
            <WorkerSideBar />
            <div className="worker-stocks-container">
                <h2 className="stocks-title">Current Stock Levels</h2>
                <div className="stocks-grid">
                    {stocks.length > 0 ? (
                        stocks.map((stock) => (
                            <div key={stock.id} className="stock-card">
                                <h3>{stock.name}</h3>
                                <p>
                                    Available Quantity: <span className="stock-quantity">{stock.stock}</span>
                                </p>
                                <input
                                    type="number"
                                    min="0"
                                    max={stock.stock}
                                    placeholder="Decrease Amount"
                                    value={decreaseValues[stock.id] || ""}
                                    onChange={(e) => handleInputChange(stock.id, parseInt(e.target.value))}
                                />
                                <button onClick={() => handleStockDecrease(stock.id)}>
                                    Decrease Stock
                                </button>
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