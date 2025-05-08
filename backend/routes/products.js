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

// DELETE /products/:id - Delete a product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const query = 'DELETE FROM products WHERE id = ?';
      const [result] = await db.promise().query(query, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Error deleting product" });
    }
  });
  
// PUT endpoint to decrease stock and record the worker's decrease
// This endpoint assumes that the worker's ID and the decrease amount are sent in the request body.
router.put("/decreaseStock/:id", async (req, res) => {
    const productId = req.params.id;
    const { workerId, decreaseAmount } = req.body;

    console.log(`Received decreaseStock request for productId: ${productId} with workerId: ${workerId} and decreaseAmount: ${decreaseAmount}`);

    // Validate input
    if (!workerId || !decreaseAmount || isNaN(decreaseAmount) || decreaseAmount <= 0) {
        console.error("Invalid workerId or decreaseAmount provided.");
        return res.status(400).json({ error: "Invalid workerId or decreaseAmount" });
    }

    try {
        // Verify the worker exists in worker_register table
        const [workerRows] = await db.promise().query(
            "SELECT id FROM worker_register WHERE id = ?",
            [workerId]
        );
        console.log("Worker lookup result:", workerRows);
        if (workerRows.length === 0) {
            console.error("Worker not found for workerId:", workerId);
            return res.status(400).json({ error: "Worker not found" });
        }

        // Fetch the current stock from products table
        const [productRows] = await db.promise().query(
            "SELECT stock FROM products WHERE id = ?",
            [productId]
        );
        console.log("Product lookup result:", productRows);
        if (productRows.length === 0) {
            console.error("Product not found for productId:", productId);
            return res.status(404).json({ error: "Product not found" });
        }
        const currentStock = productRows[0].stock;
        console.log(`Current stock for productId ${productId}: ${currentStock}`);
        if (decreaseAmount > currentStock) {
            console.error("Decrease amount is greater than current stock.");
            return res.status(400).json({ error: "Decrease amount cannot be greater than current stock" });
        }

        // Calculate the updated stock and update the products table
        const updatedStock = currentStock - decreaseAmount;
        console.log(`Updated stock for productId ${productId} will be: ${updatedStock}`);
        await db.promise().query(
            "UPDATE products SET stock = ? WHERE id = ?",
            [updatedStock, productId]
        );
        console.log("Products table updated successfully.");

        // Record the stock decrease in the worker_stock_decreases table
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
        console.log(`Formatted date for decrease record: ${formattedDate}`);
        const insertQuery = `
            INSERT INTO worker_stock_decreases (worker_id, product_id, decrease_amount, decrease_date)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.promise().query(insertQuery, [
            workerId,
            productId,
            decreaseAmount,
            formattedDate
        ]);
        console.log("Inserted record in worker_stock_decreases:", result);

        res.status(200).json({
            message: "Stock decreased and record saved successfully",
            updatedStock,
            recordId: result.insertId
        });
    } catch (error) {
        console.error("Error decreasing stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;