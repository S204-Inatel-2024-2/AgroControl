'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Admin extends Model {

  }

  Admin.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },/*
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },*/
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin'
  });

  return Admin;
};
