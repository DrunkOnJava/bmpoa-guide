#!/bin/bash

# Script to manage PDF builds

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

BUILDS_DIR="output/builds"

# Function to show build details
show_build_details() {
    local build=$1
    local build_dir="$BUILDS_DIR/$build"
    
    if [ -f "$build_dir/build-info.json" ]; then
        echo -e "\n${BLUE}Build: $build${NC}"
        
        # Parse build info
        local pages=$(grep -o '"totalPages": [0-9]*' "$build_dir/build-info.json" | cut -d' ' -f2)
        local created=$(grep -o '"createdAt": "[^"]*"' "$build_dir/build-info.json" | cut -d'"' -f4)
        
        echo "  Created: $created"
        echo "  Pages: $pages"
        
        # Check analysis status
        if [ -f "$build_dir/analysis-complete.flag" ]; then
            echo -e "  Analysis: ${GREEN}Complete${NC}"
            if [ -f "$build_dir/layout-issues.txt" ]; then
                local issues=$(wc -l < "$build_dir/layout-issues.txt")
                echo "  Issues found: $issues pages"
            fi
        elif [ -f "$build_dir/suggested-filenames.txt" ]; then
            local analyzed=$(wc -l < "$build_dir/suggested-filenames.txt")
            echo -e "  Analysis: ${YELLOW}In Progress ($analyzed/$pages)${NC}"
        else
            echo -e "  Analysis: ${RED}Not Started${NC}"
        fi
        
        # Check if renamed
        if [ -d "$build_dir/png-renamed" ] && [ "$(ls -A "$build_dir/png-renamed" 2>/dev/null)" ]; then
            echo -e "  Renamed: ${GREEN}Yes${NC}"
        else
            echo -e "  Renamed: ${RED}No${NC}"
        fi
        
        # Calculate size
        local size=$(du -sh "$build_dir" | cut -f1)
        echo "  Size: $size"
    fi
}

# Main menu
case "${1:-list}" in
    list)
        echo -e "${BLUE}PDF Build Manager${NC}"
        echo -e "${BLUE}=================${NC}"
        
        if [ ! -d "$BUILDS_DIR" ] || [ -z "$(ls -A "$BUILDS_DIR" 2>/dev/null)" ]; then
            echo -e "${YELLOW}No builds found${NC}"
            echo "Run 'npm run pdf' to create a build"
            exit 0
        fi
        
        echo -e "\nAvailable builds:"
        
        # List builds sorted by date (newest first)
        for build in $(ls -1t "$BUILDS_DIR"); do
            show_build_details "$build"
        done
        
        echo -e "\n${YELLOW}Commands:${NC}"
        echo "  ./scripts/manage-builds.sh list        - List all builds"
        echo "  ./scripts/manage-builds.sh latest      - Show latest build"
        echo "  ./scripts/manage-builds.sh clean       - Remove old builds"
        echo "  ./scripts/manage-builds.sh analyze     - Analyze latest build"
        echo "  ./scripts/manage-builds.sh open <timestamp> - Open build folder"
        ;;
        
    latest)
        LATEST=$(ls -1t "$BUILDS_DIR" 2>/dev/null | head -1)
        if [ -z "$LATEST" ]; then
            echo -e "${RED}No builds found${NC}"
            exit 1
        fi
        
        echo -e "${BLUE}Latest Build${NC}"
        show_build_details "$LATEST"
        echo -e "\nPath: ${GREEN}$BUILDS_DIR/$LATEST${NC}"
        ;;
        
    clean)
        if [ ! -d "$BUILDS_DIR" ]; then
            echo -e "${YELLOW}No builds to clean${NC}"
            exit 0
        fi
        
        # Count builds
        BUILD_COUNT=$(ls -1 "$BUILDS_DIR" 2>/dev/null | wc -l)
        if [ "$BUILD_COUNT" -le 3 ]; then
            echo -e "${YELLOW}Only $BUILD_COUNT builds found. Keeping all.${NC}"
            exit 0
        fi
        
        echo -e "${YELLOW}Cleaning old builds...${NC}"
        echo "Keeping the 3 most recent builds"
        
        # Get builds to remove (all except the 3 most recent)
        TO_REMOVE=$(ls -1t "$BUILDS_DIR" | tail -n +4)
        REMOVED=0
        
        for build in $TO_REMOVE; do
            echo -e "  Removing: $build"
            rm -rf "$BUILDS_DIR/$build"
            REMOVED=$((REMOVED + 1))
        done
        
        echo -e "${GREEN}✓ Removed $REMOVED old builds${NC}"
        ;;
        
    analyze)
        echo -e "${BLUE}Starting analysis of latest build...${NC}"
        ./scripts/analyze-latest-build.sh
        ;;
        
    open)
        if [ -z "$2" ]; then
            echo "Usage: $0 open <timestamp>"
            echo "Example: $0 open 2025-01-06T12-30-45"
            exit 1
        fi
        
        BUILD_PATH="$BUILDS_DIR/$2"
        if [ ! -d "$BUILD_PATH" ]; then
            echo -e "${RED}Build not found: $2${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}Opening: $BUILD_PATH${NC}"
        open "$BUILD_PATH"  # macOS specific
        ;;
        
    *)
        echo "Usage: $0 {list|latest|clean|analyze|open <timestamp>}"
        exit 1
        ;;
esac