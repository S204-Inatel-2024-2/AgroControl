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
}

module.exports = FuncionarioService;
