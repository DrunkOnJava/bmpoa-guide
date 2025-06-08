#!/bin/bash

# High-resolution montage split into 2 images
# Creates 2 montages from 69 pages with borders and labels

BUILD_DIR="output/builds/2025-06-08T13-21-16"
PNG_DIR="$BUILD_DIR/png-highres"
OUTPUT_DIR="output"

# Create timestamp
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")

echo "🎨 Creating high-resolution montage split into 2 images..."

# Calculate grid dimensions for 2 images
# 69 pages ÷ 2 ≈ 35 pages per montage
# For 35 pages: 6x6 = 36 (good square layout)

# First montage (pages 1-35)
echo "📸 Creating montage 1 (pages 1-35)..."
montage $PNG_DIR/page-0[1-9].png $PNG_DIR/page-[1-2][0-9].png $PNG_DIR/page-3[0-5].png \
  -geometry 400x520+15+15 \
  -tile 7x5 \
  -background '#f5f5f5' \
  -bordercolor '#2c3e50' \
  -border 3 \
  -label '%t' \
  -font Helvetica-Bold \
  -pointsize 12 \
  -quality 98 \
  "$OUTPUT_DIR/BMPOA-Montage-Part1-$TIMESTAMP.jpg"

# Second montage (pages 36-69) 
echo "📸 Creating montage 2 (pages 36-69)..."
montage $PNG_DIR/page-3[6-9].png $PNG_DIR/page-[4-6][0-9].png \
  -geometry 400x520+15+15 \
  -tile 7x5 \
  -background '#f5f5f5' \
  -bordercolor '#2c3e50' \
  -border 3 \
  -label '%t' \
  -font Helvetica-Bold \
  -pointsize 12 \
  -quality 98 \
  "$OUTPUT_DIR/BMPOA-Montage-Part2-$TIMESTAMP.jpg"

echo "✅ High-resolution montages created:"
echo "   Part 1: $OUTPUT_DIR/BMPOA-Montage-Part1-$TIMESTAMP.jpg"
echo "   Part 2: $OUTPUT_DIR/BMPOA-Montage-Part2-$TIMESTAMP.jpg"

# Show file sizes
ls -lh "$OUTPUT_DIR"/BMPOA-Montage-Part*-$TIMESTAMP.jpg