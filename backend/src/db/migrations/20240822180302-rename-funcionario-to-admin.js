'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('Funcionario','Admin')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Funcionario','Admin')
  }
};
