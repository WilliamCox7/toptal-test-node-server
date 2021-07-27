const modules = require("../modules");

module.exports = async (req, res) => {

  try {

    let users = await modules.getUsers();
    return res.status(200).send(users);

  } catch(err) {

    return res.status(500).send({ message: err });

  }
  
}