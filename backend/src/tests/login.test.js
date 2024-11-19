const { Admin } = require('../db/models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/auth');
const LoginService = require('../services/login');

jest.mock('../db/models', () => {
    return {
        Admin: {
            findOne: jest.fn(),
        },
    };
}); // Mock do models/db

jest.mock('bcrypt');        // Mock do bcrypt
jest.mock('../services/auth'); // Mock da geração de token

describe('LoginService', () => {
    let loginService;

    beforeEach(() => {
        loginService = new LoginService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar erro 400 se email ou senha não forem fornecidos', async () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await loginService.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email e senha são obrigatórios.' });
    });

    it('deve retornar erro 404 se o email não for encontrado', async () => {
        const req = {
            body: { email: 'notfound@example.com', password: 'password123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        Admin.findOne.mockResolvedValue(null);  // Simula que o email não foi encontrado no banco

        await loginService.login(req, res);

        expect(Admin.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Email não encontrado.',
        });
    });

    it('deve retornar erro 401 se a senha estiver incorreta', async () => {
        const req = {
            body: { email: 'test@example.com', password: 'wrongpassword' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const admMock = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
        Admin.findOne.mockResolvedValue(admMock);  // Simula que o email foi encontrado
        bcrypt.compare.mockResolvedValue(false);  // Simula senha incorreta

        await loginService.login(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, admMock.password);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Senha incorreta.',
        });
    });

    it('deve retornar token e sucesso se o login for bem-sucedido', async () => {
        const req = {
            body: { email: 'test@example.com', password: 'password123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const admMock = { 
            id: 1, 
            email: 'test@example.com', 
            password: 'hashedpassword',
            firstName: 'Admin', 
        };

        Admin.findOne.mockResolvedValue(admMock);  // Simula que o email foi encontrado
        bcrypt.compare.mockResolvedValue(true);  // Simula senha correta
        generateToken.mockReturnValue('fake-token');  // Simula geração de token

        await loginService.login(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, admMock.password);
        expect(generateToken).toHaveBeenCalledWith(admMock);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: 'fake-token',
            message: 'Login bem-sucedido.',
            user: admMock.firstName,
        });
    });

    it('deve retornar erro 500 se ocorrer um erro no processo de login', async () => {
        const req = {
            body: { email: 'test@example.com', password: 'password123' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        Admin.findOne.mockRejectedValue(new Error('Erro no banco de dados'));  // Simula erro no banco

        await loginService.login(req, res);

        expect(Admin.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Erro ao realizar login.',
        });
    });
});
