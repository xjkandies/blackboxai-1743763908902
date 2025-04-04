const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middlewares/auth');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'audio') {
            if (!file.originalname.match(/\.(mp3|wav|flac)$/)) {
                return cb(new Error('Only audio files are allowed!'), false);
            }
        } else if (file.fieldname === 'coverArt') {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
        }
        cb(null, true);
    }
});
const Distribution = require('../models/Distribution');
const Code = require('../models/Code');
const streamingService = require('../services/streamingService');
const emailService = require('../services/emailService');
const { logger } = require('../utils/logger');

// Validation middleware
const validateDistribution = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('artist').trim().notEmpty().withMessage('Artist name is required'),
    body('fileUrl').trim().notEmpty().withMessage('File URL is required'),
    body('coverArtUrl').trim().notEmpty().withMessage('Cover art URL is required'),
    body('isrcCode').optional().trim(),
    body('upcCode').optional().trim()
];

// File upload endpoint
router.post('/upload', authMiddleware, upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded'
            });
        }

        // Return the file URL
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({
            status: 'success',
            data: {
                fileUrl
            }
        });
    } catch (error) {
        logger.error('File upload error:', error);
        next(error);
    }
});

// Create new distribution
router.post('/', authMiddleware, validateDistribution, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const { title, artist, fileUrl, coverArtUrl, isrcCode, upcCode } = req.body;
        const userId = req.user.userId;

        // Create distribution record
        const distribution = await Distribution.create({
            userId,
            title,
            artist,
            fileUrl,
            coverArtUrl,
            isrcCode,
            upcCode
        });

        // Start distribution to all platforms
        streamingService.distributeToAllPlatforms(distribution.id, fileUrl, {
            title,
            artist,
            coverArtUrl,
            description: `${title} by ${artist}`,
            tags: [artist, 'music', 'new release']
        }).catch(error => {
            logger.error('Distribution error:', error);
            // Handle error asynchronously
        });

        res.status(201).json({
            status: 'success',
            data: {
                distributionId: distribution.id,
                message: 'Distribution process started'
            }
        });
    } catch (error) {
        logger.error('Create distribution error:', error);
        next(error);
    }
});

// Get distribution status
router.get('/:id/status', authMiddleware, async (req, res, next) => {
    try {
        const distributionId = req.params.id;
        const userId = req.user.userId;

        const status = await streamingService.checkDistributionStatus(distributionId);
        
        if (!status) {
            return res.status(404).json({
                status: 'error',
                message: 'Distribution not found'
            });
        }

        res.json({
            status: 'success',
            data: status
        });
    } catch (error) {
        logger.error('Get distribution status error:', error);
        next(error);
    }
});

// Get all distributions for user
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const distributions = await Distribution.findByUserId(userId);

        res.json({
            status: 'success',
            data: distributions
        });
    } catch (error) {
        logger.error('Get distributions error:', error);
        next(error);
    }
});

// Assign codes to distribution
router.post('/:id/assign-codes', authMiddleware, async (req, res, next) => {
    try {
        const distributionId = req.params.id;
        const userId = req.user.userId;
        const { isrcCode, upcCode } = req.body;

        // Verify code ownership and availability
        if (isrcCode) {
            const isrcCodeRecord = await Code.findById(isrcCode);
            if (!isrcCodeRecord || isrcCodeRecord.user_id !== userId || isrcCodeRecord.is_used) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid or unavailable ISRC code'
                });
            }
            await Code.assignToDistribution(isrcCode, distributionId);
        }

        if (upcCode) {
            const upcCodeRecord = await Code.findById(upcCode);
            if (!upcCodeRecord || upcCodeRecord.user_id !== userId || upcCodeRecord.is_used) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid or unavailable UPC code'
                });
            }
            await Code.assignToDistribution(upcCode, distributionId);
        }

        // Update distribution with codes
        const distribution = await Distribution.findById(distributionId);
        
        res.json({
            status: 'success',
            data: {
                message: 'Codes assigned successfully',
                distribution
            }
        });
    } catch (error) {
        logger.error('Assign codes error:', error);
        next(error);
    }
});

// Cancel distribution
router.post('/:id/cancel', authMiddleware, async (req, res, next) => {
    try {
        const distributionId = req.params.id;
        const userId = req.user.userId;

        const distribution = await Distribution.findById(distributionId);
        
        if (!distribution || distribution.user_id !== userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Distribution not found'
            });
        }

        // Update status to cancelled for all platforms
        await Promise.all([
            Distribution.updatePlatformStatus(distributionId, 'youtube', 'cancelled'),
            Distribution.updatePlatformStatus(distributionId, 'spotify', 'cancelled'),
            Distribution.updatePlatformStatus(distributionId, 'soundcloud', 'cancelled')
        ]);

        res.json({
            status: 'success',
            message: 'Distribution cancelled successfully'
        });
    } catch (error) {
        logger.error('Cancel distribution error:', error);
        next(error);
    }
});

// Get distribution analytics
router.get('/:id/analytics', authMiddleware, async (req, res, next) => {
    try {
        const distributionId = req.params.id;
        const userId = req.user.userId;

        const distribution = await Distribution.findById(distributionId);
        
        if (!distribution || distribution.user_id !== userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Distribution not found'
            });
        }

        // Get analytics from each platform
        const analytics = {
            youtube: await streamingService.getYouTubeAnalytics(distributionId),
            soundcloud: await streamingService.getSoundCloudAnalytics(distributionId)
        };

        res.json({
            status: 'success',
            data: analytics
        });
    } catch (error) {
        logger.error('Get distribution analytics error:', error);
        next(error);
    }
});

module.exports = router;