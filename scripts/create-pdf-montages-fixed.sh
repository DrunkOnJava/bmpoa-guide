#!/bin/bash

# Create PDF montages from high-resolution PNG files
# Splits 65 pages into 4 montages

set -euo pipefail

BUILD_DIR="output/builds/2025-06-08T06-38-52"
PNG_DIR="$BUILD_DIR/png-highres"
OUTPUT_DIR="$BUILD_DIR/montages"

# Create output directory
mkdir -p "$OUTPUT_DIR"

cd "$(dirname "$0")/.."

echo "🖼️  Creating PDF montages from PNG files..."
echo "📁 Source: $PNG_DIR (65 pages)"
echo "📁 Output: $OUTPUT_DIR"

# Montage 1: Pages 1-17 (17 pages)
echo "🎨 Creating Montage 1 (Pages 01-17)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {1..17}) \
  -geometry 200x280+5+5 \
  -tile 6x3 \
  -background white \
  -title "BMPOA Guide - Pages 1-17" \
  -pointsize 24 \
  -fill black \
  "$OUTPUT_DIR/montage-1-pages-01-17.png"

# Montage 2: Pages 18-33 (16 pages)
echo "🎨 Creating Montage 2 (Pages 18-33)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {18..33}) \
  -geometry 200x280+5+5 \
  -tile 6x3 \
  -background white \
  -title "BMPOA Guide - Pages 18-33" \
  -pointsize 24 \
  -fill black \
  "$OUTPUT_DIR/montage-2-pages-18-33.png"

# Montage 3: Pages 34-49 (16 pages)
echo "🎨 Creating Montage 3 (Pages 34-49)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {34..49}) \
  -geometry 200x280+5+5 \
  -tile 6x3 \
  -background white \
  -title "BMPOA Guide - Pages 34-49" \
  -pointsize 24 \
  -fill black \
  "$OUTPUT_DIR/montage-3-pages-34-49.png"

# Montage 4: Pages 50-65 (16 pages)
echo "🎨 Creating Montage 4 (Pages 50-65)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {50..65}) \
  -geometry 200x280+5+5 \
  -tile 6x3 \
  -background white \
  -title "BMPOA Guide - Pages 50-65" \
  -pointsize 24 \
  -fill black \
  "$OUTPUT_DIR/montage-4-pages-50-65.png"

echo ""
echo "✅ Created 4 PDF montages:"
ls -la "$OUTPUT_DIR"/*.png

echo ""
echo "📊 Montage details:"
for montage in "$OUTPUT_DIR"/*.png; do
  filename=$(basename "$montage")
  size=$(identify -format "%wx%h" "$montage")
  filesize=$(ls -lah "$montage" | awk '{print $5}')
  echo "  📸 $filename: ${size}px (${filesize})"
done

echo ""
echo "🎯 All montages saved to: $OUTPUT_DIR"