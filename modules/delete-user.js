const conn = require("../database").connection();

module.exports = async ({ id }) => {

  let _id = conn.escape(id);

  await conn.query(`
    DELETE FROM users
    WHERE id = ${_id}
  `);

  await conn.query(`
    DELETE FROM restaurants
    WHERE ownerId = ${_id}
  `);

  await conn.query(`
    DELETE FROM reviews
    WHERE reviewerId = ${_id}
  `);

  return;

}