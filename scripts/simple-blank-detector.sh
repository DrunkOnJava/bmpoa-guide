#!/bin/bash

# Simple blank and orphan page detector using ImageMagick
# Analyzes page images for blank/near-blank content

BUILD_DIR="$1"
if [ -z "$BUILD_DIR" ]; then
  echo "Usage: $0 <build-directory>"
  exit 1
fi

JPG_DIR="$BUILD_DIR/jpg-efficient"
REPORT_FILE="$BUILD_DIR/blank-page-report.txt"

echo "🔍 Analyzing pages for blank and orphan content..."
echo "Build: $BUILD_DIR"
echo ""

# Initialize report
echo "BLANK & ORPHAN PAGE DETECTION REPORT" > "$REPORT_FILE"
echo "===================================" >> "$REPORT_FILE"
echo "Generated: $(date)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

BLANK_PAGES=()
NEAR_BLANK_PAGES=()
ISSUES_FOUND=0

# Analyze each page
for page in "$JPG_DIR"/page-*.jpg; do
  if [ -f "$page" ]; then
    PAGE_NUM=$(basename "$page" | grep -o '[0-9]\+')
    
    # Get image statistics
    STATS=$(identify -verbose "$page" | grep -E "mean:|standard deviation:" | head -2)
    MEAN=$(echo "$STATS" | grep "mean:" | awk '{print $2}' | cut -d'.' -f1)
    STDDEV=$(echo "$STATS" | grep "standard deviation:" | awk '{print $3}' | cut -d'.' -f1)
    
    # Get image dimensions and check content distribution
    DIMENSIONS=$(identify -format "%wx%h" "$page")
    WIDTH=${DIMENSIONS%x*}
    HEIGHT=${DIMENSIONS#*x}
    
    # Check if page is mostly white (high mean, low standard deviation)
    if [ "$MEAN" -gt 250 ] && [ "$STDDEV" -lt 5 ]; then
      BLANK_PAGES+=("$PAGE_NUM")
      echo "❌ Page $PAGE_NUM: BLANK (mean=$MEAN, stddev=$STDDEV)"
      echo "BLANK: Page $PAGE_NUM - mean=$MEAN, stddev=$STDDEV" >> "$REPORT_FILE"
      ((ISSUES_FOUND++))
    elif [ "$MEAN" -gt 240 ] && [ "$STDDEV" -lt 15 ]; then
      # Check content area using crop analysis
      # Top 20% check
      TOP_MEAN=$(convert "$page" -crop ${WIDTH}x$((HEIGHT/5))+0+0 -format "%[mean]" info: | cut -d'.' -f1)
      # Bottom 20% check  
      BOTTOM_MEAN=$(convert "$page" -crop ${WIDTH}x$((HEIGHT/5))+0+$((HEIGHT*4/5)) -format "%[mean]" info: | cut -d'.' -f1)
      
      if [ "$TOP_MEAN" -lt 240 ] && [ "$BOTTOM_MEAN" -gt 250 ]; then
        echo "⚠️  Page $PAGE_NUM: WIDOW (content only at top)"
        echo "WIDOW: Page $PAGE_NUM - content concentrated at top" >> "$REPORT_FILE"
        ((ISSUES_FOUND++))
      elif [ "$BOTTOM_MEAN" -lt 240 ] && [ "$TOP_MEAN" -gt 250 ]; then
        echo "⚠️  Page $PAGE_NUM: ORPHAN (content only at bottom)"
        echo "ORPHAN: Page $PAGE_NUM - content concentrated at bottom" >> "$REPORT_FILE"
        ((ISSUES_FOUND++))
      else
        NEAR_BLANK_PAGES+=("$PAGE_NUM")
        echo "⚠️  Page $PAGE_NUM: NEAR-BLANK (mean=$MEAN, stddev=$STDDEV)"
        echo "NEAR-BLANK: Page $PAGE_NUM - mean=$MEAN, stddev=$STDDEV" >> "$REPORT_FILE"
        ((ISSUES_FOUND++))
      fi
    fi
  fi
done

echo "" | tee -a "$REPORT_FILE"
echo "📊 SUMMARY" | tee -a "$REPORT_FILE"
echo "=========" | tee -a "$REPORT_FILE"
echo "Total issues found: $ISSUES_FOUND" | tee -a "$REPORT_FILE"
echo "Blank pages: ${#BLANK_PAGES[@]}" | tee -a "$REPORT_FILE"

if [ ${#BLANK_PAGES[@]} -gt 0 ]; then
  echo "Blank page numbers: ${BLANK_PAGES[*]}" | tee -a "$REPORT_FILE"
fi

echo ""
echo "📄 Full report saved to: $REPORT_FILE"

# Exit with error code if issues found
exit $ISSUES_FOUND