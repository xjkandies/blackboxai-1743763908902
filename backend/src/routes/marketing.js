const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const marketingService = require('../services/marketingService');
const Distribution = require('../models/Distribution');
const { logger } = require('../utils/logger');

// Generate AI playlist pitch
router.post('/playlist-pitch', authMiddleware, async (req, res, next) => {
    try {
        const { distributionId } = req.body;
        const userId = req.user.userId;

        // Get distribution details
        const distribution = await Distribution.findById(distributionId);
        if (!distribution || distribution.user_id !== userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Distribution not found'
            });
        }

        // Generate pitch using AI
        const pitch = await marketingService.generatePlaylistPitch({
            title: distribution.title,
            artist: distribution.artist,
            genre: distribution.genre,
            mood: distribution.mood,
            tempo: distribution.tempo,
            key: distribution.key
        });

        res.json({
            status: 'success',
            data: pitch
        });
    } catch (error) {
        logger.error('Generate playlist pitch error:', error);
        next(error);
    }
});

// Get social media analytics
router.get('/analytics', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { distributionId } = req.query;

        let analytics;
        if (distributionId) {
            // Get analytics for specific distribution
            analytics = await marketingService.trackSocialMediaPerformance(userId, distributionId);
        } else {
            // Get overall analytics for user's social media
            analytics = {
                instagram: await marketingService.getInstagramAnalytics(userId),
                x: await marketingService.getXAnalytics(userId)
            };
        }

        res.json({
            status: 'success',
            data: analytics
        });
    } catch (error) {
        logger.error('Get analytics error:', error);
        next(error);
    }
});

// Get platform-specific analytics
router.get('/analytics/:platform', authMiddleware, async (req, res, next) => {
    try {
        const { platform } = req.params;
        const userId = req.user.userId;
        const { distributionId } = req.query;

        let analytics;
        switch (platform.toLowerCase()) {
            case 'youtube':
                analytics = await marketingService.getYouTubeAnalytics(distributionId);
                break;
            case 'soundcloud':
                analytics = await marketingService.getSoundCloudAnalytics(distributionId);
                break;
            case 'instagram':
                analytics = await marketingService.getInstagramAnalytics(userId);
                break;
            case 'x':
                analytics = await marketingService.getXAnalytics(userId);
                break;
            default:
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid platform specified'
                });
        }

        res.json({
            status: 'success',
            data: analytics
        });
    } catch (error) {
        logger.error(`Get ${req.params.platform} analytics error:`, error);
        next(error);
    }
});

// Get matching playlists
router.get('/matching-playlists/:distributionId', authMiddleware, async (req, res, next) => {
    try {
        const { distributionId } = req.params;
        const userId = req.user.userId;

        // Get distribution details
        const distribution = await Distribution.findById(distributionId);
        if (!distribution || distribution.user_id !== userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Distribution not found'
            });
        }

        // Find matching playlists
        const matchingPlaylists = await marketingService.findMatchingPlaylists({
            title: distribution.title,
            artist: distribution.artist,
            genre: distribution.genre,
            mood: distribution.mood,
            tempo: distribution.tempo,
            key: distribution.key
        });

        res.json({
            status: 'success',
            data: matchingPlaylists
        });
    } catch (error) {
        logger.error('Get matching playlists error:', error);
        next(error);
    }
});

// Get pitch points
router.get('/pitch-points/:distributionId', authMiddleware, async (req, res, next) => {
    try {
        const { distributionId } = req.params;
        const userId = req.user.userId;

        // Get distribution details
        const distribution = await Distribution.findById(distributionId);
        if (!distribution || distribution.user_id !== userId) {
            return res.status(404).json({
                status: 'error',
                message: 'Distribution not found'
            });
        }

        // Generate pitch points
        const pitchPoints = await marketingService.generatePitchPoints({
            title: distribution.title,
            artist: distribution.artist,
            genre: distribution.genre,
            mood: distribution.mood,
            tempo: distribution.tempo,
            key: distribution.key
        });

        res.json({
            status: 'success',
            data: pitchPoints
        });
    } catch (error) {
        logger.error('Get pitch points error:', error);
        next(error);
    }
});

// Get performance overview
router.get('/performance-overview', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { startDate, endDate } = req.query;

        // Get all user's distributions
        const distributions = await Distribution.findByUserId(userId);

        // Collect performance data for each distribution
        const performanceData = await Promise.all(
            distributions.map(async (distribution) => {
                const analytics = await marketingService.trackSocialMediaPerformance(
                    userId,
                    distribution.id
                );

                return {
                    distributionId: distribution.id,
                    title: distribution.title,
                    artist: distribution.artist,
                    analytics
                };
            })
        );

        res.json({
            status: 'success',
            data: performanceData
        });
    } catch (error) {
        logger.error('Get performance overview error:', error);
        next(error);
    }
});

module.exports = router;