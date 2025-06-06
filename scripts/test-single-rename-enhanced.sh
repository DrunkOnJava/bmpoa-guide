#!/bin/bash

# Enhanced test script to analyze a single PDF screenshot with layout analysis

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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
    echo -e "${RED}Error: File not found: $IMG_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}Enhanced Analysis for page-${PAGE_NUM}.png${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Create temp resized image
TEMP_IMG="/tmp/temp-page-${PAGE_NUM}.jpg"
echo -e "${YELLOW}Converting to JPEG (50% size)...${NC}"
magick "$IMG_FILE" -resize 50% -quality 70 "$TEMP_IMG"
echo -e "Original size: $(ls -lh "$IMG_FILE" | awk '{print $5}')"
echo -e "Reduced size: $(ls -lh "$TEMP_IMG" | awk '{print $5}')"

# Analyze with Claude
echo -e "\n${YELLOW}Analyzing content and layout...${NC}\n"

PROMPT="Analyze this PDF page image comprehensively. Look for:

1. TEXT CONTENT:
   - Main title/heading (largest or most prominent)
   - Section headers or subtitles
   - Body text topics

2. PAGE LAYOUT ISSUES:
   - Blank or nearly blank pages
   - Orphaned paragraphs (single paragraph at top/bottom)
   - Widow lines (single line at top of page)
   - Text alignment issues (misaligned paragraphs, headers)
   - Inconsistent margins or spacing

3. CONTENT ELEMENTS:
   - Call-out boxes or highlighted sections
   - Tables (note if they're cut off or poorly formatted)
   - Images or diagrams (note if they're misplaced)
   - Lists or bullet points
   - Footnotes or references

4. FORMATTING PROBLEMS:
   - Text running into margins
   - Overlapping elements
   - Cut-off content
   - Poor image/text integration

Based on your analysis, create a filename with this structure:
${PAGE_NUM}-[FLAGS]-Content-Description.png

Where [FLAGS] are issue codes (if any) that come BEFORE the content description:
   - BLANK (for blank/nearly blank pages)
   - ORPHAN (for orphaned paragraphs)
   - WIDOW (for widow lines)
   - MISALIGNED (for alignment issues)
   - TABLE (if contains tables)
   - IMAGE (if contains images)
   - CALLOUT (if contains call-out boxes)
   - CUTOFF (if content is cut off)
   - OVERFLOW (if text overflows margins)
   - OVERLAP (if elements overlap)

Format rules:
- Page number first: ${PAGE_NUM}-
- All flags/issues next (separated by hyphens)
- Content description last
- Use Title-Case for content description
- Hyphens between all words

Examples:
- ${PAGE_NUM}-ORPHAN-MISALIGNED-OVERFLOW-Lake-Recreation-Section.png
- ${PAGE_NUM}-TABLE-CUTOFF-Fire-Safety-Guidelines.png
- ${PAGE_NUM}-BLANK.png (no content description needed)
- ${PAGE_NUM}-Community-Welcome-Letter.png (no issues, just content)
- ${PAGE_NUM}-WIDOW-CALLOUT-Board-Meeting-Minutes.png

Respond with ONLY the filename."

# Get suggestion
SUGGESTION=$(cat "$TEMP_IMG" | claude -p --model claude-3-5-haiku-20241022 "$PROMPT")

if [ $? -eq 0 ] && [ -n "$SUGGESTION" ]; then
    echo -e "${GREEN}✓ Original:${NC} page-${PAGE_NUM}.png"
    echo -e "${GREEN}✓ Suggested:${NC} $SUGGESTION"
    
    # Extract and display issues found
    echo -e "\n${BLUE}Issues detected:${NC}"
    if [[ "$SUGGESTION" =~ BLANK ]]; then echo "  - Blank or nearly blank page"; fi
    if [[ "$SUGGESTION" =~ ORPHAN ]]; then echo "  - Orphaned paragraph"; fi
    if [[ "$SUGGESTION" =~ WIDOW ]]; then echo "  - Widow line"; fi
    if [[ "$SUGGESTION" =~ MISALIGNED ]]; then echo "  - Misaligned text/elements"; fi
    if [[ "$SUGGESTION" =~ TABLE ]]; then echo "  - Contains table"; fi
    if [[ "$SUGGESTION" =~ IMAGE ]]; then echo "  - Contains image"; fi
    if [[ "$SUGGESTION" =~ CALLOUT ]]; then echo "  - Contains call-out box"; fi
    if [[ "$SUGGESTION" =~ CUTOFF ]]; then echo "  - Cut-off content"; fi
    if [[ "$SUGGESTION" =~ OVERFLOW ]]; then echo "  - Text overflow"; fi
    if [[ "$SUGGESTION" =~ OVERLAP ]]; then echo "  - Overlapping elements"; fi
    
    if ! [[ "$SUGGESTION" =~ (BLANK|ORPHAN|WIDOW|MISALIGNED|TABLE|IMAGE|CALLOUT|CUTOFF|OVERFLOW|OVERLAP) ]]; then
        echo "  None detected - page appears well-formatted"
    fi
else
    echo -e "${RED}Failed to get suggestion${NC}"
fi

# Clean up
rm -f "$TEMP_IMG"