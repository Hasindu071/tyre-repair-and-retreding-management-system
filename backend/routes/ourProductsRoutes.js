const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configure storage for image uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to add a new product with optional image upload
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { productName, description, price, ownerId } = req.body;
        // Set image path if file is uploaded
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (!productName || !description || !price || !ownerId) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        const query = "INSERT INTO our_products (productName, description, price, image, owner_id) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.promise().execute(query, [productName, description, price, imagePath, ownerId]);

        res.status(201).json({ success: true, message: 'Product added successfully', productId: result.insertId });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ success: false, message: 'Failed to add product', error: err });
    }
});

// Endpoint to get all products
router.get('/getProducts', async (req, res) => {
    try {
        const query = "SELECT * FROM our_products";
        const [rows] = await db.promise().query(query);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ success: false, message: 'Failed to fetch products', error: err });
    }
});

// Endpoint to update an existing product (including image update)
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, description, price } = req.body;
        let imagePath;
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }
        // Build the update query based on whether the image is uploaded or not.
        let query = "UPDATE our_products SET productName = ?, description = ?, price = ?";
        let params = [productName, description, price];
        if (imagePath) {
            query += ", image = ?";
            params.push(imagePath);
        }
        query += " WHERE id = ?";
        params.push(id);
        const [result] = await db.promise().execute(query, params);
        if(result.affectedRows > 0) {
            res.json({ success: true, message: 'Product updated successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found.' });
        }
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ success: false, message: 'Failed to update product', error: err });
    }
});

// DELETE endpoint to delete a product
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = "DELETE FROM our_products WHERE id = ?";
        const [result] = await db.promise().execute(query, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Product deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found.' });
        }
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ success: false, message: 'Failed to delete product', error: err });
    }
});

module.exports = router;