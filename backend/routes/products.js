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

// Route to add a new product
router.post('/addProduct', async (req, res) => {
    const { name, stock } = req.body;

    try {
        const query = 'INSERT INTO products (name, stock) VALUES (?, ?)';
        await db.promise().execute(query, [name, stock]);
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ message: 'Failed to add product' });
    }
});

module.exports = router;