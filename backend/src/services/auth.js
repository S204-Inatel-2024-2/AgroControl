const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const secret = process.env.JWT_SECRET || 'keysecret';
const expiration = process.env.JWT_EXPIRATION || '1h';

// Função para gerar o token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: expiration });
};

// Função para verificar o token JWT
const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };