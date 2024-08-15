"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
      // Define o relacionamento com o modelo DespesaFuncionario
      Service.hasMany(models.DespesaFuncionario, {
        foreignKey: "serviceId",
        as: "despesas", // Alias para acessar as despesas relacionadas
      });
    }
  }

  Service.init(
    {
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
      tableName: "Services", // Nome da tabela no banco de dados
    }
  );

  return Service;
};
