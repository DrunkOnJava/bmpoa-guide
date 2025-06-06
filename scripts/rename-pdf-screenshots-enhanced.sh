#!/bin/bash

# Enhanced script to analyze PDF screenshots with layout analysis
# Pre-converts all images to JPEG for efficiency

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SCREENSHOTS_DIR="output/PDF-Screenshots"
TEMP_DIR="output/temp-resize"
OUTPUT_FILE="output/suggested-filenames-enhanced.txt"
ISSUES_FILE="output/layout-issues.txt"

# Change to project root
cd "$(dirname "$0")/.." || exit 1

echo -e "${BLUE}Enhanced PDF Screenshot Analysis${NC}"
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

# Clear output files
> "$OUTPUT_FILE"
> "$ISSUES_FILE"

# Count total images
TOTAL_IMAGES=$(ls -1 "$SCREENSHOTS_DIR"/page-*.png 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No PNG files found in $SCREENSHOTS_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Found $TOTAL_IMAGES images to process${NC}"

# Pre-convert all images to JPEG
echo -e "\n${YELLOW}Pre-converting all images to JPEG...${NC}"
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

echo -e "${GREEN}✓${NC} Pre-conversion complete! All images ready for analysis.\n"

# Process each converted image
echo -e "${BLUE}Analyzing images for content and layout issues...${NC}\n"
CURRENT=0

for img in "$TEMP_DIR"/temp-*.jpg; do
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/temp-\([0-9]*\)\.jpg/\1/')
    ORIGINAL_NAME="page-${PAGE_NUM}.png"
    
    echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Analyzing page ${PAGE_NUM}..."
    
    # Enhanced prompt with layout analysis
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

    # Get suggestion from Claude
    SUGGESTION=$(cat "$img" | claude -p --model claude-3-5-haiku-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$SUGGESTION" ]; then
        echo -e "  ${GREEN}✓${NC} Suggested: $SUGGESTION"
        echo "$ORIGINAL_NAME -> $SUGGESTION" >> "$OUTPUT_FILE"
        
        # Extract issues from filename for separate report
        if [[ "$SUGGESTION" =~ (BLANK|ORPHAN|WIDOW|MISALIGNED|TABLE|IMAGE|CALLOUT|CUTOFF|OVERFLOW|OVERLAP) ]]; then
            echo "Page $PAGE_NUM: $SUGGESTION" >> "$ISSUES_FILE"
        fi
    else
        echo -e "  ${RED}✗${NC} Failed to get suggestion"
        echo "$ORIGINAL_NAME -> [ERROR: Could not analyze]" >> "$OUTPUT_FILE"
    fi
    
    # Small delay to avoid rate limiting
    sleep 0.5
    echo ""
done

# Clean up temp directory
echo -e "${YELLOW}Cleaning up temporary files...${NC}"
rm -rf "$TEMP_DIR"

echo -e "\n${GREEN}✅ Analysis complete!${NC}"
echo -e "\nFiles created:"
echo -e "  ${BLUE}$OUTPUT_FILE${NC} - All rename suggestions"
echo -e "  ${BLUE}$ISSUES_FILE${NC} - Pages with layout issues"

# Show summary of issues found
if [ -s "$ISSUES_FILE" ]; then
    echo -e "\n${YELLOW}Layout Issues Summary:${NC}"
    echo -e "Found issues on $(wc -l < "$ISSUES_FILE") pages"
    echo -e "\nFirst 10 issues:"
    head -10 "$ISSUES_FILE"
else
    echo -e "\n${GREEN}No layout issues detected!${NC}"
fi

# Show first few suggestions
echo -e "\n${BLUE}Sample rename suggestions:${NC}"
head -5 "$OUTPUT_FILE"

echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Review all suggestions: cat $OUTPUT_FILE"
echo "2. Check layout issues: cat $ISSUES_FILE"
echo "3. Apply renames: ./scripts/apply-screenshot-renames.sh"