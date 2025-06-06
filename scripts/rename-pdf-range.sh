#!/bin/bash

# Script to analyze a range of PDF screenshots
# Usage: ./rename-pdf-range.sh START END

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SCREENSHOTS_DIR="output/PDF-Screenshots"
TEMP_DIR="output/temp-resize"
OUTPUT_FILE="output/suggested-filenames-range.txt"

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Check arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 START_PAGE END_PAGE"
    echo "Example: $0 1 10"
    exit 1
fi

START=$1
END=$2

# Validate numbers
if ! [[ "$START" =~ ^[0-9]+$ ]] || ! [[ "$END" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}Error: START and END must be numbers${NC}"
    exit 1
fi

if [ "$START" -gt "$END" ]; then
    echo -e "${RED}Error: START must be less than or equal to END${NC}"
    exit 1
fi

echo -e "${BLUE}PDF Screenshot Rename - Range Mode${NC}"
echo -e "${BLUE}===================================${NC}"
echo -e "Processing pages $START to $END\n"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Clear output file
> "$OUTPUT_FILE"

# Process range
for ((i=$START; i<=$END; i++)); do
    # Format page number with leading zeros
    PAGE_NUM=$(printf "%03d" $i)
    IMG_FILE="$SCREENSHOTS_DIR/page-${PAGE_NUM}.png"
    
    if [ ! -f "$IMG_FILE" ]; then
        echo -e "${YELLOW}Skipping page-${PAGE_NUM}.png (not found)${NC}"
        continue
    fi
    
    echo -e "${YELLOW}Processing page-${PAGE_NUM}.png...${NC}"
    
    # Resize image
    TEMP_IMG="$TEMP_DIR/temp-${PAGE_NUM}.jpg"
    magick "$IMG_FILE" -resize 50% -quality 70 "$TEMP_IMG"
    
    # Create the prompt
    PROMPT="Carefully examine this PDF page image and identify the main textual content, particularly:
- The largest/most prominent title or heading on the page
- Section headers or chapter titles
- Key topic or subject matter from the text

Based on the text you can read, suggest a descriptive filename that:
1. Starts with: ${PAGE_NUM}-
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
    
    # Get suggestion
    SUGGESTION=$(cat "$TEMP_IMG" | claude -p --model claude-3-5-haiku-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$SUGGESTION" ]; then
        echo -e "  ${GREEN}✓${NC} Suggested: $SUGGESTION"
        echo "page-${PAGE_NUM}.png -> $SUGGESTION" >> "$OUTPUT_FILE"
    else
        echo -e "  ${RED}✗${NC} Failed to get suggestion"
        echo "page-${PAGE_NUM}.png -> [ERROR]" >> "$OUTPUT_FILE"
    fi
    
    # Clean up
    rm -f "$TEMP_IMG"
    
    # Small delay to avoid rate limiting
    sleep 0.5
    echo ""
done

# Clean up
rmdir "$TEMP_DIR" 2>/dev/null

echo -e "${GREEN}✅ Range processing complete!${NC}"
echo -e "Results saved to: ${BLUE}$OUTPUT_FILE${NC}"
echo -e "\n${BLUE}Results:${NC}"
cat "$OUTPUT_FILE"