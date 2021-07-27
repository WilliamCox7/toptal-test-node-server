const conn = require("../database").connection();

module.exports = async ({ id }) => {

  let _id = conn.escape(id);

  return await conn.query(`
    DELETE FROM reviews
    WHERE id = ${_id}
  `);

}