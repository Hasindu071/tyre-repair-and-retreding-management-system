// routes/retreadingRoutes.js
const express = require('express');
const retreadingController = require('../controller/retreadingController');
const router = express.Router();

// Route to submit a retreading form
router.post('/submit', retreadingController.submitRetreading);

// Route to get a retreading by ID
router.get('/getRetreading/:id', retreadingController.getRetreadingById);

// Route to get all approved retreadings
router.get('/approvedRetreadings', retreadingController.getApprovedRetreadings);

// Route to approve retreading
router.put('/approveRetreading/:id', retreadingController.updateRetreadingStatus);

// Route to reject retreading
router.put('/rejectRetreading/:id', retreadingController.updateRetreadingStatus);

module.exports = router;
