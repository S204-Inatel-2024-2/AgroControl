'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Receita',
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    )
    await queryInterface.addColumn('Receita',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Receita', 'createdAt')
    await queryInterface.removeColumn('Receita', 'updatedAt')
  }
};
