#!/bin/bash

# Style Guide Analysis Script - ITERATIVE VERSION
# Uses Claude Sonnet for deep style analysis
# Outputs results after each page for real-time monitoring

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Check for build argument or use latest
if [ -z "$1" ]; then
    BUILD=$(ls -1t output/builds 2>/dev/null | head -1)
    if [ -z "$BUILD" ]; then
        echo -e "${RED}No builds found${NC}"
        exit 1
    fi
else
    BUILD="$1"
fi

BUILD_DIR="output/builds/$BUILD"
JPG_DIR="$BUILD_DIR/jpg-efficient"
REPORT_FILE="$BUILD_DIR/style-analysis-report.md"
VIOLATIONS_FILE="$BUILD_DIR/style-violations.json"
TASKS_FILE="$BUILD_DIR/style-fix-tasks.md"
TODO_FILE="$BUILD_DIR/style-todo-items.json"
PROGRESS_FILE="$BUILD_DIR/style-analysis-progress.txt"

echo -e "${PURPLE}Style Guide Analysis System (Iterative)${NC}"
echo -e "${PURPLE}=======================================${NC}"
echo -e "Build: ${GREEN}$BUILD${NC}"
echo -e "Model: ${BLUE}Claude 3.5 Sonnet${NC}\n"

# Check if build exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Build not found: $BUILD${NC}"
    exit 1
fi

# Initialize files
echo "# Style Guide Analysis Report" > "$REPORT_FILE"
echo "**Build:** $BUILD  " >> "$REPORT_FILE"
echo "**Date:** $(date)  " >> "$REPORT_FILE"
echo "**Analyzer:** Claude 3.5 Sonnet  " >> "$REPORT_FILE"
echo "**Style Guide:** BMPOA Enhanced Style Guide v2.0  " >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Initialize JSON files
echo "[" > "$VIOLATIONS_FILE"
echo "# Style Fix Tasks" > "$TASKS_FILE"
echo "[" > "$TODO_FILE"

# Initialize progress tracking
echo "0" > "$PROGRESS_FILE"

# Count images
TOTAL_IMAGES=$(ls -1 "$JPG_DIR"/page-*.jpg 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No images found in $JPG_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Analyzing $TOTAL_IMAGES pages for style compliance...${NC}"
echo -e "${YELLOW}Results will be written after each page${NC}\n"

# Track violations
CRITICAL_COUNT=0
MAJOR_COUNT=0
MINOR_COUNT=0
CURRENT=0
FIRST_ENTRY=true

# Create comprehensive style analysis prompt template
read -r -d '' PROMPT_TEMPLATE << 'EOF'
You are a professional style guide specialist and React/Tailwind CSS expert analyzing page PAGE_NUM of the BMPOA Community Guide.

Analyze this page against these style requirements:

TYPOGRAPHY:
- Cover title: 48pt
- Section titles: 24pt  
- Subsection titles: 18pt
- Body text: 11pt
- Captions: 9pt
- Line spacing: 1.5 for body, 1.3 for lists

LAYOUT:
- Margins: 0.75in top/bottom, 1in left/right
- Section gap: 24pt
- Paragraph gap: 12pt
- Headers: left-aligned
- Body: justified
- Captions: centered

CRITICAL VIOLATIONS TO CHECK:
1. Content cut off at margins
2. Text overflow outside boundaries
3. Missing or incorrect page numbers
4. Unreadable text (size/contrast)
5. Broken table layouts

MAJOR VIOLATIONS TO CHECK:
1. Inconsistent header styles or sizes
2. Orphaned paragraphs (single paragraph alone at top)
3. Widow lines (single line alone at top)
4. Misaligned elements
5. Inconsistent spacing patterns
6. Tables split unnecessarily

MINOR VIOLATIONS TO CHECK:
1. Slight spacing variations
2. Minor alignment inconsistencies
3. Caption style variations
4. List indentation differences

Provide a detailed analysis in this exact JSON format:
{
  "pageNumber": PAGE_NUM,
  "professionalismScore": 85,
  "presentationScore": 90,
  "violations": [
    {
      "severity": "critical|major|minor",
      "category": "typography|layout|component|spacing",
      "element": "specific element name",
      "issue": "detailed description of the violation",
      "location": "where on the page (top/middle/bottom, left/center/right)",
      "fix": "specific action to fix this issue"
    }
  ],
  "compliantElements": ["list of elements that follow style guide correctly"],
  "overallCompliance": "percentage (0-100)",
  "notes": "any additional observations"
}
EOF

# Process each page
for img in "$JPG_DIR"/page-*.jpg; do
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/page-\([0-9]*\)\.jpg/\1/')
    
    echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Analyzing page ${PAGE_NUM} for style compliance..."
    
    # Update progress file
    echo "$CURRENT" > "$PROGRESS_FILE"
    
    # Customize prompt for this page
    PROMPT=$(echo "$PROMPT_TEMPLATE" | sed "s/PAGE_NUM/$PAGE_NUM/g")
    
    # Get analysis from Claude Sonnet
    ANALYSIS=$(cat "$img" | claude -p --model claude-3-5-sonnet-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$ANALYSIS" ]; then
        # Extract JSON from response (handle multi-line JSON)
        # First try to extract everything between first { and last }
        JSON_ANALYSIS=$(echo "$ANALYSIS" | awk '/^{/{p=1} p{print} /^}/{p=0}' | tr '\n' ' ')
        
        if [ -n "$JSON_ANALYSIS" ]; then
            # Append to violations file (with comma if not first)
            if [ "$FIRST_ENTRY" = false ]; then
                # Remove the closing bracket, add comma, add new entry, add closing bracket
                sed -i '$ d' "$VIOLATIONS_FILE"  # Remove last line (])
                echo "," >> "$VIOLATIONS_FILE"
            fi
            echo "$JSON_ANALYSIS" >> "$VIOLATIONS_FILE"
            
            # Always ensure file ends with closing bracket
            if ! tail -1 "$VIOLATIONS_FILE" | grep -q ']$'; then
                echo "]" >> "$VIOLATIONS_FILE"
            fi
            
            FIRST_ENTRY=false
            
            # Count violations by severity
            CRITICAL=$(echo "$JSON_ANALYSIS" | grep -o '"severity":"critical"' | wc -l)
            MAJOR=$(echo "$JSON_ANALYSIS" | grep -o '"severity":"major"' | wc -l)
            MINOR=$(echo "$JSON_ANALYSIS" | grep -o '"severity":"minor"' | wc -l)
            
            CRITICAL_COUNT=$((CRITICAL_COUNT + CRITICAL))
            MAJOR_COUNT=$((MAJOR_COUNT + MAJOR))
            MINOR_COUNT=$((MINOR_COUNT + MINOR))
            
            # Append to report immediately
            echo -e "\n### Page $PAGE_NUM\n" >> "$REPORT_FILE"
            
            # Extract scores
            PROF_SCORE=$(echo "$JSON_ANALYSIS" | grep -o '"professionalismScore":[[:space:]]*[0-9]*' | grep -o '[0-9]*$')
            PRES_SCORE=$(echo "$JSON_ANALYSIS" | grep -o '"presentationScore":[[:space:]]*[0-9]*' | grep -o '[0-9]*$')
            
            echo "**Professionalism Score:** ${PROF_SCORE}% | **Presentation Score:** ${PRES_SCORE}%" >> "$REPORT_FILE"
            
            if [ $((CRITICAL + MAJOR + MINOR)) -eq 0 ]; then
                echo "✅ **Fully Compliant** - No style violations found" >> "$REPORT_FILE"
                echo -e "  ${GREEN}✓${NC} Page $PAGE_NUM is fully compliant"
            else
                echo -e "  ${RED}●${NC} Critical: $CRITICAL ${YELLOW}●${NC} Major: $MAJOR ${BLUE}●${NC} Minor: $MINOR"
                
                # Parse and format violations for report
                echo "$JSON_ANALYSIS" | python3 -c "
import json
import sys

data = json.loads(sys.stdin.read())
violations = data.get('violations', [])
compliant = data.get('compliantElements', [])
compliance = data.get('overallCompliance', '0')
notes = data.get('notes', '')

print(f'**Compliance Score:** {compliance}%\\n')

if violations:
    print('**Violations Found:**')
    for v in violations:
        severity = v.get('severity', 'unknown')
        icon = '🔴' if severity == 'critical' else '🟡' if severity == 'major' else '🔵'
        print(f'- {icon} **{severity.upper()}** - {v.get(\"element\", \"Unknown\")}: {v.get(\"issue\", \"\")}')
        print(f'  - Location: {v.get(\"location\", \"unspecified\")}')
        print(f'  - Fix: {v.get(\"fix\", \"No fix provided\")}')

if compliant:
    print('\\n**Compliant Elements:**')
    for item in compliant[:3]:  # Show first 3
        print(f'- ✅ {item}')
    if len(compliant) > 3:
        print(f'- _...and {len(compliant)-3} more_')

if notes:
    print(f'\\n**Notes:** {notes}')
" >> "$REPORT_FILE"
            fi
            
            # Update running summary at top of file
            TEMP_FILE="${REPORT_FILE}.tmp"
            (
                echo "# Style Guide Analysis Report"
                echo "**Build:** $BUILD  "
                echo "**Date:** $(date)  "
                echo "**Analyzer:** Claude 3.5 Sonnet  "
                echo "**Style Guide:** BMPOA Enhanced Style Guide v2.0  "
                echo ""
                echo "## Summary (Live)"
                echo "**Progress:** $CURRENT / $TOTAL_IMAGES pages analyzed"
                echo "**Violations Found:** 🔴 Critical: $CRITICAL_COUNT | 🟡 Major: $MAJOR_COUNT | 🔵 Minor: $MINOR_COUNT"
                echo ""
                echo "---"
                # Skip the old header and append the rest
                tail -n +6 "$REPORT_FILE" | tail -n +6
            ) > "$TEMP_FILE"
            mv "$TEMP_FILE" "$REPORT_FILE"
            
        else
            echo -e "  ${RED}✗${NC} Failed to extract JSON from response"
        fi
    else
        echo -e "  ${RED}✗${NC} Analysis failed for page $PAGE_NUM"
    fi
    
    # Small delay to avoid rate limiting
    sleep 0.5
done

# Mark as complete
touch "$BUILD_DIR/style-analysis-complete.flag"

# Final summary
echo -e "\n${GREEN}✅ Style Analysis Complete!${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Total pages analyzed: $TOTAL_IMAGES"
echo -e "Violations found:"
echo -e "  ${RED}●${NC} Critical: $CRITICAL_COUNT"
echo -e "  ${YELLOW}●${NC} Major: $MAJOR_COUNT"
echo -e "  ${BLUE}●${NC} Minor: $MINOR_COUNT"
echo -e "\nReports saved to:"
echo -e "  ${BLUE}$REPORT_FILE${NC}"
echo -e "  ${BLUE}$VIOLATIONS_FILE${NC}"