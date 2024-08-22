'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     Foi removido pelo banco a tabela de Despesas funcionarios e userType
     */
    await queryInterface.renameTable('Users','Funcionario')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Users','Funcionario')
  }
};
