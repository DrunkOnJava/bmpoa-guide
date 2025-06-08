#\!/bin/bash

# Get the latest build directory
LATEST_BUILD=$(ls -t output/builds | head -1)
BUILD_DIR="output/builds/$LATEST_BUILD"
MONTAGE_DIR="output/montages"

# Create montage directory
mkdir -p "$MONTAGE_DIR"

# Count total pages
TOTAL_PAGES=$(ls -1 "$BUILD_DIR/jpg-efficient/"*.jpg | wc -l)
echo "Creating montage of $TOTAL_PAGES pages..."

# Calculate grid dimensions for best square-ish layout
# For 71 pages, 9x8 grid works well (72 cells)
COLS=9
ROWS=8

# Create timestamp for unique filename
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Create montage using ImageMagick
echo "Generating montage with ${COLS}x${ROWS} grid..."
magick montage "$BUILD_DIR/jpg-efficient/"*.jpg \
  -tile ${COLS}x${ROWS} \
  -geometry 150x195+2+2 \
  -background white \
  -border 1 \
  -bordercolor "#cccccc" \
  "$MONTAGE_DIR/BMPOA-Guide-Montage-${COLS}x${ROWS}-${TIMESTAMP}.jpg"

# Also create a high-quality version with larger thumbnails
echo "Generating high-quality montage..."
magick montage "$BUILD_DIR/jpg-efficient/"*.jpg \
  -tile ${COLS}x${ROWS} \
  -geometry 300x390+4+4 \
  -background white \
  -border 2 \
  -bordercolor "#cccccc" \
  -quality 90 \
  "$MONTAGE_DIR/BMPOA-Guide-Montage-HQ-${COLS}x${ROWS}-${TIMESTAMP}.jpg"

# Create a version with page numbers as labels
echo "Generating labeled montage..."
# First create a temporary directory for labeled images
TEMP_DIR=$(mktemp -d)
for i in $(seq -f "%02g" 1 $TOTAL_PAGES); do
  PAGE_FILE="$BUILD_DIR/jpg-efficient/page-${i}.jpg"
  if [ -f "$PAGE_FILE" ]; then
    magick "$PAGE_FILE" \
      -gravity South \
      -background white \
      -splice 0x20 \
      -annotate +0+2 "Page $i" \
      -bordercolor "#cccccc" \
      -border 1 \
      "$TEMP_DIR/labeled-page-${i}.jpg"
  fi
done

# Create labeled montage
magick montage "$TEMP_DIR/"*.jpg \
  -tile ${COLS}x${ROWS} \
  -geometry 150x215+2+2 \
  -background white \
  "$MONTAGE_DIR/BMPOA-Guide-Montage-Labeled-${COLS}x${ROWS}-${TIMESTAMP}.jpg"

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Montages created successfully\!"
echo ""
echo "📁 Output files:"
ls -lh "$MONTAGE_DIR/"*${TIMESTAMP}.jpg | awk '{print "   " $9 " (" $5 ")"}'
echo ""
echo "Montage dimensions: ${COLS} columns × ${ROWS} rows"
echo "Total pages: $TOTAL_PAGES"
