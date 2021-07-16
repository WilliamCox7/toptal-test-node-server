const passport = require("passport");
const modules = require("~/modules");

module.exports = passport.authenticate("local", (err, user, info) => {
  if (err) res.status(500).send(err);
  else if (!user) res.status(401).send(info);
  else {
    const token = modules.generateToken(user.email);
    res.status(200).send({ user, token });
  }
});