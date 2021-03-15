// DEPENDENCIES
const Sequelize = require('sequelize');
require('dotenv').config();

// CREATING CONNECTION OBJECT
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      // Database location
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
);

// EXPORTING
module.exports = sequelize;