'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    // Define o relacionamento de muitos Users para um UserType
    User.belongsTo(models.UserType, {
      foreignKey: 'userTypeId',
      as: 'UserTypes'
    });
  };

  return User;
};