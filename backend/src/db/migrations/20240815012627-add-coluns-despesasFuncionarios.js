'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addColumn('DespesasFuncionarios', 'status', {
      type: Sequelize.STRING,
      allowNull: true
    }
      
    )
    
    await queryInterface.renameColumn('DespesasFuncionarios', 'diaAtividade', 'dataAtividade');
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.addColumn('DespesasFuncionarios', 'status'), {
      type: Sequelize.STRING
    }
    
    await queryInterface.renameColumn('DespesasFuncionarios', 'diaAtividade', 'dataAtividade');
  }
};
