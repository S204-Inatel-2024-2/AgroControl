const { Admin } = require('../db/models');
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require('./auth');

class LoginService {
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        try {
            // Busca o adm pelo email
            const adm = await Admin.findOne({
                where: { email: email }
            });

            if (!adm) {
                // Caso o adm não seja encontrado
                return res.status(404).json({ error: 'Email não encontrado.' });
            }

            // Compara a senha fornecida com a senha armazenada no banco de dados
            const isMatch = await bcrypt.compare(password, adm.password);

            if (isMatch) {
                const token = generateToken(adm);
                
                // Senha correta, autenticação bem-sucedida
                return res.status(200).json({ token,message: 'Login bem-sucedido.' });
            } else {
                // Senha incorreta
                return res.status(401).json({ error: 'Senha incorreta.' });
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.status(500).json({ error: 'Erro ao realizar login.' });
        }

    }
}
module.exports = LoginService;