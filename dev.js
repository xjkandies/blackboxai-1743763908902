const { spawn } = require('child_process');
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

// Function to start a process
function startProcess(name, command, args, cwd) {
  const proc = spawn(command, args, {
    cwd: path.join(__dirname, cwd),
    shell: true,
    stdio: 'pipe'
  });

  // Handle process output
  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${colors.bright}[${name}]${colors.reset} ${line}`);
      }
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.error(`${colors.red}[${name} ERROR]${colors.reset} ${line}`);
      }
    });
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`${colors.red}[${name}] Process exited with code ${code}${colors.reset}`);
    }
  });

  return proc;
}

console.log(`${colors.bright}${colors.blue}Starting development servers...${colors.reset}\n`);

// Start backend server
const backend = startProcess('Backend', 'npm', ['start'], 'backend');

// Start frontend development server
const frontend = startProcess('Frontend', 'npm', ['run', 'dev'], 'frontend');

// Handle process termination
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}Shutting down servers...${colors.reset}`);
  backend.kill();
  frontend.kill();
  process.exit(0);
});