const modules = require("../modules");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {

  const { name, email, password } = req.body;

  let user = await modules.findUser(email);
  if (user) return res.status(500).send({ message: "User Already Exists" });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  await modules.createUser(name, email, hash);

  const token = modules.generateToken(email);
  user = await modules.findUser(email);
  delete user.password;
  
  return res.status(200).send({ user, token });

}