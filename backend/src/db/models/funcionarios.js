'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionarios extends Model {
   
    static associate(models) {
      Funcionarios.hasMany(models.Servicos, {
        foreignKey: 'responsavel', // Chave estrangeira em Servicos referenciando Funcionarios
        as: 'servicos' // Alias para o relacionamento
      });
    }
  }
  Funcionarios.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    funcao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Funcionarios',
    tableName: 'Funcionarios', // Nome da tabela no banco de dados
  });
  return Funcionarios;
};