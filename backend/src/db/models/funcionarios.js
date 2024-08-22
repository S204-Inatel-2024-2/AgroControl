'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Funcionarios.init({
    Id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    email: DataTypes.STRING,
    funcao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Funcionarios',
  });
  return Funcionarios;
};