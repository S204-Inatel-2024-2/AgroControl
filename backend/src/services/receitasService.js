const { Receita, Categoria } = require("../db/models");

class ReceitaService {
  async createReceita(req, res) {
    try {
      const { lucro, valorReceita, observacao, idCategoria } = req.body;

      if (!lucro || !valorReceita || !observacao || !idCategoria) {
        return res.status(400).json({ error: "Os campos são obrigatórios." });
      }

      const isCategoria = await Categoria.findOne({
        where: {
          id: idCategoria,
        },
      });

      if (!isCategoria) {
        return res.status(404).json({ error: "Categoria não Encontrada." });
      }

      // Cadastra nova receita
      const receita = await Receita.create({
        lucro,
        valorReceita,
        observacao,
        idCategoria,
      });
      res
        .status(201)
        .json({ receita, message: "Receita cadastrada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Busca Receita pelo id
  async getReceitaById(req, res) {
    try {
      const { id } = req.params;
      const receita = await Receita.findByPk(id);

      if (!receita) {
        return res.status(404).json({ error: "Receita não encontrada." });
      }
      res
        .status(200)
        .json({ receita, message: "Receita encontrada com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Lista todas as receitas
  async getAllReceitas(req, res) {
    try {
      const receitas = await Receita.findAll({
        include: [
          {
            model: Categoria,
            attributes: ["descricao"],
          },
        ],
      });

      const formattedReceita = receitas.map((receitas) => ({
        IdReceita: receitas.id,
        lucro: receitas.lucro,
        valorReceita: receitas.valorReceita,
        observacao: receitas.observacao,
        categoria: receitas.Categoria ? receitas.Categoria.descricao : null,
        createdAt: receitas.createdAt,
        updatedAt: receitas.updatedAt,
      }));
      //   console.log(formattedReceita);
      res.status(200).json(formattedReceita);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Não foi possivel listar receitas!" });
    }
  }
  // Atualiza as informações da receita informada por id
  async updateReceita(req, res) {
    try {
      const { id } = req.params;
      const { lucro, valorReceita, observacao, idCategoria } = req.body;

      // verifica se a receita existe
      const receita = await Receita.findByPk(id);

      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }

      receita.lucro = lucro || receita.lucro;
      receita.valorReceita = valorReceita || receita.valorReceita;
      receita.observacao = observacao || receita.observacao;
      receita.idCategoria = idCategoria || receita.idCategoria;

      // salva os dados atualizados da receita
      await receita.save();
      res.status(200).json({
        receita,
        message: `Dados atualizados da receita id=${id} com sucesso!`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReceitaService;
