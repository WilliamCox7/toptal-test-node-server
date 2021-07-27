const modules = require("../modules");

module.exports = async (req, res) => {

  try {

    await modules.deleteReview(req.params);
    return res.status(200).send({});

  } catch(err) {

    return res.status(500).send({ message: err });

  }
  
}