#!/bin/bash

# Create ULTRA high-quality PDF montages with maximum readability
# Uses much larger thumbnails, ultra-high DPI, and premium settings

set -euo pipefail

BUILD_DIR="output/builds/2025-06-08T06-38-52"
PNG_DIR="$BUILD_DIR/png-highres"
OUTPUT_DIR="$BUILD_DIR/montages-ultra-hq"

# Create output directory
mkdir -p "$OUTPUT_DIR"

cd "$(dirname "$0")/.."

echo "🖼️  Creating ULTRA HIGH-QUALITY PDF montages..."
echo "📁 Source: $PNG_DIR (65 pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 MAXIMUM quality settings for crisp text readability"

# Ultra high-quality settings:
# - Much larger thumbnails: 450x630px (2.25x larger than original)
# - Ultra-high DPI: 300 (double previous)
# - Maximum quality: 100%
# - Wider spacing for clarity
# - Reduce grid to 4x4 for larger display

# Create temporary files list with labels for each montage
create_ultra_hq_montage() {
  local start=$1
  local end=$2
  local output_file=$3
  local title=$4
  
  # Create array of files with labels
  local files_with_labels=()
  for i in $(seq $start $end); do
    files_with_labels+=("-label" "Page $(printf "%02d" $i)" "$PNG_DIR/page-$(printf "%02d" $i).png")
  done
  
  magick montage \
    "${files_with_labels[@]}" \
    -geometry 450x630+15+15 \
    -tile 4x4 \
    -background white \
    -bordercolor black \
    -border 3 \
    -title "$title" \
    -pointsize 14 \
    -fill black \
    -font Helvetica \
    -quality 100 \
    -density 275 \
    -unsharp 0x1 \
    "$output_file"
}

# Montage 1: Pages 1-16 (reduced to fit 4x4 grid)
echo "🎨 Creating ULTRA-HQ Montage 1 (Pages 01-16)..."
create_ultra_hq_montage 1 16 "$OUTPUT_DIR/ultra-hq-montage-1-pages-01-16.png" "BMPOA Guide - Pages 1-16"

# Montage 2: Pages 17-32
echo "🎨 Creating ULTRA-HQ Montage 2 (Pages 17-32)..."
create_ultra_hq_montage 17 32 "$OUTPUT_DIR/ultra-hq-montage-2-pages-17-32.png" "BMPOA Guide - Pages 17-32"

# Montage 3: Pages 33-48
echo "🎨 Creating ULTRA-HQ Montage 3 (Pages 33-48)..."
create_ultra_hq_montage 33 48 "$OUTPUT_DIR/ultra-hq-montage-3-pages-33-48.png" "BMPOA Guide - Pages 33-48"

# Montage 4: Pages 49-64
echo "🎨 Creating ULTRA-HQ Montage 4 (Pages 49-64)..."
create_ultra_hq_montage 49 64 "$OUTPUT_DIR/ultra-hq-montage-4-pages-49-64.png" "BMPOA Guide - Pages 49-64"

# Montage 5: Page 65 (final page)
echo "🎨 Creating ULTRA-HQ Montage 5 (Page 65)..."
magick montage \
  -label "Page 65" "$PNG_DIR/page-65.png" \
  -geometry 450x630+15+15 \
  -tile 1x1 \
  -background white \
  -bordercolor black \
  -border 3 \
  -title "BMPOA Guide - Page 65 (Final)" \
  -pointsize 14 \
  -fill black \
  -font Helvetica \
  -quality 100 \
  -density 275 \
  -unsharp 0x1 \
  "$OUTPUT_DIR/ultra-hq-montage-5-page-65.png"

echo ""
echo "✅ Created 5 ULTRA HIGH-QUALITY PDF montages:"
ls -la "$OUTPUT_DIR"/*.png

echo ""
echo "📊 Ultra-HQ Montage details:"
for montage in "$OUTPUT_DIR"/*.png; do
  filename=$(basename "$montage")
  size=$(identify -format "%wx%h" "$montage")
  filesize=$(ls -lah "$montage" | awk '{print $5}')
  echo "  📸 $filename: ${size}px (${filesize})"
done

echo ""
echo "🎯 All ULTRA-HQ montages saved to: $OUTPUT_DIR"
echo ""
echo "🔍 MAXIMUM quality features:"
echo "  • 2.25x larger thumbnails (450x630px)"
echo "  • 3px black borders for definition"
echo "  • Individual page labels with 14pt font (no overlap)"
echo "  • 4x4 grid layout for maximum readability"
echo "  • Optimized density (275 DPI)"
echo "  • Perfect quality (100%) with unsharp filter"
echo "  • Increased spacing (15px) for clarity"
echo "  • Split into 5 montages for better organization"