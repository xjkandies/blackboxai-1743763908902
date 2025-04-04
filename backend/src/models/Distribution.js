const { query } = require('../config/db');
const { logger } = require('../utils/logger');

class Distribution {
    static async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS distributions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                artist VARCHAR(255) NOT NULL,
                file_url TEXT NOT NULL,
                cover_art_url TEXT,
                youtube_status VARCHAR(50) DEFAULT 'pending',
                youtube_url TEXT,
                spotify_status VARCHAR(50) DEFAULT 'pending',
                spotify_url TEXT,
                soundcloud_status VARCHAR(50) DEFAULT 'pending',
                soundcloud_url TEXT,
                isrc_code VARCHAR(50),
                upc_code VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        try {
            await query(sql);
            logger.info('Distributions table created or already exists');
        } catch (error) {
            logger.error('Error creating distributions table:', error);
            throw error;
        }
    }

    static async create({ userId, title, artist, fileUrl, coverArtUrl, isrcCode, upcCode }) {
        const sql = `
            INSERT INTO distributions 
            (user_id, title, artist, file_url, cover_art_url, isrc_code, upc_code)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

        try {
            const result = await query(sql, [
                userId, title, artist, fileUrl, coverArtUrl, isrcCode, upcCode
            ]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error creating distribution:', error);
            throw error;
        }
    }

    static async updatePlatformStatus(distributionId, platform, status, url = null) {
        const validPlatforms = ['youtube', 'spotify', 'soundcloud'];
        if (!validPlatforms.includes(platform)) {
            throw new Error('Invalid platform');
        }

        const sql = `
            UPDATE distributions 
            SET ${platform}_status = $1,
                ${platform}_url = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `;

        try {
            const result = await query(sql, [status, url, distributionId]);
            return result.rows[0];
        } catch (error) {
            logger.error(`Error updating ${platform} status:`, error);
            throw error;
        }
    }

    static async findByUserId(userId) {
        const sql = `
            SELECT * FROM distributions 
            WHERE user_id = $1 
            ORDER BY created_at DESC
        `;

        try {
            const result = await query(sql, [userId]);
            return result.rows;
        } catch (error) {
            logger.error('Error finding distributions by user ID:', error);
            throw error;
        }
    }

    static async findById(id) {
        const sql = 'SELECT * FROM distributions WHERE id = $1';

        try {
            const result = await query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error finding distribution by ID:', error);
            throw error;
        }
    }

    static async getDistributionStatus(id) {
        const sql = `
            SELECT 
                id,
                title,
                youtube_status,
                youtube_url,
                spotify_status,
                spotify_url,
                soundcloud_status,
                soundcloud_url
            FROM distributions 
            WHERE id = $1
        `;

        try {
            const result = await query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error getting distribution status:', error);
            throw error;
        }
    }
}

module.exports = Distribution;