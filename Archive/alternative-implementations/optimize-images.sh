#!/bin/bash

# BMPOA Guide - Image Optimization Script
# This script checks image sizes and provides optimization recommendations

# Set color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Guide - Image Optimizer${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

# Function to get file size in human-readable format
get_size() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        stat -f%z "$1" | awk '{ split( "B KB MB GB" , v ); s=1; while( $1>1024 ){ $1/=1024; s++ } print int($1) v[s] }'
    else
        # Linux
        stat -c%s "$1" | awk '{ split( "B KB MB GB" , v ); s=1; while( $1>1024 ){ $1/=1024; s++ } print int($1) v[s] }'
    fi
}

# Check for ImageMagick
if command -v identify >/dev/null 2>&1; then
    HAS_IMAGEMAGICK=true
else
    HAS_IMAGEMAGICK=false
    echo -e "${YELLOW}Warning: ImageMagick not installed. Install it for full functionality:${NC}"
    echo "  brew install imagemagick"
    echo ""
fi

echo -e "${BLUE}Analyzing images...${NC}"
echo ""

TOTAL_SIZE=0
LARGE_IMAGES=0
OPTIMIZATION_NEEDED=0

# Analyze each image
for img in images/*; do
    if [[ -f "$img" && "$img" != *".DS_Store" ]]; then
        filename=$(basename "$img")
        filesize=$(get_size "$img")
        
        # Get file size in bytes for comparison
        if [[ "$OSTYPE" == "darwin"* ]]; then
            size_bytes=$(stat -f%z "$img")
        else
            size_bytes=$(stat -c%s "$img")
        fi
        
        TOTAL_SIZE=$((TOTAL_SIZE + size_bytes))
        
        # Check if image is larger than 1MB
        if [ $size_bytes -gt 1048576 ]; then
            echo -e "${RED}✗${NC} $filename - $filesize (LARGE - optimization recommended)"
            LARGE_IMAGES=$((LARGE_IMAGES + 1))
            OPTIMIZATION_NEEDED=1
            
            # Get dimensions if ImageMagick is available
            if [ "$HAS_IMAGEMAGICK" = true ]; then
                dimensions=$(identify -format "%wx%h" "$img" 2>/dev/null)
                echo "    Dimensions: $dimensions"
            fi
        elif [ $size_bytes -gt 524288 ]; then
            echo -e "${YELLOW}!${NC} $filename - $filesize (Consider optimizing)"
            OPTIMIZATION_NEEDED=1
        else
            echo -e "${GREEN}✓${NC} $filename - $filesize"
        fi
    fi
done

# Calculate total size
TOTAL_MB=$(echo "scale=2; $TOTAL_SIZE / 1048576" | bc)

echo ""
echo -e "${BLUE}Summary:${NC}"
echo "--------"
echo "Total images size: ${TOTAL_MB}MB"
echo "Large images (>1MB): $LARGE_IMAGES"

if [ $OPTIMIZATION_NEEDED -eq 1 ]; then
    echo ""
    echo -e "${YELLOW}Optimization Recommendations:${NC}"
    echo ""
    echo "For web use, images should generally be:"
    echo "  • Under 1MB in file size"
    echo "  • Maximum 2000px on the longest side"
    echo "  • 72-96 DPI resolution"
    echo "  • JPEG format for photos (80-90% quality)"
    echo "  • PNG format for logos/graphics with transparency"
    echo ""
    echo -e "${BLUE}To optimize images with ImageMagick:${NC}"
    echo ""
    echo "# Resize and optimize a JPEG:"
    echo "convert input.jpg -resize 1920x1920\\> -quality 85 output.jpg"
    echo ""
    echo "# Resize and optimize a PNG:"
    echo "convert input.png -resize 1920x1920\\> -strip output.png"
    echo ""
    echo "# Batch optimize all JPEGs:"
    echo "for img in images/*.jpg images/*.jpeg; do"
    echo "    convert \"\$img\" -resize 1920x1920\\> -quality 85 \"optimized_\$(basename \"\$img\")\""
    echo "done"
fi

echo ""
echo -e "${GREEN}Image analysis complete!${NC}"
