const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all products
router.get('/getProducts', async (req, res) => {
    try {
        const [products] = await db.promise().execute('SELECT * FROM products');
        res.status(200).json(products);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
});

// Route to update product stock
router.put('/updateProduct/:id', async (req, res) => {
    const productId = req.params.id;
    const { stock } = req.body;

    try {
        const query = 'UPDATE products SET stock = ? WHERE id = ?';
        await db.promise().execute(query, [stock, productId]);
        res.status(200).json({ message: 'Product stock updated successfully' });
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Failed to update product stock' });
    }
});

// POST endpoint to add a new product
router.post("/", async (req, res) => {
    const { product_name, description } = req.body;
  
    if (!product_name || !description) {
        return res.status(400).json({ error: "Product name and description are required" });
    }
  
    try {
        const sql = "INSERT INTO products (name, description) VALUES (?, ?)";
        const [result] = await db.promise().execute(sql, [product_name, description]);
        res.status(201).json({ message: "Product added successfully", productId: result.insertId });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
});

// GET endpoint to fetch all products
router.get("/names", async (req, res) => {
    try {
        const [products] = await db.promise().query("SELECT * FROM products");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching product names:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

module.exports = router;