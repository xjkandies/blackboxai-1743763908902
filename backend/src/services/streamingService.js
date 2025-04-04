const axios = require('axios');
const { logger } = require('../utils/logger');
const Distribution = require('../models/Distribution');

class StreamingService {
    // YouTube Music Distribution
    async distributeToYouTube(distributionId, fileUrl, metadata) {
        try {
            // Update status to processing
            await Distribution.updatePlatformStatus(distributionId, 'youtube', 'processing');

            // Simulate YouTube upload process
            const response = await axios.post('https://www.googleapis.com/youtube/v3/videos', {
                snippet: {
                    title: metadata.title,
                    description: metadata.description,
                    tags: metadata.tags
                },
                status: {
                    privacyStatus: "public"
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${metadata.youtubeToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const youtubeUrl = `https://youtube.com/watch?v=${response.data.id}`;
            
            // Update status to completed with URL
            await Distribution.updatePlatformStatus(distributionId, 'youtube', 'completed', youtubeUrl);
            
            logger.info(`Successfully distributed to YouTube: ${youtubeUrl}`);
            return youtubeUrl;
        } catch (error) {
            logger.error('Error distributing to YouTube:', error);
            await Distribution.updatePlatformStatus(distributionId, 'youtube', 'failed');
            throw new Error('Failed to distribute to YouTube');
        }
    }

    // Spotify Distribution
    async distributeToSpotify(distributionId, fileUrl, metadata) {
        try {
            // Update status to processing
            await Distribution.updatePlatformStatus(distributionId, 'spotify', 'processing');

            // Simulate Spotify upload process
            const response = await axios.post('https://api.spotify.com/v1/users/me/tracks', {
                name: metadata.title,
                description: metadata.description,
                audio_url: fileUrl
            }, {
                headers: {
                    'Authorization': `Bearer ${metadata.spotifyToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const spotifyUrl = response.data.external_urls.spotify;
            
            // Update status to completed with URL
            await Distribution.updatePlatformStatus(distributionId, 'spotify', 'completed', spotifyUrl);
            
            logger.info(`Successfully distributed to Spotify: ${spotifyUrl}`);
            return spotifyUrl;
        } catch (error) {
            logger.error('Error distributing to Spotify:', error);
            await Distribution.updatePlatformStatus(distributionId, 'spotify', 'failed');
            throw new Error('Failed to distribute to Spotify');
        }
    }

    // SoundCloud Distribution
    async distributeToSoundCloud(distributionId, fileUrl, metadata) {
        try {
            // Update status to processing
            await Distribution.updatePlatformStatus(distributionId, 'soundcloud', 'processing');

            // Simulate SoundCloud upload process
            const response = await axios.post('https://api.soundcloud.com/tracks', {
                title: metadata.title,
                description: metadata.description,
                asset_data: fileUrl
            }, {
                headers: {
                    'Authorization': `OAuth ${metadata.soundcloudToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const soundcloudUrl = response.data.permalink_url;
            
            // Update status to completed with URL
            await Distribution.updatePlatformStatus(distributionId, 'soundcloud', 'completed', soundcloudUrl);
            
            logger.info(`Successfully distributed to SoundCloud: ${soundcloudUrl}`);
            return soundcloudUrl;
        } catch (error) {
            logger.error('Error distributing to SoundCloud:', error);
            await Distribution.updatePlatformStatus(distributionId, 'soundcloud', 'failed');
            throw new Error('Failed to distribute to SoundCloud');
        }
    }

    // Distribute to all platforms
    async distributeToAllPlatforms(distributionId, fileUrl, metadata) {
        try {
            // Start distribution to all platforms concurrently
            const distributionPromises = [
                this.distributeToYouTube(distributionId, fileUrl, metadata),
                this.distributeToSpotify(distributionId, fileUrl, metadata),
                this.distributeToSoundCloud(distributionId, fileUrl, metadata)
            ];

            // Wait for all distributions to complete
            const results = await Promise.allSettled(distributionPromises);
            
            // Log results
            results.forEach((result, index) => {
                const platform = ['YouTube', 'Spotify', 'SoundCloud'][index];
                if (result.status === 'fulfilled') {
                    logger.info(`Distribution to ${platform} completed successfully`);
                } else {
                    logger.error(`Distribution to ${platform} failed:`, result.reason);
                }
            });

            return results;
        } catch (error) {
            logger.error('Error in distribution process:', error);
            throw new Error('Distribution process failed');
        }
    }

    // Check distribution status
    async checkDistributionStatus(distributionId) {
        try {
            const status = await Distribution.getDistributionStatus(distributionId);
            return status;
        } catch (error) {
            logger.error('Error checking distribution status:', error);
            throw new Error('Failed to check distribution status');
        }
    }
}

module.exports = new StreamingService();