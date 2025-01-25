#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print step message
print_step() {
    echo -e "${YELLOW}[DEPLOY]${NC} $1"
}

# Function to check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "Error: $1 is required but not installed."
        exit 1
    fi
}

# Check required commands
check_command "bun"
check_command "vercel"
check_command "git"

# Start deployment process
print_step "Starting deployment process..."

# Check if we're on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo "Error: You must be on main branch to deploy"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Install dependencies
print_step "Installing dependencies..."
bun install

# Run tests if they exist
if grep -q "\"test\":" package.json; then
    print_step "Running tests..."
    bun test
fi

# Clean dist directory
print_step "Cleaning dist directory..."
rm -rf dist

# Build the project
print_step "Building project..."
bun run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi

# Optimize dist directory
print_step "Optimizing build..."
if command -v brotli &> /dev/null; then
    find dist -type f -regex '.*\.\(js\|css\|html\|svg\)$' -exec brotli -f {} \;
fi

# Deploy to Vercel
print_step "Deploying to Vercel..."
vercel --prod

# If deployment was successful
if [ $? -eq 0 ]; then
    print_step "Deployment completed successfully!"
    echo -e "${GREEN}Your site is now live!${NC}"
    
    # Get the deployment URL
    DEPLOY_URL=$(vercel --prod --confirm)
    echo -e "${GREEN}Deployment URL: ${DEPLOY_URL}${NC}"
else
    echo "Error: Deployment failed"
    exit 1
fi
