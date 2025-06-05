#!/bin/bash

# BMPOA Guide - Validation Script
# This script checks the guide for common issues and ensures quality

# Set color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Guide - Validator${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

# Initialize counters
ERRORS=0
WARNINGS=0
CHECKS_PASSED=0

# Function to show check result
show_check() {
    local status=$1
    local message=$2
    
    if [ "$status" = "pass" ]; then
        echo -e "${GREEN}✓${NC} $message"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    elif [ "$status" = "warn" ]; then
        echo -e "${YELLOW}!${NC} $message"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${RED}✗${NC} $message"
        ERRORS=$((ERRORS + 1))
    fi
}

echo -e "${BLUE}Checking project structure...${NC}"
echo ""

# Check for required files
[ -f "index.html" ] && show_check "pass" "index.html found" || show_check "error" "index.html missing"
[ -f "css/styles.css" ] && show_check "pass" "styles.css found" || show_check "error" "styles.css missing"
[ -f "js/load-sections.js" ] && show_check "pass" "load-sections.js found" || show_check "error" "load-sections.js missing"
[ -d "sections" ] && show_check "pass" "sections directory found" || show_check "error" "sections directory missing"
[ -d "images" ] && show_check "pass" "images directory found" || show_check "error" "images directory missing"

echo ""
echo -e "${BLUE}Checking section files...${NC}"
echo ""

# Expected sections
SECTIONS=(
    "cover-page"
    "introduction-page"
    "table-of-contents"
    "section-1-governance"
    "section-2-mountain-home"
    "section-3-wood-chipping"
    "section-4-fire-safety"
    "section-5-community-services"
    "section-6-deer-lake"
    "section-7-lodge"
    "section-8-communication"
    "section-9-contacts"
    "section-10-natural-attractions"
    "section-11-construction"
    "section-12-bear-safety"
    "back-cover"
)

MISSING_SECTIONS=0
for section in "${SECTIONS[@]}"; do
    if [ -f "sections/${section}.html" ]; then
        # Check if file has content (not just placeholder)
        content_size=$(wc -c < "sections/${section}.html")
        if [ $content_size -lt 500 ]; then
            show_check "warn" "${section}.html exists but seems too small (possible placeholder)"
        else
            show_check "pass" "${section}.html found with content"
        fi
    else
        show_check "error" "${section}.html missing"
        MISSING_SECTIONS=$((MISSING_SECTIONS + 1))
    fi
done

echo ""
echo -e "${BLUE}Checking for common HTML issues...${NC}"
echo ""

# Check for broken image references
BROKEN_IMAGES=0
IMAGE_REFS=$(grep -h -o 'src="images/[^"]*"' sections/*.html 2>/dev/null | sed 's/src="images\///' | sed 's/"//' | sort | uniq)

while IFS= read -r img; do
    if [ -n "$img" ] && [ ! -f "images/$img" ]; then
        show_check "error" "Broken image reference: $img"
        BROKEN_IMAGES=$((BROKEN_IMAGES + 1))
    fi
done <<< "$IMAGE_REFS"

if [ $BROKEN_IMAGES -eq 0 ]; then
    show_check "pass" "All image references are valid"
fi

# Check for placeholder content
PLACEHOLDER_COUNT=$(grep -r "placeholder\|TODO\|FIXME\|XXX" sections/*.html 2>/dev/null | wc -l)
if [ $PLACEHOLDER_COUNT -gt 0 ]; then
    show_check "warn" "Found $PLACEHOLDER_COUNT instances of placeholder text (TODO/FIXME/etc)"
else
    show_check "pass" "No placeholder text found"
fi

# Check page numbering consistency
echo ""
echo -e "${BLUE}Checking page numbering...${NC}"
echo ""

# Extract page numbers and check sequence
PAGE_NUMBERS=$(grep -h 'class="page-number"' sections/*.html 2>/dev/null | sed 's/.*>\([0-9-]*\)<.*/\1/' | grep -v "^$")
PREV_NUM=0
PAGE_ERRORS=0

while IFS= read -r num; do
    if [[ "$num" =~ ^[0-9]+$ ]]; then
        if [ $num -ne $((PREV_NUM + 1)) ] && [ $PREV_NUM -ne 0 ]; then
            show_check "warn" "Page numbering gap: $PREV_NUM → $num"
            PAGE_ERRORS=$((PAGE_ERRORS + 1))
        fi
        PREV_NUM=$num
    fi
done <<< "$PAGE_NUMBERS"

if [ $PAGE_ERRORS -eq 0 ]; then
    show_check "pass" "Page numbering appears sequential"
fi

# Check CSS validation
echo ""
echo -e "${BLUE}Checking CSS...${NC}"
echo ""

# Basic CSS checks
if grep -q "@media print" css/styles.css; then
    show_check "pass" "Print styles found in CSS"
else
    show_check "error" "No print styles found in CSS"
fi

if grep -q ":root" css/styles.css; then
    show_check "pass" "CSS variables defined"
else
    show_check "warn" "No CSS variables found"
fi

# Check for script errors
echo ""
echo -e "${BLUE}Checking JavaScript...${NC}"
echo ""

# Basic syntax check
if command -v node >/dev/null 2>&1; then
    node -c js/load-sections.js 2>/dev/null && show_check "pass" "JavaScript syntax valid" || show_check "error" "JavaScript syntax errors found"
else
    show_check "warn" "Node.js not installed - skipping JS validation"
fi

# Generate report
echo ""
echo -e "${BLUE}Validation Summary:${NC}"
echo "==================="
echo -e "${GREEN}Checks passed: $CHECKS_PASSED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "${RED}Errors: $ERRORS${NC}"

# Overall status
echo ""
if [ $ERRORS -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}✅ Guide validation PASSED - Ready for production!${NC}"
    else
        echo -e "${YELLOW}⚠️  Guide validation PASSED with warnings - Review recommended${NC}"
    fi
else
    echo -e "${RED}❌ Guide validation FAILED - Please fix errors before publishing${NC}"
fi

# Recommendations
if [ $ERRORS -gt 0 ] || [ $WARNINGS -gt 0 ]; then
    echo ""
    echo -e "${BLUE}Recommendations:${NC}"
    
    if [ $MISSING_SECTIONS -gt 0 ]; then
        echo "  • Create missing section files or run build.sh to generate placeholders"
    fi
    
    if [ $BROKEN_IMAGES -gt 0 ]; then
        echo "  • Fix broken image references or add missing images"
    fi
    
    if [ $PLACEHOLDER_COUNT -gt 0 ]; then
        echo "  • Search for TODO/FIXME markers and complete the content"
    fi
    
    if [ $PAGE_ERRORS -gt 0 ]; then
        echo "  • Review and fix page numbering sequence"
    fi
fi

echo ""
echo "Run './scripts/build.sh' after making any corrections."
echo ""
