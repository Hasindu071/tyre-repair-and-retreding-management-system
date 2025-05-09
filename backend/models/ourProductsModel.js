const db = require('../config/db');

const OurProductsModel = {
    add: async (productName, description, price, imagePath, ownerId) => {
        const query = `
            INSERT INTO our_products (productName, description, price, image, owner_id)
            VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.promise().execute(query, [productName, description, price, imagePath, ownerId]);
        return result;
    },

    getAll: async () => {
        const query = "SELECT * FROM our_products";
        const [rows] = await db.promise().query(query);
        return rows;
    },

    update: async (id, productName, description, price, imagePath) => {
        let query = "UPDATE our_products SET productName = ?, description = ?, price = ?";
        const params = [productName, description, price];

        if (imagePath) {
            query += ", image = ?";
            params.push(imagePath);
        }

        query += " WHERE id = ?";
        params.push(id);

        const [result] = await db.promise().execute(query, params);
        return result;
    },

    delete: async (id) => {
        const query = "DELETE FROM our_products WHERE id = ?";
        const [result] = await db.promise().execute(query, [id]);
        return result;
    }
};

module.exports = OurProductsModel;
