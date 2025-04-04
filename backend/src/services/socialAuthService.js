const axios = require('axios');
const { logger } = require('../utils/logger');
const User = require('../models/User');

class SocialAuthService {
    // Instagram Integration
    async connectInstagram(userId, authCode) {
        try {
            // Exchange auth code for access token
            const response = await axios.post('https://api.instagram.com/oauth/access_token', {
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.FRONTEND_URL}/auth/instagram/callback`,
                code: authCode
            });

            const accessToken = response.data.access_token;
            
            // Store the access token
            await User.updateSocialToken(userId, 'instagram', accessToken);
            
            logger.info(`Instagram connected for user ${userId}`);
            return true;
        } catch (error) {
            logger.error('Error connecting Instagram:', error);
            throw new Error('Failed to connect Instagram account');
        }
    }

    // X (Twitter) Integration
    async connectX(userId, authCode) {
        try {
            // Exchange auth code for access token using X OAuth 2.0
            const response = await axios.post('https://api.twitter.com/2/oauth2/token', {
                code: authCode,
                grant_type: 'authorization_code',
                client_id: process.env.X_CLIENT_ID,
                client_secret: process.env.X_CLIENT_SECRET,
                redirect_uri: `${process.env.FRONTEND_URL}/auth/x/callback`,
                code_verifier: 'challenge' // Should be stored in session and verified
            });

            const accessToken = response.data.access_token;
            
            // Store the access token
            await User.updateSocialToken(userId, 'x', accessToken);
            
            logger.info(`X connected for user ${userId}`);
            return true;
        } catch (error) {
            logger.error('Error connecting X:', error);
            throw new Error('Failed to connect X account');
        }
    }

    // YouTube Integration
    async connectYouTube(userId, authCode) {
        try {
            // Exchange auth code for access token
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                code: authCode,
                client_id: process.env.YOUTUBE_CLIENT_ID,
                client_secret: process.env.YOUTUBE_CLIENT_SECRET,
                redirect_uri: `${process.env.FRONTEND_URL}/auth/youtube/callback`,
                grant_type: 'authorization_code'
            });

            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            
            // Store both tokens (we'll need refresh token for long-term access)
            const tokenData = JSON.stringify({ accessToken, refreshToken });
            await User.updateSocialToken(userId, 'youtube', tokenData);
            
            logger.info(`YouTube connected for user ${userId}`);
            return true;
        } catch (error) {
            logger.error('Error connecting YouTube:', error);
            throw new Error('Failed to connect YouTube account');
        }
    }

    // Refresh YouTube token when needed
    async refreshYouTubeToken(userId, refreshToken) {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                refresh_token: refreshToken,
                client_id: process.env.YOUTUBE_CLIENT_ID,
                client_secret: process.env.YOUTUBE_CLIENT_SECRET,
                grant_type: 'refresh_token'
            });

            const newAccessToken = response.data.access_token;
            const tokenData = JSON.stringify({ 
                accessToken: newAccessToken, 
                refreshToken 
            });

            await User.updateSocialToken(userId, 'youtube', tokenData);
            return newAccessToken;
        } catch (error) {
            logger.error('Error refreshing YouTube token:', error);
            throw new Error('Failed to refresh YouTube token');
        }
    }

    // Verify social media connections
    async verifyConnections(userId) {
        try {
            const user = await User.findById(userId);
            const connections = {
                instagram: !!user.instagram_token,
                x: !!user.x_token,
                youtube: !!user.youtube_token
            };
            return connections;
        } catch (error) {
            logger.error('Error verifying social connections:', error);
            throw new Error('Failed to verify social media connections');
        }
    }
}

module.exports = new SocialAuthService();