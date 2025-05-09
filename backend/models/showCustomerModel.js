const db = require('../config/db');

const fetchAllCustomers = async () => {
  const query = `
    SELECT id AS customer_id, firstName AS customer_name, email AS customer_email, nic AS customer_nic,
           phone1 AS customer_phone1, phone2 AS customer_phone2,
           houseName AS customer_address1, city AS customer_address2, state AS customer_address3 
    FROM customer_register;
  `;
  const [rows] = await db.promise().execute(query);
  return rows;
};

module.exports = { fetchAllCustomers };
