const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middlewares/auth');
const Code = require('../models/Code');
const emailService = require('../services/emailService');
const { logger } = require('../utils/logger');

// Validation middleware
const validateCodePurchase = [
    body('codeType')
        .trim()
        .notEmpty()
        .isIn(['UPC', 'ISRC'])
        .withMessage('Invalid code type'),
    body('quantity')
        .isInt({ min: 1, max: 100 })
        .withMessage('Quantity must be between 1 and 100')
];

// Purchase new codes
router.post('/purchase', authMiddleware, validateCodePurchase, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const { codeType, quantity } = req.body;
        const userId = req.user.userId;
        const purchasedCodes = [];

        // Generate and store codes
        for (let i = 0; i < quantity; i++) {
            const codeValue = await Code.generateUniqueCode(codeType);
            const code = await Code.create({
                userId,
                codeType,
                codeValue
            });
            purchasedCodes.push(code);

            // Send email confirmation for each code
            await emailService.sendCodePurchaseConfirmation(
                req.user.email,
                codeType,
                codeValue
            );
        }

        res.status(201).json({
            status: 'success',
            data: {
                message: `Successfully purchased ${quantity} ${codeType} codes`,
                codes: purchasedCodes
            }
        });
    } catch (error) {
        logger.error('Code purchase error:', error);
        next(error);
    }
});

// Get all available codes for user
router.get('/available', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { type } = req.query;

        let upcCodes = [];
        let isrcCodes = [];

        if (!type || type === 'UPC') {
            upcCodes = await Code.findAvailableByUser(userId, 'UPC');
        }

        if (!type || type === 'ISRC') {
            isrcCodes = await Code.findAvailableByUser(userId, 'ISRC');
        }

        res.json({
            status: 'success',
            data: {
                upcCodes,
                isrcCodes
            }
        });
    } catch (error) {
        logger.error('Get available codes error:', error);
        next(error);
    }
});

// Get code details
router.get('/:id', authMiddleware, async (req, res, next) => {
    try {
        const codeId = req.params.id;
        const userId = req.user.userId;

        const code = await Code.findById(codeId);
        
        if (!code || code.user_id !== userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Code not found'
            });
        }

        res.json({
            status: 'success',
            data: code
        });
    } catch (error) {
        logger.error('Get code details error:', error);
        next(error);
    }
});

// Get codes by distribution
router.get('/distribution/:distributionId', authMiddleware, async (req, res, next) => {
    try {
        const distributionId = req.params.distributionId;
        const userId = req.user.userId;

        const codes = await Code.findByDistribution(distributionId);
        
        // Filter codes belonging to the user
        const userCodes = codes.filter(code => code.user_id === userId);

        res.json({
            status: 'success',
            data: userCodes
        });
    } catch (error) {
        logger.error('Get codes by distribution error:', error);
        next(error);
    }
});

// Validate code
router.post('/validate', authMiddleware, async (req, res, next) => {
    try {
        const { codeType, codeValue } = req.body;

        if (!codeType || !codeValue) {
            return res.status(400).json({
                status: 'error',
                message: 'Code type and value are required'
            });
        }

        // Validate code format
        let isValid = false;
        if (codeType === 'UPC') {
            // UPC should be 12 digits
            isValid = /^\d{12}$/.test(codeValue);
        } else if (codeType === 'ISRC') {
            // ISRC format: CC-XXX-YY-NNNNN
            isValid = /^[A-Z]{2}-[A-Z0-9]{3}-\d{2}-\d{5}$/.test(codeValue);
        }

        res.json({
            status: 'success',
            data: {
                isValid,
                message: isValid ? 'Code format is valid' : 'Invalid code format'
            }
        });
    } catch (error) {
        logger.error('Code validation error:', error);
        next(error);
    }
});

module.exports = router;