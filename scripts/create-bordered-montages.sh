#!/bin/bash

# Create high-quality PDF montages with borders around each page
# Uses larger thumbnails, higher DPI, and distinctive borders

set -euo pipefail

BUILD_DIR="output/builds/2025-06-08T06-38-52"
PNG_DIR="$BUILD_DIR/png-highres"
OUTPUT_DIR="$BUILD_DIR/montages-bordered"

# Create output directory
mkdir -p "$OUTPUT_DIR"

cd "$(dirname "$0")/.."

echo "🖼️  Creating BORDERED HIGH-QUALITY PDF montages..."
echo "📁 Source: $PNG_DIR (65 pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 Enhanced settings with page borders for clarity"

# High-quality settings with borders:
# - Larger thumbnails: 300x420px
# - Black borders around each page: 2px
# - More spacing: +10+10 for border visibility
# - Higher quality sampling
# - Better font rendering

# Montage 1: Pages 1-17 (17 pages)
echo "🎨 Creating BORDERED Montage 1 (Pages 01-17)..."
magick montage \
  $(for i in {1..17}; do printf "$PNG_DIR/page-%02d.png -label 'Page %02d' " $i $i; done) \
  -geometry 300x420+10+10 \
  -tile 5x4 \
  -background white \
  -bordercolor black \
  -border 2 \
  -title "BMPOA Guide - Pages 1-17" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/bordered-montage-1-pages-01-17.png"

# Montage 2: Pages 18-33 (16 pages)
echo "🎨 Creating BORDERED Montage 2 (Pages 18-33)..."
magick montage \
  $(for i in {18..33}; do printf "$PNG_DIR/page-%02d.png -label 'Page %02d' " $i $i; done) \
  -geometry 300x420+10+10 \
  -tile 5x4 \
  -background white \
  -bordercolor black \
  -border 2 \
  -title "BMPOA Guide - Pages 18-33" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/bordered-montage-2-pages-18-33.png"

# Montage 3: Pages 34-49 (16 pages)
echo "🎨 Creating BORDERED Montage 3 (Pages 34-49)..."
magick montage \
  $(for i in {34..49}; do printf "$PNG_DIR/page-%02d.png -label 'Page %02d' " $i $i; done) \
  -geometry 300x420+10+10 \
  -tile 5x4 \
  -background white \
  -bordercolor black \
  -border 2 \
  -title "BMPOA Guide - Pages 34-49" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/bordered-montage-3-pages-34-49.png"

# Montage 4: Pages 50-65 (16 pages)
echo "🎨 Creating BORDERED Montage 4 (Pages 50-65)..."
magick montage \
  $(for i in {50..65}; do printf "$PNG_DIR/page-%02d.png -label 'Page %02d' " $i $i; done) \
  -geometry 300x420+10+10 \
  -tile 5x4 \
  -background white \
  -bordercolor black \
  -border 2 \
  -title "BMPOA Guide - Pages 50-65" \
  -pointsize 36 \
  -fill black \
  -font Helvetica-Bold \
  -quality 95 \
  -density 150 \
  "$OUTPUT_DIR/bordered-montage-4-pages-50-65.png"

echo ""
echo "✅ Created 4 BORDERED HIGH-QUALITY PDF montages:"
ls -la "$OUTPUT_DIR"/*.png

echo ""
echo "📊 Bordered Montage details:"
for montage in "$OUTPUT_DIR"/*.png; do
  filename=$(basename "$montage")
  size=$(identify -format "%wx%h" "$montage")
  filesize=$(ls -lah "$montage" | awk '{print $5}')
  echo "  📸 $filename: ${size}px (${filesize})"
done

echo ""
echo "🎯 All BORDERED montages saved to: $OUTPUT_DIR"
echo ""
echo "🔍 Key features:"
echo "  • 50% larger thumbnails (300x420px)"
echo "  • 2px black borders around each page"
echo "  • 5x4 grid layout for optimal readability"
echo "  • Higher density (150 DPI) for crisp text"
echo "  • Quality 95% for minimal compression"
echo "  • Increased spacing (10px) for border visibility"
echo "  • Individual page labels ('Page 01', 'Page 02', etc.)"