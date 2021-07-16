const conn = require("database")();

module.exports = async (name, email, password) => {

  const _name = conn.escape(name);
  const _email = conn.escape(email);
  const _password = conn.escape(password);

  return await conn.query(`
    INSERT INTO users
    (name, email, password)
    VALUES
    (${_name}, ${_email}, ${_password})
  `);

}