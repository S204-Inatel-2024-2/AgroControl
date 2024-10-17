const ReceitaService = require('../services/receitas');
const receitaService = new ReceitaService();

class receitaController {
    static async createReceita(req, res) {
        try {
            await receitaService.createReceita(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async getReceitaById(req, res) {
        try {
            await receitaService.getReceitaById(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async getAllReceitas(req, res) {
        try {
            await receitaService.getAllReceitas(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async updateReceita(req, res) {
        try {
            await receitaService.updateReceita(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

module.exports = receitaController;