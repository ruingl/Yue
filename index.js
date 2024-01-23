const { spawn } = require('child_process');

// Spawn yue.js
const yueProcess = spawn('node', ['yue.js']);

// Handle process events
yueProcess.on('exit', (code, signal) => {
  console.log(`yue.js exited with code ${code} and signal ${signal}`);
  process.exit(code); // Exit with the same code
});

yueProcess.on('error', (err) => {
  console.error('Error spawning yue.js:', err);
  process.exit(1); // Exit with an error code
});

// Listen for process termination
process.on('SIGINT', () => {
  console.log('Received SIGINT. Terminating yue.js...');
  yueProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Terminating yue.js...');
  yueProcess.kill('SIGTERM');
});

console.log('Spawned yue.js with PID:', yueProcess.pid);