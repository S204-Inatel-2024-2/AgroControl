const { generateToken, verifyToken } = require('../services/auth');


const authenticateInRoutes = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            req.user = verifyToken(token);
            next();
        } catch (e) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = authenticateInRoutes;