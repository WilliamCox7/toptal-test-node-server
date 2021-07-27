const middleware = require("../middleware");

module.exports = function(app) {
  
  app.get("/restaurants/:userId/:permission", middleware.authwareJWT, require("./restaurants.get"));
  app.get("/reviews/:restaurantId", middleware.authwareJWT, require("./reviews.get"));
  app.get("/users", middleware.authwareJWT, require("./users.get"));

  app.post("/login", require("./login.post"));
  app.post("/authenticate", require("./authenticate.post"));
  app.post("/user", middleware.authwareJWT, require("./user.post"));
  app.post("/user/profile", middleware.authwareJWT, require("./user.profile.post"));
  app.post("/restaurant", middleware.authwareJWT, require("./restaurant.post"));
  app.post("/review", middleware.authwareJWT, require("./review.post"));
  app.post("/reply", middleware.authwareJWT, require("./reply.post"));

  app.delete("/review/:id", middleware.authwareJWT, require("./review.delete"));
  app.delete("/restaurant/:id", middleware.authwareJWT, require("./restaurant.delete"));
  app.delete("/user/:id", middleware.authwareJWT, require("./user.delete"));

}