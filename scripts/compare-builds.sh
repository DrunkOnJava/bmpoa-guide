#!/bin/bash

# Compare two builds to see what changed

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

if [ $# -ne 2 ]; then
    echo "Usage: $0 <build1> <build2>"
    echo "Example: $0 2025-01-06T12-30-45 2025-01-06T14-20-15"
    echo ""
    echo "Available builds:"
    ls -1 output/builds 2>/dev/null || echo "No builds found"
    exit 1
fi

BUILD1="$1"
BUILD2="$2"
DIR1="output/builds/$BUILD1"
DIR2="output/builds/$BUILD2"

# Verify builds exist
if [ ! -d "$DIR1" ]; then
    echo -e "${RED}Build not found: $BUILD1${NC}"
    exit 1
fi
if [ ! -d "$DIR2" ]; then
    echo -e "${RED}Build not found: $BUILD2${NC}"
    exit 1
fi

echo -e "${BLUE}Build Comparison${NC}"
echo -e "${BLUE}================${NC}"
echo -e "Build 1: ${GREEN}$BUILD1${NC}"
echo -e "Build 2: ${GREEN}$BUILD2${NC}\n"

# Compare PDF sizes
if [ -f "$DIR1/BMPOA-Guide.pdf" ] && [ -f "$DIR2/BMPOA-Guide.pdf" ]; then
    SIZE1=$(ls -lh "$DIR1/BMPOA-Guide.pdf" | awk '{print $5}')
    SIZE2=$(ls -lh "$DIR2/BMPOA-Guide.pdf" | awk '{print $5}')
    echo "PDF Size: $SIZE1 → $SIZE2"
    
    # Check if PDFs are identical
    if cmp -s "$DIR1/BMPOA-Guide.pdf" "$DIR2/BMPOA-Guide.pdf"; then
        echo -e "PDF Content: ${GREEN}Identical${NC}"
    else
        echo -e "PDF Content: ${YELLOW}Different${NC}"
    fi
fi

# Compare page counts
PAGES1=$(ls -1 "$DIR1/png-highres" 2>/dev/null | wc -l)
PAGES2=$(ls -1 "$DIR2/png-highres" 2>/dev/null | wc -l)
echo -e "\nPage Count: $PAGES1 → $PAGES2"

# Compare issues found
echo -e "\n${YELLOW}Layout Issues Comparison:${NC}"
if [ -f "$DIR1/layout-issues.txt" ] && [ -f "$DIR2/layout-issues.txt" ]; then
    ISSUES1=$(wc -l < "$DIR1/layout-issues.txt")
    ISSUES2=$(wc -l < "$DIR2/layout-issues.txt")
    echo "Total Issues: $ISSUES1 → $ISSUES2"
    
    # Show new issues
    echo -e "\n${RED}New Issues in Build 2:${NC}"
    comm -13 <(sort "$DIR1/layout-issues.txt") <(sort "$DIR2/layout-issues.txt") | head -5
    
    # Show fixed issues
    echo -e "\n${GREEN}Fixed Issues in Build 2:${NC}"
    comm -23 <(sort "$DIR1/layout-issues.txt") <(sort "$DIR2/layout-issues.txt") | head -5
else
    echo "Issue comparison not available (missing analysis files)"
fi

# Compare specific issue types
echo -e "\n${BLUE}Issue Type Breakdown:${NC}"
for issue in BLANK ORPHAN WIDOW MISALIGNED CUTOFF OVERFLOW OVERLAP; do
    COUNT1=$(grep -c "$issue" "$DIR1/layout-issues.txt" 2>/dev/null || echo 0)
    COUNT2=$(grep -c "$issue" "$DIR2/layout-issues.txt" 2>/dev/null || echo 0)
    if [ "$COUNT1" -ne 0 ] || [ "$COUNT2" -ne 0 ]; then
        printf "%-12s: %3d → %3d" "$issue" "$COUNT1" "$COUNT2"
        if [ "$COUNT2" -lt "$COUNT1" ]; then
            echo -e " ${GREEN}↓${NC}"
        elif [ "$COUNT2" -gt "$COUNT1" ]; then
            echo -e " ${RED}↑${NC}"
        else
            echo ""
        fi
    fi
done

# Show sample of changed pages
if [ -f "$DIR1/suggested-filenames.txt" ] && [ -f "$DIR2/suggested-filenames.txt" ]; then
    echo -e "\n${BLUE}Sample Changed Pages:${NC}"
    diff "$DIR1/suggested-filenames.txt" "$DIR2/suggested-filenames.txt" | grep "^[<>]" | head -10
fi