#!/bin/bash

# Generate 10x10 montage from PDF screenshots
# Uses ImageMagick to create a grid of PDF page thumbnails

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

if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo "❌ Screenshots directory not found: $SCREENSHOTS_DIR"
    exit 1
fi

echo "📁 Using screenshots from: $SCREENSHOTS_DIR"

# Count available screenshots
TOTAL_IMAGES=$(find "$SCREENSHOTS_DIR" -name "page-*.jpg" | wc -l | xargs)
echo "📊 Found $TOTAL_IMAGES screenshot files"

if [ "$TOTAL_IMAGES" -lt 100 ]; then
    echo "⚠️  Only $TOTAL_IMAGES images available, but need 100 for 10x10 montage"
    echo "🔄 Will create montage with available images and pad with copies"
fi

# Create temporary directory for processing
TEMP_DIR=$(mktemp -d)
echo "🔧 Using temp directory: $TEMP_DIR"

# Copy and prepare images for montage
counter=1
for i in {1..100}; do
    # Calculate which source image to use (cycle through available images)
    source_num=$(( ((i-1) % TOTAL_IMAGES) + 1 ))
    source_file=$(printf "page-%02d.jpg" $source_num)
    target_file=$(printf "montage-%03d.jpg" $counter)
    
    if [ -f "$SCREENSHOTS_DIR/$source_file" ]; then
        cp "$SCREENSHOTS_DIR/$source_file" "$TEMP_DIR/$target_file"
        counter=$((counter + 1))
    fi
done

echo "✅ Prepared $((counter-1)) images for montage"

# Generate timestamp for filename
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
MONTAGE_FILENAME="BMPOA-Guide-Montage-${TIMESTAMP}.jpg"
MONTAGE_PATH="$OUTPUT_DIR/$MONTAGE_FILENAME"

echo "🎨 Creating 10x10 montage..."

# Check if ImageMagick is available
if ! command -v magick &> /dev/null && ! command -v montage &> /dev/null; then
    echo "❌ ImageMagick not found. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install imagemagick
    else
        echo "❌ Homebrew not found. Please install ImageMagick manually:"
        echo "   brew install imagemagick"
        echo "   or visit: https://imagemagick.org/script/download.php"
        exit 1
    fi
fi

# Create montage using ImageMagick
if command -v magick &> /dev/null; then
    # ImageMagick 7.x syntax
    magick montage "$TEMP_DIR"/montage-*.jpg \
        -tile 10x10 \
        -geometry 120x160+2+2 \
        -background white \
        -border 1 \
        -bordercolor "#E5E7EB" \
        "$MONTAGE_PATH"
else
    # ImageMagick 6.x syntax
    montage "$TEMP_DIR"/montage-*.jpg \
        -tile 10x10 \
        -geometry 120x160+2+2 \
        -background white \
        -border 1 \
        -bordercolor "#E5E7EB" \
        "$MONTAGE_PATH"
fi

# Cleanup
rm -rf "$TEMP_DIR"

# Check if montage was created successfully
if [ -f "$MONTAGE_PATH" ]; then
    FILE_SIZE=$(du -h "$MONTAGE_PATH" | cut -f1)
    echo "✅ Montage created successfully!"
    echo "📁 Location: $MONTAGE_PATH"
    echo "📏 File size: $FILE_SIZE"
    
    # Open the montage
    if command -v open &> /dev/null; then
        echo "🖼️  Opening montage..."
        open "$MONTAGE_PATH"
    fi
else
    echo "❌ Failed to create montage"
    exit 1
fi

echo "🎉 Montage generation complete!"