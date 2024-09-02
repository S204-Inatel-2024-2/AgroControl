const ServicosService = require('../services/servicosService');
const servicosService = new ServicosService();

class ServicosController {
    // Método para listar todos os serviços
    static async getAllServicos(req, res) {
        try {
            await servicosService.getAllServicos(req, res);
        } catch (error) {
            await servicosService.getAllServicos(req, res);
        }
    }

    // Método para obter um serviço específico pelo ID
    static async getServicoById(req, res) {
        try {
            await servicosService.getServicoById(req, res);
        } catch (error) {
            await servicosService.getServicoById(req, res);
        }
    }

    // Método para criar um novo serviço
    static async createServico(req, res) {
        try {
            await servicosService.createServico(req, res);
        } catch (error) {
            await servicosService.createServico(req, res);
        }
    }

    // Método para atualizar um serviço existente
    static async updateServico(req, res) {
        try {
            await servicosService.updateServico(req, res);
        } catch (error) {
            await servicosService.updateServico(req, res);
        }
    }

    // Método para deletar um serviço existente
    static async deleteServico(req, res) {
        try {
            await servicosService.deleteServico(req, res);
        } catch (error) {
            await servicosService.deleteServico(req, res);
        }
    }
}

module.exports = ServicosController;