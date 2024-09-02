'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Servicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdServico: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      dataAtividade: {
        type: Sequelize.DATE
      },
      tipoServico: {
        type: Sequelize.INTEGER
      },
      responsavel: {
        type: Sequelize.INTEGER
      },
      valorGasto: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Servicos');
  }
};