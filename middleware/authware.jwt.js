const jwt = require("jsonwebtoken");
const modules = require("../modules");

module.exports = (req, res, next) => {
  
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    if (!token) return res.status(403).send({ message: "No Token" });

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
      if (user) return next();
  
      else return res.status(401).send({ message: "Incorrect Username" });
  
    });

  } else {

    return res.status(403).send({ message: "Bad Auth Header" });
    
  }

}