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
}

module.exports = funcionarioController;