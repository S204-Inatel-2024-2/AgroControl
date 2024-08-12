'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    
    static associate(models) {
  
    }
  }
  UserType.init({
    Id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserType',
  });
  UserType.associate = function(models) {
    // Define o relacionamento de um UserType para muitos Users
    UserType.hasMany(models.User, {
      foreignKey: 'userTypeId',
      as: 'Users'
    });
  };
  return UserType;
};