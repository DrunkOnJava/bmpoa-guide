#!/bin/bash

# Create high-resolution PDF montage from the latest build
# Automatically detects the most recent build directory

set -euo pipefail

# Find the latest build directory
# Sort by name (which includes timestamp) in reverse order to get the latest
LATEST_BUILD=$(ls output/builds/ | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}T' | sort -r | head -1)

if [ -z "$LATEST_BUILD" ]; then
    echo "❌ No build directories found!"
    exit 1
fi

BUILD_DIR="output/builds/$LATEST_BUILD"
PNG_DIR="$BUILD_DIR/png-highres"
JPG_DIR="$BUILD_DIR/jpg-efficient"
OUTPUT_DIR="$BUILD_DIR/montages"
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")

# Check if PNG directory exists, otherwise use JPG
if [ -d "$PNG_DIR" ]; then
    SOURCE_DIR="$PNG_DIR"
    SOURCE_EXT="png"
    echo "📸 Using high-resolution PNG images"
else
    SOURCE_DIR="$JPG_DIR"
    SOURCE_EXT="jpg"
    echo "📸 Using efficient JPEG images"
fi

# Count total pages
TOTAL_PAGES=$(ls -1 "$SOURCE_DIR"/page-*.${SOURCE_EXT} 2>/dev/null | wc -l | tr -d ' ')

if [ "$TOTAL_PAGES" -eq 0 ]; then
    echo "❌ No page images found in $SOURCE_DIR"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

cd "$(dirname "$0")/.."

echo "🖼️  Creating HIGH-RESOLUTION PDF montage..."
echo "📁 Latest build: $LATEST_BUILD"
echo "📁 Source: $SOURCE_DIR ($TOTAL_PAGES pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 High quality settings for readability"

# Calculate grid size based on page count
if [ "$TOTAL_PAGES" -le 16 ]; then
    GRID="4x4"
    THUMB_SIZE="400x560"
elif [ "$TOTAL_PAGES" -le 25 ]; then
    GRID="5x5"
    THUMB_SIZE="320x448"
elif [ "$TOTAL_PAGES" -le 36 ]; then
    GRID="6x6"
    THUMB_SIZE="280x392"
elif [ "$TOTAL_PAGES" -le 49 ]; then
    GRID="7x7"
    THUMB_SIZE="240x336"
elif [ "$TOTAL_PAGES" -le 64 ]; then
    GRID="8x8"
    THUMB_SIZE="200x280"
else
    GRID="9x9"
    THUMB_SIZE="180x252"
fi

echo "📏 Grid: $GRID (${THUMB_SIZE}px thumbnails)"

# Create full montage
MONTAGE_FILE="$OUTPUT_DIR/BMPOA-Guide-HiRes-Montage-${TIMESTAMP}.jpg"

echo "🎨 Creating high-resolution montage..."

# High-quality montage settings
montage "$SOURCE_DIR"/page-*.${SOURCE_EXT} \
    -thumbnail "${THUMB_SIZE}" \
    -tile "${GRID}" \
    -geometry "+10+10" \
    -background "#f5f5f5" \
    -border 2 \
    -bordercolor "#ddd" \
    -shadow \
    -density 150 \
    -quality 95 \
    -label '%f' \
    -font "Helvetica" \
    -pointsize 10 \
    "$MONTAGE_FILE"

# Get file size
FILE_SIZE=$(ls -lh "$MONTAGE_FILE" | awk '{print $5}')

echo "✅ High-resolution montage created!"
echo "📄 File: $MONTAGE_FILE"
echo "📊 Size: $FILE_SIZE"
echo "📐 Grid: $GRID with ${THUMB_SIZE}px thumbnails"

# Create a super high-res version if page count is reasonable
if [ "$TOTAL_PAGES" -le 36 ]; then
    SUPER_MONTAGE_FILE="$OUTPUT_DIR/BMPOA-Guide-SuperHiRes-Montage-${TIMESTAMP}.jpg"
    
    echo ""
    echo "🎨 Creating SUPER high-resolution montage..."
    
    # Calculate larger thumbnail size
    if [ "$TOTAL_PAGES" -le 16 ]; then
        SUPER_THUMB_SIZE="600x840"
        SUPER_GRID="4x4"
    elif [ "$TOTAL_PAGES" -le 25 ]; then
        SUPER_THUMB_SIZE="480x672"
        SUPER_GRID="5x5"
    else
        SUPER_THUMB_SIZE="400x560"
        SUPER_GRID="6x6"
    fi
    
    montage "$SOURCE_DIR"/page-*.${SOURCE_EXT} \
        -thumbnail "${SUPER_THUMB_SIZE}" \
        -tile "${SUPER_GRID}" \
        -geometry "+15+15" \
        -background "#ffffff" \
        -border 3 \
        -bordercolor "#ccc" \
        -shadow \
        -density 200 \
        -quality 98 \
        -label '%f' \
        -font "Helvetica-Bold" \
        -pointsize 12 \
        "$SUPER_MONTAGE_FILE"
    
    SUPER_FILE_SIZE=$(ls -lh "$SUPER_MONTAGE_FILE" | awk '{print $5}')
    
    echo "✅ Super high-resolution montage created!"
    echo "📄 File: $SUPER_MONTAGE_FILE"
    echo "📊 Size: $SUPER_FILE_SIZE"
    echo "📐 Grid: $SUPER_GRID with ${SUPER_THUMB_SIZE}px thumbnails"
fi

# Copy to main output directory for easy access
cp "$MONTAGE_FILE" "output/"

echo ""
echo "🎉 Montage generation complete!"
echo "📁 All montages saved in: $OUTPUT_DIR"
echo "🔗 Quick access copy: output/$(basename "$MONTAGE_FILE")"