#!/bin/bash

# BMPOA Community Guide - Deployment Script
# This script prepares the guide for distribution (web hosting or PDF generation)

# Set color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

show_warn() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Header
echo -e "${PURPLE}================================${NC}"
echo -e "${PURPLE}BMPOA Community Guide Deployment${NC}"
echo -e "${PURPLE}================================${NC}"
echo ""

# Change to project directory
cd "$(dirname "$0")/.." || exit 1
PROJECT_DIR=$(pwd)

# Get deployment type
if [ "$1" = "web" ] || [ "$1" = "pdf" ] || [ "$1" = "both" ]; then
    DEPLOY_TYPE=$1
else
    echo "Usage: $0 [web|pdf|both]"
    echo ""
    echo "Options:"
    echo "  web  - Prepare for web hosting"
    echo "  pdf  - Generate PDF version"
    echo "  both - Prepare both web and PDF versions"
    echo ""
    exit 1
fi

show_info "Deployment type: ${DEPLOY_TYPE}"
echo ""

# Step 1: Run validation
show_info "Running validation checks..."
if [ -f "scripts/validate.sh" ]; then
    chmod +x scripts/validate.sh
    ./scripts/validate.sh > /tmp/bmpoa-validation.log 2>&1
    
    if grep -q "validation PASSED" /tmp/bmpoa-validation.log; then
        show_status "Validation passed"
    else
        show_error "Validation failed - check /tmp/bmpoa-validation.log"
        exit 1
    fi
else
    show_warn "Validation script not found - skipping"
fi

# Step 2: Build the guide
show_info "Building the guide..."
if [ -f "scripts/build.sh" ]; then
    chmod +x scripts/build.sh
    ./scripts/build.sh > /tmp/bmpoa-build.log 2>&1
    
    if [ $? -eq 0 ]; then
        show_status "Build completed successfully"
    else
        show_error "Build failed - check /tmp/bmpoa-build.log"
        exit 1
    fi
else
    show_error "Build script not found"
    exit 1
fi

# Step 3: Create deployment directory
DEPLOY_DIR="deploy_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEPLOY_DIR"
show_status "Created deployment directory: $DEPLOY_DIR"

# Step 4: Deploy for web
if [ "$DEPLOY_TYPE" = "web" ] || [ "$DEPLOY_TYPE" = "both" ]; then
    show_info "Preparing web deployment..."
    
    # Create web directory
    WEB_DIR="$DEPLOY_DIR/web"
    mkdir -p "$WEB_DIR"
    
    # Copy necessary files
    cp index.html "$WEB_DIR/"
    cp -r css "$WEB_DIR/"
    cp -r js "$WEB_DIR/"
    cp -r sections "$WEB_DIR/"
    cp -r images "$WEB_DIR/"
    
    # Create a simple .htaccess for Apache servers
    cat > "$WEB_DIR/.htaccess" << 'EOF'
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# Prevent directory listing
Options -Indexes
EOF
    
    # Create deployment instructions
    cat > "$WEB_DIR/DEPLOYMENT.md" << EOF
# Web Deployment Instructions

## Files to Upload
Upload all files and directories in this folder to your web server.

## Server Requirements
- Standard web server (Apache, Nginx, etc.)
- No special server-side requirements (pure HTML/CSS/JS)

## Recommended Configuration
- Enable GZIP compression for better performance
- Set appropriate cache headers for images
- Ensure HTTPS is enabled for security

## Testing
After deployment, test:
1. All sections load properly
2. Images display correctly
3. Print functionality works
4. Mobile responsiveness

## Support
Contact: webmaster@bmpoa.org
EOF
    
    show_status "Web deployment files ready in: $WEB_DIR"
fi

# Step 5: Generate PDF
if [ "$DEPLOY_TYPE" = "pdf" ] || [ "$DEPLOY_TYPE" = "both" ]; then
    show_info "Preparing PDF generation..."
    
    # Create PDF directory
    PDF_DIR="$DEPLOY_DIR/pdf"
    mkdir -p "$PDF_DIR"
    
    # Check for wkhtmltopdf or similar tool
    if command -v wkhtmltopdf >/dev/null 2>&1; then
        show_info "Generating PDF with wkhtmltopdf..."
        wkhtmltopdf \
            --enable-local-file-access \
            --print-media-type \
            --margin-top 0 \
            --margin-bottom 0 \
            --margin-left 0 \
            --margin-right 0 \
            --page-size Letter \
            --orientation Portrait \
            --no-outline \
            "build/bmpoa-guide-print.html" \
            "$PDF_DIR/BMPOA-Community-Guide.pdf" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            show_status "PDF generated successfully"
        else
            show_error "PDF generation failed"
        fi
    else
        # Create instructions for manual PDF generation
        cat > "$PDF_DIR/PDF_GENERATION.md" << 'EOF'
# PDF Generation Instructions

## Recommended Method: Browser Print

1. Open `build/bmpoa-guide-print.html` in Chrome or Firefox
2. Press Ctrl+P (or Cmd+P on Mac)
3. Configure print settings:
   - Destination: Save as PDF
   - Paper size: Letter (8.5" x 11")
   - Margins: None or Minimum
   - Scale: Default (100%)
   - Background graphics: ✓ Enabled
   - Pages: All
4. Click "Save" and name the file "BMPOA-Community-Guide.pdf"

## Alternative: Professional Tools

For higher quality PDFs, consider using:
- Adobe Acrobat
- Prince XML (princexml.com)
- WeasyPrint (weasyprint.org)

## Quality Check

After generating the PDF, verify:
- All pages are included (check page count)
- Images appear correctly
- Colored boxes and backgrounds are visible
- Text is readable and properly formatted
- Page breaks are appropriate
EOF
        
        show_warn "wkhtmltopdf not found - see $PDF_DIR/PDF_GENERATION.md for manual instructions"
    fi
fi

# Step 6: Create deployment package
show_info "Creating deployment package..."

# Create main README
cat > "$DEPLOY_DIR/README.md" << EOF
# BMPOA Community Guide - Deployment Package

Generated: $(date)

## Contents

$([ "$DEPLOY_TYPE" = "web" ] || [ "$DEPLOY_TYPE" = "both" ] && echo "- **web/**: Files for web hosting")
$([ "$DEPLOY_TYPE" = "pdf" ] || [ "$DEPLOY_TYPE" = "both" ] && echo "- **pdf/**: PDF version or generation instructions")

## Version Information

This deployment package contains the complete BMPOA Community Guide.

### Updates

For the most current information, always refer to:
- Website: www.bmpoa.org
- Email: secretary@bmpoa.org

## Distribution

- **Digital Distribution**: Share the PDF via email or download link
- **Print Distribution**: Use professional printing service for best results
- **Web Hosting**: Upload web/ contents to your server

## Support

For technical support with this guide:
- Check documentation in each subdirectory
- Contact BMPOA webmaster

---

© $(date +%Y) Blue Mountain Property Owners Association
EOF

# Create deployment archive
show_info "Creating deployment archive..."
ARCHIVE_NAME="bmpoa-guide-deploy-$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "$ARCHIVE_NAME" "$DEPLOY_DIR"

# Final summary
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Deployment directory: $DEPLOY_DIR"
echo "Archive created: $ARCHIVE_NAME"
echo ""

if [ "$DEPLOY_TYPE" = "web" ] || [ "$DEPLOY_TYPE" = "both" ]; then
    echo "Web files: $DEPLOY_DIR/web/"
fi

if [ "$DEPLOY_TYPE" = "pdf" ] || [ "$DEPLOY_TYPE" = "both" ]; then
    echo "PDF files: $DEPLOY_DIR/pdf/"
fi

echo ""
echo "Next steps:"
echo "1. Review the deployment package"
echo "2. Test all functionality"
echo "3. Deploy to production"
echo ""

show_status "Deployment preparation complete!"
