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
            await funcionarioService.getAllFuncionarios(req, res);
        } catch (error) {
            await funcionarioService.getAllFuncionarios(req, res);
        }
    }
    static async getAllFuncionarios(req, res) {
        try {
            await funcionarioService.getAllFuncionarios(req, res);
        } catch (error) {
            await funcionarioService.getAllFuncionarios(req, res);
        }
    }
}

module.exports = funcionarioController;