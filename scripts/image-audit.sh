#!/bin/bash

# BMPOA Guide - Image Audit Script
# This script checks for missing images referenced in the HTML files

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Guide - Image Audit${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

# Arrays to store findings
declare -a FOUND_IMAGES
declare -a MISSING_IMAGES
declare -a UNUSED_IMAGES

# Extract all image references from HTML files
echo -e "${BLUE}Scanning HTML files for image references...${NC}"
echo ""

# Find all unique image references
IMAGE_REFS=$(grep -h -o 'src="images/[^"]*"' sections/*.html index.html 2>/dev/null | sed 's/src="images\///' | sed 's/"//' | sort | uniq)

# Also check for CSS background images
CSS_REFS=$(grep -h -o 'url.*images/[^)]*' css/*.css 2>/dev/null | sed 's/.*images\///' | sed 's/).*//' | sort | uniq)

# Combine all references
ALL_REFS=$(echo -e "$IMAGE_REFS\n$CSS_REFS" | sort | uniq | grep -v '^$')

echo -e "${GREEN}Found image references:${NC}"
echo "------------------------"

# Check each referenced image
while IFS= read -r img; do
    if [ -n "$img" ]; then
        if [ -f "images/$img" ]; then
            echo -e "${GREEN}✓${NC} $img"
            FOUND_IMAGES+=("$img")
        else
            echo -e "${RED}✗${NC} $img (MISSING)"
            MISSING_IMAGES+=("$img")
        fi
    fi
done <<< "$ALL_REFS"

echo ""
echo -e "${YELLOW}Images in directory:${NC}"
echo "--------------------"

# Check for unused images
for img in images/*; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        if [[ ! " ${ALL_REFS[@]} " =~ " ${filename} " ]] && [[ "$filename" != ".DS_Store" ]]; then
            echo -e "${YELLOW}!${NC} $filename (possibly unused)"
            UNUSED_IMAGES+=("$filename")
        fi
    fi
done

# Create mapping suggestions for missing images
echo ""
echo -e "${BLUE}Suggested mappings for missing images:${NC}"
echo "-------------------------------------"

for missing in "${MISSING_IMAGES[@]}"; do
    case "$missing" in
        "trillium-field.jpg")
            echo "  $missing → could use: trillium-bloom-at-thompson-wma-in-virginia.jpeg"
            ;;
        "vineyard-view.jpg")
            echo "  $missing → could use: OverlookatVineyard.png or VineyardGreen.png"
            ;;
        "mountain-trail-view.jpg")
            echo "  $missing → could use: mountain-vista.jpeg or mountain-overlook.jpeg"
            ;;
        "lodge-interior.jpg")
            echo "  $missing → found: lodge-interior.jpeg (different extension)"
            ;;
        "winery-2.jpeg")
            echo "  $missing → missing (have winery-1.jpeg and winery-3.jpeg)"
            ;;
        *)
            echo "  $missing → no obvious match found"
            ;;
    esac
done

# Summary
echo ""
echo -e "${BLUE}Summary:${NC}"
echo "--------"
echo -e "Total referenced images: $((${#FOUND_IMAGES[@]} + ${#MISSING_IMAGES[@]}))"
echo -e "${GREEN}Found: ${#FOUND_IMAGES[@]}${NC}"
echo -e "${RED}Missing: ${#MISSING_IMAGES[@]}${NC}"
echo -e "${YELLOW}Possibly unused: ${#UNUSED_IMAGES[@]}${NC}"

# Create a report file
REPORT_FILE="image-audit-report.txt"
{
    echo "BMPOA Guide - Image Audit Report"
    echo "Generated: $(date)"
    echo "================================"
    echo ""
    echo "MISSING IMAGES:"
    printf '%s\n' "${MISSING_IMAGES[@]}"
    echo ""
    echo "FOUND IMAGES:"
    printf '%s\n' "${FOUND_IMAGES[@]}"
    echo ""
    echo "POSSIBLY UNUSED IMAGES:"
    printf '%s\n' "${UNUSED_IMAGES[@]}"
} > "$REPORT_FILE"

echo ""
echo -e "${GREEN}Report saved to: $REPORT_FILE${NC}"
echo ""

# Offer to fix simple issues
if [ ${#MISSING_IMAGES[@]} -gt 0 ]; then
    echo -e "${YELLOW}To fix missing images:${NC}"
    echo "1. Add the missing images to the images/ directory"
    echo "2. Or update the HTML files to use existing images"
    echo "3. Run './scripts/build.sh' after making changes"
fi