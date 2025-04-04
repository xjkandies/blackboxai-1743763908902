const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { errorHandler } = require('./src/middlewares/errorHandler');
const { logger } = require('./src/utils/logger');
const User = require('./src/models/User');
const Distribution = require('./src/models/Distribution');
const Code = require('./src/models/Code');
const initializeTables = require('./src/config/initDb');

// Initialize database tables
initializeTables()
    .then(() => logger.info('Database tables initialized'))
    .catch(err => logger.error('Failed to initialize database tables:', err));

// Import routes
const authRoutes = require('./src/routes/auth');
const distributionRoutes = require('./src/routes/distribution');
const codesRoutes = require('./src/routes/codes');
const marketingRoutes = require('./src/routes/marketing');
const paymentsRoutes = require('./src/routes/payments');

const app = express();

// Create uploads directory if it doesn't exist
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());

// Raw body parser for Stripe webhooks
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Regular body parsers for other routes
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payments/webhook') {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/distribution', distributionRoutes);
app.use('/api/codes', codesRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/payments', paymentsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    // Don't exit the process in production, just log the error
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    // Exit the process in case of uncaught exception
    process.exit(1);
});

module.exports = app;