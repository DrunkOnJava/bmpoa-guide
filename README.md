# BMPOA Community Guide - PDF Generation Project

[![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/DrunkOnJava/bmpoa-guide/commits/main)

## 📘 Overview

The Blue Mountain Property Owners Association (BMPOA) Community Guide is a comprehensive 95-page PDF document for residents of the Blue Mountain community in Linden, Virginia. This project uses React with @react-pdf/renderer and Tailwind CSS to generate a professionally formatted PDF with strict pagination and print optimization.

### Key Features

- 📄 **React PDF Generation** - Uses @react-pdf/renderer for precise PDF control
- 🎨 **Tailwind CSS Styling** - Component-based styling with Tailwind utilities
- 📖 **Two-Pass TOC Generation** - Accurate table of contents with page numbers
- 🖼️ **Optimized Images** - 17 pre-optimized images for fast rendering
- 📐 **Strict Pagination** - Ensures proper page breaks and formatting
- 🏗️ **Modular Architecture** - Each section is a separate React component

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git (for cloning the repository)
- Poppler utilities (for PNG generation):
  - macOS: `brew install poppler`
  - Ubuntu/Debian: `sudo apt-get install poppler-utils`
  - RHEL/CentOS: `sudo yum install poppler-utils`

### Installation & Build

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DrunkOnJava/bmpoa-guide.git
   cd bmpoa-guide
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Generate the PDF**:
   ```bash
   npm run pdf
   ```

4. **Find your build output**:
   - Latest build: `output/builds/[timestamp]/`
   - PDF: `output/builds/[timestamp]/BMPOA-Guide.pdf`
   - View builds: `npm run builds`

## 🏗️ How It Works

### PDF Generation Process

The project uses a sophisticated two-pass generation process:

1. **Asset Scanning** (`scripts/scan-assets.js`)
   - Scans the `images/optimized/` directory
   - Creates `src/assetMap.json` mapping image names to paths
   - Ensures all images are available for components

2. **Preliminary TOC Generation** (`scripts/generate-prelim-toc.js`)
   - Renders the entire document without page numbers
   - Counts actual pages for each section
   - Saves page mapping to `pageNumberMap.json`

3. **Final PDF Generation** (`generate-with-toc.js`)
   - Reads the page number mapping
   - Renders the final PDF with accurate TOC page references
   - Outputs to `output/BMPOA-Guide.pdf`

4. **PNG Screenshot Generation** (`scripts/generate-pdf-screenshots.js`)
   - Automatically runs after PDF creation
   - Uses `pdftoppm` to convert each PDF page to PNG
   - Saves to `output/PDF-Screenshots/` with 150 DPI resolution
   - Overwrites existing screenshots on each build

### Layout System Overview

The project offers multiple layout systems for different needs:

1. **Classic Layouts** - Original single-column layouts with standard spacing
2. **Dense Layouts** - Two-column layouts with sidebars for maximum content density
3. **Advanced Layouts** - Professional patterns inspired by ComponentGarden examples:
   - Card grids for services and features
   - Hierarchical lists for complex information
   - Timelines for processes and history
   - Feature boxes with icons
   - Professional quote styling
   - Badge elements for labels and metadata

See `PageTemplates.md` for complete documentation of all available layouts.

### Architecture Overview

```
Core Components:
├── src/generate-pdf.js         # Main PDF generation logic
├── src/FullAppNoJSX.js        # Root component assembling all pages
├── config.js                   # Theme colors and page definitions
└── src/components/            # Individual page components
    ├── CoverPageNoJSX.js
    ├── TOCPageNoJSX.js        # Table of Contents with dynamic page numbers
    ├── IntroductionPageNoJSX.js
    ├── GovernancePageNoJSX-Enhanced.js
    ├── MountainHomePageNoJSX.js
    ├── WoodChippingPageNoJSX.js
    ├── FireSafetyPageNoJSX-Enhanced.js
    ├── CommunityServicesPageNoJSX-Enhanced.js
    ├── DeerLakePageNoJSX.js
    ├── LodgePageNoJSX.js
    ├── CommunicationPageNoJSX.js
    ├── ContactsPageNoJSX.js
    ├── NaturalAttractionsPageNoJSX.js
    ├── ConstructionPageNoJSX.js
    ├── BearSafetyPageNoJSX.js
    └── BackCoverPageNoJSX.js
```

### Component Pattern

All components follow a similar pattern, returning arrays of Page elements:

```javascript
export default function SectionNamePageNoJSX({ pageNumberMap }) {
  return [
    e(Page, { size: "LETTER", style: pageStyles },
      e(View, { style: styles.page },
        // Page content here
      )
    ),
    // Additional pages if needed
  ];
}
```

### Advanced Layout Components (NEW)

The project now includes advanced layout components inspired by professional document design:

#### Available Advanced Components:
- **CardGrid**: 2x2 or 3x2 grid layouts for services, features, or contact cards
- **HierarchicalList**: Multi-level lists with proper indentation and styling
- **Timeline**: Visual timeline for historical events or processes
- **FeatureBox**: Highlighted boxes with icons for key features
- **SidebarBox**: Colored sidebar boxes for tips, warnings, or highlights
- **QuoteBox**: Professional quote styling with attribution
- **Badge**: Corner badges or inline badges for labels
- **MixedLayout**: Container for combining different layout patterns
- **CoverHeader**: Professional header badges for cover pages
- **TOCEntry**: Structured table of contents entries with hierarchy

See `src/components/AdvancedLayoutComponents.js` for implementation details and `src/components/ExampleAdvancedLayouts.js` for usage examples.

### Extended Layout Components (NEW)

Additional components extracted from ComponentGarden analysis:

#### Available Extended Components:
- **DecorativeStars**: Visual section separator with star symbols
- **ImageCaptionBox**: Image container with centered italic captions
- **FullWidthInfoBox**: Full-width colored boxes for important information
- **ChecklistBox**: Enhanced checklist with yellow background and green checkmarks
- **NumberedRequirements**: Formatted numbered lists for requirements
- **SectionHeaderUnderlined**: Headers with blue underline accent
- **RiskLevelBox**: Categorized risk information display
- **ContactCard**: Card-style contact information with icons
- **BurnBanBox**: Red alert box for fire safety warnings
- **MeetingPlaces**: Numbered location listings
- **SeasonalInfo**: Inline seasonal date information
- **SpecificationList**: Bulleted technical specifications

See `src/components/ExtendedLayoutComponents.js` for implementation details and `src/components/ExampleExtendedLayouts.js` for usage examples.

### Styling Approach

- Uses inline styles with React PDF's StyleSheet API
- Tailwind-inspired utility classes converted to React PDF styles
- Consistent theme colors from `config.js`
- Responsive layouts that work well in PDF format

## 📁 Project Structure

```
bmpoa-guide/
├── package.json           # Node.js dependencies and scripts
├── config.js             # Theme configuration and page definitions
├── generate-with-toc.js  # Final PDF generation entry point
├── tailwind.config.js    # Tailwind CSS configuration
├── PageTemplates.md      # Single source of truth for layout designs
├── src/
│   ├── generate-pdf.js   # Core PDF generation logic
│   ├── FullAppNoJSX.js  # Main app component
│   ├── assetMap.json    # Generated image asset mapping
│   ├── theme.js         # Theme utilities
│   ├── imageStyles.js   # Image styling utilities
│   └── components/      # React components for each section
│       ├── EnhancedLayoutComponents.js  # Dense layout components
│       ├── AdvancedLayoutComponents.js  # Professional patterns
│       ├── ExtendedLayoutComponents.js  # Additional extracted patterns
│       ├── SectionDivider.js           # Standardized dividers
│       ├── ExampleAdvancedLayouts.js   # Advanced component examples
│       ├── ExampleExtendedLayouts.js   # Extended component examples
│       └── [Section]PageNoJSX.js       # Individual sections
├── scripts/
│   ├── scan-assets.js   # Image asset scanner
│   ├── generate-prelim-toc.js  # TOC page number calculator
│   └── optimize-images.js      # Image optimization utility
├── images/
│   └── optimized/       # Pre-optimized images (17 files)
├── css/
│   ├── input.css        # Tailwind CSS input
│   └── tailwind-output.css  # Generated Tailwind output
├── ComponentFarm/       # Layout inspiration library
│   └── ComponentGarden/ # Professional layout examples
├── output/              # Generated output
│   ├── BMPOA-Guide.pdf  # Latest PDF (legacy location)
│   └── builds/          # Timestamped builds
│       └── YYYY-MM-DDTHH-MM-SS/
│           ├── BMPOA-Guide.pdf
│           ├── png-highres/     # High-quality PNGs
│           ├── jpg-efficient/   # Efficient JPEGs
│           └── png-renamed/     # Renamed files
└── Archive/             # Archived files from previous implementations
    ├── html-implementation/    # Previous HTML-based approach
    ├── unused-components/      # Alternative component versions
    ├── test-files/            # Test and development files
    ├── documentation/         # Additional docs
    └── alternative-implementations/  # Other approaches
```

## 📋 Available Scripts

### Main Build Command
```bash
npm run pdf
```
This runs the complete PDF generation process:
1. Scans and maps image assets
2. Generates preliminary TOC with page counting
3. Creates final PDF with accurate page references
4. Creates timestamped build folder with:
   - PDF file
   - High-resolution PNG screenshots (150 DPI)
   - Efficient JPEG versions (50% size)
5. Automatically analyzes pages for content and layout issues

**New Build System**: Each build is saved in `output/builds/YYYY-MM-DDTHH-MM-SS/` to preserve your work. See [BUILD-SYSTEM.md](BUILD-SYSTEM.md) for details.

**Style Analysis**: Advanced style guide compliance checking with scoring. See [STYLE-ANALYSIS.md](STYLE-ANALYSIS.md) for details.

### Build Management & Analysis
```bash
npm run builds              # List all builds with details
npm run builds:latest       # Show latest build info
npm run builds:clean        # Remove old builds (keeps 3 most recent)
npm run builds:analyze      # Run/resume content analysis on latest build
npm run build:status        # Check status of all automated processes
npm run build:monitor       # Launch real-time activity monitor (new window)
npm run build:restart       # Restart failed analysis processes
```

### Automated Analysis Features (NEW)

The build system now includes **two automated Claude analysis bots** that run after PDF generation:

1. **Content Analysis Bot** (Claude 3.5 Haiku)
   - Analyzes each page for content and layout issues
   - Generates descriptive filenames with issue flags
   - Identifies: BLANK, ORPHAN, WIDOW, MISALIGNED, OVERFLOW, CUTOFF, etc.
   - Output: `suggested-filenames.txt` and `layout-issues.txt`

2. **Style Analysis Bot** (Claude 3.5 Sonnet)
   - Deep analysis against the enhanced style guide
   - Scores each page on professionalism and presentation
   - Identifies critical/major/minor violations with specific fixes
   - **NEW**: Outputs results iteratively as each page is analyzed
   - Output: `style-analysis-report.md` and `style-violations.json`

Both bots run automatically in the background after PDF generation. Monitor with:
```bash
npm run build:monitor    # Real-time activity monitor
npm run build:status     # Quick status check
```

### Style Analysis Scripts
```bash
npm run style:analyze       # Run complete style guide analysis
npm run style:extract       # Extract React/Tailwind suggestions
npm run style:report        # Generate HTML report
npm run screenshots:rename  # Auto-rename PDF screenshots
```

### Individual Scripts
```bash
npm run scan:assets         # Scan images and create asset map
npm run generate:pdf:pre    # Generate preliminary PDF for page counting
npm run generate:pdf:final  # Generate final PDF with TOC
npm run build:css          # Build Tailwind CSS (with watch mode)
npm run build:css:prod     # Build minified Tailwind CSS
```

## 📚 Component Documentation (NEW!)

Before developing any pages, review our comprehensive component documentation:

### Essential Developer Resources
- **[COMPONENT-CATALOG.md](COMPONENT-CATALOG.md)** - Complete documentation of all 20+ components
- **[VISUAL-COMPONENT-GUIDE.md](VISUAL-COMPONENT-GUIDE.md)** - Visual reference showing what each component looks like
- **[COMPONENT-QUICK-REFERENCE.md](COMPONENT-QUICK-REFERENCE.md)** - Printable cheat sheet for quick lookups
- **[SECTION-IMPLEMENTATION-GUIDE.md](SECTION-IMPLEMENTATION-GUIDE.md)** - Specific recommendations for each section

### Why Use Pre-Built Components?
- ✅ **Save Time** - Don't reinvent the wheel
- ✅ **Stay Consistent** - Maintain visual cohesion
- ✅ **Professional Quality** - Tested and refined designs
- ✅ **Easy to Use** - Simple import and implement

## 🛠️ Development

### 📋 Current Development Plan

**IMPORTANT**: Before making any changes to this project, please refer to:
- **[ProjectPlan.txt](ProjectPlan.txt)** - Comprehensive enhancement plan for pages 27-95
- **[CLAUDE.md](CLAUDE.md)** - Detailed technical guidance for AI assistants
- **[EnhancementPlanPages1to26.txt](EnhancementPlanPages1to26.txt)** - Completed enhancements (pages 1-26)
- **[EnhancementPlanPages27to95.txt](EnhancementPlanPages27to95.txt)** - Source enhancement requirements

The project is currently in **Phase 1** of a 4-phase enhancement plan. See ProjectPlan.txt for:
- Detailed task breakdown by phase and priority
- Global style guidelines and consistency requirements
- Implementation notes and success metrics
- ~73 specific enhancement tasks to be completed

### 🎨 Enhanced Style Guide (NEW)

**Important**: The project now uses an enhanced dense layout system to maximize information per page:

**CRITICAL DESIGN DECISION**: Section dividers must be KEPT. Do not remove or merge section divider pages with content pages. Each section should maintain its full-page divider for visual separation and navigation clarity.

### Design Resources
- **[PageTemplates.md](PageTemplates.md)** - Single source of truth for all page layout designs and styling options
- **[enhanced-style-guide.md](enhanced-style-guide.md)** - Complete specifications for dense layouts
- **[page-density-recommendations.md](page-density-recommendations.md)** - Specific implementation guidance

### Component Libraries
- **Enhanced Components**: `src/components/EnhancedLayoutComponents.js` - Dense layout components
- **Advanced Components**: `src/components/AdvancedLayoutComponents.js` - Professional layout patterns
- **Example Implementations**: 
  - `src/components/ExampleDensePageRefactor.js` - Dense layout examples
  - `src/components/ExampleAdvancedLayouts.js` - Advanced layout examples

### Layout Options
1. **Classic Layouts**: Single column, traditional spacing
2. **Dense Layouts**: Two-column with sidebars, maximized content
3. **Advanced Layouts**: Card grids, timelines, hierarchical lists
4. **Mixed Layouts**: Combination of different patterns on same page

Key targets:
- 85-90% page space utilization (vs current ~60%)
- Two-column layouts with sidebars
- 25-30% reduction in total page count
- Compact tables, lists, and spacing throughout

### Adding New Sections

1. Create a new component in `src/components/`
2. **Use the enhanced layout components** for dense, professional layouts:
   ```javascript
   import React from 'react';
   import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
   import {
     TwoColumnLayout,
     QuickFactsBox,
     InfoBox,
     CompactTable,
     DenseText,
     CompactSectionHeader
   } from './EnhancedLayoutComponents';
   
   export default function NewSectionPageNoJSX({ pageNumberMap }) {
     const e = React.createElement;
     
     // Create sidebar content
     const sidebarContent = [
       e(QuickFactsBox, { facts: [...] }),
       e(InfoBox, { title: 'Hours' }, ...)
     ];
     
     return [
       e(Page, { size: "LETTER", style: { padding: '0.75in' } },
         e(TwoColumnLayout, { sidebarContent },
           // Main content with dense spacing
         )
       )
     ];
   }
   ```
3. Follow the pattern in `ExampleDensePageRefactor.js` for optimal layouts
3. Import and add it to `src/FullAppNoJSX.js`
4. Add the section to `config.js` pages array
5. Run `npm run pdf` to test

### Working with Images

1. Add optimized images to `images/optimized/`
2. Run `npm run scan:assets` to update the asset map
3. Import and use in components:
   ```javascript
   import assetMap from '../assetMap.json';
   import { Image } from '@react-pdf/renderer';
   
   e(Image, { 
     src: assetMap['your-image.jpg'], 
     style: styles.image 
   })
   ```

### Styling Guidelines

- Use React PDF's StyleSheet API for all styles
- Reference theme colors from `config.js`
- Common style patterns are in `src/theme.js`
- Image styling utilities in `src/imageStyles.js`

## 🎨 Component Features

### Enhanced Components

Some sections use enhanced versions with additional features:
- `GovernancePageNoJSX-Enhanced.js` - Multi-page governance structure
- `FireSafetyPageNoJSX-Enhanced.js` - Detailed fire safety guidelines
- `CommunityServicesPageNoJSX-Enhanced.js` - Comprehensive services listing

### Common Design Patterns

- **Page Headers**: Consistent section headers with styling
- **Info Boxes**: Highlighted important information
- **Contact Cards**: Structured contact information display
- **Image Captions**: Consistent image presentation
- **Multi-column Layouts**: For lists and side-by-side content

## 🐛 Troubleshooting

### PDF Generation Issues

**Build fails with module errors:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run pdf
```

**Images not appearing in PDF:**
- Ensure images are in `images/optimized/`
- Run `npm run scan:assets` to update mapping
- Check console for image loading errors

**TOC page numbers incorrect:**
- Delete `pageNumberMap.json`
- Run `npm run pdf` again for fresh generation

**Memory issues with large PDFs:**
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run pdf
```

### Development Tips

- The two-pass generation ensures accurate page numbers
- Each component returns an array of pages
- Use `console.log` in components for debugging
- Check `output/` folder for the generated PDF

## 📞 Support

For questions about the guide content:
- Email: secretary@bmpoa.org
- Website: www.bmpoa.org

For technical issues with PDF generation:
- Check the troubleshooting section above
- Review console output for detailed error messages
- Ensure all dependencies are properly installed

## 🚀 Performance

- **Generation Time**: ~2-3 seconds for 95-page PDF
- **File Size**: ~3.4MB with 17 optimized images
- **Memory Usage**: Typically under 1GB
- **Image Optimization**: Pre-optimized for fast rendering

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