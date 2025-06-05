#!/bin/bash

# BMPOA Community Guide - Build Script
# This script compiles all sections and prepares the document for printing

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

# Header
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Community Guide Builder${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Change to project directory
cd "$(dirname "$0")/.." || exit 1
PROJECT_DIR=$(pwd)

show_info "Building BMPOA Community Guide..."
show_info "Project directory: $PROJECT_DIR"

# Create build directory if it doesn't exist
if [ ! -d "build" ]; then
    mkdir -p build
    show_status "Created build directory"
fi

# Function to check and create missing sections
create_missing_sections() {
    local section_name=$1
    local section_file="sections/${section_name}.html"
    
    if [ ! -f "$section_file" ]; then
        show_error "Missing section: $section_file"
        # Create a placeholder section
        cat > "$section_file" << EOF
<!-- ${section_name} - PLACEHOLDER -->
<div class="page">
    <div class="content-page">
        <div class="page-header">
            <h2 class="page-title">Section Under Development</h2>
        </div>
        <div class="content-body">
            <p>This section is currently being developed.</p>
        </div>
        <div class="page-footer">
            <div>BMPOA Community Guide</div>
            <div class="page-number">--</div>
        </div>
    </div>
</div>
EOF
        show_status "Created placeholder for $section_name"
    fi
}

# Check for required directories
show_status "Checking project structure..."

# Create sections directory if missing
if [ ! -d "sections" ]; then
    mkdir -p sections
    show_status "Created sections directory"
fi

# Check and create all required sections
SECTIONS=(
    "cover-page"
    "introduction-page"
    "table-of-contents"
    "section-1-governance"
    "section-2-mountain-home"
    "section-3-wood-chipping"
    "section-4-fire-safety"
    "section-5-community-services"
    "section-6-deer-lake"
    "section-7-lodge"
    "section-8-communication"
    "section-9-contacts"
    "section-10-natural-attractions"
    "section-11-construction"
    "section-12-bear-safety"
    "back-cover"
)

for section in "${SECTIONS[@]}"; do
    create_missing_sections "$section"
done

# Create a combined HTML file for printing
show_status "Creating print-ready version..."

cat > build/bmpoa-guide-print.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BMPOA Community Guide - Print Edition</title>
    <link rel="stylesheet" href="../css/styles.css">
    <style>
        /* Additional print-specific styles */
        @media print {
            body {
                margin: 0;
                padding: 0;
                background: white;
            }
            
            .page {
                page-break-after: always;
                page-break-inside: avoid;
                margin: 0;
            }
            
            .no-print {
                display: none !important;
            }
        }
        
        /* Ensure images are properly sized for print */
        img {
            max-width: 100%;
            height: auto;
            page-break-inside: avoid;
        }
    </style>
</head>
<body>
    <!-- Print version with all sections included -->
    <div id="print-content">
        <!-- Content will be loaded here -->
    </div>
    
    <script>
        // Load all sections for print version
        document.addEventListener('DOMContentLoaded', function() {
            const sections = [
                'cover-page',
                'introduction-page',
                'table-of-contents',
                'section-1-governance',
                'section-2-mountain-home',
                'section-3-wood-chipping',
                'section-4-fire-safety',
                'section-5-community-services',
                'section-6-deer-lake',
                'section-7-lodge',
                'section-8-communication',
                'section-9-contacts',
                'section-10-natural-attractions',
                'section-11-construction',
                'section-12-bear-safety',
                'back-cover'
            ];
            
            const printContent = document.getElementById('print-content');
            let loadedSections = 0;
            
            sections.forEach((section, index) => {
                fetch(`../sections/${section}.html`)
                    .then(response => response.text())
                    .then(html => {
                        const div = document.createElement('div');
                        div.innerHTML = html;
                        // Insert in order
                        if (printContent.children[index]) {
                            printContent.insertBefore(div, printContent.children[index]);
                        } else {
                            printContent.appendChild(div);
                        }
                        loadedSections++;
                        
                        // If all sections loaded, prepare for print
                        if (loadedSections === sections.length) {
                            setTimeout(() => {
                                window.print();
                            }, 1000);
                        }
                    })
                    .catch(error => {
                        console.error(`Error loading ${section}:`, error);
                    });
            });
        });
    </script>
</body>
</html>
EOF

show_status "Created print-ready version at build/bmpoa-guide-print.html"

# Create image optimization check
show_info "Checking images..."

IMAGE_COUNT=0
MISSING_IMAGES=0

# Common image references from the guide
EXPECTED_IMAGES=(
    "bmpoa-emblem.png"
    "Building1.jpg"
    "debris-fire.png"
    "deer-lake-dock.jpeg"
    "lodge-interior.jpg"
    "mountain-overlook.jpeg"
    "mountain-trail-view.jpg"
    "mountain-vista.jpeg"
    "TheLodge.jpg"
    "trillium-field.jpg"
    "vineyard-view.jpg"
    "virginia-bluebells.jpg"
    "warren-county-waste-map.png"
    "winery-1.jpeg"
    "winery-2.jpeg"
    "winery-3.jpeg"
)

for img in "${EXPECTED_IMAGES[@]}"; do
    if [ -f "images/$img" ]; then
        IMAGE_COUNT=$((IMAGE_COUNT + 1))
    else
        show_error "Missing image: images/$img"
        MISSING_IMAGES=$((MISSING_IMAGES + 1))
    fi
done

show_status "Found $IMAGE_COUNT images"
if [ $MISSING_IMAGES -gt 0 ]; then
    show_error "$MISSING_IMAGES images are missing"
fi

# Create a README for the build
cat > build/README.md << EOF
# BMPOA Community Guide - Build Information

## Generated on: $(date)

### Files Created:
- **bmpoa-guide-print.html**: Print-ready version with all sections combined
- **README.md**: This file

### Viewing the Guide:
1. **For web viewing**: Open \`index.html\` in your browser
2. **For printing**: Open \`build/bmpoa-guide-print.html\` in your browser

### Printing Instructions:
1. Open \`bmpoa-guide-print.html\` in Chrome or Firefox
2. Press Ctrl+P (or Cmd+P on Mac)
3. Settings:
   - Paper size: Letter (8.5" x 11")
   - Margins: None or Minimum
   - Scale: Fit to page width
   - Background graphics: Enabled (for colored boxes)
4. Save as PDF or print directly

### Development:
- To run the local server: \`./scripts/serve.sh\`
- To rebuild: \`./scripts/build.sh\`

### Project Structure:
- **sections/**: Individual HTML files for each section
- **css/**: Stylesheets
- **js/**: JavaScript files
- **images/**: All images used in the guide
- **build/**: Compiled versions for printing

EOF

show_status "Build complete!"

echo ""
echo -e "${GREEN}Build Summary:${NC}"
echo "  - Sections checked: ${#SECTIONS[@]}"
echo "  - Images found: $IMAGE_COUNT"
echo "  - Print version: build/bmpoa-guide-print.html"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Run './scripts/serve.sh' to view the guide locally"
echo "  2. Open 'build/bmpoa-guide-print.html' for the print version"
echo ""