const ReceitaService = require("../services/receitasService");
const receitaService = new ReceitaService();

class receitaController {
  static async createReceita(req, res) {
    try {
      await receitaService.createReceita(req, res);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async getReceitaById(req, res) {
    try {
      await receitaService.getReceitaById(req, res);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async getAllReceitas(req, res) {
    try {
      await receitaService.getAllReceitas(req, res);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async updateReceita(req, res) {
    try {
      await receitaService.updateReceita(req, res);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = receitaController;
