import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from "../components/Navbars/OwnerRegiNavBar"; // Owner's Navbar
import OwnerSidebar from "../components/SideNav";
import "../styles/OnwerproductInquiries.css"; // Import the CSS file
import axios from 'axios'; // Import axios for HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerProductInquiries = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/getProducts');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products");
        }
    };

    const handleStockChange = (id, value) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, stock: value } : product
        ));
    };

    const handleSaveUpdates = async () => {
        try {
            for (const product of products) {
                await axios.put(`http://localhost:5000/products/updateProduct/${product.id}`, { stock: product.stock });
            }
            toast.success("Stock updates saved successfully");
        } catch (error) {
            console.error("Error saving stock updates:", error);
            toast.error("Error saving stock updates");
        }
    };

    return (
        <div>
            {/*<Navbar />*/}
            <OwnerSidebar />
            <div className="owner-stock-container">
                <h2 className="title">Product Stock Levels</h2>
                <table className="stock-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Stock Available</th>
                            <th>Update Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        value={product.stock}
                                        onChange={(e) => handleStockChange(product.id, parseInt(e.target.value))}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="update-stock-btn" onClick={handleSaveUpdates}>Save Updates</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OwnerProductInquiries;