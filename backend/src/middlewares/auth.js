const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error('Authentication error:', error);
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
};

module.exports = { authMiddleware };