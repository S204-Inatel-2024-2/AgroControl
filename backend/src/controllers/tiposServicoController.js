const TiposServicoService = require('../services/tiposServicoService');
const tiposServicoService = new TiposServicoService();

class TiposServicoController {
    static async getAllTiposServico(req, res) {
        try {
            await tiposServicoService.getAllTiposServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getTipoServico(req, res) {
        try {
            await tiposServicoService.getTipoServicoById(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async createTipoServico(req, res) {
        try {
            await tiposServicoService.createTipoServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async updateTipoServico(req, res) {
        try {
            await tiposServicoService.updateTipoServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deleteTipoServico(req, res) {
        try {
            await tiposServicoService.deleteTipoServico(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = TiposServicoController;
