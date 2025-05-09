// workerRegisterRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const workerController = require('./workerRegisterController');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('profilePicture'), workerController.registerWorker);
router.get('/', workerController.getAllWorkers);
router.put('/:id', workerController.updateWorkerStatus);
router.put('/update-status/:id', workerController.updateWorkerStatus); // Optional alias route
router.get('/approveWorker', workerController.getApprovedWorkers);

module.exports = router;
