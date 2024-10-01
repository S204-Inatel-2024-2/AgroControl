'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Receita, {
        foreignKey: 'idCategoria',
        as: 'receitas',
      });
    }
  }
  Categoria.init({
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};