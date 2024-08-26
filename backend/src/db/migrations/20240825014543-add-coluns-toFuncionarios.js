'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Funcionarios','salario',{
      type: Sequelize.FLOAT,
      allowNull:true
    })
    await queryInterface.addColumn('Funcionarios','dataNascimento',{
      type: Sequelize.STRING,
      allowNull:true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Funcionarios','salario',{
      type: Sequelize.FLOAT,
      allowNull:true
    })
    await queryInterface.addColumn('Funcionarios','dataNascimento',{
      type: Sequelize.STRING,
      allowNull:true
    })
  }
};
