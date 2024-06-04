const { Sequelize} = require("sequelize");
require("dotenv").config();
module.exports = new Sequelize(
  process.env.DB_DATABASE || "sgidb",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || null,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql"
  }
); 