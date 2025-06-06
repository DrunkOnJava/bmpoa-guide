#!/bin/bash

# Complete Style Analysis Workflow

# Colors
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

echo -e "${PURPLE}╔══════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║   Style Guide Analysis Workflow      ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════╝${NC}\n"

# Step 1: Check for latest build
echo -e "${BLUE}Step 1: Checking for builds...${NC}"
LATEST_BUILD=$(ls -1t output/builds 2>/dev/null | head -1)

if [ -z "$LATEST_BUILD" ]; then
    echo -e "${RED}No builds found!${NC}"
    echo "Run 'npm run pdf' first to create a build"
    exit 1
fi

BUILD_DIR="output/builds/$LATEST_BUILD"
echo -e "${GREEN}✓${NC} Found latest build: $LATEST_BUILD"

# Step 2: Check if regular analysis is done
echo -e "\n${BLUE}Step 2: Checking content analysis status...${NC}"
if [ ! -f "$BUILD_DIR/analysis-complete.flag" ]; then
    echo -e "${YELLOW}Content analysis not complete. Running now...${NC}"
    ./scripts/analyze-latest-build.sh
    
    # Wait for completion or timeout
    WAIT_TIME=0
    while [ ! -f "$BUILD_DIR/analysis-complete.flag" ] && [ $WAIT_TIME -lt 300 ]; do
        sleep 5
        WAIT_TIME=$((WAIT_TIME + 5))
        echo -e "  Waiting for content analysis... ${WAIT_TIME}s"
    done
fi
echo -e "${GREEN}✓${NC} Content analysis complete"

# Step 3: Run style analysis
echo -e "\n${BLUE}Step 3: Running style guide analysis...${NC}"
echo -e "${YELLOW}This will use Claude 3.5 Sonnet for deep analysis${NC}"
echo -e "${YELLOW}Approximate time: 3-5 minutes for 100 pages${NC}\n"

# Check if already analyzed
if [ -f "$BUILD_DIR/style-analysis-complete.flag" ]; then
    echo -e "${GREEN}✓${NC} Style analysis already complete"
    echo -e "   Reports available in: $BUILD_DIR/"
else
    read -p "Continue with style analysis? (Y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        echo "Style analysis cancelled"
        exit 0
    fi
    
    # Run style analysis
    ./scripts/analyze-style-guide.sh "$LATEST_BUILD"
fi

# Step 4: Generate TODO items
echo -e "\n${BLUE}Step 4: Converting to TODO items...${NC}"
if [ -f "$BUILD_DIR/style-violations.json" ]; then
    node scripts/style-tasks-to-todo.js "$LATEST_BUILD"
    echo -e "${GREEN}✓${NC} TODO items generated"
else
    echo -e "${RED}No violations file found${NC}"
fi

# Step 5: Summary
echo -e "\n${PURPLE}═══════════════════════════════════════${NC}"
echo -e "${PURPLE}Analysis Complete!${NC}"
echo -e "${PURPLE}═══════════════════════════════════════${NC}\n"

# Show summary stats
if [ -f "$BUILD_DIR/style-violations.json" ]; then
    CRITICAL=$(grep -o '"severity":"critical"' "$BUILD_DIR/style-violations.json" | wc -l)
    MAJOR=$(grep -o '"severity":"major"' "$BUILD_DIR/style-violations.json" | wc -l)
    MINOR=$(grep -o '"severity":"minor"' "$BUILD_DIR/style-violations.json" | wc -l)
    
    echo -e "Style Violations Found:"
    echo -e "  ${RED}Critical: $CRITICAL${NC} (must fix)"
    echo -e "  ${YELLOW}Major: $MAJOR${NC} (should fix)"
    echo -e "  ${BLUE}Minor: $MINOR${NC} (nice to fix)"
    echo -e "  Total: $((CRITICAL + MAJOR + MINOR))"
fi

echo -e "\n${GREEN}Generated Files:${NC}"
echo -e "  📄 ${BUILD_DIR}/style-analysis-report.md"
echo -e "  📊 ${BUILD_DIR}/style-violations.json"
echo -e "  ✅ ${BUILD_DIR}/style-fix-tasks.md"
echo -e "  📋 ${BUILD_DIR}/style-todo-items.json"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Review the style report: open ${BUILD_DIR}/style-analysis-report.md"
echo "2. Check fix tasks: open ${BUILD_DIR}/style-fix-tasks.md"
echo "3. Import TODOs: Use ${BUILD_DIR}/import-style-todos.js"
echo "4. Start fixing critical issues first"

# Offer quick actions
echo -e "\n${BLUE}Quick Actions:${NC}"
echo "1) Open style report"
echo "2) Open fix tasks"
echo "3) Show critical issues only"
echo "4) Compare with previous build"
echo "5) Exit"

read -p "Choice (1-5): " -n 1 -r
echo
case $REPLY in
    1) open "$BUILD_DIR/style-analysis-report.md" ;;
    2) open "$BUILD_DIR/style-fix-tasks.md" ;;
    3) 
        echo -e "\n${RED}Critical Issues:${NC}"
        grep -A3 "🔴 CRITICAL" "$BUILD_DIR/style-analysis-report.md" | head -20
        ;;
    4) 
        PREV_BUILD=$(ls -1t output/builds | sed -n '2p')
        if [ -n "$PREV_BUILD" ]; then
            ./scripts/compare-builds.sh "$PREV_BUILD" "$LATEST_BUILD"
        else
            echo "No previous build to compare"
        fi
        ;;
esac