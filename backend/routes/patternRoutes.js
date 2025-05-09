const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const patternController = require('../controllers/patternController');

// Multer config
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = path.join(__dirname, '../assets/pattern');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        const patternNum = req.body.patternNum;
        const ext = path.extname(file.originalname);
        cb(null, `pattern${patternNum}${ext}`);
    }
});

const upload = multer({ storage });

// Routes
router.post('/update', upload.single('image'), patternController.updatePattern);
router.get('/getAll', patternController.getAllPatterns);

module.exports = router;
