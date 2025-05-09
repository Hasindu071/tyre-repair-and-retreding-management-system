const express = require('express');
const router = express.Router();
const ownerLoginController = require('../controllers/ownerLoginController');

router.post('/login', ownerLoginController.loginOwner);

module.exports = router;
