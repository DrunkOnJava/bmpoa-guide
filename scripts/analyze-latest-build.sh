#!/bin/bash

# Script to analyze images in the most recent build directory

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Check if builds directory exists
BUILDS_DIR="output/builds"
if [ ! -d "$BUILDS_DIR" ]; then
    echo -e "${RED}No builds directory found${NC}"
    echo "Run the build process first"
    exit 1
fi

# Find the most recent build directory
LATEST_BUILD=$(ls -1t "$BUILDS_DIR" | head -1)
if [ -z "$LATEST_BUILD" ]; then
    echo -e "${RED}No build directories found${NC}"
    exit 1
fi

BUILD_DIR="$BUILDS_DIR/$LATEST_BUILD"
echo -e "${BLUE}Analyzing Latest Build${NC}"
echo -e "${BLUE}=====================${NC}"
echo -e "Build: ${GREEN}$LATEST_BUILD${NC}"
echo ""

# Check if build has already been analyzed
if [ -f "$BUILD_DIR/analysis-complete.flag" ]; then
    echo -e "${YELLOW}This build has already been analyzed${NC}"
    echo -e "Results available in: $BUILD_DIR/suggested-filenames.txt"
    echo ""
    echo -e "To re-analyze, delete: $BUILD_DIR/analysis-complete.flag"
    exit 0
fi

# Check if ImageMagick is installed (for any additional processing)
if ! command -v magick &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Configuration
JPG_DIR="$BUILD_DIR/jpg-efficient"
OUTPUT_FILE="$BUILD_DIR/suggested-filenames.txt"
ISSUES_FILE="$BUILD_DIR/layout-issues.txt"

# Clear output files
> "$OUTPUT_FILE"
> "$ISSUES_FILE"

# Count images
TOTAL_IMAGES=$(ls -1 "$JPG_DIR"/page-*.jpg 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No JPG files found in $JPG_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Found $TOTAL_IMAGES images to analyze${NC}\n"

# Process each image
CURRENT=0
INTERRUPTED=false

# Trap to handle interruptions gracefully
trap 'INTERRUPTED=true' INT TERM

for img in "$JPG_DIR"/page-*.jpg; do
    if [ "$INTERRUPTED" = true ]; then
        echo -e "\n${YELLOW}Analysis interrupted!${NC}"
        echo -e "Resume by running this script again"
        exit 1
    fi
    
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/page-\([0-9]*\)\.jpg/\1/')
    ORIGINAL_NAME="page-${PAGE_NUM}.png"  # Reference PNG name for consistency
    
    # Skip if already processed (check if line exists in output file)
    if grep -q "^$ORIGINAL_NAME -> " "$OUTPUT_FILE" 2>/dev/null; then
        echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Skipping page ${PAGE_NUM} (already processed)"
        continue
    fi
    
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

# Mark analysis as complete
if [ "$INTERRUPTED" = false ]; then
    touch "$BUILD_DIR/analysis-complete.flag"
    echo -e "\n${GREEN}✅ Analysis complete!${NC}"
else
    echo -e "\n${YELLOW}⚠️  Analysis incomplete (interrupted)${NC}"
fi

echo -e "\nBuild directory: ${BLUE}$BUILD_DIR${NC}"
echo -e "Files created:"
echo -e "  ${BLUE}$OUTPUT_FILE${NC}"
echo -e "  ${BLUE}$ISSUES_FILE${NC}"

# Show summary of issues found
if [ -s "$ISSUES_FILE" ]; then
    ISSUE_COUNT=$(wc -l < "$ISSUES_FILE")
    echo -e "\n${YELLOW}Found layout issues on $ISSUE_COUNT pages${NC}"
    echo -e "\nFirst 5 issues:"
    head -5 "$ISSUES_FILE"
else
    echo -e "\n${GREEN}No layout issues detected!${NC}"
fi

# Mark analysis as complete
touch "$BUILD_DIR/analysis-complete.flag"

# Show first few suggestions
echo -e "\n${BLUE}Sample rename suggestions:${NC}"
head -5 "$OUTPUT_FILE"

echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Review all suggestions: cat $OUTPUT_FILE"
echo "2. Check layout issues: cat $ISSUES_FILE"
echo "3. Apply renames: ./scripts/apply-build-renames.sh $LATEST_BUILD"

# Automatically start style analysis (iterative version)
echo -e "\n${PURPLE}Starting style guide analysis (iterative)...${NC}"
"$(dirname "$0")/analyze-style-guide-iterative.sh" > output/style-analysis.log 2>&1 &