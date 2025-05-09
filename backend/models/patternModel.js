const db = require('../config/db');

exports.replacePattern = (patternNum, imagePath) => {
    const query = "REPLACE INTO tire_patterns (pattern_num, image_path) VALUES (?, ?)";
    return db.promise().execute(query, [patternNum, imagePath]);
};

exports.fetchAllPatterns = () => {
    const query = "SELECT pattern_num AS id, image_path AS imageUrl FROM tire_patterns";
    return db.promise().query(query);
};
