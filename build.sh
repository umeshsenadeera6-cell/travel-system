#!/bin/bash

# Serendib Travel System - Build Orchestrator
# This script ensures the frontend is built and its artifacts are 
# staged at the repository root for Vercel deployment.

echo "🚀 Starting build process..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install --prefix frontend

# 2. Build Frontend
echo "🏗️ Building frontend..."
npm run build --prefix frontend

# 3. Create root dist directory
echo "📂 Staging build artifacts..."
mkdir -p dist

# 4. Copy build artifacts to root dist
# We use -r to ensure assets subfolders are copied
cp -rv frontend/dist/* dist/

echo "✅ Build complete! Artifacts are staged in the root /dist directory."
echo "🔗 You can now push your changes to trigger a Vercel deployment."
