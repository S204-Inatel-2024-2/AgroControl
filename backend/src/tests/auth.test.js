const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'mockSecret';
process.env.JWT_EXPIRATION = '1h';
const { generateToken, verifyToken } = require('../services/auth');

jest.mock('jsonwebtoken'); 

describe('Auth', () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    const mockToken = 'mockToken';
    const decodedToken = { id: 1, email: 'test@example.com' };

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    describe('generateToken', () => {
        it('deve gerar um token JWT válido', () => {
            jwt.sign.mockReturnValue(mockToken);

            const token = generateToken(mockUser); 

            expect(jwt.sign).toHaveBeenCalledWith(
                { id: mockUser.id, email: mockUser.email },
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRATION } 
            );
            expect(token).toBe(mockToken); 
        });
    });

    describe('verifyToken', () => {
        it('deve verificar um token JWT válido', () => {
            jwt.verify.mockReturnValue(decodedToken);

            const result = verifyToken(mockToken); 

            expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET); 
            expect(result).toEqual(decodedToken); 
        });

        it('deve lançar um erro se o token for inválido', () => {
            const error = new Error('Token inválido');
            jwt.verify.mockImplementation(() => {
                throw error;
            });

            expect(() => verifyToken('invalidToken')).toThrow(error);
        });
    });
});