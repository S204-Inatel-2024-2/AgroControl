"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Receita, {
        foreignKey: "idCategoria",
        as: "receitas",
      });
    }
  }
  Categoria.init(
    {
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Categoria",
      tableName: "Categoria",
    }
  );
  return Categoria;
};
