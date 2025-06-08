#!/bin/bash

# ContentPolicer for ComponentGarden - Verifies content in ComponentFarm/ComponentGarden images
# Uses Claude 3.5 Sonnet to check for accuracy and potential hallucinations
# Outputs findings to a local report file in the ComponentGarden directory

# Configuration
COMPONENT_DIR="/Users/griffin/Documents/bmpoa-guide/ComponentFarm/ComponentGarden"
REFERENCE_DIR="/Users/griffin/Documents/bmpoa-guide/ReferenceContent/Reference-Content"
OUTPUT_FILE="$COMPONENT_DIR/content-verification-report.md"
TEMP_FILE="$COMPONENT_DIR/.temp_verification.txt"

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Initialize report file
echo "# Content Verification Report - ComponentGarden" > "$OUTPUT_FILE"
echo "**Date:** $(date)" >> "$OUTPUT_FILE"
echo "**Verifier:** ContentPolicer Bot (Claude 3.5 Sonnet)" >> "$OUTPUT_FILE"
echo "**Reference Materials:** $REFERENCE_DIR" >> "$OUTPUT_FILE"
echo -e "\n---\n" >> "$OUTPUT_FILE"

# Create prompt for Claude
PROMPT="You are ContentPolicer, a content verification bot. Analyze this image and verify its content against the reference materials. Identify:

1. HALLUCINATIONS: Content that appears to be made up or not supported by any references
2. UNVERIFIED: Claims or statements that cannot be verified with available references
3. VERIFIED: Content that matches reference materials

Output your findings in this format:
## [Image Filename]
### Content Summary:
[Brief description of what the image contains]

### Findings:
- **Hallucinations:** [Count and list any]
- **Unverified Claims:** [Count and list any]
- **Verified Content:** [Brief summary]

### Specific Issues:
[List each issue with details]

### Recommendation:
[What needs to be fixed or verified]

Be thorough but concise. Focus on factual accuracy."

# Count total images
TOTAL_IMAGES=$(ls -1 "$COMPONENT_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')
echo -e "${BLUE}Starting ContentPolicer for ComponentGarden${NC}"
echo -e "Total images to verify: ${YELLOW}$TOTAL_IMAGES${NC}"
echo -e "Output file: ${GREEN}$OUTPUT_FILE${NC}\n"

# Add summary section to report
echo "## Summary" >> "$OUTPUT_FILE"
echo "**Total Images:** $TOTAL_IMAGES" >> "$OUTPUT_FILE"
echo "**Status:** In Progress..." >> "$OUTPUT_FILE"
echo -e "\n---\n" >> "$OUTPUT_FILE"

# Process counter
COUNT=0

# Process each image file
for img in "$COMPONENT_DIR"/*.jpg; do
    if [ -f "$img" ]; then
        COUNT=$((COUNT + 1))
        FILENAME=$(basename "$img")
        
        echo -e "${BLUE}[$COUNT/$TOTAL_IMAGES]${NC} Verifying: ${YELLOW}$FILENAME${NC}"
        
        # Get verification from Claude Sonnet
        echo -e "\n## $FILENAME" >> "$OUTPUT_FILE"
        echo "**Analyzed:** $(date +"%H:%M:%S")" >> "$OUTPUT_FILE"
        
        # Send image to Claude and capture response
        VERIFICATION=$(cat "$img" | claude -p --model claude-3-5-sonnet-20241022 "$PROMPT" 2>/dev/null)
        
        if [ -n "$VERIFICATION" ]; then
            # Append verification to report
            echo "$VERIFICATION" >> "$OUTPUT_FILE"
            echo -e "\n---\n" >> "$OUTPUT_FILE"
            
            # Extract counts for terminal display (with defaults)
            HALLUCINATIONS=$(echo "$VERIFICATION" | grep -i "hallucinations:" | grep -o '[0-9]\+' | head -1)
            UNVERIFIED=$(echo "$VERIFICATION" | grep -i "unverified" | grep -o '[0-9]\+' | head -1)
            
            # Set defaults if empty
            HALLUCINATIONS=${HALLUCINATIONS:-0}
            UNVERIFIED=${UNVERIFIED:-0}
            
            # Display summary in terminal
            if [ "$HALLUCINATIONS" -gt 0 ] || [ "$UNVERIFIED" -gt 0 ]; then
                echo -e "   ${RED}Issues found:${NC} Hallucinations: $HALLUCINATIONS, Unverified: $UNVERIFIED"
            else
                echo -e "   ${GREEN}✓ Content verified${NC}"
            fi
        else
            echo "**Error:** Failed to analyze image" >> "$OUTPUT_FILE"
            echo -e "\n---\n" >> "$OUTPUT_FILE"
            echo -e "   ${RED}✗ Analysis failed${NC}"
        fi
        
        # Small delay to avoid rate limiting
        sleep 2
    fi
done

# Update summary with final counts
echo -e "\n${GREEN}ContentPolicer Complete!${NC}"
echo "Updating final report summary..."

# Count total issues from report
TOTAL_HALLUCINATIONS=$(grep -i "hallucinations:" "$OUTPUT_FILE" | grep -o '[0-9]\+' | awk '{sum+=$1} END {print sum}')
TOTAL_UNVERIFIED=$(grep -i "unverified" "$OUTPUT_FILE" | grep -o '[0-9]\+' | awk '{sum+=$1} END {print sum}')

# Set defaults if empty
TOTAL_HALLUCINATIONS=${TOTAL_HALLUCINATIONS:-0}
TOTAL_UNVERIFIED=${TOTAL_UNVERIFIED:-0}

# Create temporary file with updated summary
{
    echo "# Content Verification Report - ComponentGarden"
    echo "**Date:** $(date)"
    echo "**Verifier:** ContentPolicer Bot (Claude 3.5 Sonnet)"
    echo "**Reference Materials:** $REFERENCE_DIR"
    echo -e "\n---\n"
    echo "## Summary"
    echo "**Total Images:** $TOTAL_IMAGES"
    echo "**Status:** Complete"
    echo "**Total Hallucinations Found:** $TOTAL_HALLUCINATIONS"
    echo "**Total Unverified Claims:** $TOTAL_UNVERIFIED"
    echo -e "\n---\n"
    # Append the rest of the report
    tail -n +9 "$OUTPUT_FILE"
} > "$TEMP_FILE"

# Replace original file with updated version
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo -e "${GREEN}✅ Verification complete!${NC}"
echo -e "Report saved to: ${BLUE}$OUTPUT_FILE${NC}"
echo -e "\nSummary:"
echo -e "  Total Hallucinations: ${RED}$TOTAL_HALLUCINATIONS${NC}"
echo -e "  Total Unverified Claims: ${YELLOW}$TOTAL_UNVERIFIED${NC}"