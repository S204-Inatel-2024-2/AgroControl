'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/conecctionBD');

class UserType extends Model {
  static associate(models) {
    UserType.hasMany(models.User, {
      foreignKey: 'userTypeId',
      as: 'Users'
    });
  }
}

UserType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'UserType',
  tableName: 'UserTypes'
});

module.exports = UserType;
