const express = require('express');
const router = express.Router();
const OurProductsController = require('../controllers/ourProductsController');
const multer = require('multer');
const path = require('path');

// Setup multer for uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), OurProductsController.add);
router.get('/getProducts', OurProductsController.getAll);
router.put('/update/:id', upload.single('image'), OurProductsController.update);
router.delete('/delete/:id', OurProductsController.delete);

module.exports = router;
