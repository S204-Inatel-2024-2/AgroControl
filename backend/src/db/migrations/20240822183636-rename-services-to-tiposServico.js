'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('Services','TiposServico')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Services','TiposServico')
  }
};
