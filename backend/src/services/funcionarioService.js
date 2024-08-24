const { Funcionarios } = require('../db/models');

class FuncionarioService {
    async createFuncionario(req, res) {
        try {
            const { nome, cpf, endereco, email, funcao } = req.body;

            if (!nome || !cpf || !endereco || !email || !funcao) {
                return res.status(400).json({ error: 'Os campos são obrigatórios.' });
            }

            // Cadastra novo funcionario
            const funcionario = await Funcionarios.create({
                nome,
                cpf,
                endereco,
                email,
                funcao
            });

            res.status(201).json({ funcionario, message: 'Funcionário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Busca funcionario pelo Id
    async getAllFuncionarios(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await Funcionarios.findByPk(id);

            if (!funcionario) {
                return res.status(404).json({ error: 'Funcionário não encontrado.' });
            }

            res.status(200).json({ funcionario, message: 'Funcionário encontrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Lista todos os funcionários
    async getAllFuncionarios(req, res) {
        try {
            const funcionarios = await Funcionarios.findAll();
            res.status(200).json(funcionarios)
        } catch (error) {
            res.status(500).json({ error: 'Não foi possivel listar funcionários!' })
        }
    }
}

module.exports = FuncionarioService;
