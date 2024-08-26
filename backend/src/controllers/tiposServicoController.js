const TiposServicoService = require('../services/tiposServicoService');
const tiposServicoService = new TiposServicoService();

class TiposServicoController {
    static async getAllTiposServico(req, res) {
        try {
            await tiposServicoService.getAllTiposServico(req, res);
        } catch (error) {
            await tiposServicoService.getAllTiposServico(req, res);
        }
    }

    static async getTipoServico(req, res) {
        try {
            await tiposServicoService.getTipoServicoById(req, res);
        } catch (error) {
            await tiposServicoService.getTipoServicoById(req, res);
        }
    }

    static async createTipoServico(req, res) {
        try {
            await tiposServicoService.createTipoServico(req, res);
        } catch (error) {
            await tiposServicoService.createTipoServico(req, res);
        }
    }

    static async updateTipoServico(req, res) {
        try {
            await tiposServicoService.updateTipoServico(req, res);
        } catch (error) {
            await tiposServicoService.updateTipoServico(req, res);
        }
    }

    static async deleteTipoServico(req, res) {
        try {
            await tiposServicoService.deleteTipoServico(req, res);
        } catch (error) {
            await tiposServicoService.deleteTipoServico(req, res);
        }
    }
}

module.exports = TiposServicoController;
