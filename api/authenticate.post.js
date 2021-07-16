const jwt = require("jsonwebtoken");
const modules = require("~/modules");

module.exports = async (req, res) => {

  const { token } = req.query;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.status(403).send({ err });
    }

    if (!decoded.email || !decoded.expiration) {
      return res.status(403).send({ err: "jwt verification failed" });
    }

    if (decoded.expiration < new Date()) {
      return res.status(403).send({ err: "token has expired" });
    }

    let user = await modules.findUser(decoded.email);
    if (!user) return res.status(401).send({ err: "incorrect username" });
    else res.status(200).send({ user });

  });

}