#!/bin/bash

# BMPOA Community Guide - Local Development Server
# This script builds and serves the BMPOA guide for local viewing

# Set color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display status messages
show_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

show_error() {
    echo -e "${RED}[✗]${NC} $1"
}

show_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Header
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Community Guide Server${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Change to project directory
cd "$(dirname "$0")/.." || exit 1
PROJECT_DIR=$(pwd)

show_info "Project directory: $PROJECT_DIR"

# Check for required files
show_status "Checking project structure..."
if [ ! -f "index.html" ]; then
    show_error "index.html not found!"
    exit 1
fi

if [ ! -d "css" ]; then
    show_error "css directory not found!"
    exit 1
fi

if [ ! -d "js" ]; then
    show_error "js directory not found!"
    exit 1
fi

# Determine which web server to use
PORT=8080
SERVER_CMD=""

# Check for various web servers in order of preference
if command_exists python3; then
    SERVER_CMD="python3 -m http.server $PORT"
    show_status "Using Python 3 HTTP server"
elif command_exists python; then
    # Check if it's Python 2 or 3
    PYTHON_VERSION=$(python -c 'import sys; print(sys.version_info[0])')
    if [ "$PYTHON_VERSION" = "3" ]; then
        SERVER_CMD="python -m http.server $PORT"
    else
        SERVER_CMD="python -m SimpleHTTPServer $PORT"
    fi
    show_status "Using Python HTTP server"
elif command_exists php; then
    SERVER_CMD="php -S localhost:$PORT"
    show_status "Using PHP built-in server"
elif command_exists ruby; then
    SERVER_CMD="ruby -run -e httpd . -p $PORT"
    show_status "Using Ruby HTTP server"
elif command_exists npx; then
    SERVER_CMD="npx http-server -p $PORT"
    show_status "Using Node.js http-server"
else
    show_error "No suitable web server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: brew install python3"
    echo "  - PHP: brew install php"
    echo "  - Node.js: brew install node"
    echo ""
    exit 1
fi

# Create a simple build process to ensure all sections are properly structured
show_status "Building project..."

# Check if all section files exist
MISSING_SECTIONS=0
for section in cover-page introduction-page table-of-contents \
               section-1-governance section-2-mountain-home section-3-wood-chipping \
               section-4-fire-safety section-5-community-services section-6-deer-lake \
               section-7-lodge section-8-communication section-9-contacts \
               section-10-natural-attractions section-11-construction section-12-bear-safety; do
    if [ ! -f "sections/${section}.html" ]; then
        show_error "Missing section: sections/${section}.html"
        MISSING_SECTIONS=$((MISSING_SECTIONS + 1))
    fi
done

if [ $MISSING_SECTIONS -gt 0 ]; then
    show_error "Some sections are missing. The guide may not display correctly."
fi

# Display server information
echo ""
show_info "Starting local server..."
echo -e "${GREEN}➜${NC} Local server will be available at:"
echo -e "   ${YELLOW}http://localhost:${PORT}${NC}"
echo -e "   ${YELLOW}http://127.0.0.1:${PORT}${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop the server${NC}"
echo ""

# Open browser automatically (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Wait a second for server to start
    (sleep 1 && open "http://localhost:${PORT}") &
fi

# Start the server
eval $SERVER_CMD