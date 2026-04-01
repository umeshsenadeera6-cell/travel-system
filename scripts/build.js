const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Serendib Travel System - Node-based Build Orchestrator
 * This script ensures the frontend is built and its artifacts are
 * staged at the repository root for Vercel deployment.
 * It replaces shell scripts to ensure cross-platform compatibility.
 */

console.log('🚀 Starting build process...');

function runCommand(command, cwd) {
  console.log(`\n🏗️  Running: ${command}${cwd ? ` (in ${cwd})` : ''}`);
  try {
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    process.exit(1);
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Install dependencies
runCommand('npm install', path.join(process.cwd(), 'frontend'));

// 2. Build Frontend
runCommand('npm run build', path.join(process.cwd(), 'frontend'));

// 3. Staging build artifacts
console.log('\n📂 Staging build artifacts...');
const rootDist = path.join(process.cwd(), 'dist');
const frontendDist = path.join(process.cwd(), 'frontend', 'dist');

if (fs.existsSync(rootDist)) {
  console.log('🧹 Cleaning old root dist directory...');
  fs.rmSync(rootDist, { recursive: true, force: true });
}

console.log(`📁 Copying from ${frontendDist} to ${rootDist}...`);
copyRecursiveSync(frontendDist, rootDist);

console.log('\n✅ Build complete! Artifacts are staged in the root /dist directory.');
console.log('🔗 You can now push your changes to trigger a Vercel deployment.');
