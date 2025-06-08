#!/bin/bash

# Generate full quality 12x12 montage with labels using montage --label

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_DIR/output/builds"
OUTPUT_DIR="$PROJECT_DIR/output"

# Find the latest build
LATEST_BUILD=$(find "$BUILD_DIR" -name "2025-*" -type d | sort | tail -1)

if [ -z "$LATEST_BUILD" ]; then
    echo "❌ No builds found in $BUILD_DIR"
    exit 1
fi

SCREENSHOTS_DIR="$LATEST_BUILD/jpg-efficient"
cd "$SCREENSHOTS_DIR"

echo "📁 Using screenshots from: $SCREENSHOTS_DIR"
echo "📊 Found $(ls page-*.jpg | wc -l) screenshot files"

# Generate timestamp
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
MONTAGE_PATH="$OUTPUT_DIR/BMPOA-Guide-Montage-12x12-Full-Quality-${TIMESTAMP}.jpg"

echo "🎨 Creating full quality 12x12 montage with labels..."

# Create montage using built-in --label feature
# Full quality = -quality 100
if command -v magick &> /dev/null; then
    # ImageMagick 7.x
    magick montage page-*.jpg \
        -label 'Page %[fx:t+1]' \
        -tile 12x12 \
        -geometry 200x267+4+4 \
        -background white \
        -bordercolor "#E5E7EB" \
        -pointsize 14 \
        -font "Helvetica-Bold" \
        -fill "#2C5282" \
        -quality 100 \
        -density 300 \
        "$MONTAGE_PATH"
else
    # ImageMagick 6.x
    montage page-*.jpg \
        -label 'Page %[fx:t+1]' \
        -tile 12x12 \
        -geometry 200x267+4+4 \
        -background white \
        -bordercolor "#E5E7EB" \
        -pointsize 14 \
        -font "Helvetica-Bold" \
        -fill "#2C5282" \
        -quality 100 \
        -density 300 \
        "$MONTAGE_PATH"
fi

# Check results
if [ -f "$MONTAGE_PATH" ]; then
    FILE_SIZE=$(du -h "$MONTAGE_PATH" | cut -f1)
    echo "✅ Full quality 12x12 montage created!"
    echo "📁 Location: $MONTAGE_PATH"
    echo "📏 File size: $FILE_SIZE"
    echo "🔍 Quality: 100% (maximum)"
    echo "📐 Grid: 12x12 (144 positions)"
    echo "🏷️  Labels: Page numbers"
    
    # Open the montage
    if command -v open &> /dev/null; then
        echo "🖼️  Opening montage..."
        open "$MONTAGE_PATH"
    fi
else
    echo "❌ Failed to create montage"
    exit 1
fi

echo "🎉 Full quality 12x12 montage complete!"