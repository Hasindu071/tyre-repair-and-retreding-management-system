const CustomerModel = require('../models/showCustomerModel');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.fetchAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ message: "Failed to retrieve customers" });
  }
};

module.exports = { getAllCustomers };
