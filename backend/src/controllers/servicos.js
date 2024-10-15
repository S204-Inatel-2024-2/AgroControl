const ServicosService = require('../services/servicos');
const servicosService = new ServicosService();

class ServicosController {
    static async getAllServicos(req, res) {
        try {
            await servicosService.getAllServicos(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getServicoById(req, res) {
        try {
            await servicosService.getServicoById(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async createServico(req, res) {
        try {
            await servicosService.createServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async updateServico(req, res) {
        try {
            await servicosService.updateServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deleteServico(req, res) {
        try {
            await servicosService.deleteServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = ServicosController;