#!/bin/bash

# Monitor ComponentGarden verification progress

REPORT_FILE="/Users/griffin/Documents/bmpoa-guide/ComponentFarm/ComponentGarden/content-verification-report.md"
LOG_FILE="/Users/griffin/Documents/bmpoa-guide/ComponentFarm/ComponentGarden/verification.log"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

clear
echo -e "${PURPLE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║   ComponentGarden Verification Monitor         ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════╝${NC}"
echo -e "${YELLOW}Press Ctrl+C to exit${NC}\n"

while true; do
    # Check if process is still running
    if pgrep -f "content-policer-component-garden" > /dev/null; then
        STATUS="${GREEN}Running${NC}"
    else
        STATUS="${RED}Stopped${NC}"
    fi
    
    # Count processed images
    if [ -f "$REPORT_FILE" ]; then
        PROCESSED=$(grep -c "^## EC" "$REPORT_FILE" 2>/dev/null || echo 0)
        LAST_IMAGE=$(grep "^## EC" "$REPORT_FILE" | tail -1 | sed 's/## //')
    else
        PROCESSED=0
        LAST_IMAGE="None"
    fi
    
    # Get latest log entry
    if [ -f "$LOG_FILE" ]; then
        LATEST_LOG=$(tail -1 "$LOG_FILE" | sed 's/\x1b\[[0-9;]*m//g')
    else
        LATEST_LOG="Waiting for logs..."
    fi
    
    # Display status
    printf "\r${BLUE}Status:${NC} $STATUS | ${BLUE}Progress:${NC} ${YELLOW}$PROCESSED/181${NC} | ${BLUE}Current:${NC} $LAST_IMAGE"
    
    sleep 2
done