"use strict";
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/conecctionBD'); 

class DespesasFuncionarios extends Model {
  static associate(models) {
    this.belongsTo(models.Services, {
      foreignKey: 'serviceId',
      as: 'service'
    });
    this.belongsTo(models.Users, {
      foreignKey: 'usersId',
      as: 'user'
    });
  }
}

DespesasFuncionarios.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dataAtividade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valorGasto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Services',
      key: 'id',
    },
  },
  usersId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'DespesasFuncionarios',
  tableName: 'DespesasFuncionarios',
  timestamps: false, 
});

module.exports = DespesasFuncionarios;
