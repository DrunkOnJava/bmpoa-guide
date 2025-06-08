#!/bin/bash

# Create high-quality PDF montages with borders and labels
# Uses the latest build directory

set -euo pipefail

cd "$(dirname "$0")/.."

# Find the latest build directory
LATEST_BUILD=$(ls -1d output/builds/* 2>/dev/null | sort -V | tail -1)
if [ -z "$LATEST_BUILD" ]; then
    echo "❌ No builds found in output/builds/"
    exit 1
fi

PNG_DIR="$LATEST_BUILD/png-highres"
OUTPUT_DIR="output/montages"
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Count total pages
TOTAL_PAGES=$(ls -1 "$PNG_DIR"/page-*.png 2>/dev/null | wc -l)
if [ "$TOTAL_PAGES" -eq 0 ]; then
    echo "❌ No PNG files found in $PNG_DIR"
    exit 1
fi

echo "🖼️  Creating HIGH-QUALITY LABELED & BORDERED PDF montages..."
echo "📁 Source: $PNG_DIR ($TOTAL_PAGES pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 Enhanced settings: 400x520 thumbnails, borders, page labels, high DPI"

# Calculate pages per montage (approximately 18-20 per montage for 4 montages)
PAGES_PER_MONTAGE=$(( (TOTAL_PAGES + 3) / 4 ))

# Create 4 separate montages
for i in 1 2 3 4; do
    START=$(( (i - 1) * PAGES_PER_MONTAGE + 1 ))
    END=$(( i * PAGES_PER_MONTAGE ))
    
    # Don't exceed total pages
    if [ $END -gt $TOTAL_PAGES ]; then
        END=$TOTAL_PAGES
    fi
    
    # Skip if no pages in range
    if [ $START -gt $TOTAL_PAGES ]; then
        break
    fi
    
    echo ""
    echo "🎨 Creating Montage $i (Pages $START-$END)..."
    
    # Build file list for this range
    FILES=""
    for ((page=$START; page<=$END; page++)); do
        PAGE_FILE=$(printf "$PNG_DIR/page-%02d.png" $page)
        if [ -f "$PAGE_FILE" ]; then
            FILES="$FILES $PAGE_FILE"
        fi
    done
    
    if [ -z "$FILES" ]; then
        echo "⚠️  No files found for montage $i"
        continue
    fi
    
    # Create montage with labels and borders
    OUTPUT_FILE="$OUTPUT_DIR/BMPOA-Montage-Part$i-Pages$START-$END-$TIMESTAMP.jpg"
    
    montage $FILES \
        -label 'Page %t' \
        -font Helvetica \
        -pointsize 24 \
        -geometry 400x520+20+20 \
        -tile 3x \
        -background '#f0f0f0' \
        -fill black \
        -bordercolor '#333333' \
        -border 2 \
        -shadow \
        -density 150 \
        -quality 95 \
        "$OUTPUT_FILE"
    
    echo "✅ Created: $OUTPUT_FILE"
    echo "📏 Size: $(du -h "$OUTPUT_FILE" | cut -f1)"
done

echo ""
echo "🎉 All montages created successfully!"
echo "📁 Output directory: $OUTPUT_DIR"
echo ""
echo "Files created:"
ls -1 "$OUTPUT_DIR"/BMPOA-Montage-Part*-$TIMESTAMP.jpg 2>/dev/null || echo "No montage files found"