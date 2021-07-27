const modules = require("../modules");

module.exports = async (req, res) => {

  try {
    
    let result = await modules.addReview(req.body);
    return res.status(200).send(result);

  } catch(err) {

    return res.status(500).send({ message: err });

  }
  
}