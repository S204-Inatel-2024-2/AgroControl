const { TiposServico } = require("../db/models");

class TiposServicoService {
  async createTipoServico(req, res) {
    try {
      const { descricao } = req.body;

      if (!descricao) {
        return res.status(400).json({ error: "Descrição é obrigatória." });
      }

      const novoTipoServico = await TiposServico.create({ descricao });
      res.status(201).json(novoTipoServico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTiposServico(req, res) {
    try {
      const tiposServico = await TiposServico.findAll();
      res.status(200).json(tiposServico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTipoServicoById(req, res) {
    try {
      const { id } = req.params;
      const tipoServico = await TiposServico.findByPk(id);

      if (!tipoServico) {
        return res
          .status(404)
          .json({ error: "Tipo de serviço não encontrado." });
      }
      res.status(200).json(tipoServico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTipoServico(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const tipoServico = await TiposServico.findByPk(id);
      if (!tipoServico) {
        return res
          .status(404)
          .json({ error: "Tipo de serviço não encontrado." });
      }

      if (!descricao) {
        return res.status(400).json({ error: "Descrição é obrigatória." });
      }

      await tipoServico.update({ descricao });
      res.status(200).json(tipoServico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTipoServico(req, res) {
    try {
      const { id } = req.params;

      const tipoServico = await TiposServico.findByPk(id);
      if (!tipoServico) {
        return res
          .status(404)
          .json({ error: "Tipo de serviço não encontrado." });
      }

      await tipoServico.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TiposServicoService;
