#!/bin/bash

# Quick Start Script for Visa Sponsor Jobs
# Run this after cloning the repository

echo "🚀 Setting up Visa Sponsor Jobs..."
echo ""

# Check Node.js version
echo "📋 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "   Node version: $NODE_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Setup environment
echo "⚙️  Setting up environment..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "   ⚠️  Please update .env.local with your actual values"
else
    echo "✅ .env.local already exists"
fi
echo ""

# Build check
echo "🏗️  Running build check..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# Type check
echo "🔍 Running type check..."
npm run type-check
if [ $? -eq 0 ]; then
    echo "✅ Type check passed"
else
    echo "⚠️  Type check warnings (not blocking)"
fi
echo ""

# Lint check
echo "📝 Running lint..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ Lint passed"
else
    echo "⚠️  Lint warnings (not blocking)"
fi
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Documentation:"
echo "  - README_OPTIMIZED.md - Project overview"
echo "  - DEPLOYMENT.md - Deployment guide"
echo "  - OPTIMIZATION_CHECKLIST.md - Quality assurance"
echo ""
