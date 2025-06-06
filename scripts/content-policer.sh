#!/bin/bash

# ContentPolicer - Content Verification Bot
# Uses Claude 3.5 Sonnet to verify content accuracy against reference materials
# Flags potential hallucinations and unverified content

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Reference content directory
REFERENCE_DIR="/Users/griffin/Documents/bmpoa-guide/ReferenceContent/Reference-Content"

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
REPORT_FILE="$BUILD_DIR/content-verification-report.md"
HALLUCINATION_FILE="$BUILD_DIR/potential-hallucinations.json"
VERIFICATION_LOG="$BUILD_DIR/content-policer.log"
PROGRESS_FILE="$BUILD_DIR/content-verification-progress.txt"

echo -e "${PURPLE}ContentPolicer - Content Verification System${NC}"
echo -e "${PURPLE}==========================================${NC}"
echo -e "Build: ${GREEN}$BUILD${NC}"
echo -e "Model: ${BLUE}Claude 3.5 Sonnet${NC}"
echo -e "Reference: ${CYAN}$REFERENCE_DIR${NC}\n"

# Check if build exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Build not found: $BUILD${NC}"
    exit 1
fi

# Initialize report files
echo "# Content Verification Report" > "$REPORT_FILE"
echo "**Build:** $BUILD  " >> "$REPORT_FILE"
echo "**Date:** $(date)  " >> "$REPORT_FILE"
echo "**Verifier:** ContentPolicer (Claude 3.5 Sonnet)  " >> "$REPORT_FILE"
echo "**Reference Directory:** $REFERENCE_DIR  " >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Initialize JSON file
echo "[" > "$HALLUCINATION_FILE"

# Initialize progress tracking
echo "0" > "$PROGRESS_FILE"

# Create reference context summary
echo -e "${YELLOW}Loading reference materials...${NC}"
REFERENCE_CONTEXT=$(cat << 'EOF'
REFERENCE MATERIALS AVAILABLE:
1. Blue Mountain Property Owners Association Guide1.pdf - Original source document
2. Blue Mountain Subdivision Emergency Evacuation.pdf - Emergency procedures
3. bluemountemail1.pdf & bluemountemail2.pdf - Official communications
4. BMPOA-entities.txt - List of verified entities, names, and organizations
5. BMPOA-Outline.md - Official document structure and sections
6. consolidated_files-*.md - Compiled reference information
7. database/ - Structured data including:
   - contacts.json - Verified contact information
   - governance.json - Board and committee details
   - services.json - Community services data
   - facilities.json - Facility information
   - regulations.json - Rules and restrictions

KEY VERIFICATION POINTS:
- Phone numbers must match exactly
- Email addresses must be verified
- Board member names and positions
- Meeting dates and times
- Fee amounts and due dates
- Property restrictions and guidelines
- Emergency contact information
- Facility hours and locations
- Historical facts and dates
EOF
)

# Load key reference data
ENTITIES=$(cat "$REFERENCE_DIR/BMPOA-entities.txt" 2>/dev/null || echo "No entities file found")
OUTLINE=$(cat "$REFERENCE_DIR/BMPOA-Outline.md" 2>/dev/null || echo "No outline file found")

# Count images
TOTAL_IMAGES=$(ls -1 "$JPG_DIR"/page-*.jpg 2>/dev/null | wc -l)
if [ "$TOTAL_IMAGES" -eq 0 ]; then
    echo -e "${RED}No images found in $JPG_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Analyzing $TOTAL_IMAGES pages for content accuracy...${NC}"
echo -e "${YELLOW}Cross-referencing with source materials...${NC}\n"

# Track findings
VERIFIED_COUNT=0
UNVERIFIED_COUNT=0
HALLUCINATION_COUNT=0
CURRENT=0
FIRST_ENTRY=true

# Create verification prompt template
read -r -d '' PROMPT_TEMPLATE << 'EOF'
You are ContentPolicer, an expert content verification system for the BMPOA Community Guide. Your role is to verify all content against reference materials and flag potential hallucinations or unverified information.

REFERENCE CONTEXT:
REFERENCE_CONTEXT_PLACEHOLDER

KEY ENTITIES TO VERIFY:
ENTITIES_PLACEHOLDER

DOCUMENT OUTLINE:
OUTLINE_PLACEHOLDER

Analyze page PAGE_NUM for the following:

1. FACTUAL ACCURACY:
   - Phone numbers, emails, addresses
   - Names and titles of people
   - Meeting times and dates
   - Fee amounts and deadlines
   - Hours of operation
   - Specific measurements or quantities

2. POTENTIAL HALLUCINATIONS:
   - Information not found in reference materials
   - Made-up names or positions
   - Invented phone numbers or emails
   - Fictional policies or procedures
   - Unsupported claims or statements

3. CONTENT VERIFICATION:
   - Cross-reference all claims with source documents
   - Verify entity names match exactly
   - Check dates and times for accuracy
   - Validate contact information
   - Confirm policy statements

4. MISSING CITATIONS:
   - Statements that should reference source
   - Claims needing verification
   - Policy quotes without attribution

Provide analysis in this JSON format:
{
  "pageNumber": PAGE_NUM,
  "contentItems": [
    {
      "type": "phone|email|name|date|fee|policy|claim|facility",
      "content": "the specific content item",
      "status": "verified|unverified|hallucination|suspicious",
      "source": "reference document if verified, or null",
      "issue": "description of problem if not verified",
      "recommendation": "how to fix or verify this item"
    }
  ],
  "verificationScore": 95,
  "hallucinations": ["list of definite hallucinations found"],
  "unverifiedClaims": ["list of claims that could not be verified"],
  "citationsNeeded": ["statements that need source citations"],
  "overallAssessment": "summary of content reliability"
}
EOF

# Process each page
for img in "$JPG_DIR"/page-*.jpg; do
    CURRENT=$((CURRENT + 1))
    BASENAME=$(basename "$img")
    PAGE_NUM=$(echo "$BASENAME" | sed 's/page-\([0-9]*\)\.jpg/\1/')
    
    echo -e "${YELLOW}[$CURRENT/$TOTAL_IMAGES]${NC} Verifying content on page ${PAGE_NUM}..."
    
    # Update progress
    echo "$CURRENT" > "$PROGRESS_FILE"
    
    # Customize prompt with reference data
    PROMPT=$(echo "$PROMPT_TEMPLATE" | \
        sed "s/REFERENCE_CONTEXT_PLACEHOLDER/$REFERENCE_CONTEXT/g" | \
        sed "s/ENTITIES_PLACEHOLDER/$(echo "$ENTITIES" | head -20 | tr '\n' ' ')/g" | \
        sed "s/OUTLINE_PLACEHOLDER/$(echo "$OUTLINE" | head -20 | tr '\n' ' ')/g" | \
        sed "s/PAGE_NUM/$PAGE_NUM/g")
    
    # Get verification from Claude Sonnet
    VERIFICATION=$(cat "$img" | claude -p --model claude-3-5-sonnet-20241022 "$PROMPT" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$VERIFICATION" ]; then
        # Extract JSON from response
        JSON_VERIFICATION=$(echo "$VERIFICATION" | awk '/^{/{p=1} p{print} /^}/{p=0}' | tr '\n' ' ')
        
        if [ -n "$JSON_VERIFICATION" ]; then
            # Log to monitor
            echo "$(date '+%H:%M:%S') Page $PAGE_NUM verified" >> "$VERIFICATION_LOG"
            
            # Append to hallucination file
            if [ "$FIRST_ENTRY" = false ]; then
                sed -i '$ d' "$HALLUCINATION_FILE"
                echo "," >> "$HALLUCINATION_FILE"
            fi
            echo "$JSON_VERIFICATION" >> "$HALLUCINATION_FILE"
            echo "]" >> "$HALLUCINATION_FILE"
            
            FIRST_ENTRY=false
            
            # Count findings
            HALLUCINATIONS=$(echo "$JSON_VERIFICATION" | grep -o '"hallucination"' | wc -l)
            UNVERIFIED=$(echo "$JSON_VERIFICATION" | grep -o '"unverified"' | wc -l)
            VERIFIED=$(echo "$JSON_VERIFICATION" | grep -o '"verified"' | wc -l)
            
            HALLUCINATION_COUNT=$((HALLUCINATION_COUNT + HALLUCINATIONS))
            UNVERIFIED_COUNT=$((UNVERIFIED_COUNT + UNVERIFIED))
            VERIFIED_COUNT=$((VERIFIED_COUNT + VERIFIED))
            
            # Append to report
            echo -e "\n### Page $PAGE_NUM\n" >> "$REPORT_FILE"
            
            # Extract verification score
            SCORE=$(echo "$JSON_VERIFICATION" | grep -o '"verificationScore":[[:space:]]*[0-9]*' | grep -o '[0-9]*$')
            
            echo "**Verification Score:** ${SCORE}%" >> "$REPORT_FILE"
            
            if [ "$HALLUCINATIONS" -gt 0 ] || [ "$UNVERIFIED" -gt 0 ]; then
                echo -e "  ${RED}⚠${NC} Issues found: ${RED}$HALLUCINATIONS hallucinations${NC}, ${YELLOW}$UNVERIFIED unverified${NC}"
                
                # Extract and format issues
                echo "$JSON_VERIFICATION" | python3 -c "
import json
import sys

data = json.loads(sys.stdin.read())
items = data.get('contentItems', [])
hallucinations = data.get('hallucinations', [])
unverified = data.get('unverifiedClaims', [])

if hallucinations:
    print('\\n**🔴 Potential Hallucinations:**')
    for h in hallucinations:
        print(f'- {h}')

if unverified:
    print('\\n**🟡 Unverified Claims:**')
    for u in unverified:
        print(f'- {u}')

suspicious = [item for item in items if item.get('status') in ['hallucination', 'suspicious']]
if suspicious:
    print('\\n**Detailed Issues:**')
    for item in suspicious[:5]:  # Show first 5
        print(f\"- **{item.get('type', 'unknown')}**: {item.get('content', '')} - {item.get('issue', '')}\")
        if item.get('recommendation'):
            print(f\"  - Fix: {item.get('recommendation')}\")
" >> "$REPORT_FILE"
            else
                echo "✅ **All content verified** - No issues found" >> "$REPORT_FILE"
                echo -e "  ${GREEN}✓${NC} Page $PAGE_NUM content verified"
            fi
            
            # Update live summary
            TEMP_FILE="${REPORT_FILE}.tmp"
            (
                echo "# Content Verification Report"
                echo "**Build:** $BUILD  "
                echo "**Date:** $(date)  "
                echo "**Verifier:** ContentPolicer (Claude 3.5 Sonnet)  "
                echo "**Reference Directory:** $REFERENCE_DIR  "
                echo ""
                echo "## Summary (Live)"
                echo "**Progress:** $CURRENT / $TOTAL_IMAGES pages analyzed"
                echo "**Findings:** 🔴 Hallucinations: $HALLUCINATION_COUNT | 🟡 Unverified: $UNVERIFIED_COUNT | ✅ Verified: $VERIFIED_COUNT"
                echo ""
                echo "---"
                tail -n +8 "$REPORT_FILE" | tail -n +8
            ) > "$TEMP_FILE"
            mv "$TEMP_FILE" "$REPORT_FILE"
            
        else
            echo -e "  ${RED}✗${NC} Failed to extract verification data"
        fi
    else
        echo -e "  ${RED}✗${NC} Verification failed for page $PAGE_NUM"
    fi
    
    # Small delay to avoid rate limiting
    sleep 0.5
done

# Mark as complete
touch "$BUILD_DIR/content-verification-complete.flag"

# Final summary
echo -e "\n${GREEN}✅ Content Verification Complete!${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Total pages analyzed: $TOTAL_IMAGES"
echo -e "Content findings:"
echo -e "  ${GREEN}✅${NC} Verified items: $VERIFIED_COUNT"
echo -e "  ${YELLOW}🟡${NC} Unverified claims: $UNVERIFIED_COUNT"
echo -e "  ${RED}🔴${NC} Potential hallucinations: $HALLUCINATION_COUNT"
echo -e "\nReports saved to:"
echo -e "  ${BLUE}$REPORT_FILE${NC}"
echo -e "  ${BLUE}$HALLUCINATION_FILE${NC}"