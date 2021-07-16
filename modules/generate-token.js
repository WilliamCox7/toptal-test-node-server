const jwt = require("jsonwebtoken");

module.exports = function generate(email) {
  let date = new Date();
  date = date.addDays(1000);
  return jwt.sign({ email, expiration: date }, process.env.JWT_SECRET);
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}