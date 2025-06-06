#!/bin/bash

# Script to analyze and rename files directly in output/PDF-Screenshots
# This maintains the legacy directory structure while adding meaningful names

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Configuration
SCREENSHOTS_DIR="output/PDF-Screenshots"
RENAMED_DIR="output/PDF-Screenshots-Renamed"
TEMP_DIR="output/temp-resize"
OUTPUT_FILE="output/pdf-screenshots-rename-log.txt"

echo -e "${BLUE}PDF Screenshots Direct Rename${NC}"
echo -e "${BLUE}=============================${NC}\n"

# Check if screenshots directory exists
if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo -e "${RED}Error: Screenshots directory not found${NC}"
    echo "Run 'npm run pdf' first to generate screenshots"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Create directories
mkdir -p "$TEMP_DIR"
mkdir -p "$RENAMED_DIR"
echo -e "${GREEN}✓${NC} Created working directories"

# Clear output file
> "$OUTPUT_FILE"
echo "PDF Screenshots Rename Log - $(date)" >> "$OUTPUT_FILE"
echo "======================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Count images
TOTAL_IMAGES=$(ls -1 "$SCREENSHOTS_DIR"/page-*.png 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No PNG files found in $SCREENSHOTS_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Found $TOTAL_IMAGES images to analyze${NC}"
echo -e "${YELLOW}Converting images to efficient format...${NC}\n"

# Pre-convert all images to JPEG for efficiency
CONVERTED=0
for img in "$SCREENSHOTS_DIR"/page-*.png; do
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/page-\([0-9]*\)\.png/\1/')
    TEMP_IMG="$TEMP_DIR/temp-${PAGE_NUM}.jpg"
    
    # Convert to 50% size JPEG
    magick "$img" -resize 50% -quality 70 "$TEMP_IMG"
    CONVERTED=$((CONVERTED + 1))
    
    # Progress indicator
    if [ $((CONVERTED % 10)) -eq 0 ]; then
        echo -e "  ${GREEN}✓${NC} Converted $CONVERTED/$TOTAL_IMAGES images..."
    fi
done

echo -e "${GREEN}✓${NC} Conversion complete!\n"
echo -e "${BLUE}Analyzing pages with Claude Haiku...${NC}\n"

# Process each image
CURRENT=0
SUCCESS=0
FAILED=0

for img in "$TEMP_DIR"/temp-*.jpg; do
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/temp-\([0-9]*\)\.jpg/\1/')
    ORIGINAL_FILE="$SCREENSHOTS_DIR/page-${PAGE_NUM}.png"
    
    echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Analyzing page ${PAGE_NUM}..."
    
    # Enhanced prompt for better naming
    PROMPT="Analyze this PDF page image and identify the main content. Create a descriptive filename with this structure:
${PAGE_NUM}-[FLAGS]-Content-Description.png

FLAGS to detect and include (if applicable):
- BLANK (blank/nearly blank page)
- ORPHAN (orphaned paragraph)
- WIDOW (widow line)
- MISALIGNED (alignment issues)
- TABLE (contains table)
- IMAGE (contains images)
- CALLOUT (call-out boxes)
- CUTOFF (cut-off content)
- OVERFLOW (text overflow)

Focus on the main title or topic of the page for the content description.
Use Title-Case and hyphens between words.

Examples:
- ${PAGE_NUM}-Cover-Page-BMPOA-Guide.png
- ${PAGE_NUM}-TABLE-Fire-Safety-Guidelines.png
- ${PAGE_NUM}-BLANK.png
- ${PAGE_NUM}-ORPHAN-MISALIGNED-Lake-Recreation.png

Respond with ONLY the filename, nothing else."

    # Get suggestion from Claude
    SUGGESTION=$(cat "$img" | claude -p --model claude-3-5-haiku-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$SUGGESTION" ] && [[ "$SUGGESTION" =~ ^[0-9]{3}- ]]; then
        # Create renamed copy
        DEST_FILE="$RENAMED_DIR/$SUGGESTION"
        cp "$ORIGINAL_FILE" "$DEST_FILE"
        
        echo -e "  ${GREEN}✓${NC} Renamed: page-${PAGE_NUM}.png → $SUGGESTION"
        echo "page-${PAGE_NUM}.png → $SUGGESTION" >> "$OUTPUT_FILE"
        SUCCESS=$((SUCCESS + 1))
        
        # Also create a symlink in the original directory with the new name
        # This allows both naming schemes to coexist
        SYMLINK_PATH="$SCREENSHOTS_DIR/$SUGGESTION"
        if [ ! -e "$SYMLINK_PATH" ]; then
            ln -s "$(basename "$ORIGINAL_FILE")" "$SYMLINK_PATH"
            echo -e "  ${BLUE}↪${NC} Created symlink: $SUGGESTION"
        fi
    else
        echo -e "  ${RED}✗${NC} Failed to analyze page ${PAGE_NUM}"
        echo "page-${PAGE_NUM}.png → [FAILED]" >> "$OUTPUT_FILE"
        FAILED=$((FAILED + 1))
    fi
    
    # Small delay to avoid rate limiting
    sleep 0.5
    
    # Progress update every 10 pages
    if [ $((CURRENT % 10)) -eq 0 ]; then
        echo -e "\n${BLUE}Progress: $CURRENT/$TOTAL_IMAGES analyzed (${SUCCESS} success, ${FAILED} failed)${NC}\n"
    fi
done

# Clean up temp directory
echo -e "\n${YELLOW}Cleaning up...${NC}"
rm -rf "$TEMP_DIR"

# Summary
echo -e "\n${GREEN}✅ Analysis Complete!${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━"
echo -e "Total pages: $TOTAL_IMAGES"
echo -e "Successfully renamed: ${GREEN}$SUCCESS${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo -e "\nRenamed files saved to: ${BLUE}$RENAMED_DIR${NC}"
echo -e "Symlinks created in: ${BLUE}$SCREENSHOTS_DIR${NC}"
echo -e "Full log: ${BLUE}$OUTPUT_FILE${NC}"

# Show sample of renamed files
echo -e "\n${BLUE}Sample renamed files:${NC}"
ls -1 "$RENAMED_DIR" | grep -v "^page-" | head -5

# Offer to replace original files
echo -e "\n${YELLOW}Options:${NC}"
echo "1) Keep both original and renamed files (current state)"
echo "2) Replace original files with renamed versions"
echo "3) Exit without changes"
read -p "Choice (1-3): " -n 1 -r
echo

case $REPLY in
    2)
        echo -e "\n${YELLOW}Replacing original files...${NC}"
        # Backup originals first
        mkdir -p "$SCREENSHOTS_DIR/original-backup"
        cp "$SCREENSHOTS_DIR"/page-*.png "$SCREENSHOTS_DIR/original-backup/"
        
        # Copy renamed files back to main directory
        for renamed_file in "$RENAMED_DIR"/*.png; do
            if [ -f "$renamed_file" ]; then
                BASENAME=$(basename "$renamed_file")
                # Extract page number from renamed file
                PAGE_NUM=$(echo "$BASENAME" | grep -o '^[0-9]\{3\}')
                if [ -n "$PAGE_NUM" ]; then
                    # Remove old page-XXX.png file
                    rm -f "$SCREENSHOTS_DIR/page-${PAGE_NUM}.png"
                    # Copy renamed file
                    cp "$renamed_file" "$SCREENSHOTS_DIR/$BASENAME"
                fi
            fi
        done
        
        # Remove symlinks since we now have the actual files
        find "$SCREENSHOTS_DIR" -type l -delete
        
        echo -e "${GREEN}✓${NC} Original files replaced with renamed versions"
        echo -e "${BLUE}ℹ${NC} Original files backed up to: $SCREENSHOTS_DIR/original-backup/"
        ;;
    *)
        echo -e "${BLUE}ℹ${NC} Keeping both original and renamed files"
        ;;
esac

echo -e "\n${GREEN}Done!${NC}"