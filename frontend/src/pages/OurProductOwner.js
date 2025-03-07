import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar";
import '../styles/OurProductOwner.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OurProductOwner = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/OurProductOwner/getProducts');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !description || !price) {
            toast.error("Please fill in all required fields.");
            return;
        }
        // Create FormData instance for file upload
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("price", price);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch('http://localhost:5000/OurProductOwner/add', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Product added successfully!');
                // Clear the form after submission
                setProductName('');
                setDescription('');
                setPrice('');
                setImage(null);
                // Refresh the product list
                fetchProducts();
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
                        <label htmlFor="image">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => {
                                if(e.target.files.length > 0) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Product
                    </button>
                </form>
                
                <div className="products-table">
                    <h2>Products List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price ($)</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            {product.image ? (
                                                <img
                                                    src={`http://localhost:5000${product.image}`}
                                                    alt={product.productName}
                                                    style={{ width: '100px', height: 'auto' }}
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OurProductOwner;