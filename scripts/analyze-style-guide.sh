#!/bin/bash

# Style Guide Analysis Script - Uses Claude Sonnet for deep style analysis

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

echo -e "${PURPLE}Style Guide Analysis System${NC}"
echo -e "${PURPLE}===========================${NC}"
echo -e "Build: ${GREEN}$BUILD${NC}"
echo -e "Model: ${BLUE}Claude 3.5 Sonnet${NC}\n"

# Check if build exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Build not found: $BUILD${NC}"
    exit 1
fi

# Check if already analyzed
if [ -f "$BUILD_DIR/style-analysis-complete.flag" ]; then
    echo -e "${YELLOW}This build has already been style analyzed${NC}"
    echo -e "Reports available:"
    echo -e "  - $REPORT_FILE"
    echo -e "  - $VIOLATIONS_FILE"
    echo -e "  - $TASKS_FILE"
    echo ""
    read -p "Re-analyze? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
    rm -f "$BUILD_DIR/style-analysis-complete.flag"
fi

# Load style guide rules
if [ ! -f "style-guide-rules.json" ]; then
    echo -e "${RED}Style guide rules not found${NC}"
    exit 1
fi

# Initialize report
cat > "$REPORT_FILE" << EOF
# Style Guide Analysis Report

**Build:** $BUILD  
**Analysis Date:** $(date)  
**Model:** Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)

## Summary

This report contains detailed style guide compliance analysis for the BMPOA Community Guide.

## Page-by-Page Analysis

EOF

# Initialize violations JSON
echo '{"buildId":"'$BUILD'","violations":[' > "$VIOLATIONS_FILE"

# Initialize tasks file
cat > "$TASKS_FILE" << EOF
# Style Guide Fix Tasks

Generated from build: $BUILD  
Date: $(date)

## Tasks by Priority

### 🔴 Critical Issues (Must Fix)

EOF

# Count images
TOTAL_IMAGES=$(ls -1 "$JPG_DIR"/page-*.jpg 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No images found in $JPG_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Analyzing $TOTAL_IMAGES pages for style compliance...${NC}\n"

# Track violations
CRITICAL_COUNT=0
MAJOR_COUNT=0
MINOR_COUNT=0
CURRENT=0
FIRST_VIOLATION=true

# Process each page
for img in "$JPG_DIR"/page-*.jpg; do
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/page-\([0-9]*\)\.jpg/\1/')
    
    echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Analyzing page ${PAGE_NUM} for style compliance..."
    
    # Create comprehensive style analysis prompt
    PROMPT="You are a professional style guide specialist and React/Tailwind CSS expert analyzing page $PAGE_NUM of the BMPOA Community Guide.

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

COMPONENT-SPECIFIC RULES:
- Headers must not be orphaned at page bottom
- Tables: header row must be on same page as data
- Images: must have captions on same page
- Call-out boxes: check border consistency and padding
- Footer: should contain 'BMPOA Community Guide' and page number

Provide a detailed analysis in this exact JSON format:
{
  \"pageNumber\": $PAGE_NUM,
  \"professionalismScore\": 85,
  \"presentationScore\": 90,
  \"violations\": [
    {
      \"severity\": \"critical|major|minor\",
      \"category\": \"typography|layout|component|spacing\",
      \"element\": \"specific element name\",
      \"issue\": \"detailed description of the violation\",
      \"location\": \"where on the page (top/middle/bottom, left/center/right)\",
      \"fix\": \"specific action to fix this issue\"
    }
  ],
  \"compliantElements\": [\"list of elements that follow style guide correctly\"],
  \"overallCompliance\": \"percentage (0-100)\",
  \"reactTailwindSuggestions\": {
    \"components\": [
      {
        \"element\": \"element name (e.g., header, table, callout)\",
        \"currentImplementation\": \"brief description of current approach\",
        \"suggestedImplementation\": \"React component with Tailwind classes\",
        \"benefits\": [\"list of improvements this would bring\"]
      }
    ],
    \"globalImprovements\": [
      \"Use Tailwind's typography plugin for consistent text styling\",
      \"Implement responsive grid system with Tailwind's grid classes\"
    ]
  },
  \"scoreBreakdown\": {
    \"typography\": 85,
    \"layout\": 90,
    \"consistency\": 80,
    \"whitespace\": 95,
    \"hierarchy\": 85
  },
  \"notes\": \"any additional observations\"
}"

    # Get analysis from Claude Sonnet
    ANALYSIS=$(cat "$img" | claude -p --model claude-3-5-sonnet-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$ANALYSIS" ]; then
        # Extract JSON from response (Claude might add explanation text)
        JSON_ANALYSIS=$(echo "$ANALYSIS" | grep -o '{.*}' | head -1)
        
        if [ -n "$JSON_ANALYSIS" ]; then
            # Add to violations file
            if [ "$FIRST_VIOLATION" = false ]; then
                echo "," >> "$VIOLATIONS_FILE"
            fi
            echo "$JSON_ANALYSIS" >> "$VIOLATIONS_FILE"
            FIRST_VIOLATION=false
            
            # Count violations by severity
            CRITICAL=$(echo "$JSON_ANALYSIS" | grep -o '"severity":"critical"' | wc -l)
            MAJOR=$(echo "$JSON_ANALYSIS" | grep -o '"severity":"major"' | wc -l)
            MINOR=$(echo "$JSON_ANALYSIS" | grep -o '"severity":"minor"' | wc -l)
            
            CRITICAL_COUNT=$((CRITICAL_COUNT + CRITICAL))
            MAJOR_COUNT=$((MAJOR_COUNT + MAJOR))
            MINOR_COUNT=$((MINOR_COUNT + MINOR))
            
            # Add to report
            echo -e "\n### Page $PAGE_NUM\n" >> "$REPORT_FILE"
            
            # Extract scores
            PROF_SCORE=$(echo "$JSON_ANALYSIS" | grep -o '"professionalismScore":[[:space:]]*[0-9]*' | grep -o '[0-9]*$')
            PRES_SCORE=$(echo "$JSON_ANALYSIS" | grep -o '"presentationScore":[[:space:]]*[0-9]*' | grep -o '[0-9]*$')
            
            echo "**Professionalism Score:** ${PROF_SCORE}% | **Presentation Score:** ${PRES_SCORE}%" >> "$REPORT_FILE"
            
            if [ $((CRITICAL + MAJOR + MINOR)) -eq 0 ]; then
                echo "✅ **Fully Compliant** - No style violations found" >> "$REPORT_FILE"
            else
                # Parse and format violations for report
                echo "$JSON_ANALYSIS" | python3 -c "
import json
import sys

data = json.loads(sys.stdin.read())
page = data.get('pageNumber', '')
violations = data.get('violations', [])
compliant = data.get('compliantElements', [])
compliance = data.get('overallCompliance', '0')
notes = data.get('notes', '')
suggestions = data.get('reactTailwindSuggestions', {})
scoreBreakdown = data.get('scoreBreakdown', {})

print(f'**Compliance Score:** {compliance}%\\n')

# Score breakdown
if scoreBreakdown:
    print('**Score Breakdown:**')
    for category, score in scoreBreakdown.items():
        print(f'- {category.capitalize()}: {score}%')
    print()

if violations:
    print('**Violations Found:**')
    for v in violations:
        severity = v.get('severity', 'unknown')
        icon = '🔴' if severity == 'critical' else '🟡' if severity == 'major' else '🔵'
        print(f'- {icon} **{severity.upper()}** - {v.get(\"element\", \"Unknown\")}: {v.get(\"issue\", \"\")}')
        print(f'  - Location: {v.get(\"location\", \"unspecified\")}')
        print(f'  - Fix: {v.get(\"fix\", \"No fix provided\")}')

# React/Tailwind suggestions
if suggestions.get('components'):
    print('\\n**React/Tailwind Enhancement Suggestions:**')
    for comp in suggestions['components']:
        print(f'\\n**{comp.get(\"element\", \"Component\")}:**')
        print(f'- Current: {comp.get(\"currentImplementation\", \"\")}')
        print(f'- Suggested: `{comp.get(\"suggestedImplementation\", \"\")}`')
        if comp.get('benefits'):
            print('- Benefits:')
            for benefit in comp['benefits']:
                print(f'  - {benefit}')

if compliant:
    print('\\n**Compliant Elements:**')
    for item in compliant:
        print(f'- ✅ {item}')

if notes:
    print(f'\\n**Notes:** {notes}')
" >> "$REPORT_FILE"
                
                # Generate tasks for critical and major issues
                if [ $CRITICAL -gt 0 ] || [ $MAJOR -gt 0 ]; then
                    echo "$JSON_ANALYSIS" | python3 -c "
import json
import sys

data = json.loads(sys.stdin.read())
page = data.get('pageNumber', '')
violations = data.get('violations', [])

critical_tasks = [v for v in violations if v.get('severity') == 'critical']
major_tasks = [v for v in violations if v.get('severity') == 'major']

if critical_tasks:
    for v in critical_tasks:
        print(f'\\n#### Page {page} - {v.get(\"element\", \"Unknown Element\")}')
        print(f'**Issue:** {v.get(\"issue\", \"\")}')
        print(f'**Location:** {v.get(\"location\", \"\")}')
        print(f'**Fix Required:** {v.get(\"fix\", \"\")}')
        print(f'**Component File:** src/components/[ComponentName]PageNoJSX.js')
        print(f'- [ ] Implement fix')
        print(f'- [ ] Test rendering')
        print(f'- [ ] Verify compliance')
" >> "$TASKS_FILE.tmp"
                fi
            fi
            
            echo -e "  ${GREEN}✓${NC} Analysis complete"
        else
            echo -e "  ${RED}✗${NC} Failed to parse analysis"
        fi
    else
        echo -e "  ${RED}✗${NC} Analysis failed"
    fi
    
    # Progress indicator
    if [ $((CURRENT % 10)) -eq 0 ]; then
        echo -e "\n${BLUE}Progress: $CURRENT/$TOTAL_IMAGES pages analyzed${NC}"
        echo -e "Violations found: ${RED}$CRITICAL_COUNT critical${NC}, ${YELLOW}$MAJOR_COUNT major${NC}, ${BLUE}$MINOR_COUNT minor${NC}\n"
    fi
    
    # Small delay to avoid rate limiting
    sleep 1
done

# Close JSON array
echo "]}" >> "$VIOLATIONS_FILE"

# Complete tasks file
if [ -f "$TASKS_FILE.tmp" ]; then
    cat "$TASKS_FILE.tmp" >> "$TASKS_FILE"
    rm "$TASKS_FILE.tmp"
fi

# Add major issues section
echo -e "\n### 🟡 Major Issues (Should Fix)\n" >> "$TASKS_FILE"
cat "$VIOLATIONS_FILE" | python3 -c "
import json
import sys

try:
    data = json.loads(sys.stdin.read())
    for page_data in data.get('violations', []):
        if isinstance(page_data, dict):
            page = page_data.get('pageNumber', '')
            violations = page_data.get('violations', [])
            major_tasks = [v for v in violations if v.get('severity') == 'major']
            
            for v in major_tasks:
                print(f'\\n#### Page {page} - {v.get(\"element\", \"Unknown Element\")}')
                print(f'**Issue:** {v.get(\"issue\", \"\")}')
                print(f'**Fix Required:** {v.get(\"fix\", \"\")}')
                print(f'- [ ] Implement fix')
except:
    pass
" >> "$TASKS_FILE"

# Generate summary
cat >> "$REPORT_FILE" << EOF

## Summary Statistics

- **Total Pages Analyzed:** $TOTAL_IMAGES
- **Critical Violations:** $CRITICAL_COUNT
- **Major Violations:** $MAJOR_COUNT  
- **Minor Violations:** $MINOR_COUNT
- **Total Violations:** $((CRITICAL_COUNT + MAJOR_COUNT + MINOR_COUNT))

## Recommendations

1. **Immediate Action Required:** Fix all $CRITICAL_COUNT critical violations
2. **High Priority:** Address $MAJOR_COUNT major violations
3. **Low Priority:** Consider fixing $MINOR_COUNT minor violations for perfect compliance

## Next Steps

1. Review the detailed task list in \`style-fix-tasks.md\`
2. Start with critical issues that affect readability
3. Use the component file references to locate code
4. Test each fix with \`npm run pdf\`

EOF

# Mark as complete
touch "$BUILD_DIR/style-analysis-complete.flag"

echo -e "\n${GREEN}✅ Style analysis complete!${NC}"
echo -e "\nViolation Summary:"
echo -e "  ${RED}Critical: $CRITICAL_COUNT${NC}"
echo -e "  ${YELLOW}Major: $MAJOR_COUNT${NC}"
echo -e "  ${BLUE}Minor: $MINOR_COUNT${NC}"
echo -e "\nReports generated:"
echo -e "  ${PURPLE}$REPORT_FILE${NC}"
echo -e "  ${PURPLE}$VIOLATIONS_FILE${NC}"
echo -e "  ${PURPLE}$TASKS_FILE${NC}"

# Offer to open reports
echo -e "\n${YELLOW}View reports?${NC}"
echo "1) Open style analysis report"
echo "2) Open fix tasks"
echo "3) Skip"
read -p "Choice (1-3): " -n 1 -r
echo
case $REPLY in
    1) open "$REPORT_FILE" ;;
    2) open "$TASKS_FILE" ;;
esac