const ReceitaService = require('../services/receitasService');
const receitaService = new ReceitaService();

class receitaController {
    static async createReceita(req, res) {
        try {
            await receitaService.createReceita(req, res);
        } catch (error) {
            await receitaService.createReceita(req, res);
        }
    }
    static async getReceitaById(req, res) {
        try {
            await receitaService.getReceitaById(req, res);
        } catch (error) {
            await receitaService.getReceitaById(req, res);
        }
    }
    static async getAllReceitas(req, res) {
        try {
            await receitaService.getAllReceitas(req, res);
        } catch (error) {
            await receitaService.getAllReceitas(req, res);
        }
    }
    static async updateReceita(req, res) {
        try {
            await receitaService.updateReceita(req, res);
        } catch (error) {
            await receitaService.updateReceita(req, res);
        }
    }
}

module.exports = receitaController;