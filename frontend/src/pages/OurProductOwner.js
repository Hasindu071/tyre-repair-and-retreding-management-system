import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar";
import '../styles/OurProductOwner.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { getourProducts, addProduct, deleteProduct } from "../services/productServices";

const OurProductOwner = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { userID } = useAuth();

    const fetchProducts = async () => {
        try {
            const data = await getourProducts();
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

        if (userID) {
            formData.append("ownerId", userID);
        } else {
            toast.error("Owner ID missing. Please log in as owner.");
            return;
        }

        try {
            const data = await addProduct(formData);
            if (data.success) {
                toast.success('Product added successfully!');
                setProductName('');
                setDescription('');
                setPrice('');
                setImage(null);
                fetchProducts();
                setTimeout(() => navigate('/OurProducts'), 2000);
            } else {
                toast.error(data.message || "Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const data = await deleteProduct(id);
            if (data.success) {
                toast.success(data.message);
                fetchProducts(); // Refresh list after deletion
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("An error occurred while deleting the product.");
        }
    };

    return (
        <div>
            <OwnerNavbar />
            <ToastContainer />
            <div className="ourproductowner-container">
                <h1 className="ourproductowner-title">Add a New Our Product</h1>
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
                        <label htmlFor="price">Price (Rs)</label>
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
                                if (e.target.files.length > 0) {
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
                                <th>Actions</th>
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
                                        <td>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No products found.</td>
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