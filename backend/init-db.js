require('dotenv').config();
const initDb = require('./src/config/initDb');

console.log('Database configuration:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
});

initDb()
    .then(() => {
        console.log('Database initialized successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });