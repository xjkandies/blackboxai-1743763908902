const { execSync } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.blue}Setting up the project...${colors.reset}\n`);

try {
  // Install dependencies
  console.log(`${colors.yellow}Installing backend dependencies...${colors.reset}`);
  execSync('cd backend && npm install', { stdio: 'inherit' });
  
  console.log(`\n${colors.yellow}Installing frontend dependencies...${colors.reset}`);
  execSync('cd frontend && npm install', { stdio: 'inherit' });

  // Create necessary directories
  console.log(`\n${colors.yellow}Creating uploads directory...${colors.reset}`);
  execSync('mkdir -p backend/uploads && chmod 777 backend/uploads', { stdio: 'inherit' });

  // Initialize database
  console.log(`\n${colors.yellow}Initializing database...${colors.reset}`);
  execSync('cd backend && node src/config/initDb.js', { stdio: 'inherit' });

  console.log(`\n${colors.green}Setup completed successfully!${colors.reset}`);
  console.log(`\n${colors.bright}To start the application:${colors.reset}`);
  console.log(`1. Start backend: ${colors.blue}cd backend && npm start${colors.reset}`);
  console.log(`2. Start frontend: ${colors.blue}cd frontend && npm run dev${colors.reset}`);

} catch (error) {
  console.error(`\n${colors.red}Error during setup:${colors.reset}`, error.message);
  process.exit(1);
}