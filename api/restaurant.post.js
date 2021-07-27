const modules = require("../modules");

module.exports = async (req, res) => {

  try {
    
    let imageUrl = await modules.addRestaurant(req.body);
    return res.status(200).send(imageUrl);

  } catch(err) {

    return res.status(500).send({ message: err });

  }
  
}