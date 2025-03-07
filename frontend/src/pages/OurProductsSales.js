import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';
import '../styles/OurProductsSales.css';

const OurProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products/getProducts');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="ourproducts-loading">
                    <div className="loading-spinner">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
        <Navbar />
        <div className="ourproducts-container">

            <header className="ourproducts-header">
                <h1>Our Products</h1>
                <p>Discover quality products that suit your style.</p>
            </header>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img
                                src={product.imageUrl || 'https://via.placeholder.com/300'}
                                alt={product.name}
                            />
                        </div>
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                            <button className="buy-button">Buy Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default OurProducts;