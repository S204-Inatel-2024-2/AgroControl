const {
  Funcionarios,
  Servicos,

} = require("../db/models")
const {
  Sequelize
} = require('sequelize');
class DashboardFinanceiroService {

  async SalarioFuncionarios(req, res) {
    try {
      const funcionarios = await Funcionarios.findAll({
        attributes: ['id', 'nome', 'salario'],
        include: [{
          model: Servicos,
          as: 'servicos', // Usando o alias configurado
          attributes: [] // Não queremos detalhes dos serviços individuais, apenas a soma
        }],
        attributes: {
          include: [
            [
              Sequelize.fn('SUM', Sequelize.col('servicos.valorGasto')),
              'totalServicos'
            ]
          ]
        },
        group: ['Funcionarios.id']
      });

      const resultado = funcionarios.map((funcionario) => ({
        id: funcionario.id,
        nome: funcionario.nome,
        salario: funcionario.salario,
        totalServicos: funcionario.dataValues.totalServicos || 0,
        totalSalario: parseFloat(funcionario.dataValues.totalServicos) + parseFloat(funcionario.salario)
      }));



      res.status(200).json(resultado);

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }

  }

}

module.exports = DashboardFinanceiroService;