#!/bin/bash

# Export a build to a zip file for archiving or sharing

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

if [ -z "$1" ]; then
    # Export latest build by default
    BUILD=$(ls -1t output/builds 2>/dev/null | head -1)
    if [ -z "$BUILD" ]; then
        echo -e "${RED}No builds found${NC}"
        exit 1
    fi
else
    BUILD="$1"
fi

BUILD_DIR="output/builds/$BUILD"

if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Build not found: $BUILD${NC}"
    exit 1
fi

echo -e "${BLUE}Exporting Build${NC}"
echo -e "${BLUE}===============${NC}"
echo -e "Build: ${GREEN}$BUILD${NC}"

# Create exports directory
mkdir -p output/exports

# Create zip filename
ZIP_FILE="output/exports/bmpoa-build-${BUILD}.zip"

# Check if issues were found
ISSUE_TAG=""
if [ -f "$BUILD_DIR/layout-issues.txt" ] && [ -s "$BUILD_DIR/layout-issues.txt" ]; then
    ISSUE_COUNT=$(wc -l < "$BUILD_DIR/layout-issues.txt")
    ISSUE_TAG="-${ISSUE_COUNT}issues"
fi

ZIP_FILE="output/exports/bmpoa-build-${BUILD}${ISSUE_TAG}.zip"

echo -e "Creating archive..."

# Create zip with progress
cd output/builds
zip -r "../../$ZIP_FILE" "$BUILD" -x "*.DS_Store" "*/jpg-efficient/*"

cd ../..

# Get zip size
ZIP_SIZE=$(ls -lh "$ZIP_FILE" | awk '{print $5}')

echo -e "\n${GREEN}✅ Export complete!${NC}"
echo -e "File: ${BLUE}$ZIP_FILE${NC}"
echo -e "Size: $ZIP_SIZE"

# Create export info
cat > "${ZIP_FILE%.zip}-info.txt" << EOF
BMPOA Guide Build Export
========================
Build: $BUILD
Exported: $(date)
Archive: $(basename "$ZIP_FILE")
Size: $ZIP_SIZE

Contents:
- BMPOA-Guide.pdf
- High-resolution PNG images (150 DPI)
- Build metadata and analysis results
- Layout issue report (if applicable)

Note: Efficient JPEG versions excluded to reduce size.
To import, extract to output/builds/ directory.
EOF

echo -e "\nInfo saved to: ${BLUE}${ZIP_FILE%.zip}-info.txt${NC}"

# Option to upload/share
echo -e "\n${YELLOW}Next steps:${NC}"
echo "- Share the zip file: $ZIP_FILE"
echo "- For smaller size, use only PDF: $BUILD_DIR/BMPOA-Guide.pdf"
echo "- To import on another system: unzip in output/builds/"