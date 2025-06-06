#!/bin/bash

# Script to check the status of all build processes

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
echo -e "${PURPLE}║       Build Process Status             ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════╝${NC}\n"

# Check for build lock
if [ -f "output/.build-lock" ]; then
    LOCK_TIME=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "output/.build-lock" 2>/dev/null || date -r "output/.build-lock" "+%Y-%m-%d %H:%M:%S" 2>/dev/null)
    echo -e "${YELLOW}⚠️  Build in progress${NC} (started: $LOCK_TIME)"
    echo ""
fi

# Check latest build
LATEST_BUILD=$(ls -1t output/builds 2>/dev/null | head -1)
if [ -z "$LATEST_BUILD" ]; then
    echo -e "${RED}No builds found${NC}"
    echo "Run 'npm run pdf' to start a build"
    exit 0
fi

BUILD_DIR="output/builds/$LATEST_BUILD"
echo -e "${BLUE}Latest Build:${NC} $LATEST_BUILD"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"

# PDF Generation Status
echo -e "${PURPLE}1. PDF Generation${NC}"
if [ -f "$BUILD_DIR/BMPOA-Guide.pdf" ]; then
    PDF_SIZE=$(ls -lh "$BUILD_DIR/BMPOA-Guide.pdf" | awk '{print $5}')
    echo -e "   ${GREEN}✓ Complete${NC} - PDF size: $PDF_SIZE"
else
    echo -e "   ${RED}✗ Missing${NC}"
fi

# PNG Screenshots Status
echo -e "\n${PURPLE}2. PNG Screenshots${NC}"
PNG_COUNT=$(ls -1 "$BUILD_DIR/png-highres" 2>/dev/null | wc -l)
if [ "$PNG_COUNT" -gt 0 ]; then
    echo -e "   ${GREEN}✓ Complete${NC} - $PNG_COUNT pages"
else
    echo -e "   ${YELLOW}⏳ In Progress${NC}"
fi

# JPEG Conversion Status
echo -e "\n${PURPLE}3. JPEG Conversion${NC}"
JPG_COUNT=$(ls -1 "$BUILD_DIR/jpg-efficient" 2>/dev/null | wc -l)
if [ "$JPG_COUNT" -gt 0 ]; then
    echo -e "   ${GREEN}✓ Complete${NC} - $JPG_COUNT images"
else
    echo -e "   ${YELLOW}⏳ In Progress${NC}"
fi

# Content Analysis Status
echo -e "\n${PURPLE}4. Content Analysis (Haiku)${NC}"
if [ -f "$BUILD_DIR/analysis-complete.flag" ]; then
    ISSUES=$(grep -c " -> " "$BUILD_DIR/suggested-filenames.txt" 2>/dev/null || echo 0)
    echo -e "   ${GREEN}✓ Complete${NC} - $ISSUES pages analyzed"
    if [ -f "$BUILD_DIR/layout-issues.txt" ]; then
        ISSUE_COUNT=$(wc -l < "$BUILD_DIR/layout-issues.txt")
        echo -e "   Layout issues found: $ISSUE_COUNT pages"
    fi
elif [ -f "$BUILD_DIR/suggested-filenames.txt" ]; then
    PROGRESS=$(wc -l < "$BUILD_DIR/suggested-filenames.txt")
    echo -e "   ${YELLOW}⏳ In Progress${NC} - $PROGRESS/$PNG_COUNT pages"
else
    echo -e "   ${BLUE}⏸  Pending${NC}"
fi

# Style Analysis Status
echo -e "\n${PURPLE}5. Style Analysis (Sonnet)${NC}"
if [ -f "$BUILD_DIR/style-analysis-complete.flag" ]; then
    if [ -f "$BUILD_DIR/style-violations.json" ]; then
        CRITICAL=$(grep -o '"severity":"critical"' "$BUILD_DIR/style-violations.json" 2>/dev/null | wc -l)
        MAJOR=$(grep -o '"severity":"major"' "$BUILD_DIR/style-violations.json" 2>/dev/null | wc -l)
        MINOR=$(grep -o '"severity":"minor"' "$BUILD_DIR/style-violations.json" 2>/dev/null | wc -l)
        echo -e "   ${GREEN}✓ Complete${NC}"
        echo -e "   Violations: ${RED}$CRITICAL critical${NC}, ${YELLOW}$MAJOR major${NC}, ${BLUE}$MINOR minor${NC}"
    else
        echo -e "   ${GREEN}✓ Complete${NC}"
    fi
elif [ -f "$BUILD_DIR/style-analysis-report.md" ]; then
    PAGES_DONE=$(grep -c "^### Page " "$BUILD_DIR/style-analysis-report.md" 2>/dev/null || echo 0)
    echo -e "   ${YELLOW}⏳ In Progress${NC} - $PAGES_DONE/$PNG_COUNT pages"
else
    echo -e "   ${BLUE}⏸  Pending${NC} (waiting for content analysis)"
fi

# Legacy Screenshots Rename Status
echo -e "\n${PURPLE}6. PDF-Screenshots Rename${NC}"
RENAMED_COUNT=$(ls -1 output/PDF-Screenshots 2>/dev/null | grep -v "^page-[0-9]" | wc -l)
if [ "$RENAMED_COUNT" -gt 0 ]; then
    echo -e "   ${GREEN}✓ Complete${NC} - $RENAMED_COUNT files renamed"
elif [ -f "output/pdf-screenshots-rename-log.txt" ]; then
    echo -e "   ${YELLOW}⏳ In Progress${NC}"
else
    echo -e "   ${BLUE}⏸  Pending${NC}"
fi

# File Locations
echo -e "\n${PURPLE}📁 Output Locations:${NC}"
echo -e "   Build directory: ${BLUE}$BUILD_DIR${NC}"
echo -e "   Legacy screenshots: ${BLUE}output/PDF-Screenshots${NC}"
echo -e "   Renamed copies: ${BLUE}output/PDF-Screenshots-Renamed${NC}"

# Reports Available
echo -e "\n${PURPLE}📊 Reports Available:${NC}"
[ -f "$BUILD_DIR/suggested-filenames.txt" ] && echo -e "   ${GREEN}✓${NC} Content analysis: suggested-filenames.txt"
[ -f "$BUILD_DIR/layout-issues.txt" ] && echo -e "   ${GREEN}✓${NC} Layout issues: layout-issues.txt"
[ -f "$BUILD_DIR/style-analysis-report.md" ] && echo -e "   ${GREEN}✓${NC} Style report: style-analysis-report.md"
[ -f "$BUILD_DIR/style-fix-tasks.md" ] && echo -e "   ${GREEN}✓${NC} Fix tasks: style-fix-tasks.md"
[ -f "$BUILD_DIR/style-todo-items.json" ] && echo -e "   ${GREEN}✓${NC} TODO items: style-todo-items.json"

# Quick Actions
echo -e "\n${PURPLE}🚀 Quick Actions:${NC}"
echo "   View content analysis: cat $BUILD_DIR/suggested-filenames.txt"
echo "   View style report: open $BUILD_DIR/style-analysis-report.md"
echo "   Check renamed files: ls output/PDF-Screenshots-Renamed/"

# Overall Status
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
ALL_COMPLETE=true
[ ! -f "$BUILD_DIR/analysis-complete.flag" ] && ALL_COMPLETE=false
[ ! -f "$BUILD_DIR/style-analysis-complete.flag" ] && ALL_COMPLETE=false
[ "$RENAMED_COUNT" -eq 0 ] && ALL_COMPLETE=false

if [ "$ALL_COMPLETE" = true ]; then
    echo -e "${GREEN}✅ All build processes complete!${NC}"
else
    echo -e "${YELLOW}⏳ Build processes still running...${NC}"
    echo -e "   Check again with: ${BLUE}npm run build:status${NC}"
fi