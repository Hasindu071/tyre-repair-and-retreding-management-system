// controller/retreadingController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const RetreadingModel = require('../model/retreadingModel');

// Set up multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Submit Retreading Form
exports.submitRetreading = [
  upload.fields([{ name: 'insidePhoto' }, { name: 'outsidePhoto' }]),
  async (req, res) => {
    const {
      sizeCode, wheelDiameter, tireWidth, tireBrand, tirePattern, completionDate,
      tireStructure, notes, needDeliveryService, userId
    } = req.body;

    const internalStructure = tireStructure;
    const receiveDate = new Date().toISOString().split('T')[0];

    const insidePhoto = req.files?.insidePhoto ? `/uploads/${req.files.insidePhoto[0].filename}` : null;
    const outsidePhoto = req.files?.outsidePhoto ? `/uploads/${req.files.outsidePhoto[0].filename}` : null;

    if (!sizeCode || !wheelDiameter || !tireWidth || !tireBrand || !tirePattern || !completionDate || !tireStructure) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    try {
      // Generate new service ID for retreading
      const [rows] = await db.promise().query(
        'SELECT service_id FROM services WHERE service_id LIKE "RD_%" ORDER BY service_id DESC LIMIT 1'
      );

      let newServiceId = 'RD_00001';
      if (rows.length > 0 && rows[0].service_id) {
        const lastIdNumber = parseInt(rows[0].service_id.split('_')[1]);
        newServiceId = `RD_${(lastIdNumber + 1).toString().padStart(5, '0')}`;
      }

      const serviceData = [newServiceId, tireBrand, internalStructure, receiveDate, notes, needDeliveryService, 'Pending', userId, 0];
      RetreadingModel.createRetreading(serviceData, (err) => {
        if (err) {
          console.error('Error creating retreading service:', err);
          return res.status(500).json({ message: 'Server error submitting retreading.', error: err.message });
        }

        const retreadingData = [sizeCode, wheelDiameter, tireWidth, tirePattern, insidePhoto, outsidePhoto];
        RetreadingModel.insertRetreadingData(newServiceId, retreadingData, (err) => {
          if (err) {
            console.error('Error inserting retreading data:', err);
            return res.status(500).json({ message: 'Server error inserting retreading data.', error: err.message });
          }

          res.status(200).json({ message: 'Retreading form submitted successfully!' });
        });
      });
    } catch (err) {
      console.error('Error submitting retreading:', err);
      res.status(500).json({ message: 'Server error submitting retreading.', error: err.message });
    }
  }
];

// Get Retreading by ID
exports.getRetreadingById = async (req, res) => {
  try {
    const [rows] = await RetreadingModel.getRetreadingById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Retreading not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching retreading:', err);
    res.status(500).json({ message: 'Server error fetching retreading.', error: err.message });
  }
};

// Get Approved Retreadings
exports.getApprovedRetreadings = async (req, res) => {
  try {
    const [rows] = await RetreadingModel.getApprovedRetreadings();
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching approved retreadings:', err);
    res.status(500).json({ message: 'Server error fetching approved retreadings.' });
  }
};

// Update Retreading Status
exports.updateRetreadingStatus = async (req, res) => {
  const { id, status } = req.params;
  const note = req.body.note;

  if (status === 'Rejected' && note) {
    const [rows] = await db.promise().query("SELECT customer_ID FROM services WHERE service_id = ?", [id]);
    if (rows.length > 0) {
      const customerId = rows[0].customer_ID;
      RetreadingModel.insertRejectOrder(id, customerId, note, (err) => {
        if (err) {
          console.error('Error inserting reject order:', err);
          return res.status(500).json({ message: 'Error inserting reject order.' });
        }
      });
    }
  }

  RetreadingModel.updateStatusByServiceId(id, status, (err) => {
    if (err) {
      console.error(`Error updating status to ${status}:`, err);
      return res.status(500).json({ message: 'Error updating status.' });
    }
    res.status(200).json({ message: `Retreading ${status} successfully.` });
  });
};
