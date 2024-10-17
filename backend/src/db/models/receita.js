"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Receita extends Model {
    static associate(models) {
      // Definindo a associação com o modelo Categoria
      Receita.belongsTo(models.Categoria, {
        foreignKey: "idCategoria",
        as: "categoria", // Nome do alias para a associação
      });
    }
  }

  Receita.init(

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      lucro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      valorReceita: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      observacao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categoria",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Receita",
      tableName: "Receita",
    }
  );

  return Receita;
};
