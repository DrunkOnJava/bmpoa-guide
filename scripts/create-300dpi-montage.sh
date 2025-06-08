#!/bin/bash

# Create 300 DPI high-resolution PDF montage from the latest build
# Optimized for print quality at 300 DPI

set -euo pipefail

# Find the latest build directory
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
    echo "📸 Using high-resolution PNG images for maximum quality"
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

echo "🖼️  Creating 300 DPI PRINT-QUALITY PDF montage..."
echo "📁 Latest build: $LATEST_BUILD"
echo "📁 Source: $SOURCE_DIR ($TOTAL_PAGES pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 300 DPI print-quality settings"

# Calculate optimal grid and sizes for 300 DPI
# Assuming we want a roughly 24" x 36" poster at 300 DPI = 7200 x 10800 pixels
if [ "$TOTAL_PAGES" -le 16 ]; then
    GRID="4x4"
    THUMB_SIZE="600x840"  # Larger thumbnails for fewer pages
    SPACING="+30+30"
elif [ "$TOTAL_PAGES" -le 25 ]; then
    GRID="5x5"
    THUMB_SIZE="480x672"
    SPACING="+25+25"
elif [ "$TOTAL_PAGES" -le 36 ]; then
    GRID="6x6"
    THUMB_SIZE="400x560"
    SPACING="+20+20"
elif [ "$TOTAL_PAGES" -le 49 ]; then
    GRID="7x7"
    THUMB_SIZE="350x490"
    SPACING="+18+18"
elif [ "$TOTAL_PAGES" -le 64 ]; then
    GRID="8x8"
    THUMB_SIZE="300x420"
    SPACING="+15+15"
else
    GRID="9x9"
    THUMB_SIZE="260x364"
    SPACING="+12+12"
fi

echo "📏 Grid: $GRID (${THUMB_SIZE}px thumbnails)"
echo "🖨️  Target: Print-quality 300 DPI output"

# Create 300 DPI montage
MONTAGE_FILE="$OUTPUT_DIR/BMPOA-Guide-300DPI-PrintQuality-${TIMESTAMP}.jpg"

echo "🎨 Creating 300 DPI print-quality montage..."

# 300 DPI print-quality montage settings
montage "$SOURCE_DIR"/page-*.${SOURCE_EXT} \
    -thumbnail "${THUMB_SIZE}" \
    -tile "${GRID}" \
    -geometry "${SPACING}" \
    -background "#ffffff" \
    -fill "#333333" \
    -border 3 \
    -bordercolor "#cccccc" \
    -shadow \
    -density 300 \
    -units PixelsPerInch \
    -quality 100 \
    -label '%f' \
    -font "Helvetica-Bold" \
    -pointsize 14 \
    -gravity South \
    "$MONTAGE_FILE"

# Get file size and dimensions
FILE_SIZE=$(ls -lh "$MONTAGE_FILE" | awk '{print $5}')
DIMENSIONS=$(identify -format "%wx%h" "$MONTAGE_FILE")
PRINT_WIDTH=$(echo "scale=2; $(echo $DIMENSIONS | cut -d'x' -f1) / 300" | bc)
PRINT_HEIGHT=$(echo "scale=2; $(echo $DIMENSIONS | cut -d'x' -f2) / 300" | bc)

echo "✅ 300 DPI print-quality montage created!"
echo "📄 File: $MONTAGE_FILE"
echo "📊 Size: $FILE_SIZE"
echo "📐 Grid: $GRID with ${THUMB_SIZE}px thumbnails"
echo "📏 Dimensions: ${DIMENSIONS}px (${PRINT_WIDTH}\" x ${PRINT_HEIGHT}\" at 300 DPI)"

# Create an even higher quality TIFF version for professional printing
TIFF_FILE="$OUTPUT_DIR/BMPOA-Guide-300DPI-PrintQuality-${TIMESTAMP}.tiff"

echo ""
echo "🎨 Creating uncompressed TIFF version for professional printing..."

convert "$MONTAGE_FILE" \
    -compress none \
    -density 300 \
    -units PixelsPerInch \
    "$TIFF_FILE"

TIFF_SIZE=$(ls -lh "$TIFF_FILE" | awk '{print $5}')

echo "✅ Uncompressed TIFF created for professional printing!"
echo "📄 File: $TIFF_FILE"
echo "📊 Size: $TIFF_SIZE"

# Copy to main output directory for easy access
cp "$MONTAGE_FILE" "output/"

echo ""
echo "🎉 300 DPI montage generation complete!"
echo "📁 All montages saved in: $OUTPUT_DIR"
echo "🔗 Quick access copy: output/$(basename "$MONTAGE_FILE")"
echo ""
echo "🖨️  PRINT RECOMMENDATIONS:"
echo "   • Use premium matte or glossy photo paper"
echo "   • Set printer to highest quality mode"
echo "   • Ensure color profile matches (sRGB/Adobe RGB)"
echo "   • Print size: ${PRINT_WIDTH}\" x ${PRINT_HEIGHT}\""
echo "   • For professional results, use the TIFF file"