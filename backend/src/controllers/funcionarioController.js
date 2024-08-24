const FuncionarioService = require('../services/funcionarioService');
const funcionarioService = new FuncionarioService();

class funcionarioController {
    static async createFuncionario(req, res) {
        try {
            await funcionarioService.createFuncionario(req, res);
        } catch (error) {
            await funcionarioService.createFuncionario(req, res);
        }
    }
    static async getFuncionarioById(req, res) {
        try {
            await funcionarioService.getFuncionarioById(req, res);
        } catch (error) {
            await funcionarioService.getFuncionarioById(req, res);
        }
    }
    static async getAllFuncionarios(req, res) {
        try {
            await funcionarioService.getAllFuncionarios(req, res);
        } catch (error) {
            await funcionarioService.getAllFuncionarios(req, res);
        }
    }
    static async updateFuncionario(req, res) {
        try {
            await funcionarioService.updateFuncionario(req, res);
        } catch (error) {
            await funcionarioService.updateFuncionario(req, res);
        }
    }
    static async deleteFuncionario(req, res) {
        try {
            await funcionarioService.deleteFuncionario(req, res);
        } catch (error) {
            await funcionarioService.deleteFuncionario(req, res);
        }
    }
}

module.exports = funcionarioController;