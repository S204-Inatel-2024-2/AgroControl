const ServicesService = require('../services/servicesService');
const servicesService = new ServicesService();

class servicesController {

    static async createService(req, res) {
        try {
            await servicesService.createService(req, res);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = servicesController;