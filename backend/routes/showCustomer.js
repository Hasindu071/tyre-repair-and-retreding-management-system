const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to fetch all customer details
router.get("/customers", async (req, res) => {
  try {
    const query = `
      SELECT id AS customer_id, firstName AS customer_name, email AS customer_email, nic AS customer_nic,
             phone1 AS customer_phone1, phone2 AS customer_phone2, houseName AS customer_address1, city AS customer_address2, state AS customer_address3 
      FROM customer_register;
    `;

    const [customers] = await db.promise().execute(query);
    res.status(200).json(customers);
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ message: "Failed to retrieve customers" });
  }
});

module.exports = router;