#!/bin/bash

# Script to restart analysis processes if they've failed or stopped

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

echo -e "${PURPLE}Checking Analysis Processes${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"

# Check for latest build
LATEST_BUILD=$(ls -1t output/builds 2>/dev/null | head -1)
if [ -z "$LATEST_BUILD" ]; then
    echo -e "${RED}No builds found. Run 'npm run pdf' first.${NC}"
    exit 1
fi

BUILD_DIR="output/builds/$LATEST_BUILD"
echo -e "${BLUE}Latest build:${NC} $LATEST_BUILD\n"

# Check content analysis
if pgrep -f "analyze-latest-build.sh" > /dev/null; then
    echo -e "${GREEN}✓${NC} Content analysis is running"
else
    echo -e "${YELLOW}⚠${NC}  Content analysis not running"
    
    # Check if it's already complete
    if [ -f "$BUILD_DIR/analysis-complete.flag" ]; then
        echo -e "   ${BLUE}Already complete${NC}"
    else
        echo -e "   ${YELLOW}Starting content analysis...${NC}"
        ./scripts/analyze-latest-build.sh > output/content-analysis.log 2>&1 &
        echo -e "   ${GREEN}✓ Started${NC}"
    fi
fi

# Check style analysis
if pgrep -f "analyze-style-guide.sh" > /dev/null; then
    echo -e "${GREEN}✓${NC} Style analysis is running"
else
    echo -e "${YELLOW}⚠${NC}  Style analysis not running"
    
    # Check if it's already complete
    if [ -f "$BUILD_DIR/style-analysis-complete.flag" ]; then
        echo -e "   ${BLUE}Already complete${NC}"
    else
        # Check if content analysis is done (prerequisite)
        if [ -f "$BUILD_DIR/analysis-complete.flag" ]; then
            echo -e "   ${YELLOW}Starting style analysis (iterative)...${NC}"
            ./scripts/analyze-style-guide-iterative.sh > output/style-analysis.log 2>&1 &
            echo -e "   ${GREEN}✓ Started${NC}"
        else
            echo -e "   ${GRAY}Waiting for content analysis to complete${NC}"
        fi
    fi
fi

# Check screenshot renaming
if pgrep -f "rename-pdf-screenshots" > /dev/null; then
    echo -e "${GREEN}✓${NC} Screenshot renaming is running"
else
    echo -e "${YELLOW}⚠${NC}  Screenshot renaming not running"
    
    # Check if already renamed
    RENAMED_COUNT=$(ls -1 output/PDF-Screenshots/*.png 2>/dev/null | grep -v "page-[0-9]" | wc -l)
    if [ "$RENAMED_COUNT" -gt 50 ]; then
        echo -e "   ${BLUE}Already renamed ($RENAMED_COUNT files)${NC}"
    else
        echo -e "   ${YELLOW}Starting screenshot renaming...${NC}"
        echo "2" | ./scripts/rename-pdf-screenshots-direct.sh > output/rename-screenshots.log 2>&1 &
        echo -e "   ${GREEN}✓ Started${NC}"
    fi
fi

echo -e "\n${PURPLE}Process Status Summary:${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Count running processes
RUNNING=$(ps aux | grep -E "(analyze-latest-build|analyze-style-guide|rename-pdf-screenshots)" | grep -v grep | wc -l)
echo -e "Running processes: ${GREEN}$RUNNING${NC}"

# Show log files
echo -e "\n${BLUE}Log files:${NC}"
[ -f "output/content-analysis.log" ] && echo "  • output/content-analysis.log"
[ -f "output/style-analysis.log" ] && echo "  • output/style-analysis.log"
[ -f "output/rename-screenshots.log" ] && echo "  • output/rename-screenshots.log"

echo -e "\n${YELLOW}Monitor activity:${NC} npm run build:monitor"
echo -e "${YELLOW}Check status:${NC} npm run build:status"