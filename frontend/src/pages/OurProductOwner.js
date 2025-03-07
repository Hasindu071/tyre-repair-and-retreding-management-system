import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/OurProductOwner.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OurProductOwner = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !description || !price) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const productData = { productName, description, price, imageUrl };
        try {
            const response = await fetch('http://localhost:5000/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Product added successfully!');
                // Clear the form after submission
                setProductName('');
                setDescription('');
                setPrice('');
                setImageUrl('');
                setTimeout(() => navigate('/owner/products'), 2000);
            } else {
                toast.error(data.message || "Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <OwnerNavbar />
            <ToastContainer />
            <div className="ourproductowner-container">
                <h1 className="ourproductowner-title">Add a New Product</h1>
                <form onSubmit={handleSubmit} className="ourproductowner-form">
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product price"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter product image URL (optional)"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OurProductOwner;