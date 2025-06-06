#!/bin/bash

# Check available disk space before build

# Colors
YELLOW='\033[1;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Get available space in GB
AVAILABLE_GB=$(df -H . | awk 'NR==2 {print $4}' | sed 's/G//')

# Calculate current builds size
BUILDS_DIR="output/builds"
if [ -d "$BUILDS_DIR" ]; then
    BUILDS_SIZE=$(du -sh "$BUILDS_DIR" 2>/dev/null | cut -f1)
    BUILD_COUNT=$(ls -1 "$BUILDS_DIR" 2>/dev/null | wc -l)
else
    BUILDS_SIZE="0"
    BUILD_COUNT=0
fi

echo -e "${GREEN}Disk Space Check${NC}"
echo "Available: ${AVAILABLE_GB}GB"
echo "Builds folder: $BUILDS_SIZE ($BUILD_COUNT builds)"

# Warning if less than 2GB available
if (( $(echo "$AVAILABLE_GB < 2" | bc -l) )); then
    echo -e "${RED}⚠️  Warning: Low disk space!${NC}"
    echo "Each build requires ~130MB"
    echo "Consider running: npm run builds:clean"
    exit 1
elif (( $(echo "$AVAILABLE_GB < 5" | bc -l) )); then
    echo -e "${YELLOW}⚠️  Disk space is getting low${NC}"
    echo "Consider cleaning old builds after this one"
fi

echo -e "${GREEN}✓ Sufficient disk space available${NC}"