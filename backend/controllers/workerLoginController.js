const express = require('express');
const router = express.Router();
const workerLoginController = require('../controllers/workerLoginController');

router.post('/login', workerLoginController.loginWorker);

module.exports = router;
