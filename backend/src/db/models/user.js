'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define o relacionamento de muitos Users para um UserType
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
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });

  return User;
};
