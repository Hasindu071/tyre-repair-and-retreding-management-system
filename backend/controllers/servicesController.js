const servicesModel = require('../models/servicesModel');

const getRepairs = async (req, res) => {
  try {
    const repairs = await servicesModel.getRepairs();
    res.status(200).json(repairs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve repair services' });
  }
};

const getRetreadings = async (req, res) => {
  try {
    const retreadings = await servicesModel.getRetreadings();
    res.status(200).json(retreadings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve retreading services' });
  }
};

const getApprovedOrders = async (req, res) => {
  try {
    const approvedOrders = await servicesModel.getApprovedOrders();
    res.status(200).json(approvedOrders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error fetching approved orders', error: error.message });
  }
};

const getAssignedOrders = async (req, res) => {
  try {
    const workerId = req.query.workerId;
    const orders = await servicesModel.getAssignedOrders(workerId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error fetching assigned orders', error: error.message });
  }
};

const getPendingRepairs = async (req, res) => {
  try {
    const repairs = await servicesModel.getPendingRepairs();
    res.status(200).json(repairs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve pending repair services' });
  }
};

const getPendingRetreadings = async (req, res) => {
  try {
    const retreadings = await servicesModel.getPendingRetreadings();
    res.status(200).json(retreadings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve pending retreading services' });
  }
};

module.exports = {
  getRepairs,
  getRetreadings,
  getApprovedOrders,
  getAssignedOrders,
  getPendingRepairs,
  getPendingRetreadings
};
