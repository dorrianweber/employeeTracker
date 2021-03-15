const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
  {
    // Manually define the primary key
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      salary: {
        type: DataTypes.DECIMAL
      },
      department_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      timestamps: false,
      // Prevent sequelize from renaming the table
      freezeTableName: true,
      underscored: true,
      modelName: 'role'
    }
  );
  
  module.exports = Role;