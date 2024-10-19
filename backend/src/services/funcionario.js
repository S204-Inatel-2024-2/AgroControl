const { Funcionarios, Servicos } = require("../db/models");
const { emailnovoFuncionario } = require("../utils/servidorEmail");

class FuncionarioService {
  async createFuncionario(req, res) {
    try {
      const { nome, cpf, endereco, email, funcao, salario, dataNascimento } =
        req.body;

      if (
        !nome ||
        !cpf ||
        !endereco ||
        !email ||
        !funcao ||
        !salario ||
        !dataNascimento
      ) {
        return res.status(400).json({ error: "Os campos são obrigatórios." });
      }

      //Pesquisa pelo cpf e verifica se já é um cpf existente na base de dados
      const cpfExistente = await Funcionarios.findOne({
        where: { cpf: cpf },
      });

      if (cpfExistente) {
        return res
          .status(400)
          .json({ error: "Este cpf pertence a outro usuário" });
      }

      //Pesquisa pelo email e verifica se já é umail cadastrado anteriormente
      const emailExistente = await Funcionarios.findOne({
        where: { email: email },
      });

      if (emailExistente) {
        return res
          .status(400)
          .json({ error: "Este email pertence a outro usuário" });
      }

      // Cadastra novo funcionario
      const funcionario = await Funcionarios.create({
        nome,
        cpf,
        endereco,
        email,
        funcao,
        salario,
        dataNascimento,
      });

      await emailnovoFuncionario(funcionario);
      res
        .status(201)
        .json({ funcionario, message: "Funcionário cadastrado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Busca funcionario pelo id
  async getFuncionarioById(req, res) {
    try {
      const { id } = req.params;
      const funcionario = await Funcionarios.findByPk(id);

      if (!funcionario) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }
      res.status(200).json({ funcionario, message: "Funcionário encontrado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Lista todos os funcionários
  async getAllFuncionarios(req, res) {
    try {
      const funcionarios = await Funcionarios.findAll();
      res.status(200).json(funcionarios);
    } catch (error) {
      res.status(500).json({ error: "Não foi possivel listar funcionários!" });
    }
  }

  // Busca serviços relacionados ao funcionário
  async getServicosByFuncionario(req, res) {
    try {
      const { id } = req.params; 
      const servicos = await Servicos.findAll({
        where: { responsavel: id }, 
      });

      if (servicos.length === 0) {
        return res.status(404).json({ message: "Nenhum serviço encontrado para este funcionário." });
      }

      console.log(`Serviços encontrados: ${JSON.stringify(servicos)}`); 
      return res.status(200).json(servicos);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualiza as informações do funcionario informado por id
  async updateFuncionario(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, endereco, email, funcao, salario, dataNascimento } =
        req.body;

      // verifica se o funcionario existe
      const funcionario = await Funcionarios.findByPk(id);

      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado." });
      }

      funcionario.nome = nome || funcionario.nome;
      funcionario.cpf = cpf || funcionario.cpf;
      funcionario.endereco = endereco || funcionario.endereco;
      funcionario.email = email || funcionario.email;
      funcionario.funcao = funcao || funcionario.funcao;
      funcionario.salario = salario || funcionario.salario;
      funcionario.dataNascimento = dataNascimento || funcionario.dataNascimento;

      // salva os dados atualizados de funcionario
      await funcionario.save();
      res
        .status(200)
        .json({
          funcionario,
          message: `Dados atualizados do funcionario id=${id} com sucesso!`,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Deleta funcionario por informado por id
  async deleteFuncionario(req, res) {
    try {
      const { id } = req.params;

      // Verifica se o funcionario existe
      const funcionario = await Funcionarios.findByPk(id);
      if (!funcionario) {
        return res.status(404).json({ error: "Funcionário não encontrado." });
      }

      // deleta funcionario pelo id
      await funcionario.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = FuncionarioService;
