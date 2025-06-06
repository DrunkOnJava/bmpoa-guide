#!/bin/bash

# Enhanced real-time monitoring script for all build analysis activities
# Fixed version that prevents spam after completion

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
ORANGE='\033[0;33m'
NC='\033[0m'

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Clear screen and show header
clear
echo -e "${PURPLE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║     Build Activity Monitor - Live Updates      ║${NC}"
echo -e "${PURPLE}║        Including ContentPolicer Bot            ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════╝${NC}"
echo -e "${GRAY}Press Ctrl+C to exit${NC}\n"

# Initialize tracking variables
LAST_CONTENT_COUNT=0
LAST_STYLE_COUNT=0
LAST_POLICER_COUNT=0
LAST_RENAME_COUNT=0
LAST_MODIFIED_FILES=""
LAST_GIT_STATUS=""
LAST_CONTENT_LOG=""
LAST_RENAME_LOG=""
LAST_POLICER_LOG=""
STYLE_COMPLETE=false
POLICER_COMPLETE=false
CONTENT_COMPLETE=false

# Function to get timestamp
timestamp() {
    date +"%H:%M:%S"
}

# Function to check for interactive Claude changes
check_interactive_changes() {
    # Check git status for recent changes
    CURRENT_GIT_STATUS=$(git status --porcelain 2>/dev/null | head -10)
    
    if [ "$CURRENT_GIT_STATUS" != "$LAST_GIT_STATUS" ]; then
        echo -e "[$(timestamp)] ${CYAN}📝 Interactive Changes Detected:${NC}"
        
        # Show what changed
        git status --porcelain 2>/dev/null | while read -r line; do
            STATUS=$(echo "$line" | cut -c1-2)
            FILE=$(echo "$line" | cut -c4-)
            
            case "$STATUS" in
                "M "|" M") echo -e "   ${YELLOW}Modified:${NC} $FILE" ;;
                "A "|" A") echo -e "   ${GREEN}Added:${NC} $FILE" ;;
                "D "|" D") echo -e "   ${RED}Deleted:${NC} $FILE" ;;
                "??") echo -e "   ${GRAY}Untracked:${NC} $FILE" ;;
            esac
        done | head -5
        
        LAST_GIT_STATUS="$CURRENT_GIT_STATUS"
        echo ""
    fi
}

# Function to monitor file changes
monitor_file_changes() {
    # Check for recently modified files in src/ and scripts/
    CURRENT_MODIFIED=$(find src/ scripts/ -type f -mmin -1 2>/dev/null | sort)
    
    if [ "$CURRENT_MODIFIED" != "$LAST_MODIFIED_FILES" ] && [ -n "$CURRENT_MODIFIED" ]; then
        echo -e "[$(timestamp)] ${CYAN}🔧 Recent File Modifications:${NC}"
        echo "$CURRENT_MODIFIED" | while read -r file; do
            # Get file size and last modified time
            SIZE=$(ls -lh "$file" 2>/dev/null | awk '{print $5}')
            echo -e "   ${BLUE}→${NC} $file ${GRAY}($SIZE)${NC}"
        done | head -5
        LAST_MODIFIED_FILES="$CURRENT_MODIFIED"
        echo ""
    fi
}

# Function to show real-time logs
show_recent_logs() {
    # Check content analysis log
    if [ -f "output/content-analysis.log" ]; then
        RECENT_LOG=$(tail -1 "output/content-analysis.log" 2>/dev/null | grep -v "^$")
        if [ -n "$RECENT_LOG" ] && [ "$RECENT_LOG" != "$LAST_CONTENT_LOG" ]; then
            echo -e "[$(timestamp)] ${GREEN}📋 Content Log:${NC} $RECENT_LOG"
            LAST_CONTENT_LOG="$RECENT_LOG"
        fi
    fi
    
    # Check rename log
    if [ -f "output/rename-screenshots.log" ]; then
        RECENT_RENAME=$(tail -1 "output/rename-screenshots.log" 2>/dev/null | grep -v "^$")
        if [ -n "$RECENT_RENAME" ] && [ "$RECENT_RENAME" != "$LAST_RENAME_LOG" ]; then
            echo -e "[$(timestamp)] ${YELLOW}📋 Rename Log:${NC} $RECENT_RENAME"
            LAST_RENAME_LOG="$RECENT_RENAME"
        fi
    fi
}

# Main monitoring loop
while true; do
    # Get latest build directory
    LATEST_BUILD=$(ls -1t output/builds 2>/dev/null | head -1)
    
    if [ -n "$LATEST_BUILD" ]; then
        BUILD_DIR="output/builds/$LATEST_BUILD"
        
        # Monitor content analysis progress
        if [ "$CONTENT_COMPLETE" = false ] && [ -f "$BUILD_DIR/suggested-filenames.txt" ]; then
            CURRENT_COUNT=$(wc -l < "$BUILD_DIR/suggested-filenames.txt" 2>/dev/null | tr -d ' ' || echo 0)
            if [ "$CURRENT_COUNT" -gt "$LAST_CONTENT_COUNT" ]; then
                LATEST_ENTRY=$(tail -1 "$BUILD_DIR/suggested-filenames.txt" 2>/dev/null)
                echo -e "[$(timestamp)] ${GREEN}📄 Content Analysis:${NC} $LATEST_ENTRY"
                LAST_CONTENT_COUNT=$CURRENT_COUNT
            fi
            
            # Check for completion
            if [ -f "$BUILD_DIR/analysis-complete.flag" ]; then
                echo -e "[$(timestamp)] ${GREEN}✅ Content Analysis Complete!${NC} ($CURRENT_COUNT pages)"
                CONTENT_COMPLETE=true
            fi
        fi
        
        # Monitor style analysis progress
        if [ "$STYLE_COMPLETE" = false ] && [ -f "$BUILD_DIR/style-analysis-progress.txt" ]; then
            CURRENT_STYLE=$(cat "$BUILD_DIR/style-analysis-progress.txt" 2>/dev/null | tr -d ' \n' || echo 0)
            if [ "$CURRENT_STYLE" -gt "$LAST_STYLE_COUNT" ]; then
                echo -e "[$(timestamp)] ${BLUE}🎨 Style Analysis:${NC} Page $CURRENT_STYLE analyzed"
                LAST_STYLE_COUNT=$CURRENT_STYLE
                
                # Show violations if any
                if [ -f "$BUILD_DIR/style-violations.json" ]; then
                    CRITICAL=$(grep -o '"severity":"critical"' "$BUILD_DIR/style-violations.json" 2>/dev/null | wc -l)
                    MAJOR=$(grep -o '"severity":"major"' "$BUILD_DIR/style-violations.json" 2>/dev/null | wc -l)
                    MINOR=$(grep -o '"severity":"minor"' "$BUILD_DIR/style-violations.json" 2>/dev/null | wc -l)
                    if [ $((CRITICAL + MAJOR + MINOR)) -gt 0 ]; then
                        echo -e "   ${RED}●${NC} Critical: $CRITICAL ${YELLOW}●${NC} Major: $MAJOR ${BLUE}●${NC} Minor: $MINOR"
                    fi
                fi
            fi
            
            # Check for completion
            if [ -f "$BUILD_DIR/style-analysis-complete.flag" ]; then
                if [ "$STYLE_COMPLETE" = false ]; then
                    echo -e "[$(timestamp)] ${BLUE}✅ Style Analysis Complete!${NC}"
                    STYLE_COMPLETE=true
                fi
            fi
        fi
        
        # Monitor ContentPolicer progress
        if [ "$POLICER_COMPLETE" = false ] && [ -f "$BUILD_DIR/content-verification-progress.txt" ]; then
            CURRENT_POLICER=$(cat "$BUILD_DIR/content-verification-progress.txt" 2>/dev/null | tr -d ' \n' || echo 0)
            if [ "$CURRENT_POLICER" -gt "$LAST_POLICER_COUNT" ]; then
                echo -e "[$(timestamp)] ${ORANGE}🚨 ContentPolicer:${NC} Page $CURRENT_POLICER verified"
                LAST_POLICER_COUNT=$CURRENT_POLICER
                
                # Check for hallucinations
                if [ -f "$BUILD_DIR/potential-hallucinations.json" ]; then
                    HALLUCINATIONS=$(grep -o '"hallucination"' "$BUILD_DIR/potential-hallucinations.json" 2>/dev/null | wc -l)
                    UNVERIFIED=$(grep -o '"unverified"' "$BUILD_DIR/potential-hallucinations.json" 2>/dev/null | wc -l)
                    if [ $((HALLUCINATIONS + UNVERIFIED)) -gt 0 ]; then
                        echo -e "   ${RED}🔴${NC} Hallucinations: $HALLUCINATIONS ${YELLOW}🟡${NC} Unverified: $UNVERIFIED"
                    fi
                fi
                
                # Show latest finding from log
                if [ -f "$BUILD_DIR/content-policer.log" ]; then
                    LATEST_FINDING=$(tail -1 "$BUILD_DIR/content-policer.log" 2>/dev/null | grep -v "^$")
                    if [ -n "$LATEST_FINDING" ] && [ "$LATEST_FINDING" != "$LAST_POLICER_LOG" ]; then
                        echo -e "   ${GRAY}→ $LATEST_FINDING${NC}"
                        LAST_POLICER_LOG="$LATEST_FINDING"
                    fi
                fi
            fi
            
            # Check for completion
            if [ -f "$BUILD_DIR/content-verification-complete.flag" ]; then
                if [ "$POLICER_COMPLETE" = false ]; then
                    echo -e "[$(timestamp)] ${ORANGE}✅ ContentPolicer Complete!${NC}"
                    POLICER_COMPLETE=true
                fi
            fi
        fi
        
        # Monitor screenshot renaming
        RENAMED_COUNT=$(ls -1 output/PDF-Screenshots/*.png 2>/dev/null | grep -v "page-[0-9]" | wc -l | tr -d ' ')
        if [ "$RENAMED_COUNT" -gt "$LAST_RENAME_COUNT" ]; then
            LATEST_RENAME=$(ls -1t output/PDF-Screenshots/*.png 2>/dev/null | grep -v "page-[0-9]" | head -1 | xargs basename)
            echo -e "[$(timestamp)] ${YELLOW}🏷️  Renamed:${NC} $LATEST_RENAME"
            LAST_RENAME_COUNT=$RENAMED_COUNT
        fi
    fi
    
    # Monitor interactive Claude changes
    check_interactive_changes
    
    # Monitor recent file modifications
    monitor_file_changes
    
    # Show recent log entries
    show_recent_logs
    
    # Check for running processes
    RUNNING_PROCESSES=""
    if pgrep -f "analyze-latest-build.sh" > /dev/null; then
        RUNNING_PROCESSES="${RUNNING_PROCESSES}📊 "
    fi
    if pgrep -f "analyze-style-guide" > /dev/null; then
        RUNNING_PROCESSES="${RUNNING_PROCESSES}🎨 "
    fi
    if pgrep -f "content-policer" > /dev/null; then
        RUNNING_PROCESSES="${RUNNING_PROCESSES}🚨 "
    fi
    if pgrep -f "rename-pdf-screenshots" > /dev/null; then
        RUNNING_PROCESSES="${RUNNING_PROCESSES}🏷️  "
    fi
    
    # Update status line with summary
    if [ -n "$BUILD_DIR" ]; then
        TOTAL_PAGES=$(ls -1 "$BUILD_DIR/jpg-efficient"/page-*.jpg 2>/dev/null | wc -l | tr -d ' ')
        printf "\r${GRAY}Active: ${RUNNING_PROCESSES:-None} | Build: ${LATEST_BUILD:-None} | Pages: ${TOTAL_PAGES} | $(timestamp)${NC}  "
    else
        printf "\r${GRAY}Active: ${RUNNING_PROCESSES:-None} | Build: ${LATEST_BUILD:-None} | $(timestamp)${NC}  "
    fi
    
    # Small delay to avoid excessive CPU usage
    sleep 1
done