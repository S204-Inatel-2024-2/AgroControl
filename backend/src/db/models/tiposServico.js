"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class TiposServico extends Model {
    static associate(models) {
      TiposServico.hasMany(models.Servicos, {
        foreignKey: 'tipoServico', // Chave estrangeira em Servicos referenciando TiposServico
        as: 'servicos' // Alias para o relacionamento
      });
     
    }
  }

  TiposServico.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TiposServico",
      tableName: "TiposServico", // Nome da tabela no banco de dados
      timestamps: false // Desabilita timestamps se não for necessário
    }
  );

  return TiposServico;
};
