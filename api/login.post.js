const passport = require("passport");
const modules = require("../modules");

module.exports = (req, res) => {
  return passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send({ message: err });
    else if (!user) return res.status(401).send(info);
    else {
      const token = modules.generateToken(user.email);
      return res.status(200).send({ user, token });
    }
  })(req, res);
}