const conn = require("../database").connection();
const fs = require("fs");
const path = require("path")

module.exports = async ({ userId, image, name, permission, updateImage }) => {

  try {

    let uri;

    if (updateImage) {
      uri = `/assets/${Date.now().toString()}.png`
      let filename = path.join(__dirname, `..${uri}`);
      await fs.writeFileSync(filename, image, "base64");
    } else {
      uri = image;
    }

    const _userId = conn.escape(userId);

    let setImage = "";
    if (uri) {
      const _image = conn.escape(uri);
      setImage = `image = ${_image}`;
    }

    let setName = "";
    if (name) {
      const _name = conn.escape(name);
      setName = `${setImage ? "," : ""} name = ${_name}`;
    }

    let setPermission = "";
    if (permission) {
      const _permission = conn.escape(permission);
      setPermission = `${setImage || setName ? "," : ""} permission = ${_permission}`;
    }

    await conn.query(`
      UPDATE users
      SET
      ${setImage}
      ${setName}
      ${setPermission}
      WHERE id = ${_userId}
    `);

    return { uri };

  } catch(err) {
    console.log(err)
    throw(err);

  }

}