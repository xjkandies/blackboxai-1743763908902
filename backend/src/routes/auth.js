const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middlewares/auth');
const emailService = require('../services/emailService');
const socialAuthService = require('../services/socialAuthService');
const { logger } = require('../utils/logger');

// Input validation middleware
const validateSignup = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter')
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

// Sign up
router.post('/signup', validateSignup, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'error',
                errors: errors.array() 
            });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already registered'
            });
        }

        // Create new user
        const user = await User.create({ name, email, password });

        // Send verification email
        await emailService.sendVerificationEmail(email, user.verification_token);

        res.status(201).json({
            status: 'success',
            message: 'Registration successful. Please check your email for verification.'
        });
    } catch (error) {
        logger.error('Signup error:', error);
        next(error);
    }
});

// Login
router.post('/login', validateLogin, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'error',
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Check if email is verified
        if (!user.is_verified) {
            return res.status(401).json({
                status: 'error',
                message: 'Please verify your email before logging in'
            });
        }

        // Validate password
        const isValid = await User.validatePassword(user, password);
        if (!isValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        logger.error('Login error:', error);
        next(error);
    }
});

// Verify email
router.get('/verify-email/:token', async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await User.verifyEmail(token);

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid or expired verification token'
            });
        }

        res.json({
            status: 'success',
            message: 'Email verified successfully'
        });
    } catch (error) {
        logger.error('Email verification error:', error);
        next(error);
    }
});

// Connect Instagram
router.post('/connect/instagram', authMiddleware, async (req, res, next) => {
    try {
        const { code } = req.body;
        await socialAuthService.connectInstagram(req.user.userId, code);

        res.json({
            status: 'success',
            message: 'Instagram account connected successfully'
        });
    } catch (error) {
        logger.error('Instagram connection error:', error);
        next(error);
    }
});

// Connect X (Twitter)
router.post('/connect/x', authMiddleware, async (req, res, next) => {
    try {
        const { code } = req.body;
        await socialAuthService.connectX(req.user.userId, code);

        res.json({
            status: 'success',
            message: 'X account connected successfully'
        });
    } catch (error) {
        logger.error('X connection error:', error);
        next(error);
    }
});

// Connect YouTube
router.post('/connect/youtube', authMiddleware, async (req, res, next) => {
    try {
        const { code } = req.body;
        await socialAuthService.connectYouTube(req.user.userId, code);

        res.json({
            status: 'success',
            message: 'YouTube account connected successfully'
        });
    } catch (error) {
        logger.error('YouTube connection error:', error);
        next(error);
    }
});

// Get social connections status
router.get('/social-connections', authMiddleware, async (req, res, next) => {
    try {
        const connections = await socialAuthService.verifyConnections(req.user.userId);

        res.json({
            status: 'success',
            data: connections
        });
    } catch (error) {
        logger.error('Social connections status error:', error);
        next(error);
    }
});

module.exports = router;