const { DespesaFuncionario } = require('../db/models');

class DespesasService {
  async createDespesa(req, res) {
    try {
      const { dataAtividade, valorGasto, status, serviceId, usersId } = req.body;

      // Cadastra despesa
      const despesa = await DespesaFuncionario.create({
        dataAtividade,
        valorGasto,
        status,
        serviceId,
        usersId
      });

      res.status(201).json(despesa);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = DespesasService;
