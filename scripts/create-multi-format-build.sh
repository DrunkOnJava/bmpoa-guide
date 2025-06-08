#!/bin/bash

# Create Multi-Format Build Script
# Generates both PDF and HTML versions of the BMPOA Guide

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== BMPOA Guide Multi-Format Build ===${NC}"
echo -e "${BLUE}Generating PDF and HTML versions...${NC}"
echo ""

# Start timer
START_TIME=$(date +%s)

# Create build timestamp
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
BUILD_DIR="output/builds/$TIMESTAMP"

# Create build directory
mkdir -p "$BUILD_DIR"

echo -e "${YELLOW}Build ID: $TIMESTAMP${NC}"
echo ""

# Step 1: Scan assets
echo -e "${GREEN}Step 1/5: Scanning assets...${NC}"
npm run scan:assets

# Step 2: Generate preliminary TOC for PDF
echo -e "${GREEN}Step 2/5: Generating preliminary TOC...${NC}"
npm run generate:pdf:pre

# Step 3: Generate final PDF
echo -e "${GREEN}Step 3/5: Generating final PDF...${NC}"
npm run generate:pdf:final

# Step 4: Generate HTML version
echo -e "${GREEN}Step 4/5: Generating HTML version...${NC}"
npm run generate:html

# Step 5: Create build summary
echo -e "${GREEN}Step 5/5: Creating build summary...${NC}"

# Check if files exist
PDF_FILE="output/BMPOA-Guide.pdf"
HTML_FILE="output/BMPOA-Guide.html"
PDF_SIZE=0
HTML_SIZE=0
PDF_EXISTS="❌"
HTML_EXISTS="❌"

if [ -f "$PDF_FILE" ]; then
    PDF_SIZE=$(du -h "$PDF_FILE" | cut -f1)
    PDF_EXISTS="✅"
fi

if [ -f "$HTML_FILE" ]; then
    HTML_SIZE=$(du -h "$HTML_FILE" | cut -f1)
    HTML_EXISTS="✅"
fi

# Calculate build time
END_TIME=$(date +%s)
BUILD_TIME=$((END_TIME - START_TIME))
BUILD_MINUTES=$((BUILD_TIME / 60))
BUILD_SECONDS=$((BUILD_TIME % 60))

# Create multi-format build summary
cat > "$BUILD_DIR/multi-format-build-summary.txt" << EOF
BMPOA Guide Multi-Format Build Summary
======================================
Build ID: $TIMESTAMP
Build Time: ${BUILD_MINUTES}m ${BUILD_SECONDS}s

Formats Generated:
------------------
$PDF_EXISTS PDF:  $PDF_FILE ($PDF_SIZE)
$HTML_EXISTS HTML: $HTML_FILE ($HTML_SIZE)

Build Directory: $BUILD_DIR

Quick Access:
- PDF:  output/BMPOA-Guide.pdf
- HTML: output/BMPOA-Guide.html

Open HTML in browser:
  open output/BMPOA-Guide.html

Serve HTML locally:
  cd output && python3 -m http.server 8000
  Then visit: http://localhost:8000/BMPOA-Guide.html
EOF

# Display summary
echo ""
echo -e "${BLUE}=== Build Complete ===${NC}"
echo ""
cat "$BUILD_DIR/multi-format-build-summary.txt"

# Offer to open files
echo ""
echo -e "${YELLOW}Would you like to:${NC}"
echo "  1) Open PDF in Preview"
echo "  2) Open HTML in browser"
echo "  3) Open both"
echo "  4) Skip"
echo ""
read -p "Choose an option (1-4): " choice

case $choice in
    1)
        open "$PDF_FILE"
        ;;
    2)
        open "$HTML_FILE"
        ;;
    3)
        open "$PDF_FILE"
        open "$HTML_FILE"
        ;;
    *)
        echo "Skipping file preview."
        ;;
esac

echo ""
echo -e "${GREEN}✨ Multi-format build complete!${NC}"