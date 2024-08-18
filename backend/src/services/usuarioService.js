const { User } = require('../db/models');
const {UserType} = require('../db/models');
const bcrypt = require('bcrypt');


class UsuarioService {
    async createUser(dto, res) {
        const { firstName, lastName, email, userTypeId, password: plainPassword } = dto.body;

        if (!firstName || !lastName || !email || !userTypeId || !plainPassword) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const userType = await UserType.findByPk(userTypeId);
        if (!userType) {
            return res.status(400).json({ error: 'Tipo de usuário inválido.' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está sendo utilizado.' });
        }

        let hashedPassword;
        try {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        } catch (error) {
            console.error("Erro ao criptografar:", error);
            return res.status(500).json({ error: 'Erro ao criptografar a senha.' });
        }

        try {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                userTypeId,
                password: hashedPassword
            });
            return res.status(201).json({ message: 'Usuário criado!', user: newUser });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    }

    async readUsers(res) {
        try {
            const listUsers = await User.findAll();
            return res.status(201).json({ message: 'Usuário criado!', user: newUser });
        } catch (error) {
            console.error(error);
            return res.status(403).json({ error: 'Erro ao listar usuários.' });
        }
    }
}

module.exports = UsuarioService;
