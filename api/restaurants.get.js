const modules = require("../modules");

module.exports = async (req, res) => {

  try {

    let restaurants = await modules.getRestaurants(req.params);
    return res.status(200).send(restaurants);

  } catch(err) {

    return res.status(500).send({ message: err });

  }
  
}