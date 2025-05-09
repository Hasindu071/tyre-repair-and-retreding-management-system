const express = require('express');
const router = express.Router();
const { getWorkerProfile } = require('../controllers/workerProfileController');

router.get('/getWorker/:id', getWorkerProfile);

module.exports = router;
