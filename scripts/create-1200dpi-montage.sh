#!/bin/bash

# Create 1200 DPI professional-grade PDF montage from the latest build
# Generates both PNG and JPG versions with borders and labels
# WARNING: This creates very large files suitable for professional printing

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

echo "🖼️  Creating 1200 DPI PROFESSIONAL-GRADE PDF montage..."
echo "📁 Latest build: $LATEST_BUILD"
echo "📁 Source: $SOURCE_DIR ($TOTAL_PAGES pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 1200 DPI professional print quality"
echo "📦 Generating both PNG and JPG versions"
echo "⚠️  WARNING: This will create very large files!"

# Calculate optimal grid and sizes for 1200 DPI
# For 1200 DPI, we need extremely large thumbnails
# We'll limit the grid size to manage file size
if [ "$TOTAL_PAGES" -le 9 ]; then
    GRID="3x3"
    THUMB_SIZE="1200x1680"  # Extremely large for few pages
    SPACING="+60+60"
    FONTSIZE=28
    BORDERWIDTH=6
elif [ "$TOTAL_PAGES" -le 16 ]; then
    GRID="4x4"
    THUMB_SIZE="900x1260"
    SPACING="+50+50"
    FONTSIZE=24
    BORDERWIDTH=5
elif [ "$TOTAL_PAGES" -le 25 ]; then
    GRID="5x5"
    THUMB_SIZE="720x1008"
    SPACING="+40+40"
    FONTSIZE=20
    BORDERWIDTH=4
elif [ "$TOTAL_PAGES" -le 36 ]; then
    GRID="6x6"
    THUMB_SIZE="600x840"
    SPACING="+35+35"
    FONTSIZE=18
    BORDERWIDTH=4
elif [ "$TOTAL_PAGES" -le 49 ]; then
    GRID="7x7"
    THUMB_SIZE="514x720"
    SPACING="+30+30"
    FONTSIZE=16
    BORDERWIDTH=3
else
    # For 51 pages, we'll use 7x8 grid
    GRID="7x8"
    THUMB_SIZE="480x672"
    SPACING="+25+25"
    FONTSIZE=14
    BORDERWIDTH=3
fi

echo "📏 Grid: $GRID (${THUMB_SIZE}px thumbnails)"
echo "🖨️  Target: Professional printing at 1200 DPI"
echo "🏷️  Labels: Page numbers with ${FONTSIZE}pt font"
echo "🖼️  Borders: ${BORDERWIDTH}px width"

# Base filename without extension
BASE_NAME="BMPOA-Guide-1200DPI-Professional-${TIMESTAMP}"

# Check available memory
AVAILABLE_MEM=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
AVAILABLE_MB=$((AVAILABLE_MEM * 4096 / 1048576))
echo "💾 Available memory: ~${AVAILABLE_MB}MB"

if [ "$AVAILABLE_MB" -lt 4000 ]; then
    echo "⚠️  Low memory warning! This operation requires significant RAM."
fi

# Create 1200 DPI PNG montage first (lossless)
PNG_FILE="$OUTPUT_DIR/${BASE_NAME}.png"

echo ""
echo "🎨 Creating 1200 DPI PNG montage (lossless)..."
echo "⏳ This may take several minutes..."

# 1200 DPI professional-quality montage settings with borders and labels
# Using resource limits to prevent memory issues
montage "$SOURCE_DIR"/page-*.${SOURCE_EXT} \
    -limit memory 2GB \
    -limit map 4GB \
    -thumbnail "${THUMB_SIZE}" \
    -tile "${GRID}" \
    -geometry "${SPACING}" \
    -background "#ffffff" \
    -fill "#000000" \
    -stroke "#444444" \
    -strokewidth 2 \
    -border ${BORDERWIDTH} \
    -bordercolor "#222222" \
    -shadow \
    -density 1200 \
    -units PixelsPerInch \
    -label 'Page %[fx:t+1]' \
    -font "Helvetica-Bold" \
    -pointsize ${FONTSIZE} \
    -gravity South \
    "$PNG_FILE"

# Get PNG file info
PNG_SIZE=$(ls -lh "$PNG_FILE" | awk '{print $5}')
PNG_DIMENSIONS=$(identify -ping -format "%wx%h" "$PNG_FILE")
PRINT_WIDTH=$(echo "scale=2; $(echo $PNG_DIMENSIONS | cut -d'x' -f1) / 1200" | bc)
PRINT_HEIGHT=$(echo "scale=2; $(echo $PNG_DIMENSIONS | cut -d'x' -f2) / 1200" | bc)

echo "✅ 1200 DPI PNG montage created!"
echo "📄 File: $PNG_FILE"
echo "📊 Size: $PNG_SIZE"
echo "📐 Dimensions: ${PNG_DIMENSIONS}px (${PRINT_WIDTH}\" x ${PRINT_HEIGHT}\" at 1200 DPI)"

# Create JPG version from the PNG
JPG_FILE="$OUTPUT_DIR/${BASE_NAME}.jpg"

echo ""
echo "🎨 Creating 1200 DPI JPG montage (compressed)..."

convert "$PNG_FILE" \
    -quality 95 \
    -density 1200 \
    -units PixelsPerInch \
    -sampling-factor 4:4:4 \
    "$JPG_FILE"

JPG_SIZE=$(ls -lh "$JPG_FILE" | awk '{print $5}')

echo "✅ 1200 DPI JPG montage created!"
echo "📄 File: $JPG_FILE"
echo "📊 Size: $JPG_SIZE"

# Copy both versions to main output directory for easy access
cp "$PNG_FILE" "output/"
cp "$JPG_FILE" "output/"

# Calculate compression ratio
PNG_BYTES=$(stat -f%z "$PNG_FILE" 2>/dev/null || stat -c%s "$PNG_FILE")
JPG_BYTES=$(stat -f%z "$JPG_FILE" 2>/dev/null || stat -c%s "$JPG_FILE")
COMPRESSION_RATIO=$(echo "scale=1; 100 - ($JPG_BYTES * 100 / $PNG_BYTES)" | bc)

echo ""
echo "🎉 1200 DPI montage generation complete!"
echo ""
echo "📁 FILES CREATED:"
echo "   PNG (Lossless): output/$(basename "$PNG_FILE")"
echo "   JPG (Compressed): output/$(basename "$JPG_FILE")"
echo ""
echo "📊 SPECIFICATIONS:"
echo "   • Resolution: 1200 DPI (professional grade)"
echo "   • Grid: $GRID layout"
echo "   • Thumbnail size: ${THUMB_SIZE}px"
echo "   • Print size: ${PRINT_WIDTH}\" x ${PRINT_HEIGHT}\""
echo "   • Borders: ${BORDERWIDTH}px with shadow and frame"
echo "   • Labels: Page numbers (${FONTSIZE}pt font)"
echo "   • Compression: JPG is ${COMPRESSION_RATIO}% smaller"
echo ""
echo "🖨️  PROFESSIONAL PRINT RECOMMENDATIONS:"
echo "   • Use PNG for maximum quality (lossless)"
echo "   • Use JPG for reduced file size (95% quality)"
echo "   • Paper: Premium archival photo paper"
echo "   • Printer: Professional photo printer"
echo "   • Color profile: Adobe RGB (1998)"
echo "   • Suitable for:"
echo "     - Gallery exhibitions"
echo "     - Professional portfolios"
echo "     - Large format printing (up to poster size)"
echo "     - Archival documentation"
echo ""
echo "⚡ PERFORMANCE NOTE:"
echo "   These files are extremely large and may require"
echo "   professional software to view/edit properly."