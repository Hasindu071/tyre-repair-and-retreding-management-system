const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const db = require("../config/db"); // Your database connection

const router = express.Router();
router.use(cors());
router.use(express.json());

// GET: Fetch all supplier names
router.get("/supplier", (req, res) => {
    const sql = "SELECT * FROM supplies";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching supplier names:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// POST: Add a new supply
router.post("/", (req, res) => {
    console.log("Received new supply request:", req.body);

    const { name, address, company_name, phone_number } = req.body;

    // Validate that all required supply fields are provided.
    if (!name || !address || !company_name || !phone_number) {
        console.error("Missing required fields:", { name, address, company_name, phone_number });
        console.log("Error: Please fill all supply fields.");
        return res.status(400).json({ error: "Please fill all supply fields." });
    }
    
    // Format current datetime for MySQL (YYYY-MM-DD HH:MM:SS)
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
    console.log("Formatted date for insertion:", formattedDate);

    // Build and execute the SQL query to insert the new supply.
    const sqlSupply = "INSERT INTO supplies (name, address, company_name, phone_number, date_added) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlSupply, [name, address, company_name, phone_number, formattedDate], (err, result) => {
        if (err) {
            console.error("Insert supply error:", err);
            return res.status(500).json({ error: "Failed to add supply" });
        }
        console.log("Supply inserted successfully, result:", result);
        res.status(201).json({ message: "Supply added successfully", supplyId: result.insertId });
    });
});


// DELETE a supply by id
router.delete("/:id", (req, res) => {
    const supplyId = req.params.id;
    const sql = "DELETE FROM supplies WHERE id = ?";
    db.query(sql, [supplyId], (err, result) => {
        if (err) {
            console.error("Delete supply error:", err);
            return res.status(500).json({ error: "Failed to delete supply" });
        }
        res.json({ message: "Supply deleted successfully" });
    });
});

// DELETE /supplies/inventory/:id - Delete an inventory record by its ID
router.delete('/inventory/:id', async (req, res) => {
  const inventoryId = req.params.id;
  try {
    const query = 'DELETE FROM inventory WHERE id = ?';
    const [result] = await db.promise().query(query, [inventoryId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }
    res.status(200).json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res.status(500).json({ message: 'Error deleting inventory', error: error.message });
  }
});

router.post("/inventory", async (req, res) => {
    const { product_name, supplierName, quantity, amount } = req.body;
  
    console.log("Received inventory request:", req.body);
  
    // Basic validation: ensure product_name, supplierName, and quantity are provided.
    // The amount field is optional and will default to 0 if not provided.
    if (
      !product_name || product_name.trim() === "" ||
      !supplierName || supplierName.trim() === "" ||
      quantity === undefined || quantity === null || quantity === ""
    ) {
      console.error("Missing required fields in request body:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // Use 0 as default value for amount if not provided.
    const amtValue = (amount === undefined || amount === null || amount === "") ? 0 : amount;
    const amt = Number(amtValue);
    
    try {
      // Lookup product ID from products table using product_name.
      const [productRows] = await db.promise().query(
        "SELECT id FROM products WHERE name = ?",
        [product_name.trim()]
      );
      console.log("Product lookup result:", productRows);
      if (productRows.length === 0) {
        console.error("Product not found for name:", product_name);
        return res.status(404).json({ error: "Product not found" });
      }
      const productId = productRows[0].id;
  
      // Lookup supplier ID from the supplies table using supplierName.
      const [supplierRows] = await db.promise().query(
        "SELECT id FROM supplies WHERE name = ?",
        [supplierName.trim()]
      );
      console.log("Supplier lookup result:", supplierRows);
      if (supplierRows.length === 0) {
        console.error("Supplier not found for name:", supplierName);
        return res.status(404).json({ error: "Supplier not found" });
      }
      const supplierId = supplierRows[0].id;
  
      // Convert quantity and amount to numbers.
      const qty = Number(quantity);
      const amt = Number(amtValue);
      if (isNaN(qty) || isNaN(amt)) {
        console.error("Quantity and amount must be valid numbers. Received qty:", quantity, "amt:", amtValue);
        return res.status(400).json({ error: "Quantity and amount must be valid numbers" });
      }
  
      // For this example, assume stock equals quantity at insertion.
      const stock = qty;
  
      // Format current date/time for MySQL DATETIME (YYYY-MM-DD HH:MM:SS)
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
      console.log("Formatted date:", formattedDate);
  
      // Insert a new inventory record into the inventory table using columns (product_id, supplier_id, stock, quantity, amount, date).
      const insertQuery = `
        INSERT INTO inventory (product_id, supplier_id, stock, quantity, amount, date)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.promise().query(insertQuery, [
        productId,
        supplierId,
        stock,
        qty,
        amt,
        formattedDate,
      ]);
      console.log("Insert result:", result);
  
    // Update the products table stock. For example, add the inserted quantity to the current stock.
    const updateQuery = "UPDATE products SET stock = stock + ? WHERE id = ?";
    await db.promise().query(updateQuery, [qty, productId]);

    res.status(201).json({
      message: "Inventory added and product stock updated successfully",
      inventoryId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding inventory:", error);
    res.status(500).json({ error: "Failed to add inventory" });
  }
  });
  

  // GET /names: Fetch supplier names from the supplies table.
router.get("/names", async (req, res) => {
    try {
      // Select only the id and name columns from supplies.
      const [rows] = await db.promise().query("SELECT id, name FROM supplies");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching supplier names:", error);
      res.status(500).json({ error: "Failed to fetch supplier names" });
    }
  });

// GET: Fetch inventory details with product and supplier names
router.get("/inventory", async (req, res) => {
  try {
    const query = `
      SELECT 
        i.id, 
        p.name AS product_name, 
        s.name AS supplier_name, 
        i.stock, 
        i.quantity, 
        i.amount, 
        i.date 
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      JOIN supplies s ON i.supplier_id = s.id
    `;
    const [rows] = await db.promise().query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
});

  module.exports = router;