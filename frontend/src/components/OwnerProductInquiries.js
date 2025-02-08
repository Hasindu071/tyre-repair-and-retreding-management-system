import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Owner's Navbar
import "../styles/OnwerproductInquiries.css"; // Import the CSS file

const OwnerProductInquiries = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Tire Retread Material", stock: 50 },
        { id: 2, name: "Patching Solution", stock: 30 },
        { id: 3, name: "Tire Sealant", stock: 40 },
        { id: 4, name: "Rubber Strips", stock: 25 },
    ]);

    const handleStockChange = (id, value) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, stock: value } : product
        ));
    };

    return (
        <div>
            <NewNavbar />
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
                <button className="update-stock-btn">Save Updates</button>
            </div>
        </div>
    );
};

export default OwnerProductInquiries;
