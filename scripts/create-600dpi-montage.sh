#!/bin/bash

# Create 600 DPI ultra-high-resolution PDF montage from the latest build
# Generates both PNG and JPG versions with borders and labels

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

echo "🖼️  Creating 600 DPI ULTRA-HIGH-RESOLUTION PDF montage..."
echo "📁 Latest build: $LATEST_BUILD"
echo "📁 Source: $SOURCE_DIR ($TOTAL_PAGES pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 600 DPI ultra-high quality settings"
echo "📦 Generating both PNG and JPG versions"

# Calculate optimal grid and sizes for 600 DPI
# For 600 DPI, we need even larger thumbnails
if [ "$TOTAL_PAGES" -le 16 ]; then
    GRID="4x4"
    THUMB_SIZE="800x1120"  # Very large thumbnails for fewer pages
    SPACING="+40+40"
    FONTSIZE=20
elif [ "$TOTAL_PAGES" -le 25 ]; then
    GRID="5x5"
    THUMB_SIZE="640x896"
    SPACING="+35+35"
    FONTSIZE=18
elif [ "$TOTAL_PAGES" -le 36 ]; then
    GRID="6x6"
    THUMB_SIZE="533x746"
    SPACING="+30+30"
    FONTSIZE=16
elif [ "$TOTAL_PAGES" -le 49 ]; then
    GRID="7x7"
    THUMB_SIZE="457x640"
    SPACING="+25+25"
    FONTSIZE=14
elif [ "$TOTAL_PAGES" -le 64 ]; then
    GRID="8x8"
    THUMB_SIZE="400x560"
    SPACING="+20+20"
    FONTSIZE=12
else
    GRID="9x9"
    THUMB_SIZE="355x497"
    SPACING="+18+18"
    FONTSIZE=11
fi

echo "📏 Grid: $GRID (${THUMB_SIZE}px thumbnails)"
echo "🖨️  Target: Ultra-high quality 600 DPI output"
echo "🏷️  Labels: Page numbers with ${FONTSIZE}pt font"

# Base filename without extension
BASE_NAME="BMPOA-Guide-600DPI-UltraHQ-${TIMESTAMP}"

# Create 600 DPI PNG montage first (lossless)
PNG_FILE="$OUTPUT_DIR/${BASE_NAME}.png"

echo ""
echo "🎨 Creating 600 DPI PNG montage (lossless)..."

# 600 DPI ultra-high-quality montage settings with borders and labels
montage "$SOURCE_DIR"/page-*.${SOURCE_EXT} \
    -thumbnail "${THUMB_SIZE}" \
    -tile "${GRID}" \
    -geometry "${SPACING}" \
    -background "#ffffff" \
    -fill "#1a1a1a" \
    -stroke "#666666" \
    -strokewidth 1 \
    -border 4 \
    -bordercolor "#333333" \
    -mattecolor "#f0f0f0" \
    -frame 2x2+1+1 \
    -shadow \
    -density 600 \
    -units PixelsPerInch \
    -label 'Page %[fx:t+1]' \
    -font "Helvetica-Bold" \
    -pointsize ${FONTSIZE} \
    -gravity South \
    "$PNG_FILE"

# Get PNG file info
PNG_SIZE=$(ls -lh "$PNG_FILE" | awk '{print $5}')
PNG_DIMENSIONS=$(identify -format "%wx%h" "$PNG_FILE")
PRINT_WIDTH=$(echo "scale=2; $(echo $PNG_DIMENSIONS | cut -d'x' -f1) / 600" | bc)
PRINT_HEIGHT=$(echo "scale=2; $(echo $PNG_DIMENSIONS | cut -d'x' -f2) / 600" | bc)

echo "✅ 600 DPI PNG montage created!"
echo "📄 File: $PNG_FILE"
echo "📊 Size: $PNG_SIZE"
echo "📐 Dimensions: ${PNG_DIMENSIONS}px (${PRINT_WIDTH}\" x ${PRINT_HEIGHT}\" at 600 DPI)"

# Create JPG version from the PNG
JPG_FILE="$OUTPUT_DIR/${BASE_NAME}.jpg"

echo ""
echo "🎨 Creating 600 DPI JPG montage (compressed)..."

convert "$PNG_FILE" \
    -quality 98 \
    -density 600 \
    -units PixelsPerInch \
    "$JPG_FILE"

JPG_SIZE=$(ls -lh "$JPG_FILE" | awk '{print $5}')

echo "✅ 600 DPI JPG montage created!"
echo "📄 File: $JPG_FILE"
echo "📊 Size: $JPG_SIZE"

# Copy both versions to main output directory for easy access
cp "$PNG_FILE" "output/"
cp "$JPG_FILE" "output/"

echo ""
echo "🎉 600 DPI montage generation complete!"
echo ""
echo "📁 FILES CREATED:"
echo "   PNG (Lossless): output/$(basename "$PNG_FILE")"
echo "   JPG (Compressed): output/$(basename "$JPG_FILE")"
echo ""
echo "📊 SPECIFICATIONS:"
echo "   • Resolution: 600 DPI"
echo "   • Grid: $GRID layout"
echo "   • Thumbnail size: ${THUMB_SIZE}px"
echo "   • Print size: ${PRINT_WIDTH}\" x ${PRINT_HEIGHT}\""
echo "   • Borders: 4px with shadow and frame"
echo "   • Labels: Page numbers (${FONTSIZE}pt font)"
echo ""
echo "🖨️  PRINT RECOMMENDATIONS:"
echo "   • Use PNG for maximum quality (lossless)"
echo "   • Use JPG for smaller file size"
echo "   • Paper: Premium photo paper (matte/glossy)"
echo "   • Printer: Set to 600 DPI or \"Best\" quality"
echo "   • Color space: sRGB or Adobe RGB"
echo "   • Suitable for large format printing"