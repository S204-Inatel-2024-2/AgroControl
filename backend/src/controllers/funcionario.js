const FuncionarioService = require('../services/funcionario');
const funcionarioService = new FuncionarioService();

class funcionarioController {
    static async createFuncionario(req, res) {
        try {
            await funcionarioService.createFuncionario(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async getFuncionarioById(req, res) {
        try {
            await funcionarioService.getFuncionarioById(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async getAllFuncionarios(req, res) {
        try {
            await funcionarioService.getAllFuncionarios(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async updateFuncionario(req, res) {
        try {
            await funcionarioService.updateFuncionario(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    static async deleteFuncionario(req, res) {
        try {
            await funcionarioService.deleteFuncionario(req, res);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

module.exports = funcionarioController;