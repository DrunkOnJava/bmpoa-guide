#!/bin/bash

# Script to automatically rename PDF screenshots with intelligent analysis
# This runs the rename process with automatic approval

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

echo -e "${PURPLE}╔════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║   Automated PDF Screenshot Renaming    ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════╝${NC}\n"

# Check if screenshots exist
if [ ! -d "output/PDF-Screenshots" ]; then
    echo -e "${RED}Error: PDF-Screenshots directory not found${NC}"
    echo "Run 'npm run pdf' first to generate screenshots"
    exit 1
fi

# Count existing files
TOTAL=$(ls -1 output/PDF-Screenshots/page-*.png 2>/dev/null | wc -l)
if [ "$TOTAL" -eq 0 ]; then
    echo -e "${RED}No page-*.png files found${NC}"
    exit 1
fi

echo -e "${BLUE}Found $TOTAL screenshots to rename${NC}\n"

# Run the rename script with automatic approval (option 2)
echo "2" | ./scripts/rename-pdf-screenshots-direct.sh

# Check results
RENAMED=$(ls -1 output/PDF-Screenshots/*.png 2>/dev/null | grep -v "^output/PDF-Screenshots/page-" | wc -l)

echo -e "\n${GREEN}✅ Renaming complete!${NC}"
echo -e "   ${GREEN}$RENAMED${NC} files renamed successfully"
echo -e "   Original files backed up to: ${BLUE}output/PDF-Screenshots/original-backup/${NC}"

# Show sample of renamed files
if [ "$RENAMED" -gt 0 ]; then
    echo -e "\n${PURPLE}Sample renamed files:${NC}"
    ls -1 output/PDF-Screenshots/*.png | grep -v "^output/PDF-Screenshots/page-" | head -5
fi