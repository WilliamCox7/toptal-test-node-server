const conn = require("../database").connection();

module.exports = async ({ userId, permission }) => {

  let _userId = conn.escape(userId);
  
  let WHERE_CLAUSE = permission === "regular" || permission === "admin" ? `` : `
    WHERE reply IS NULL AND review IS NOT NULL
  `;

  let results = await conn.query(`
    SELECT
      r.*,
      a.reviewId, a.restaurantId, a.reviewerId, a.date, a.rating, a.review, a.reply, a.userName, a.userImage,
      b.reviewCount, b.avgRating,
      c.userRating
    FROM restaurants as r

    LEFT JOIN (
      SELECT reviews.id as reviewId, restaurantId, reviewerId, date, rating, review, reply, users.name as userName, users.image as userImage
      FROM reviews
      INNER JOIN users
      ON reviewerId = users.id
      ${WHERE_CLAUSE}
    ) a

    ON a.restaurantId = r.id

    LEFT JOIN (
      SELECT COUNT(*) as reviewCount, AVG(rating) as avgRating, restaurantId
      FROM reviews
      GROUP BY restaurantId
    ) b

    ON b.restaurantId = r.id

    LEFT JOIN (
      SELECT rating as userRating, restaurantId
      FROM reviews
      WHERE reviewerId = ${_userId}
    ) c

    ON c.restaurantId = r.id
  `);
  
  let restaurants = results.filter((a, i, self) => !a.restaurantId || self.findIndex(b => b.restaurantId === a.restaurantId) === i);

  return restaurants;

}