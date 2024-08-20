const { Service } = require('../db/models');

class ServicesService {
    async createService(req, res) {
        try {
            const { descricao } = req.body;

            if (!descricao) {
                return res.status(400).json({ error: 'O campo é obrigatório.' });
            }

            // Cadastra servico
            const servico = await Service.create({
                descricao
            });

            res.status(201).json(servico);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ServicesService;
