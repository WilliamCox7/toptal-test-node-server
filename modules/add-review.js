const conn = require("../database").connection();

module.exports = async ({ id, restaurantId, reviewerId, rating, review, reply }) => {
  
  const _id = conn.escape(id);
  const _restaurantId = conn.escape(restaurantId);
  const _reviewerId = conn.escape(reviewerId);
  const _rating = conn.escape(rating);
  const _review = conn.escape(review);
  const _reply = conn.escape(reply || null);

  let result = await conn.query(`
    REPLACE INTO reviews
    (id, restaurantId, reviewerId, rating, review, reply)
    VALUES
    (${_id}, ${_restaurantId}, ${_reviewerId}, ${_rating}, ${_review}, ${_reply})
  `);

  let [{ avgRating }] = await conn.query(`
    SELECT AVG(rating) as avgRating
    FROM reviews
    WHERE restaurantId = ${_restaurantId}
  `);

  return { avgRating, insertId: result.insertId };

}