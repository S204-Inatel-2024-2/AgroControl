'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Receita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a parte do Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definindo a associação com o modelo Categoria
      Receita.belongsTo(models.Categoria, {
        foreignKey: 'idCategoria',
        as: 'categoria', // Nome do alias para a associação
      });
    }
  }

  Receita.init({
    lucro: DataTypes.BOOLEAN,
    valorReceita: DataTypes.FLOAT,
    observacao: DataTypes.TEXT,
    idCategoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Receita',
  });

  return Receita;
};
