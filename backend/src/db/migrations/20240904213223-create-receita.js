'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Receita', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lucro: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      valorReceita: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      idCategoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categoria', // Nome da tabela de Categoria
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Receita');
  }
};
