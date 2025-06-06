#!/bin/bash

# Script to analyze PDF screenshots and suggest descriptive filenames
# Reduces image size by 25% for faster processing

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SCREENSHOTS_DIR="output/PDF-Screenshots"
TEMP_DIR="output/temp-resize"
OUTPUT_FILE="output/suggested-filenames.txt"

# Change to project root
cd "$(dirname "$0")/.." || exit 1

echo -e "${BLUE}PDF Screenshot Rename Assistant${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Check if screenshots directory exists
if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo -e "${RED}Error: Screenshots directory not found${NC}"
    echo "Run 'npm run pdf' first to generate screenshots"
    exit 1
fi

# Create temp directory
mkdir -p "$TEMP_DIR"
echo -e "${GREEN}✓${NC} Created temp directory for resized images"

# Clear previous suggestions file
> "$OUTPUT_FILE"
echo -e "${GREEN}✓${NC} Ready to process images\n"

# Count total images
TOTAL_IMAGES=$(ls -1 "$SCREENSHOTS_DIR"/page-*.png 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No PNG files found in $SCREENSHOTS_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Found $TOTAL_IMAGES images to process${NC}\n"

# Process each image
CURRENT=0
for img in "$SCREENSHOTS_DIR"/page-*.png; do
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/page-\([0-9]*\)\.png/\1/')
    
    echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Processing $BASENAME..."
    
    # Resize image to 50% and convert to JPEG for much smaller size
    TEMP_IMG="$TEMP_DIR/temp-${PAGE_NUM}.jpg"
    magick "$img" -resize 50% -quality 70 "$TEMP_IMG"
    echo -e "  ${GREEN}✓${NC} Resized to 50% and converted to JPEG"
    
    # Use Claude to analyze the image
    echo -e "  ${BLUE}⚡${NC} Analyzing with Claude Haiku..."
    
    # Create the prompt
    PROMPT="Carefully examine this PDF page image and identify the main textual content, particularly:
- The largest/most prominent title or heading on the page
- Section headers or chapter titles
- Key topic or subject matter from the text

Based on the text you can read, suggest a descriptive filename that:
1. Starts with: $PAGE_NUM-
2. Uses the main title/heading as the primary descriptor
3. If no clear title, use the main topic from the visible text
4. Uses hyphens between words
5. Ends with .png

Important: Focus on actual text you can read in the image, not visual elements.

Example formats:
- ${PAGE_NUM}-Fire-Safety-Guidelines.png (if 'Fire Safety Guidelines' is the main heading)
- ${PAGE_NUM}-Board-Meeting-Minutes.png (if page contains board meeting minutes)
- ${PAGE_NUM}-Table-of-Contents.png (if it's a TOC page)

Respond with ONLY the suggested filename, nothing else."
    
    # Get suggestion from Claude
    SUGGESTION=$(cat "$TEMP_IMG" | claude -p --model claude-3-5-haiku-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$SUGGESTION" ]; then
        echo -e "  ${GREEN}✓${NC} Suggested: $SUGGESTION"
        echo "$BASENAME -> $SUGGESTION" >> "$OUTPUT_FILE"
    else
        echo -e "  ${RED}✗${NC} Failed to get suggestion"
        echo "$BASENAME -> [ERROR: Could not analyze]" >> "$OUTPUT_FILE"
    fi
    
    # Clean up temp file
    rm -f "$TEMP_IMG"
    
    # Optional: Add delay to avoid rate limiting
    sleep 1
    
    echo ""
done

# Clean up temp directory
rmdir "$TEMP_DIR" 2>/dev/null

echo -e "${GREEN}✅ Processing complete!${NC}"
echo -e "\nSuggested filenames saved to: ${BLUE}$OUTPUT_FILE${NC}"
echo -e "\nTo review suggestions: ${YELLOW}cat $OUTPUT_FILE${NC}"
echo -e "To apply renames, create a rename script based on the suggestions.\n"

# Show first few suggestions
echo -e "${BLUE}First 5 suggestions:${NC}"
head -5 "$OUTPUT_FILE"