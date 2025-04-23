const db = require('../config/db');

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  create: async (userData) => {
    const { name, email, phone, dob, address } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, phone, dob, address) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, dob, address]
    );
    return result;
  },

  update: async (id, userData) => {
    const { name, email, phone, dob, address } = userData;
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, dob = ?, address = ? WHERE id = ?',
      [name, email, phone, dob, address, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
  },
};

module.exports = User;
