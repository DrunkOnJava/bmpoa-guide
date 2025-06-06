#!/bin/bash

# Test style analysis on a single page

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Use latest build
BUILD=$(ls -1t output/builds 2>/dev/null | head -1)
if [ -z "$BUILD" ]; then
    echo -e "${RED}No builds found${NC}"
    exit 1
fi

BUILD_DIR="output/builds/$BUILD"
JPG_DIR="$BUILD_DIR/jpg-efficient"

echo -e "${PURPLE}Testing Style Analysis on Single Page${NC}"
echo -e "Build: ${GREEN}$BUILD${NC}\n"

# Get first image
IMG=$(ls "$JPG_DIR"/page-*.jpg 2>/dev/null | head -1)
if [ -z "$IMG" ]; then
    echo -e "${RED}No images found${NC}"
    exit 1
fi

PAGE_NUM=$(basename "$IMG" | sed 's/page-\([0-9]*\)\.jpg/\1/')
echo -e "${YELLOW}Testing page $PAGE_NUM${NC}"

# Simple test prompt
PROMPT="Analyze this PDF page and return a simple JSON object with these fields:
{
  \"pageNumber\": $PAGE_NUM,
  \"hasText\": true,
  \"violations\": 1
}

Return ONLY the JSON object, no other text."

echo -e "\n${BLUE}Sending to Claude...${NC}"

# Test with Claude
RESPONSE=$(cat "$IMG" | claude -p --model claude-3-5-sonnet-20241022 "$PROMPT" 2>&1)

echo -e "\n${PURPLE}Raw Response:${NC}"
echo "$RESPONSE"

# Try to extract JSON
echo -e "\n${PURPLE}Extracted JSON:${NC}"
JSON=$(echo "$RESPONSE" | grep -o '{.*}' | head -1)
if [ -n "$JSON" ]; then
    echo "$JSON"
    echo -e "\n${GREEN}✓ JSON extraction successful${NC}"
else
    echo -e "${RED}✗ Failed to extract JSON${NC}"
fi