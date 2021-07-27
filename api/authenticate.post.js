const jwt = require("jsonwebtoken");
const modules = require("../modules");

module.exports = (req, res) => {

  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

    if (err) {
      return res.status(403).send({ message: err });
    }

    if (!decoded.email || !decoded.expiration) {
      return res.status(403).send({ message: "JWT Verification Failed" });
    }

    if (decoded.expiration < new Date()) {
      return res.status(403).send({ message: "Token Has Expired" });
    }

    let user = await modules.findUser(decoded.email);
    if (user) {
      delete user.password;
      return res.status(200).send({ user });
    }

    else return res.status(401).send({ message: "Incorrect Username" });

  });

}