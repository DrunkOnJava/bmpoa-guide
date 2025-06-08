#!/bin/bash

# Create high-quality PDF montages with borders and labels
# Uses larger thumbnails, higher DPI, borders, and page labels

set -euo pipefail

BUILD_DIR="output/builds/2025-06-08T06-38-52"
PNG_DIR="$BUILD_DIR/png-highres"
OUTPUT_DIR="$BUILD_DIR/montages-labeled"

# Create output directory
mkdir -p "$OUTPUT_DIR"

cd "$(dirname "$0")/.."

echo "🖼️  Creating LABELED & BORDERED PDF montages..."
echo "📁 Source: $PNG_DIR (65 pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "🎯 Enhanced settings with borders and page labels"

# Create temporary files list with labels for each montage
create_montage_with_labels() {
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
    -geometry 300x420+10+10 \
    -tile 5x4 \
    -background white \
    -bordercolor black \
    -border 2 \
    -title "$title" \
    -pointsize 36 \
    -fill black \
    -font Helvetica-Bold \
    -quality 95 \
    -density 150 \
    "$output_file"
}

# Montage 1: Pages 1-17
echo "🎨 Creating LABELED Montage 1 (Pages 01-17)..."
create_montage_with_labels 1 17 "$OUTPUT_DIR/labeled-montage-1-pages-01-17.png" "BMPOA Guide - Pages 1-17"

# Montage 2: Pages 18-33
echo "🎨 Creating LABELED Montage 2 (Pages 18-33)..."
create_montage_with_labels 18 33 "$OUTPUT_DIR/labeled-montage-2-pages-18-33.png" "BMPOA Guide - Pages 18-33"

# Montage 3: Pages 34-49
echo "🎨 Creating LABELED Montage 3 (Pages 34-49)..."
create_montage_with_labels 34 49 "$OUTPUT_DIR/labeled-montage-3-pages-34-49.png" "BMPOA Guide - Pages 34-49"

# Montage 4: Pages 50-65
echo "🎨 Creating LABELED Montage 4 (Pages 50-65)..."
create_montage_with_labels 50 65 "$OUTPUT_DIR/labeled-montage-4-pages-50-65.png" "BMPOA Guide - Pages 50-65"

echo ""
echo "✅ Created 4 LABELED & BORDERED PDF montages:"
ls -la "$OUTPUT_DIR"/*.png

echo ""
echo "📊 Labeled Montage details:"
for montage in "$OUTPUT_DIR"/*.png; do
  filename=$(basename "$montage")
  size=$(identify -format "%wx%h" "$montage")
  filesize=$(ls -lah "$montage" | awk '{print $5}')
  echo "  📸 $filename: ${size}px (${filesize})"
done

echo ""
echo "🎯 All LABELED montages saved to: $OUTPUT_DIR"
echo ""
echo "🔍 Key features:"
echo "  • 50% larger thumbnails (300x420px)"
echo "  • 2px black borders around each page"
echo "  • Individual page labels ('Page 01', 'Page 02', etc.)"
echo "  • 5x4 grid layout for optimal readability"
echo "  • Higher density (150 DPI) for crisp text"
echo "  • Quality 95% for minimal compression"
echo "  • Increased spacing (10px) for clarity"