const { Funcionarios } = require('../db/models');

class FuncionarioService {
    async createFuncionario(req, res) {
        try {
            const { nome, cpf, endereco, email, funcao,salario,dataNascimento } = req.body;

            if (!nome || !cpf || !endereco || !email || !funcao|| !salario || !dataNascimento) {
                return res.status(400).json({ error: 'Os campos são obrigatórios.' });
            }
            // Cadastra novo funcionario
            const funcionario = await Funcionarios.create({
                nome,
                cpf,
                endereco,
                email,
                funcao,
                salario,
                dataNascimento

            });
            res.status(201).json({ funcionario, message: 'Funcionário cadastrado com sucesso!' });
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
            res.status(200).json(funcionarios);
        } catch (error) {
            res.status(500).json({ error: 'Não foi possivel listar funcionários!' });
        }
    }
    // Atualiza as informações do funcionario informado por id
    async updateFuncionario(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf, endereco, email, funcao,salario,dataNascimento } = req.body;

            // verifica se o funcionario existe
            const funcionario = await Funcionarios.findByPk(id);

            if(!funcionario){
               return res.status(404).json({message:"Usuário não existe"})
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
            res.status(200).json({ funcionario, message: `Dados atualizados do funcionario id=${id} com sucesso!` })
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
                return res.status(404).json({ error: 'Funcionário não encontrado.' });
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
