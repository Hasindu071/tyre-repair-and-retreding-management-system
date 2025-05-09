const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicesController');

router.get('/getRepairs', controller.getRepairs);
router.get('/getRetreadings', controller.getRetreadings);
router.get('/approvedOrders', controller.getApprovedOrders);
router.get('/getAssignedOrders', controller.getAssignedOrders);
router.get('/getPendingRepairs', controller.getPendingRepairs);
router.get('/getPendingRetreadings', controller.getPendingRetreadings);

module.exports = router;
