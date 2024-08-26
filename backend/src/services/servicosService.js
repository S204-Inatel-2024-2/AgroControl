const { Servicos, Funcionarios, TiposServico } = require('../db/models');

class ServicosService {
    // Método para listar todos os serviços 
    async getAllServicos(req, res) {
        try {
            const servicos = await Servicos.findAll();
            res.status(200).json(servicos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para obter um serviço específico pelo ID 
    async getServico(req, res) {
        try {
            const { id } = req.params;
            const servico = await Servicos.findByPk(id);
            if (!servico) return res.status(404).json({ error: 'Serviço não encontrado.' });
            res.status(200).json(servico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para criar um novo serviço - Testar
    async createServico(req, res) {
        try {
            // Desestruturação do corpo da requisição
            const { status, dataAtividade, tipoServico, responsavel, valorGasto } = req.body;
/*
            // Verifica se o funcionário e o tipo de serviço existem
            const [funcionario, tipo] = await Promise.all([
                Funcionarios.findByPk(responsavel),
                TiposServico.findByPk(tipoServico)
            ]);

            if (!funcionario || !tipo) {
                return res.status(404).json({
                    error: !funcionario ? 'Funcionário não encontrado.' : 'Tipo de Serviço não encontrado.'
                });
            }
*/
            // Cria o novo serviço
            const novoServico = await Servicos.create({ status, dataAtividade, tipoServico, responsavel, valorGasto });
            res.status(201).json(novoServico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para atualizar um serviço existente - Testar
    async updateServico(req, res) {
        try {
            const { id } = req.params;
            const { status, dataAtividade, tipoServico, responsavel, valorGasto } = req.body;
/*
            const [servico, funcionario, tipo] = await Promise.all([
                Servicos.findByPk(id),
                Funcionarios.findByPk(responsavel),
                TiposServico.findByPk(tipoServico)
            ]);

            if (!servico) return res.status(404).json({ error: 'Serviço não encontrado.' });
            if (!funcionario || !tipo) {
                return res.status(404).json({
                    error: !funcionario ? 'Funcionário não encontrado.' : 'Tipo de Serviço não encontrado.'
                });
            }
*/
            await servico.update({ status, dataAtividade, tipoServico, responsavel, valorGasto });
            res.status(200).json(servico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para deletar um serviço pelo ID
    async deleteServico(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servicos.findByPk(id);
            if (!servico) return res.status(404).json({ error: 'Serviço não encontrado.' });

            await servico.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ServicosService;