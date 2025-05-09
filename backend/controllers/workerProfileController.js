const WorkerModel = require('../models/workerProfileModel');

const getWorkerProfile = async (req, res) => {
    const workerId = req.params.id;

    try {
        const rows = await WorkerModel.getWorkerById(workerId);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        console.error("Error fetching worker details:", error);
        res.status(500).json({ message: 'Server error retrieving worker details' });
    }
};

module.exports = { getWorkerProfile };
