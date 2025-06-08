#!/bin/bash

# Create high-quality PDF montages with crisp text
# Uses larger thumbnails and higher DPI for readable text

set -euo pipefail

BUILD_DIR="output/builds/2025-06-08T06-38-52"
PNG_DIR="$BUILD_DIR/png-highres"
OUTPUT_DIR="$BUILD_DIR/montages-hq"

# Create output directory
mkdir -p "$OUTPUT_DIR"

cd "$(dirname "$0")/.."

echo "🖼️  Creating HIGH-QUALITY PDF montages from PNG files..."
echo "📁 Source: $PNG_DIR (65 pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 Enhanced settings for crisp text readability"

# High-quality settings:
# - Larger thumbnails: 300x420px (was 200x280px) 
# - More spacing: +8+8 (was +5+5)
# - Higher quality sampling
# - Better font rendering

# Montage 1: Pages 1-17 (17 pages)
echo "🎨 Creating HIGH-QUALITY Montage 1 (Pages 01-17)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {1..17}) \
  -geometry 300x420+8+8 \
  -tile 5x4 \
  -background white \
  -title "BMPOA Guide - Pages 1-17" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/hq-montage-1-pages-01-17.png"

# Montage 2: Pages 18-33 (16 pages)
echo "🎨 Creating HIGH-QUALITY Montage 2 (Pages 18-33)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {18..33}) \
  -geometry 300x420+8+8 \
  -tile 5x4 \
  -background white \
  -title "BMPOA Guide - Pages 18-33" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/hq-montage-2-pages-18-33.png"

# Montage 3: Pages 34-49 (16 pages)
echo "🎨 Creating HIGH-QUALITY Montage 3 (Pages 34-49)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {34..49}) \
  -geometry 300x420+8+8 \
  -tile 5x4 \
  -background white \
  -title "BMPOA Guide - Pages 34-49" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/hq-montage-3-pages-34-49.png"

# Montage 4: Pages 50-65 (16 pages)
echo "🎨 Creating HIGH-QUALITY Montage 4 (Pages 50-65)..."
magick montage \
  $(printf "$PNG_DIR/page-%02d.png " {50..65}) \
  -geometry 300x420+8+8 \
  -tile 5x4 \
  -background white \
  -title "BMPOA Guide - Pages 50-65" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/hq-montage-4-pages-50-65.png"

echo ""
echo "✅ Created 4 HIGH-QUALITY PDF montages:"
ls -la "$OUTPUT_DIR"/*.png

echo ""
echo "📊 High-Quality Montage details:"
for montage in "$OUTPUT_DIR"/*.png; do
  filename=$(basename "$montage")
  size=$(identify -format "%wx%h" "$montage")
  filesize=$(ls -lah "$montage" | awk '{print $5}')
  echo "  📸 $filename: ${size}px (${filesize})"
done

echo ""
echo "🎯 All HIGH-QUALITY montages saved to: $OUTPUT_DIR"
echo ""
echo "🔍 Key improvements:"
echo "  • 50% larger thumbnails (300x420px vs 200x280px)"
echo "  • 5x4 grid layout for better readability"
echo "  • Higher density (150 DPI) for crisp text"
echo "  • Quality 95% for minimal compression artifacts"
echo "  • Better font rendering with Helvetica-Bold"