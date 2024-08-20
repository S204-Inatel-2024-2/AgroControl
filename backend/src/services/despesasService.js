const { DespesaFuncionario } = require('../db/models');
const { User } = require('../db/models');

class DespesasService {
    async createDespesa(req, res) {
        try {
            const { dataAtividade, valorGasto, status, serviceId, usersId } = req.body;

            if (!dataAtividade || !valorGasto || !status || !serviceId || !usersId) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            const user = await User.findByPk(usersId);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Cadastra despesa
            const despesa = await DespesaFuncionario.create({
                dataAtividade,
                valorGasto,
                status,
                serviceId,
                usersId
            });

            res.status(201).json(despesa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = DespesasService;
