// controllers/usuarioController.js

const UsuarioService = require('../services/usuarioService');
const usuarioService = new UsuarioService();

class usuarioController {

    static async createUser(req, res) {
        try {
            await usuarioService.createUser(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async readUsers(req, res) {
        try {
            await usuarioService.readUsers(res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = usuarioController;
