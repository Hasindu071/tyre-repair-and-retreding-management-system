import React, { useState, useEffect } from "react";
import "../styles/WorkerStocks.css";
import WorkerSideBar from "../components/WorkerSideBar";
import axios from "axios"; // Import axios for HTTP requests

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
        // Get current stock for the product
        const currentStock = stocks.find(stock => stock.id === id)?.stock || 0;
        if (decreaseAmount > currentStock) {
            alert("Decrease amount cannot be greater than available stock");
            return;
        }
        const updatedStocks = stocks.map(stock =>
            stock.id === id ? { ...stock, stock: stock.stock - decreaseAmount } : stock
        );
        setStocks(updatedStocks);

        try {
            await axios.put(`http://localhost:5000/products/updateProduct/${id}`, { stock: updatedStocks.find(stock => stock.id === id).stock });
            alert("Stock updated successfully");
        } catch (error) {
            console.error("Error updating stock:", error);
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