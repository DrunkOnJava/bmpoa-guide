# BMPOA Community Guide

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/DrunkOnJava/bmpoa-guide/commits/main)

## 📘 Overview

The Blue Mountain Property Owners Association (BMPOA) Community Guide is a comprehensive resource for new and existing residents of the Blue Mountain community in Linden, Virginia. This digital guide is designed to be viewed online and printed for distribution.

### Features

- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🖨️ **Print-Ready** - Optimized for high-quality printing
- ♿ **Accessible** - WCAG compliant with screen reader support
- 🌙 **Dark Mode** - Automatic dark mode for comfortable reading
- 🚀 **Fast Loading** - Progressive loading with visual feedback
- 🛠️ **Developer Friendly** - Comprehensive tooling and documentation

## 🚀 Quick Start

### Prerequisites

- Python 3.x or any web server
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning the repository)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DrunkOnJava/bmpoa-guide.git
   cd bmpoa-guide
   ```

2. **Make scripts executable** (first time only):
   ```bash
   chmod +x scripts/*.sh
   ```

3. **Start the local server**:
   ```bash
   ./scripts/serve.sh
   ```

4. **Open in browser**:
   - The script will automatically open your browser
   - Or manually visit: http://localhost:8080

### Building for Print

1. **Run the build script**:
   ```bash
   ./scripts/build.sh
   ```

2. **Open the print version**:
   - Open `build/bmpoa-guide-print.html` in your browser
   - Press Ctrl+P (or Cmd+P on Mac) to print

## 📁 Project Structure

```
bmpoa-guide/
├── index.html              # Main entry point for web viewing
├── css/
│   └── styles.css         # All styling for the guide
├── js/
│   └── load-sections.js   # Dynamic section loading
├── images/                # All images used in the guide
├── sections/              # Individual HTML files for each section
│   ├── cover-page.html
│   ├── introduction-page.html
│   ├── table-of-contents.html
│   ├── section-1-governance.html
│   ├── section-2-mountain-home.html
│   ├── section-3-wood-chipping.html
│   ├── section-4-fire-safety.html
│   ├── section-5-community-services.html
│   ├── section-6-deer-lake.html
│   ├── section-7-lodge.html
│   ├── section-8-communication.html
│   ├── section-9-contacts.html
│   ├── section-10-natural-attractions.html
│   ├── section-11-construction.html
│   ├── section-12-bear-safety.html
│   └── back-cover.html
├── scripts/
│   ├── serve.sh           # Local development server
│   └── build.sh           # Build script for print version
└── build/                 # Generated files for printing
```

## 🖨️ Printing Instructions

### Quick Print

1. Run `./scripts/build.sh` to create print version
2. Open `build/bmpoa-guide-print.html` in Chrome/Firefox
3. Press Ctrl+P (or Cmd+P on Mac)
4. Use recommended settings below

### Recommended Settings

1. **Paper Size**: Letter (8.5" × 11")
2. **Margins**: None or Minimum
3. **Scale**: Fit to page width
4. **Background Graphics**: ✅ Enabled (important for colored boxes)
5. **Page Orientation**: Portrait
6. **Print Quality**: High/Best

### Print Options

- **Digital PDF**: Save as PDF for digital distribution
- **Professional Printing**: Export as PDF and send to print shop
- **Home Printing**: Use high-quality paper (24-28 lb) for best results

### Deployment

For production deployment:
```bash
./scripts/deploy.sh [web|pdf|both]
```

This creates a deployment package with all necessary files.

## 🛠️ Development

### Development Scripts

The project includes several utility scripts in the `scripts/` directory:

#### Core Scripts
- **`serve.sh`** - Starts local development server
- **`build.sh`** - Builds the print-ready version
- **`deploy.sh`** - Prepares deployment packages for web/PDF

#### Utility Scripts
- **`validate.sh`** - Validates the guide for common issues
- **`optimize-images.sh`** - Checks image sizes and optimization
- **`image-audit.sh`** - Audits image references and finds missing files

### Adding New Sections

1. Create a new HTML file in `sections/`
2. Follow the existing section template structure
3. Add the section to `index.html` and `js/load-sections.js`
4. Run `./scripts/validate.sh` to check for issues

### Modifying Styles

- All styles are in `css/styles.css`
- Uses CSS variables for consistent theming
- Includes print-specific styles
- Supports dark mode for digital viewing
- Accessibility features (high contrast, reduced motion)

### Adding Images

1. Add images to the `images/` directory
2. Use relative paths in HTML: `src="images/filename.jpg"`
3. Optimize images for web (< 1MB recommended)
4. Run `./scripts/optimize-images.sh` to check sizes

## 📋 Content Guidelines

### Section Structure

Each section should follow this pattern:

```html
<div class="page">
    <div class="content-page">
        <div class="page-header">
            <h2 class="page-title">Section Title</h2>
        </div>
        <div class="content-body">
            <!-- Content here -->
        </div>
        <div class="page-footer">
            <div>BMPOA Community Guide</div>
            <div class="page-number">XX</div>
        </div>
    </div>
</div>
```

### Typography

- **Headings**: Use h1-h6 consistently
- **Body Text**: Keep paragraphs concise
- **Lists**: Use for easy scanning
- **Emphasis**: Use info boxes for important content

## 🐛 Troubleshooting

### Quick Diagnostics

Run the validation script to check for common issues:
```bash
./scripts/validate.sh
```

### Server Won't Start

- Ensure Python 3 is installed: `python3 --version`
- Try alternate port: Edit `PORT=8080` in `serve.sh`
- Check for port conflicts: `lsof -i :8080`

### Images Not Loading

- Run `./scripts/image-audit.sh` to find missing images
- Check image filenames (case-sensitive)
- Verify images exist in `images/` directory
- Clear browser cache

### Print Layout Issues

- Use Chrome or Firefox for best results
- Enable background graphics in print settings
- Check for CSS print media queries
- Ensure all sections loaded before printing

### JavaScript Errors

- Check browser console for errors
- Verify all section files exist
- Clear cache and reload
- Loading indicator shows progress

## 📞 Support

For questions about the guide content:
- Email: secretary@bmpoa.org
- Website: www.bmpoa.org

For technical issues with this digital guide:
- Check the troubleshooting section above
- Review browser console for errors

## 🔧 Advanced Features

### Accessibility

- Full keyboard navigation support
- Screen reader announcements
- High contrast mode support
- Reduced motion preferences respected

### Performance

- Progressive section loading with visual feedback
- Optimized image loading
- Print preparation ensures all content loaded
- Performance metrics logged to console

### URL Parameters

- `?print=true` - Auto-opens print dialog after loading

## 📄 License

© 2025 Blue Mountain Property Owners Association. All rights reserved.

This guide is for informational purposes only. For the most current information, visit www.bmpoa.org.

---

<div align="center">
  <p>Made with ❤️ for the Blue Mountain community</p>
  <p>
    <a href="https://github.com/DrunkOnJava/bmpoa-guide/issues">Report Issue</a> •
    <a href="https://github.com/DrunkOnJava/bmpoa-guide/pulls">Submit PR</a> •
    <a href="https://www.bmpoa.org">Visit BMPOA</a>
  </p>
</div>