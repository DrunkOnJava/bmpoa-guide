#!/bin/bash

# Script to apply renames within a specific build directory

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Check for build argument
if [ -z "$1" ]; then
    echo "Usage: $0 <build-timestamp>"
    echo "Example: $0 2025-01-06T12-30-45"
    echo ""
    echo "Available builds:"
    ls -1 output/builds 2>/dev/null || echo "No builds found"
    exit 1
fi

BUILD_TIMESTAMP="$1"
BUILD_DIR="output/builds/$BUILD_TIMESTAMP"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Build directory not found: $BUILD_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Apply Renames for Build${NC}"
echo -e "${BLUE}=======================${NC}"
echo -e "Build: ${GREEN}$BUILD_TIMESTAMP${NC}\n"

# Configuration
PNG_DIR="$BUILD_DIR/png-highres"
SUGGESTIONS_FILE="$BUILD_DIR/suggested-filenames.txt"
RENAMED_DIR="$BUILD_DIR/png-renamed"

# Check if suggestions file exists
if [ ! -f "$SUGGESTIONS_FILE" ]; then
    echo -e "${RED}Error: Suggestions file not found${NC}"
    echo "Run './scripts/analyze-latest-build.sh' first"
    exit 1
fi

# Check if already renamed
if [ -d "$RENAMED_DIR" ] && [ "$(ls -A "$RENAMED_DIR" 2>/dev/null)" ]; then
    echo -e "${YELLOW}Warning: Renamed directory already exists and contains files${NC}"
    read -p "Overwrite existing renamed files? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled"
        exit 0
    fi
    rm -rf "$RENAMED_DIR"
fi

# Create renamed directory
mkdir -p "$RENAMED_DIR"
echo -e "${GREEN}✓${NC} Created renamed directory"

# Count valid suggestions
TOTAL_RENAMES=$(grep -c " -> " "$SUGGESTIONS_FILE" | grep -v ERROR || echo 0)
echo -e "${BLUE}Found $TOTAL_RENAMES rename suggestions${NC}\n"

# Process each suggestion
APPLIED=0
SKIPPED=0

while IFS=' -> ' read -r original new_name; do
    # Skip empty lines and errors
    if [[ -z "$original" ]] || [[ -z "$new_name" ]] || [[ "$new_name" == *"ERROR"* ]]; then
        continue
    fi
    
    SOURCE_FILE="$PNG_DIR/$original"
    DEST_FILE="$RENAMED_DIR/$new_name"
    
    if [ -f "$SOURCE_FILE" ]; then
        cp "$SOURCE_FILE" "$DEST_FILE"
        echo -e "${GREEN}✓${NC} Renamed: $original -> $new_name"
        APPLIED=$((APPLIED + 1))
    else
        echo -e "${RED}✗${NC} Source not found: $original"
        SKIPPED=$((SKIPPED + 1))
    fi
done < "$SUGGESTIONS_FILE"

# Create a summary file
cat > "$RENAMED_DIR/rename-summary.txt" << EOF
Rename Summary for Build: $BUILD_TIMESTAMP
Generated: $(date)

Applied: $APPLIED renames
Skipped: $SKIPPED files

Original files: $PNG_DIR
Renamed files: $RENAMED_DIR
Suggestions from: $SUGGESTIONS_FILE
EOF

echo -e "\n${GREEN}✅ Rename complete!${NC}"
echo -e "  Applied: $APPLIED renames"
echo -e "  Skipped: $SKIPPED files"
echo -e "\nRenamed files saved to: ${BLUE}$RENAMED_DIR${NC}"

# Show sample of renamed files
echo -e "\n${BLUE}Sample of renamed files:${NC}"
ls -1 "$RENAMED_DIR" | grep -v "rename-summary.txt" | head -5

# Show files with issues
echo -e "\n${YELLOW}Files with layout issues:${NC}"
ls -1 "$RENAMED_DIR" | grep -E "(BLANK|ORPHAN|WIDOW|MISALIGNED|CUTOFF|OVERFLOW|OVERLAP)" | head -10 || echo "None found"