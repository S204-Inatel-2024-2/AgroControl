const { where } = require("sequelize");
const { Funcionarios, Servicos, Receita } = require("../db/models");

class DashboardService {
  async TotalAPagarSalario(req, res) {
    try {
      const funcionarios = await Funcionarios.findAll({
        attributes: ["nome", "salario"],
      });
      res.status(200).json(funcionarios);
    } catch (error) {
      res.status(500);
    }
  }

  async LucrosEGastos(req, res) {
    try {
      const receitas = await Receita.findAll({
        attributes: [
          "data",
          [
            Sequelize.fn("SUM", Sequelize.col("valorReceita")),
            "totalValorReceita",
          ],
        ],
        where: {
          lucro: true,
        },
        group: ["data"],
      });
      const salarios = await Funcionarios.findAll({
        attributes: [
          "data",
          [
            Sequelize.fn("SUM", Sequelize.col("valorReceita")),
            "totalValorReceita",
          ],
        ],
        group: ["data"],
      });
      const servicos = await Receita.findAll({
        attributes: [
          "data",
          [
            Sequelize.fn("SUM", Sequelize.col("valorReceita")),
            "totalValorReceita",
          ],
        ],
        group: ["data"],
      });
      const salariosPorData = {};
      salarios.forEach((item) => {
        salariosPorData[item.data] = item.get("totalValorReceita");
      });

      const servicosPorData = {};
      servicos.forEach((item) => {
        servicosPorData[item.data] = item.get("totalValorReceita");
      });

      // Unir os resultados em um único objeto
      const resultadoFinal = [];
      const datasUnicas = new Set([
        ...Object.keys(salariosPorData),
        ...Object.keys(servicosPorData),
      ]);

      datasUnicas.forEach((data) => {
        resultadoFinal.push({
          data,
          totalSalario: salariosPorData[data] || 0,
          totalServico: servicosPorData[data] || 0,
        });
      });

      res.status(200).json({ receitas, gastos: resultadoFinal });
    } catch (error) {
      res.status(500);
    }
  }

  // async TotalAPagarSalarioServico(req, res) {
  //   try {
  //     const salarioTotal = await Funcionarios.sum("salario");
  //     const valorGastoTotal = await Servicos.sum("valorGasto");
  //     const total = salarioTotal + valorGastoTotal;
  //     res.status(200).json({ total: total });
  //   } catch (error) {
  //     res.status(500);
  //   }
  // }

  // async PrejuizoReceita(req, res) {
  //   try {
  //     const prejuizoTotal = await Receita.sum("valorReceita", {
  //       where: {
  //         lucro: false,
  //       },
  //     });
  //     res.status(200).json({ total: prejuizoTotal });
  //   } catch (error) {
  //     res.status(500);
  //   }
  // }
}

module.exports = DashboardService;
