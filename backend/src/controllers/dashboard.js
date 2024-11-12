const DashboardService = require("../services/dashboard");
const dashboardService = new DashboardService();

class DashboardController {
  static async getTotalAPagarSalario(req, res) {
    try {
      await dashboardService.TotalAPagarSalario(req, res);
    } catch {
      res.status(400).send({ message: error.message });
    }
  }

  static async getLucrosEGastos(req, res) {
    try {
      await dashboardService.LucrosEGastos(req, res);
    } catch {
      res.status(400).send({ message: error.message });
    }
  }

  //   static async getTotalAPagarSalarioServico(req, res) {
  //     try {
  //       await dashboardService.TotalAPagarSalarioServico(req, res);
  //     } catch {
  //       res.status(400).send({ message: error.message });
  //     }
  //   }

  //   static async getPrejuizoReceita(req, res) {
  //     try {
  //       await dashboardService.PrejuizoReceita(req, res);
  //     } catch {
  //       res.status(400).send({ message: error.message });
  //     }
  //   }
}

module.exports = DashboardController;
