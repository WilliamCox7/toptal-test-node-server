const conn = require("../database").connection();

module.exports = async ({ restaurantId }) => {
  
  let _restaurantId = conn.escape(restaurantId);

  const reviews = await conn.query(`
    SELECT reviews.*, users.id as userId, users.name, users.image, users.email, users.permission
    FROM reviews
    LEFT JOIN users
    ON reviews.reviewerId = users.id
    WHERE restaurantId = ${_restaurantId}
  `);

  return reviews;

}