# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current Development Status

**IMPORTANT**: The project is currently undergoing Phase 1 of a comprehensive enhancement plan. Before making any changes:

1. **Review [ProjectPlan.txt](ProjectPlan.txt)** - Contains the complete 4-phase enhancement plan with 73 specific tasks
2. **Check completed work** in [EnhancementPlanPages1to26.txt](EnhancementPlanPages1to26.txt)
3. **Reference requirements** in [EnhancementPlanPages27to95.txt](EnhancementPlanPages27to95.txt)

Current Phase: **Phase 4** (Pages 79-100)
- 11 tasks remaining: 8 for Construction section, 3 for Bear Safety section
- Focus on flowchart resizing, table headers, compliance call-out boxes, and back cover

## 🎨 IMPORTANT: Enhanced Style Guide System

The project now uses an enhanced dense layout system. **ALL new development and fixes should follow these guidelines**:

### Required Reading
1. **[PageTemplates.md](PageTemplates.md)** - Single source of truth for all page layout designs and styling options
2. **[enhanced-style-guide.md](enhanced-style-guide.md)** - Complete specifications for dense layouts
3. **[page-density-recommendations.md](page-density-recommendations.md)** - Implementation guidance
4. **[src/components/EnhancedLayoutComponents.js](src/components/EnhancedLayoutComponents.js)** - Pre-built dense layout components
5. **[src/components/AdvancedLayoutComponents.js](src/components/AdvancedLayoutComponents.js)** - Professional layout patterns from ComponentGarden
6. **[src/components/ExampleDensePageRefactor.js](src/components/ExampleDensePageRefactor.js)** - Dense layout examples
7. **[src/components/ExampleAdvancedLayouts.js](src/components/ExampleAdvancedLayouts.js)** - Advanced layout examples

### Key Requirements
- **85-90% page space utilization** (current pages only use ~60%)
- **Two-column layouts** with sidebars for all service/facility pages
- **Compact spacing**: Reduce all spacing by 25-35%
- **Use enhanced components** from EnhancedLayoutComponents.js
- **Target 25-30% page reduction** through consolidation

### When Working on Pages
1. Check if page can be converted to two-column layout
2. Add sidebar components (QuickFactsBox, InfoBox, contact cards)
3. Use CompactTable instead of regular tables
4. Replace bullet lists with TwoColumnList where appropriate
5. Use DenseText for paragraphs (10pt font, 1.4 line height)
6. Consolidate related sparse pages into single dense pages

## Build Commands

**Generate PDF (main command):**
```bash
npm run pdf
```

This executes an enhanced multi-step process:
1. `npm run scan:assets` - Scans images/optimized/ and creates src/assetMap.json
2. `npm run generate:pdf:pre` - Generates preliminary PDF to count pages
3. `npm run generate:pdf:final` - Creates final PDF with accurate TOC
4. **NEW**: Automated content analysis (Claude Haiku) runs in background
5. **NEW**: Automated style analysis (Claude Sonnet) runs after content analysis
6. **NEW**: PDF screenshots renamed with descriptive names

Output: 
- PDF: `output/BMPOA-Guide.pdf` (101 pages, ~3.8MB)
- Build: `output/builds/YYYY-MM-DDTHH-MM-SS/` (timestamped)

**Build monitoring and management:**
```bash
npm run build:status       # Check status of all automated processes
npm run build:monitor      # Launch real-time activity monitor (new window)
npm run build:restart      # Restart failed analysis processes
npm run builds             # List all builds with details
npm run builds:latest      # Show latest build info
npm run builds:analyze     # Run/resume content analysis
npm run screenshots:rename # Auto-rename PDF screenshots
```

**Individual commands:**
```bash
npm run build:css          # Build Tailwind CSS with watch mode
npm run build:css:prod     # Build minified Tailwind CSS
```

## Automated Analysis System

After running `npm run pdf`, two Claude analysis bots automatically process your build:

### 1. Content Analysis (Claude 3.5 Haiku)
- Analyzes each page for layout issues
- Generates descriptive filenames with flags:
  - `BLANK` - Blank or nearly blank pages
  - `ORPHAN` - Orphaned paragraphs
  - `WIDOW` - Widow lines
  - `MISALIGNED` - Alignment issues
  - `TABLE` - Contains tables
  - `IMAGE` - Contains images
  - `CALLOUT` - Call-out boxes
  - `CUTOFF` - Cut-off content
  - `OVERFLOW` - Text overflow
- Outputs: `suggested-filenames.txt`, `layout-issues.txt`

### 2. Style Analysis (Claude 3.5 Sonnet)
- Deep style guide compliance checking
- Scores each page:
  - Professionalism Score (0-100%)
  - Presentation Score (0-100%)
  - Overall Compliance (0-100%)
- Identifies violations:
  - **Critical**: Content cutoff, unreadable text, broken layouts
  - **Major**: Font size issues, orphans/widows, misalignment
  - **Minor**: Spacing variations, caption inconsistencies
- **NEW**: Results written iteratively as each page completes
- Outputs: `style-analysis-report.md`, `style-violations.json`

Monitor the automated analysis:
```bash
# Real-time monitoring in new window
npm run build:monitor

# Quick status check
npm run build:status

# View results
cat output/builds/latest/style-analysis-report.md
cat output/builds/latest/suggested-filenames.txt
```

## Architecture Overview

### Two-Pass PDF Generation Process

The project uses a sophisticated two-pass generation to ensure accurate table of contents:

1. **First Pass** (`src/generate-pdf.js::createPrelimTOC`):
   - Renders document with empty pageNumberMap
   - Counts actual pages using pdf-lib
   - Saves mapping to `pageNumberMap.json`

2. **Second Pass** (`src/generate-pdf.js::createFinalPDF`):
   - Reads page mapping from JSON
   - Renders final PDF with correct page numbers in TOC
   - Uses @react-pdf/renderer's render() method

### Component Architecture

All components follow a NoJSX pattern using React.createElement:

```javascript
export default function ComponentNamePageNoJSX({ pageNumberMap }) {
  const e = React.createElement;
  
  return [
    e(Page, { size: "LETTER", style: pageStyles },
      e(View, { style: styles.page },
        // Content here
      )
    )
  ];
}
```

**Key patterns:**
- Components return arrays of Page elements (allows multi-page sections)
- Enhanced versions exist for complex sections (e.g., GovernancePageNoJSX-Enhanced.js)
- Dense versions for space optimization (e.g., WoodChippingPageNoJSX-Dense.js)
- Images loaded via `assetMap.json` (generated by scan:assets)

**Component Libraries:**
- `DesignComponents.js` - Original shared components
- `EnhancedLayoutComponents.js` - Dense layout components (two-column, sidebars)
- `AdvancedLayoutComponents.js` - Professional patterns (card grids, timelines, badges)
- `SectionDivider.js` - Standardized section divider component

### Project Entry Points

1. `generate-with-toc.js` - Final PDF generation entry
2. `scripts/generate-prelim-toc.js` - Preliminary TOC entry
3. `src/FullAppNoJSX.js` - Main document component that assembles all sections
4. `src/generate-pdf.js` - Core PDF generation logic

### Configuration System

- `config.js` - Theme colors, spacing, and page definitions
- `src/theme.js` - Comprehensive StyleSheet with typography and layout styles
- `src/imageStyles.js` - Image styling utilities
- `src/assetMap.json` - Generated mapping of image names to paths

## Working with Components

### Using Enhanced Layout Components (REQUIRED)

When creating or modifying pages, use the appropriate component library:

**Enhanced Components (Dense Layouts):**
```javascript
import {
  TwoColumnLayout,      // For main+sidebar layouts
  QuickFactsBox,        // Sidebar quick facts
  InfoBox,              // Sidebar info boxes
  CompactTable,         // Dense tables with alternating rows
  DenseText,            // Paragraphs with tight spacing
  CompactSectionHeader, // Section headers (20pt)
  CompactSubsectionHeader, // Subsection headers (16pt)
  InlineInfo,           // Key-value pairs in single line
  TwoColumnList         // Bullet lists in two columns
} from './EnhancedLayoutComponents';
```

**Advanced Components (Professional Patterns):**
```javascript
import {
  CardGrid,             // 2x2 or 3x2 grid for services/contacts
  HierarchicalList,     // Multi-level lists with indentation
  Timeline,             // Visual timeline for events
  FeatureBox,           // Highlighted boxes with icons
  SidebarBox,           // Colored boxes for tips/warnings
  QuoteBox,             // Professional quote styling
  Badge,                // Corner badges or inline labels
  MixedLayout,          // Container for mixed patterns
  CoverHeader,          // Professional cover page headers
  TOCEntry              // Structured TOC entries
} from './AdvancedLayoutComponents';
```

Example usage:
```javascript
// Create sidebar content
const sidebarContent = [
  e(QuickFactsBox, { facts: [
    { label: 'Hours', value: '8am-5pm' },
    { label: 'Location', value: 'Deer Lake' }
  ]}),
  e(InfoBox, { title: 'Contact' }, 
    e(Text, null, 'Phone: (540) 635-0922')
  )
];

// Use two-column layout
return e(Page, { size: 'LETTER', style: { padding: '0.75in' } },
  e(TwoColumnLayout, { sidebarContent },
    // Main content here
  )
);
```

### Adding New Sections

1. Create component in `src/components/` following the NoJSX pattern
2. **MUST use enhanced layout components** for dense layouts
3. Import and add to `src/FullAppNoJSX.js` (note: some components are called as functions, others with createElement)
4. Add section to `config.js` pages array
5. Run `npm run pdf` to test

### Image Handling

1. Place optimized images in `images/optimized/`
2. Run `npm run scan:assets` to update mapping
3. Import assetMap in component: `import assetMap from '../assetMap.json'`
4. Use: `e(Image, { src: assetMap['filename.jpg'], style: styles.image })`

## Important Implementation Details

- The main app (`FullAppNoJSX.js`) uses `.flat()` because some components return arrays
- Some components use `createElement`, others are called as functions - check existing pattern
- All styles must use React PDF's StyleSheet API, not CSS classes
- Memory issues on large PDFs: use `NODE_OPTIONS="--max-old-space-size=4096" npm run pdf`
- If TOC page numbers are wrong, delete `pageNumberMap.json` and regenerate

## Archive Structure

Previous implementations have been moved to Archive/:
- `html-implementation/` - Original HTML-based approach
- `unused-components/` - Alternative component versions
- `test-files/` - Development test files
- `alternative-implementations/` - Other approaches tried

## Referenced Files

- `/Users/griffin/Documents/bmpoa-guide/ProjectPlan.txt` - **PRIMARY REFERENCE**: Comprehensive 4-phase enhancement plan with 73 tasks for pages 27-95. Check this file FIRST before making any changes.
- `/Users/griffin/Documents/bmpoa-guide/EnhancementPlanPages1to26.txt` - Completed enhancement tasks for pages 1-26. Use as reference for style consistency.
- `/Users/griffin/Documents/bmpoa-guide/EnhancementPlanPages27to95.txt` - Detailed source requirements for ongoing enhancements. ProjectPlan.txt is derived from this.

## Development Workflow

When continuing development:

1. **Check ProjectPlan.txt** to identify the current phase and pending tasks
2. **Work on HIGH priority tasks first** within each phase
3. **Mark tasks as completed** by updating the checkboxes in ProjectPlan.txt
4. **Test PDF generation** after each component update with `npm run pdf`
5. **Verify styling consistency** against the global style guidelines in ProjectPlan.txt
6. **Complete all tasks in a phase** before moving to the next phase

Current Status:
- Pages 1-26: ✅ Phase 1 Complete (30 tasks completed)
- Pages 27-42: ✅ Phase 2 Complete (18 tasks completed)
- Pages 43-78: ✅ Phase 3 Complete (14 tasks completed)
- Pages 79-100: 🔄 Phase 4 In Progress (11 tasks remaining)

## Quick Style Reference

### Page Density Targets
- **Space utilization**: 85-90% (vs current 60%)
- **Margins**: 0.75" (reduced from 1")
- **Font sizes**: Headers 20pt, Subheaders 16pt, Body 10.5pt
- **Line height**: 1.4 (reduced from 1.5)
- **Paragraph gap**: 8pt (reduced from 12pt)

### Layout Patterns
- **Service pages**: Two-column with sidebar (65/35 split)
- **Information pages**: Main content + quick reference sidebar
- **Policy pages**: Consolidate related topics, use call-out boxes
- **Contact pages**: Card layouts in grid format

### Must-Use Components
- `TwoColumnLayout` for all non-cover pages
- `QuickFactsBox` for key information in sidebars
- `CompactTable` instead of regular tables
- `DenseText` for all body paragraphs
- `InlineInfo` for short key-value pairs