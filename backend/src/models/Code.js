const { query } = require('../config/db');
const { logger } = require('../utils/logger');

class Code {
    static async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS codes (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                code_type VARCHAR(10) NOT NULL CHECK (code_type IN ('UPC', 'ISRC')),
                code_value VARCHAR(50) UNIQUE NOT NULL,
                is_used BOOLEAN DEFAULT FALSE,
                distribution_id INTEGER REFERENCES distributions(id),
                purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        try {
            await query(sql);
            logger.info('Codes table created or already exists');
        } catch (error) {
            logger.error('Error creating codes table:', error);
            throw error;
        }
    }

    static async create({ userId, codeType, codeValue }) {
        const sql = `
            INSERT INTO codes (user_id, code_type, code_value)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        try {
            const result = await query(sql, [userId, codeType, codeValue]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error creating code:', error);
            throw error;
        }
    }

    static async findAvailableByUser(userId, codeType) {
        const sql = `
            SELECT * FROM codes 
            WHERE user_id = $1 
            AND code_type = $2 
            AND is_used = FALSE
            ORDER BY created_at ASC
        `;

        try {
            const result = await query(sql, [userId, codeType]);
            return result.rows;
        } catch (error) {
            logger.error('Error finding available codes:', error);
            throw error;
        }
    }

    static async assignToDistribution(codeId, distributionId) {
        const sql = `
            UPDATE codes 
            SET is_used = TRUE,
                distribution_id = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2 AND is_used = FALSE
            RETURNING *
        `;

        try {
            const result = await query(sql, [distributionId, codeId]);
            return result.rows[0];
        } catch (error) {
            logger.error('Error assigning code to distribution:', error);
            throw error;
        }
    }

    static async findByDistribution(distributionId) {
        const sql = `
            SELECT * FROM codes 
            WHERE distribution_id = $1
        `;

        try {
            const result = await query(sql, [distributionId]);
            return result.rows;
        } catch (error) {
            logger.error('Error finding codes by distribution:', error);
            throw error;
        }
    }

    static async generateUniqueCode(type) {
        let code;
        if (type === 'UPC') {
            // Generate 12-digit UPC code
            code = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
        } else if (type === 'ISRC') {
            // Generate ISRC code (format: CC-XXX-YY-NNNNN)
            const country = 'US'; // Country code
            const registrant = 'ABC'; // Registrant code (should be assigned)
            const year = new Date().getFullYear().toString().slice(-2);
            const designation = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
            code = `${country}-${registrant}-${year}-${designation}`;
        } else {
            throw new Error('Invalid code type');
        }
        return code;
    }
}

module.exports = Code;