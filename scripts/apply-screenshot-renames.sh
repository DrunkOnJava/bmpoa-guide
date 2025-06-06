#!/bin/bash

# Script to apply the suggested renames from rename-pdf-screenshots.sh

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SCREENSHOTS_DIR="output/PDF-Screenshots"
SUGGESTIONS_FILE="${1:-output/suggested-filenames.txt}"  # Allow specifying different file
RENAMED_DIR="output/PDF-Screenshots-Renamed"

# Change to project root
cd "$(dirname "$0")/.." || exit 1

echo -e "${BLUE}Apply Screenshot Renames${NC}"
echo -e "${BLUE}========================${NC}\n"

# Check if suggestions file exists
if [ ! -f "$SUGGESTIONS_FILE" ]; then
    echo -e "${RED}Error: Suggestions file not found${NC}"
    echo "Run './scripts/rename-pdf-screenshots.sh' first"
    exit 1
fi

# Create output directory
mkdir -p "$RENAMED_DIR"
echo -e "${GREEN}✓${NC} Created output directory: $RENAMED_DIR"

# Count valid suggestions
TOTAL_RENAMES=$(grep -c " -> " "$SUGGESTIONS_FILE" | grep -v ERROR)
echo -e "${BLUE}Found $TOTAL_RENAMES rename suggestions${NC}\n"

# Process each suggestion
APPLIED=0
SKIPPED=0

while IFS=' -> ' read -r original new_name; do
    # Skip empty lines and errors
    if [[ -z "$original" ]] || [[ -z "$new_name" ]] || [[ "$new_name" == *"ERROR"* ]]; then
        continue
    fi
    
    SOURCE_FILE="$SCREENSHOTS_DIR/$original"
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

echo -e "\n${GREEN}✅ Rename complete!${NC}"
echo -e "  Applied: $APPLIED renames"
echo -e "  Skipped: $SKIPPED files"
echo -e "\nRenamed files saved to: ${BLUE}$RENAMED_DIR${NC}"

# Optional: Show sample of renamed files
echo -e "\n${BLUE}Sample of renamed files:${NC}"
ls -1 "$RENAMED_DIR" | head -5