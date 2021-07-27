const conn = require("../database").connection();
const fs = require("fs");
const path = require("path")

module.exports = async ({ id, ownerId, name, image, updateImage }) => {

  try {

    let uri;

    if (updateImage) {
      uri = `/assets/${Date.now().toString()}.png`
      let filename = path.join(__dirname, `..${uri}`);
      await fs.writeFileSync(filename, image, "base64");
    } else {
      uri = image;
    }
    
    const _id = conn.escape(id);
    const _ownerId = conn.escape(ownerId);
    const _name = conn.escape(name);
    const _image = conn.escape(uri);

    let result = await conn.query(`
      REPLACE INTO restaurants
      (id, ownerId, name, image)
      VALUES
      (${_id}, ${_ownerId}, ${_name}, ${_image})
    `);

    let response = { uri };
    if (result?.insertId) response.insertId = result.insertId;

    return response;

  } catch(err) {
    
    return;

  }

}