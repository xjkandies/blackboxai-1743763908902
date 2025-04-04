-- Create database
CREATE DATABASE music_distribution;

-- Connect to the database
\c music_distribution;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create distributions table
CREATE TABLE IF NOT EXISTS distributions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    release_date DATE,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create codes table
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
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payment_codes table (linking payments to generated codes)
CREATE TABLE IF NOT EXISTS payment_codes (
    id SERIAL PRIMARY KEY,
    payment_id INTEGER REFERENCES payments(id),
    code_id INTEGER REFERENCES codes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_codes_user_id ON codes(user_id);
CREATE INDEX idx_codes_distribution_id ON codes(distribution_id);
CREATE INDEX idx_codes_code_type ON codes(code_type);
CREATE INDEX idx_distributions_user_id ON distributions(user_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_stripe_payment_id ON payments(stripe_payment_id);
CREATE INDEX idx_payment_codes_payment_id ON payment_codes(payment_id);
CREATE INDEX idx_payment_codes_code_id ON payment_codes(code_id);