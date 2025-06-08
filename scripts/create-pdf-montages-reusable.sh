#!/bin/bash

# Create high-quality PDF montages with page labels and borders
# This is a reusable script for any PDF screenshot collection
#
# USAGE: ./create-pdf-montages-reusable.sh <input_dir> <output_dir> [options]
#
# REQUIRED ARGUMENTS:
#   input_dir   - Directory containing page-XX.png files
#   output_dir  - Directory where montages will be saved
#
# OPTIONS:
#   --title "Your Title"     - Base title for montages (default: "Document")
#   --pages-per-montage N    - Pages per montage (default: 16)
#   --grid-cols N           - Number of columns (default: 4)
#   --grid-rows N           - Number of rows (default: 4)
#   --thumb-width N         - Thumbnail width in pixels (default: 450)
#   --thumb-height N        - Thumbnail height in pixels (default: 630)
#   --dpi N                 - DPI setting (default: 275)
#   --quality N             - JPEG quality 1-100 (default: 100)
#   --border-width N        - Border width in pixels (default: 3)
#   --border-color COLOR    - Border color (default: black)
#   --label-size N          - Label font size (default: 14)
#   --spacing N             - Spacing between thumbnails (default: 15)
#
# EXAMPLE:
#   ./create-pdf-montages-reusable.sh ./png-files ./montages --title "My Guide" --pages-per-montage 20

set -euo pipefail

# Default values
TITLE="Document"
PAGES_PER_MONTAGE=16
GRID_COLS=4
GRID_ROWS=4
THUMB_WIDTH=450
THUMB_HEIGHT=630
DPI=275
QUALITY=100
BORDER_WIDTH=3
BORDER_COLOR="black"
LABEL_SIZE=14
SPACING=15

# Parse arguments
if [ $# -lt 2 ]; then
    echo "Error: Missing required arguments"
    echo "Usage: $0 <input_dir> <output_dir> [options]"
    exit 1
fi

INPUT_DIR="$1"
OUTPUT_DIR="$2"
shift 2

# Parse optional arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --title)
            TITLE="$2"
            shift 2
            ;;
        --pages-per-montage)
            PAGES_PER_MONTAGE="$2"
            shift 2
            ;;
        --grid-cols)
            GRID_COLS="$2"
            shift 2
            ;;
        --grid-rows)
            GRID_ROWS="$2"
            shift 2
            ;;
        --thumb-width)
            THUMB_WIDTH="$2"
            shift 2
            ;;
        --thumb-height)
            THUMB_HEIGHT="$2"
            shift 2
            ;;
        --dpi)
            DPI="$2"
            shift 2
            ;;
        --quality)
            QUALITY="$2"
            shift 2
            ;;
        --border-width)
            BORDER_WIDTH="$2"
            shift 2
            ;;
        --border-color)
            BORDER_COLOR="$2"
            shift 2
            ;;
        --label-size)
            LABEL_SIZE="$2"
            shift 2
            ;;
        --spacing)
            SPACING="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Count total pages
TOTAL_PAGES=$(ls -1 "$INPUT_DIR"/page-*.png 2>/dev/null | wc -l)
if [ "$TOTAL_PAGES" -eq 0 ]; then
    echo "Error: No page-*.png files found in $INPUT_DIR"
    exit 1
fi

echo "🖼️  Creating PDF Montages"
echo "📁 Source: $INPUT_DIR ($TOTAL_PAGES pages)"
echo "📁 Output: $OUTPUT_DIR"
echo "⚙️  Settings: ${THUMB_WIDTH}x${THUMB_HEIGHT}px @ ${DPI}DPI, ${GRID_COLS}x${GRID_ROWS} grid"

# Calculate pages per montage based on grid
PAGES_PER_MONTAGE=$((GRID_COLS * GRID_ROWS))

# Function to create a single montage
create_montage() {
    local start=$1
    local end=$2
    local montage_num=$3
    local output_file="$OUTPUT_DIR/montage-$(printf "%02d" $montage_num)-pages-$(printf "%02d" $start)-$(printf "%02d" $end).png"
    local title_text="$TITLE - Pages $start-$end"
    
    # Create array of files with labels
    local files_with_labels=()
    for i in $(seq $start $end); do
        local page_file="$INPUT_DIR/page-$(printf "%02d" $i).png"
        if [ -f "$page_file" ]; then
            files_with_labels+=("-label" "Page $(printf "%02d" $i)" "$page_file")
        fi
    done
    
    if [ ${#files_with_labels[@]} -eq 0 ]; then
        echo "⚠️  No files found for pages $start-$end"
        return
    fi
    
    echo "🎨 Creating Montage $montage_num (Pages $start-$end)..."
    
    magick montage \
        "${files_with_labels[@]}" \
        -geometry "${THUMB_WIDTH}x${THUMB_HEIGHT}+${SPACING}+${SPACING}" \
        -tile "${GRID_COLS}x${GRID_ROWS}" \
        -background white \
        -bordercolor "$BORDER_COLOR" \
        -border "$BORDER_WIDTH" \
        -title "$title_text" \
        -pointsize "$LABEL_SIZE" \
        -fill black \
        -font Helvetica \
        -quality "$QUALITY" \
        -density "$DPI" \
        -unsharp 0x1 \
        "$output_file"
}

# Create montages
MONTAGE_NUM=1
for ((i=1; i<=TOTAL_PAGES; i+=PAGES_PER_MONTAGE)); do
    END_PAGE=$((i + PAGES_PER_MONTAGE - 1))
    if [ $END_PAGE -gt $TOTAL_PAGES ]; then
        END_PAGE=$TOTAL_PAGES
    fi
    create_montage $i $END_PAGE $MONTAGE_NUM
    ((MONTAGE_NUM++))
done

echo ""
echo "✅ Created $((MONTAGE_NUM - 1)) montages:"
ls -la "$OUTPUT_DIR"/*.png

echo ""
echo "📊 Montage details:"
for montage in "$OUTPUT_DIR"/*.png; do
    if [ -f "$montage" ]; then
        filename=$(basename "$montage")
        size=$(identify -format "%wx%h" "$montage")
        filesize=$(ls -lah "$montage" | awk '{print $5}')
        echo "  📸 $filename: ${size}px (${filesize})"
    fi
done

echo ""
echo "🎯 All montages saved to: $OUTPUT_DIR"