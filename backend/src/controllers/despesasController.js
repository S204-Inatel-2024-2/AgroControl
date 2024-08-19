const DespesasService = require('../services/despesasService');
const despesasService = new DespesasService();
class despesasController {

  static async createDespesa(req, res) {
      try {
          await despesasService.createDespesa(req, res);
      } catch (error) {
          res.status(400).send({ message: error.message });
      }
  }
}

module.exports = despesasController;