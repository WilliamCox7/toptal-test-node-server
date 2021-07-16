const mysql = require("promise-mysql");

let Connection;

module.exports = function() {
  if (Connection) return Connection;
  const mysql_master = mysql.createPool(process.env.JAWSDB_URL);
  Connection = {
    query: mysql_master.query.bind(mysql_master),
    escape: mysql_master.escape.bind(mysql_master)
  };
  return Connection;
}