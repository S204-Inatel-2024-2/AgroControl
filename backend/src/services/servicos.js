const { Servicos, Funcionarios, TiposServico } = require("../db/models");

class ServicosService {
  async getAllServicos(req, res) {
    try {
      const servicos = await Servicos.findAll({
        include: [
          {
            model: TiposServico,
            attributes: ["descricao"],
          },
          {
            model: Funcionarios,
            attributes: ["nome"],
          },
        ],
      });
      
      const formattedServicos = servicos.map((servico) => ({
        IdServico: servico.IdServico,
        status: servico.status,
        dataAtividade: servico.dataAtividade,
        tipoServico: servico.TiposServico
          ? servico.TiposServico.descricao
          : null, // Descrição do tipo de serviço
        responsavel: servico.Funcionario ? servico.Funcionario.nome : null, // Nome do responsável
        valorGasto: servico.valorGasto,
        createdAt: servico.createdAt,
        updatedAt: servico.updatedAt,
      }));
      res.status(200).json(formattedServicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getServicoById(req, res) {
    try {
      const { id } = req.params;
      const servico = await Servicos.findByPk(id);

      if (!servico) {
        return res.status(404).json({ error: "Serviço não encontrado." });
      }
      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createServico(req, res) {
    try {
      const { status, dataAtividade, tipoServico, responsavel, valorGasto } =
        req.body;

      if (
        !status ||
        !dataAtividade ||
        !tipoServico ||
        !responsavel ||
        !valorGasto
      ) {
        return res.status(400).json({ error: "Os campos são obrigatórios." });
      }

      const funcionario = await Funcionarios.findByPk(responsavel);
      if (!funcionario) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }

      const tipo = await TiposServico.findByPk(tipoServico);
      if (!tipo) {
        return res
          .status(404)
          .json({ error: "Tipo de Serviço não encontrado." });
      }

      const novoServico = await Servicos.create({
        status,
        dataAtividade,
        tipoServico,
        responsavel,
        valorGasto,
      });
      res.status(201).json(novoServico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateServico(req, res) {
    try {
      const { id } = req.params;
      const { status, dataAtividade, tipoServico, responsavel, valorGasto } =
        req.body;

      const servico = await Servicos.findByPk(id);
      if (!servico) {
        return res.status(404).json({ error: "Serviço não encontrado." });
      }

      const funcionario = await Funcionarios.findByPk(responsavel);
      if (!funcionario) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }

      const tipo = await TiposServico.findByPk(tipoServico);
      if (!tipo) {
        return res
          .status(404)
          .json({ error: "Tipo de Serviço não encontrado." });
      }

      await servico.update({
        status,
        dataAtividade,
        tipoServico,
        responsavel,
        valorGasto,
      });
      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteServico(req, res) {
    try {
      const { id } = req.params;

      const servico = await Servicos.findByPk(id);
      if (!servico) {
        return res.status(404).json({ error: "Serviço não encontrado." });
      }

      await servico.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServicosService;
