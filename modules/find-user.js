const conn = require("../database").connection();

module.exports = async (email) => {

  const _email = conn.escape(email);

  const [user] = await conn.query(`
    SELECT *
    FROM users
    WHERE email = ${_email}
  `);

  return user;

}