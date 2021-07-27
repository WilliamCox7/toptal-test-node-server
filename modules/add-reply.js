const conn = require("../database").connection();

module.exports = async ({ reviewId, reply }) => {
  
  const _reviewId = conn.escape(reviewId);
  const _reply = conn.escape(reply || null);

  return await conn.query(`
    UPDATE reviews
    SET reply = ${_reply}
    WHERE id = ${_reviewId}
  `);

}