const { Funcionarios, Servicos, Receita } = require("../db/models")
const { Sequelize } = require('sequelize');
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
        totalSalario: parseFloat(funcionario.dataValues.totalServicos || 0) + parseFloat(funcionario.salario)
      }));

      res.status(200).json(resultado);

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }

  }

  async AnaliseFinanceiraMensal(req, res) {
    try {

      const totalLucroReceita = await Receita.findAll({
        where: {
          lucro: true,
        },
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('valorReceita')), 'total_Lucro'], // Soma dos valores
          [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), 'month'], // Extrai o mês
        ],
        group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')], // Agrupa por mês
        order: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')], // Ordena por mês
      });

      const TotalDefictReceita = await Receita.findAll({
        where: {
          lucro: false,
        },
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('valorReceita')), 'total_Gasto'], // Soma dos valores
          [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), 'month'], // Extrai o mês
        ],
        group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')], // Agrupa por mês
        order: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')], // Ordena por mês
      });



      const TotalGastoServico = await Servicos.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('valorGasto')), 'total_gasto'], // Soma dos gastos
          [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), 'month'], // Extrai o mês
        ],
        group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')], // Agrupamento por mês
        order: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')], // Ordenação por mês
      });

      // Mapear resultados de lucro e gastos por mês
      const lucroMap = totalLucroReceita.reduce((acc, item) => {
        const month = item.dataValues.month;
        const totalLucroReceita = parseFloat(item.dataValues.total_Lucro) || 0;
        acc[month] = {
          totalLucroReceita
        };
        return acc;
      }, {});

      const defictMap = TotalDefictReceita.reduce((acc, item) => {
        const month = item.dataValues.month;
        const TotalDefictReceita = parseFloat(item.dataValues.total_Gasto) || 0;
        acc[month] = {
          TotalDefictReceita
        };
        return acc;
      }, {});


      const gastoMap = TotalGastoServico.reduce((acc, item) => {
        const month = item.dataValues.month;
        const totalGasto = parseFloat(item.dataValues.total_gasto) || 0;
        acc[month] = {
          totalGasto
        };
        return acc;
      }, {});

      // Unificar os dados em um único array
      const combinedResult = Array.from({
        length: 12
      }, (_, index) => {
        const month = index + 1;
        return {
          month,
          totalLucroReceita: lucroMap[month]?.totalLucroReceita || 0,
          totalGasto: (gastoMap[month]?.totalGasto || 0) + (defictMap[month]?.TotalDefictReceita || 0),
        };
      });

      return res.status(200).json(combinedResult)

    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }

}

module.exports = DashboardFinanceiroService;