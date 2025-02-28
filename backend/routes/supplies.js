const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const db = require("../config/db"); // Import the database connection

const router = express.Router();
router.use(cors());
router.use(express.json());

// Get All Supplies
router.get("/", (req, res) => {
    const sql = "SELECT * FROM supplies";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);
    });
});

// Add New Supply
router.post("/", (req, res) => {
    const { name, quantity } = req.body;
    console.log("Request body:", req.body); // Log the request body
    if (!name || !quantity) {
        return res.status(400).json({ error: "Name and quantity are required" });
    }
    const sql = "INSERT INTO supplies (name, quantity) VALUES (?, ?)";
    db.query(sql, [name, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add supply" });
        }
        res.json({ message: "Supply added successfully" });
    });
});

// Delete Supply
router.delete("/:id", (req, res) => {
    const supplyId = req.params.id;
    const sql = "DELETE FROM supplies WHERE id = ?";
    db.query(sql, [supplyId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete supply" });
        }
        res.json({ message: "Supply deleted successfully" });
    });
});

module.exports = router;