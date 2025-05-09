const express = require('express');
const router = express.Router();
const OwnerRegisterController = require('../controllers/ownerRegisterController');

// POST /api/owner/register
router.post('/', OwnerRegisterController.register);

module.exports = router;
