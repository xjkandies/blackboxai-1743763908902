const { query } = require('../config/db');
const bcrypt = require('bcryptjs');
const { logger } = require('../utils/logger');

class User {
    static async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                instagram_token TEXT,
                x_token TEXT,
                youtube_token TEXT,
                is_verified BOOLEAN DEFAULT FALSE,
                verification_token VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        try {
            await query(sql);
            logger.info('Users table created or already exists');
        } catch (error) {
            logger.error('Error creating users table:', error);
            throw error;
        }
    }

    static async create({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const sql = `
            INSERT INTO users (name, email, password, verification_token)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, verification_token
        `;

        try {
            const result = await query(sql, [name, email, hashedPassword, verificationToken]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error creating user:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        
        try {
            const result = await query(sql, [email]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async verifyEmail(verificationToken) {
        const sql = `
            UPDATE users 
            SET is_verified = TRUE, 
                verification_token = NULL 
            WHERE verification_token = $1
            RETURNING id, email
        `;

        try {
            const result = await query(sql, [verificationToken]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error verifying email:', error);
            throw error;
        }
    }

    static async updateSocialToken(userId, platform, token) {
        const validPlatforms = ['instagram', 'x', 'youtube'];
        if (!validPlatforms.includes(platform)) {
            throw new Error('Invalid social media platform');
        }

        const sql = `
            UPDATE users 
            SET ${platform}_token = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING id, email, ${platform}_token
        `;

        try {
            const result = await query(sql, [token, userId]);
            return result.rows[0];
        } catch (error) {
            logger.error(`Error updating ${platform} token:`, error);
            throw error;
        }
    }

    static async validatePassword(user, password) {
        return bcrypt.compare(password, user.password);
    }
}

module.exports = User;