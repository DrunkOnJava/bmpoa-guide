#!/bin/bash

# Test script to analyze a single PDF screenshot

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Check for image argument
if [ -z "$1" ]; then
    echo "Usage: $0 <page-number>"
    echo "Example: $0 001"
    exit 1
fi

PAGE_NUM="$1"
IMG_FILE="output/PDF-Screenshots/page-${PAGE_NUM}.png"

# Check if file exists
if [ ! -f "$IMG_FILE" ]; then
    echo -e "${YELLOW}Error: File not found: $IMG_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}Testing rename for page-${PAGE_NUM}.png${NC}\n"

# Create temp resized image - using JPEG for much smaller size
TEMP_IMG="/tmp/temp-page-${PAGE_NUM}.jpg"
echo -e "${YELLOW}Resizing image to 50% and converting to JPEG...${NC}"
magick "$IMG_FILE" -resize 50% -quality 70 "$TEMP_IMG"
echo -e "Original size: $(ls -lh "$IMG_FILE" | awk '{print $5}')"
echo -e "Reduced size: $(ls -lh "$TEMP_IMG" | awk '{print $5}')"

# Analyze with Claude
echo -e "${YELLOW}Analyzing with Claude Haiku...${NC}\n"

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
SUGGESTION=$(cat "$TEMP_IMG" | claude -p --model claude-3-5-haiku-20241022 "$PROMPT")

if [ $? -eq 0 ] && [ -n "$SUGGESTION" ]; then
    echo -e "${GREEN}✓ Original:${NC} page-${PAGE_NUM}.png"
    echo -e "${GREEN}✓ Suggested:${NC} $SUGGESTION"
else
    echo -e "${YELLOW}Failed to get suggestion${NC}"
fi

# Clean up
rm -f "$TEMP_IMG"