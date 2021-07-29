const conn = require("../database").connection();

module.exports = async ({ userId, permission }) => {

  let _userId = conn.escape(userId);
  
  let WHERE_CLAUSE = permission !== "owner" ? `` : `
    WHERE r.ownerId = ${_userId}
  `;

  let USER_JOIN_SELECTS = permission === "owner" ? `` : `
    ,c.userReviewId, c.userRating, c.userReview
  `;

  let USER_JOIN_CLAUSE = permission === "owner" ? `` : `
    LEFT JOIN (
      SELECT id as userReviewId, rating as userRating, review as userReview, restaurantId
      FROM reviews
      WHERE reviewerId = ${_userId}
    ) c
    ON c.restaurantId = r.id
  `;

  let results = await conn.query(`
    SELECT
      r.*,
      a.reviewId, a.restaurantId, a.reviewerId, a.date, a.rating, a.review, a.reply, a.userName, a.userImage,
      b.reviewCount, b.avgRating
      ${USER_JOIN_SELECTS}
    FROM restaurants as r

    LEFT JOIN (
      SELECT reviews.id as reviewId, restaurantId, reviewerId, date, rating, review, reply, users.name as userName, users.image as userImage
      FROM reviews
      INNER JOIN users
      ON reviewerId = users.id
    ) a

    ON a.restaurantId = r.id

    LEFT JOIN (
      SELECT COUNT(*) as reviewCount, AVG(rating) as avgRating, restaurantId
      FROM reviews
      GROUP BY restaurantId
    ) b

    ON b.restaurantId = r.id

    ${USER_JOIN_CLAUSE}

    ${WHERE_CLAUSE}
  `);

  let restaurants = {};

  results.forEach(r => {
    if (!restaurants[r.restaurantId]) restaurants[r.restaurantId] = r;
    else if (r.review && !r.reply) restaurants[r.restaurantId] = r;
  });

  return Object.values(restaurants);

}