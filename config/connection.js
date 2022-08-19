//import the Sequilize constructor from the library
const Sequilize = require("sequelize");
//importing hashed sensitive info
require("dotenv").config();

//create connection to our database, pass in your MYSQL info for username and password
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequilize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequilize(
    process.env.DB_NAME,
    process.env.DB_USR,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: "3306",
    }
  );
}

module.exports = sequelize;
