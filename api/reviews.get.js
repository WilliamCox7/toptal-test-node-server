const modules = require("../modules");

module.exports = async (req, res) => {

  try {

    let reviews = await modules.getReviews(req.params);
    return res.status(200).send(reviews);

  } catch(err) {

    return res.status(500).send({ message: err });

  }
  
}