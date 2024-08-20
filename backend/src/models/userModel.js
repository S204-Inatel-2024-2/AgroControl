'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/conecctionBD');

class User extends Model {
  static associate(models) {
    User.belongsTo(models.UserType, {
      foreignKey: 'userTypeId',
      as: 'UserTypes'
    });
  }
}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'UserTypes',
      key: 'id'
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users'
});

module.exports = User;
