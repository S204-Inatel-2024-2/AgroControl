'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicos extends Model {

    static associate(models) {
      //relacionamento com a tabela de Tipos de serviço
      Servicos.belongsTo(models.Service,{
        foreignKey:'tipoServico'
      })
    }

    static associate(models) {
      //relacionamento com a tabela de Funcionários
      Servicos.belongsTo(models.Funcionarios,{
        foreignKey:'tipoServico'
      })
    }


  }
  Servicos.init({
    IdServico:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    } ,
    status: {
      type:DataTypes.STRING,
      allowNull:false
    },
    dataAtividade: {
     type: DataTypes.DATE,
     allowNull:false
    },
    tipoServico: {
       type:DataTypes.INTEGER,
       allowNull:false,
       references: {
        model: 'TiposServico',
        key: 'id'
      }

    },
    responsavel:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Funcionarios',
        key: 'id'
      }

    },
    valorGasto:{
      type:DataTypes.FLOAT,
      allowNull:false
    }, 
  }, {
    sequelize,
    modelName: 'Servicos',
    tableName: 'Servicos',
    timestamps:false
  });
  return Servicos;
};