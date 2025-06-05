#!/bin/bash

# BMPOA Guide - GitHub Setup Script
# This script initializes git and pushes to the newly created repository

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Guide - GitHub Setup${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}✓${NC} Git initialized"
else
    echo -e "${GREEN}✓${NC} Git already initialized"
fi

# Add all files
echo -e "${YELLOW}Adding files to git...${NC}"
git add .
echo -e "${GREEN}✓${NC} Files added"

# Create initial commit
echo -e "${YELLOW}Creating initial commit...${NC}"
git commit -m "Initial commit: BMPOA Community Guide v1.1.1

- Complete 12-section community guide
- Digital and print-ready versions
- Responsive design with accessibility features
- Comprehensive build and deployment scripts
- Full documentation and changelog"

echo -e "${GREEN}✓${NC} Initial commit created"

# Add remote origin
echo -e "${YELLOW}Adding GitHub remote...${NC}"
git remote add origin https://github.com/DrunkOnJava/bmpoa-guide.git
echo -e "${GREEN}✓${NC} Remote added"

# Set main branch
git branch -M main

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
echo -e "${BLUE}You may be prompted for your GitHub credentials${NC}"
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Successfully pushed to GitHub!"
    echo ""
    echo -e "${GREEN}Your repository is now live at:${NC}"
    echo -e "${BLUE}https://github.com/DrunkOnJava/bmpoa-guide${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Enable GitHub Pages if you want to host the guide online"
    echo "2. Add collaborators if needed"
    echo "3. Create releases for major versions"
else
    echo -e "${RED}✗${NC} Failed to push to GitHub"
    echo ""
    echo "If authentication failed, you may need to:"
    echo "1. Set up a GitHub Personal Access Token"
    echo "2. Use GitHub CLI: gh auth login"
    echo "3. Or use SSH instead of HTTPS"
fi
