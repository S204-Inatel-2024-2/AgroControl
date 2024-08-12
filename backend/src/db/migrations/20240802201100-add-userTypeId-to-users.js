'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'userTypeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'UserTypes', // nome da tabela de UserType
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'userTypeId');
  }
};
