const { Servicos, Funcionarios, TiposServico } = require("../db/models");
const { emailServicoFinalizado, emailServicoCancelado, emailTransferenciaServico } = require("../utils/servidorEmail");
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
      const { status, observacoes, dataAtividade, tipoServico, responsavel, valorGasto } = req.body;

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
        return res.status(404).json({ error: "Tipo de Serviço não encontrado." });
      }

      const responsavelAntigo = await Funcionarios.findByPk(servico.responsavel);
      const responsavelAlterado = servico.responsavel !== responsavel;

      // Atualizar apenas os campos enviados no `req.body`
      await servico.update({
        status: status ?? servico.status,
        dataAtividade: dataAtividade ?? servico.dataAtividade,
        tipoServico: tipoServico ?? servico.tipoServico,
        responsavel: responsavel ?? servico.responsavel,
        valorGasto: valorGasto ?? servico.valorGasto,
        observacoes: observacoes ?? servico.observacoes, // Mantém o valor anterior caso `observacoes` não seja enviado
      });



      if (status === "concluido") {
        const dadosServico = {
          servicos: await Servicos.findAll({ where: { responsavel } }),
          servico: servico.IdServico,
          status: servico.status,
          dataAtividade: servico.dataAtividade,
          tipoServico: servico.tipoServico,
          responsavel: funcionario.nome,
          valorGasto: servico.valorGasto
        };
        console.log('Valor recebido para valorGasto:', dadosServico.valorGasto);
        await emailServicoFinalizado(dadosServico);
      }


      if (responsavelAlterado) {
        const dadosServicoTransferido = {
          servico: servico.IdServico,
          status: servico.status,
          dataAtividade: servico.dataAtividade,
          tipoServico: servico.tipoServico,
          valorGasto: servico.valorGasto,
          responsavelAntigo: responsavelAntigo.nome,
          novoResponsavel: funcionario.nome,
          novoResponsavelEmail: funcionario.email,
        };
        await emailTransferenciaServico(dadosServicoTransferido);
      }

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

      const funcionario = await Funcionarios.findByPk(servico.responsavel);
      if (!funcionario) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }

      const dadosServicoCancelado = {
        servico: servico.IdServico,
        status: 'cancelado',
        dataAtividade: servico.dataAtividade,
        tipoServico: servico.tipoServico,
        responsavel: funcionario.nome,
        valorGasto: servico.valorGasto,
      };

      await emailServicoCancelado(dadosServicoCancelado);

      await servico.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServicosService;