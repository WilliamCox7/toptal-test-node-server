module.exports = function(app) {
  
  app.get("/restaurants/:userId/:permission", require("./restaurants.get"));
  app.get("/reviews/:restaurantId", require("./reviews.get"));
  app.get("/users", require("./users.get"));

  app.post("/login", require("./login.post"));
  app.post("/authenticate", require("./authenticate.post"));
  app.post("/user", require("./user.post"));
  app.post("/user/profile", require("./user.profile.post"));
  app.post("/restaurant", require("./restaurant.post"));
  app.post("/review", require("./review.post"));
  app.post("/reply", require("./reply.post"));

  app.delete("/review/:id", require("./review.delete"));
  app.delete("/restaurant/:id", require("./restaurant.delete"));
  app.delete("/user/:id", require("./user.delete"));

}