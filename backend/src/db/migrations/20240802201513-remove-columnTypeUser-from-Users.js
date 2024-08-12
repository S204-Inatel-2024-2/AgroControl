'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'TypeUser');
  },

  async down (queryInterface, Sequelize) {

  }
};
