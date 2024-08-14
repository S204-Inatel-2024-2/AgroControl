"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DespesaFuncionario extends Model {
    static associate(models) {
      // Define o relacionamento com o modelo Service
      DespesaFuncionario.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service", // Alias para acessar o serviço relacionado
      });

      // Define o relacionamento com o modelo User
      DespesaFuncionario.belongsTo(models.User, {
        foreignKey: "usersId",
        as: "user", // Alias para acessar o usuário relacionado
      });
    }
  }

  DespesaFuncionario.init(
    {
      diaAtividade: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valorGasto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Services", // Nome da tabela referenciada
          key: "id",
        },
      },
      usersId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Nome da tabela referenciada
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "DespesaFuncionario",
      tableName: "DespesasFuncionarios", // Nome da tabela no banco de dados
    }
  );

  return DespesaFuncionario;
};
