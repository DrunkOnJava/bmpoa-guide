#!/bin/bash

# Generate high-quality 10x10 montage with labeled PDF screenshots
# Uses ImageMagick to create a grid with page numbers and section names

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

# Create temporary directory for processing
TEMP_DIR=$(mktemp -d)
echo "🔧 Using temp directory: $TEMP_DIR"

# Function to get section name based on page number
get_section_name() {
    local page=$1
    case $page in
        1) echo "Cover" ;;
        2) echo "TOC" ;;
        3|4|5) echo "Introduction" ;;
        6|7) echo "Governance" ;;
        8) echo "Section Divider" ;;
        9) echo "Mountain Home" ;;
        10|11|12|13) echo "Wood-Chipping" ;;
        14) echo "Section Divider" ;;
        15|16|17|18|19|20|21) echo "Fire Safety" ;;
        22) echo "Section Divider" ;;
        23|24|25|26|27) echo "Community Services" ;;
        28) echo "Section Divider" ;;
        29|30|31|32|33) echo "Deer Lake" ;;
        34) echo "Section Divider" ;;
        35|36|37|38|39|40|41|42|43|44|45) echo "Lodge" ;;
        46) echo "Section Divider" ;;
        47|48|49|50|51|52|53) echo "Communication" ;;
        54) echo "Section Divider" ;;
        55|56|57|58|59|60|61) echo "Contacts" ;;
        62) echo "Section Divider" ;;
        63|64|65) echo "Natural Attractions" ;;
        66|67) echo "Construction" ;;
        68|69) echo "Bear Safety" ;;
        70) echo "Back Cover" ;;
        *) echo "Page $page" ;;
    esac
}

# Enhanced quality settings (50% increase)
THUMB_WIDTH=180   # was 120
THUMB_HEIGHT=240  # was 160
SPACING=3         # was 2
BORDER_WIDTH=2    # was 1
FONT_SIZE=14      # for labels

echo "🎨 Creating labeled thumbnails with enhanced quality..."

# Process and label images
counter=1
for i in {1..100}; do
    # Calculate which source image to use (cycle through available images)
    source_num=$(( ((i-1) % TOTAL_IMAGES) + 1 ))
    source_file=$(printf "page-%02d.jpg" $source_num)
    target_file=$(printf "montage-%03d.jpg" $counter)
    
    if [ -f "$SCREENSHOTS_DIR/$source_file" ]; then
        # Get section name using function
        section_name=$(get_section_name $source_num)
        
        # Create labeled thumbnail with ImageMagick
        if command -v magick &> /dev/null; then
            # ImageMagick 7.x
            magick "$SCREENSHOTS_DIR/$source_file" \
                -resize "${THUMB_WIDTH}x${THUMB_HEIGHT}" \
                -background white \
                -gravity North \
                -splice 0x25 \
                -pointsize $FONT_SIZE \
                -font "Helvetica-Bold" \
                -fill "#2C5282" \
                -annotate +0+5 "Page $source_num" \
                -gravity South \
                -splice 0x20 \
                -pointsize 12 \
                -font "Helvetica" \
                -fill "#4B5563" \
                -annotate +0+5 "$section_name" \
                -bordercolor "#E5E7EB" \
                -border $BORDER_WIDTH \
                "$TEMP_DIR/$target_file"
        else
            # ImageMagick 6.x
            convert "$SCREENSHOTS_DIR/$source_file" \
                -resize "${THUMB_WIDTH}x${THUMB_HEIGHT}" \
                -background white \
                -gravity North \
                -splice 0x25 \
                -pointsize $FONT_SIZE \
                -font "Helvetica-Bold" \
                -fill "#2C5282" \
                -annotate +0+5 "Page $source_num" \
                -gravity South \
                -splice 0x20 \
                -pointsize 12 \
                -font "Helvetica" \
                -fill "#4B5563" \
                -annotate +0+5 "$section_name" \
                -bordercolor "#E5E7EB" \
                -border $BORDER_WIDTH \
                "$TEMP_DIR/$target_file"
        fi
        
        counter=$((counter + 1))
    fi
done

echo "✅ Prepared $((counter-1)) labeled images"

# Generate timestamp for filename
TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
MONTAGE_FILENAME="BMPOA-Guide-Montage-HQ-Labeled-${TIMESTAMP}.jpg"
MONTAGE_PATH="$OUTPUT_DIR/$MONTAGE_FILENAME"

echo "🎨 Creating high-quality 10x10 montage..."

# Create montage with enhanced quality settings
if command -v magick &> /dev/null; then
    # ImageMagick 7.x syntax
    magick montage "$TEMP_DIR"/montage-*.jpg \
        -tile 10x10 \
        -geometry +${SPACING}+${SPACING} \
        -background "#F7FAFC" \
        -quality 95 \
        -density 150 \
        "$MONTAGE_PATH"
else
    # ImageMagick 6.x syntax
    montage "$TEMP_DIR"/montage-*.jpg \
        -tile 10x10 \
        -geometry +${SPACING}+${SPACING} \
        -background "#F7FAFC" \
        -quality 95 \
        -density 150 \
        "$MONTAGE_PATH"
fi

# Add title header to the montage
if command -v magick &> /dev/null; then
    magick "$MONTAGE_PATH" \
        -gravity North \
        -background white \
        -splice 0x60 \
        -pointsize 36 \
        -font "Helvetica-Bold" \
        -fill "#1F2937" \
        -annotate +0+20 "BMPOA Community Guide - Page Overview" \
        -quality 95 \
        "$MONTAGE_PATH"
else
    convert "$MONTAGE_PATH" \
        -gravity North \
        -background white \
        -splice 0x60 \
        -pointsize 36 \
        -font "Helvetica-Bold" \
        -fill "#1F2937" \
        -annotate +0+20 "BMPOA Community Guide - Page Overview" \
        -quality 95 \
        "$MONTAGE_PATH"
fi

# Cleanup
rm -rf "$TEMP_DIR"

# Check if montage was created successfully
if [ -f "$MONTAGE_PATH" ]; then
    FILE_SIZE=$(du -h "$MONTAGE_PATH" | cut -f1)
    echo "✅ High-quality labeled montage created successfully!"
    echo "📁 Location: $MONTAGE_PATH"
    echo "📏 File size: $FILE_SIZE"
    echo "🔍 Quality: Enhanced by 50%"
    echo "🏷️  Labels: Page numbers and section names"
    
    # Open the montage
    if command -v open &> /dev/null; then
        echo "🖼️  Opening montage..."
        open "$MONTAGE_PATH"
    fi
else
    echo "❌ Failed to create montage"
    exit 1
fi

echo "🎉 High-quality labeled montage complete!"