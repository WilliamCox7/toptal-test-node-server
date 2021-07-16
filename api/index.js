module.exports = function(app) {
  
  app.post("/login", require("./login.post"));
  app.post("/authenticate", require("./authenticate.post"));
  app.post("/user", require("./user.post"));

}