// model/patternsModel.js
const db = require('../config/db');

const getAllPatterns = (callback) => {
    const query = "SELECT pattern_num AS id, image_path AS imageUrl FROM tire_patterns";
    db.query(query, callback);
};

const replacePattern = (patternNum, filePath, callback) => {
    const query = "REPLACE INTO tire_patterns (pattern_num, image_path) VALUES (?, ?)";
    db.query(query, [patternNum, filePath], callback);
};

module.exports = {
    getAllPatterns,
    replacePattern
};
