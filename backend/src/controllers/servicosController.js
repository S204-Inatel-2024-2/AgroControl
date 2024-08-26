const { Servicos, Funcionario, TiposServico } = require('../db/models');

class ServicosController {

    // Método para listar todos os serviços
    static async listarServicos(req, res) {
        try {
            const servicos = await Servicos.findAll();
            res.status(200).json(servicos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para obter um serviço específico pelo ID 
    static async obterServico(req, res) {
        try {
            const { id } = req.params;
            const servico = await Servicos.findByPk(id);
            if (!servico) return res.status(404).json({ error: 'Serviço não encontrado.' });
            res.status(200).json(servico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para criar um novo serviço -- Testar
    static async criarServico(req, res) {
        try {
            const { tipoServico, responsavel, ...data } = req.body;

            const funcionario = await Funcionario.findByPk(responsavel);
            if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado.' });

            const tipo = await TiposServico.findByPk(tipoServico);
            if (!tipo) return res.status(404).json({ error: 'Tipo de Serviço não encontrado.' });

            const novoServico = await Servicos.create({ ...data, tipoServico, responsavel });
            res.status(201).json(novoServico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para atualizar um serviço existente -- Testar
    static async atualizarServico(req, res) {
        try {
            const { id } = req.params;
            const { tipoServico, responsavel, ...data } = req.body;

            const servico = await Servicos.findByPk(id);
            if (!servico) return res.status(404).json({ error: 'Serviço não encontrado.' });

            const funcionario = await Funcionario.findByPk(responsavel);
            if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado.' });

            const tipo = await TiposServico.findByPk(tipoServico);
            if (!tipo) return res.status(404).json({ error: 'Tipo de Serviço não encontrado.' });

            await servico.update({ ...data, tipoServico, responsavel });
            res.status(200).json(servico);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para deletar um serviço pelo ID -- Testar
    static async deletarServico(req, res) {
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

module.exports = ServicosController;