const FuncionarioService = require('../services/funcionarioService');
const funcionarioService = new FuncionarioService();

class funcionarioController {

    static async createFuncionario(req, res) {
        try {
            await funcionarioService.createFuncionario(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = funcionarioController;