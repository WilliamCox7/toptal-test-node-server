const conn = require("../database").connection();

module.exports = async () => {

  return await conn.query(`
    SELECT id, name, image, email, permission
    FROM users
  `);

}