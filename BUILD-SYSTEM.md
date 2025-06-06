# Build System Documentation

## Overview

The BMPOA Guide now uses a timestamped build system that preserves each build's outputs and automatically analyzes PDF pages for content and layout issues.

## Key Features

1. **Timestamped Builds** - Each build creates a unique folder with timestamp
2. **No Data Loss** - Previous builds are preserved, not overwritten
3. **Automated Analysis** - Pages are automatically analyzed after PDF generation
4. **Multi-Format Output** - Each build contains PDF, high-res PNGs, and efficient JPEGs
5. **Layout Issue Detection** - Identifies alignment, overflow, orphan text, and other issues

## Build Structure

Each build creates this structure:
```
output/builds/2025-01-06T12-30-45/
├── BMPOA-Guide.pdf           # The generated PDF
├── build-info.json           # Build metadata
├── png-highres/              # High-resolution PNG images (150 DPI)
│   ├── page-001.png
│   ├── page-002.png
│   └── ... (all pages)
├── jpg-efficient/            # Efficient JPEG images (50% size, 70% quality)
│   ├── page-001.jpg
│   ├── page-002.jpg
│   └── ... (all pages)
├── suggested-filenames.txt   # Rename suggestions (after analysis)
├── layout-issues.txt         # Pages with detected issues
├── analysis-complete.flag    # Indicates analysis is done
└── png-renamed/              # Renamed PNGs (after applying suggestions)
```

## Commands

### Generate PDF with New Build System
```bash
npm run pdf
```

This command:
1. Generates the PDF with accurate TOC
2. Creates a timestamped build folder
3. Generates high-res PNG screenshots
4. Creates efficient JPEG versions
5. Starts automated page analysis in background

### Manage Builds
```bash
# List all builds with details
npm run builds

# Show latest build info
npm run builds:latest

# Clean old builds (keeps 3 most recent)
npm run builds:clean

# Run/resume analysis on latest build
npm run builds:analyze
```

### Manual Commands
```bash
# Apply rename suggestions for a specific build
./scripts/apply-build-renames.sh 2025-01-06T12-30-45

# Open a build folder (macOS)
./scripts/manage-builds.sh open 2025-01-06T12-30-45
```

## Workflow

### 1. Generate PDF
```bash
npm run pdf
```

Output:
```
✅ PDF generated successfully
📸 Creating timestamped build with PDF screenshots...
✅ Created build directory: output/builds/2025-01-06T12-30-45
✅ Generated 100 high-resolution PNG files
✅ Created 100 efficient JPEG files

🤖 Starting automated image analysis...
   This will run in the background. Check progress with:
   tail -f output/builds/2025-01-06T12-30-45/suggested-filenames.txt
```

### 2. Monitor Analysis Progress
The analysis runs automatically in background. Check progress:
```bash
# Watch live progress
tail -f output/builds/$(ls -1t output/builds | head -1)/suggested-filenames.txt

# Or check build status
npm run builds:latest
```

### 3. Review Results
Once analysis is complete:
```bash
# View all suggestions
cat output/builds/$(ls -1t output/builds | head -1)/suggested-filenames.txt

# View pages with issues
cat output/builds/$(ls -1t output/builds | head -1)/layout-issues.txt
```

### 4. Apply Renames (Optional)
```bash
# Get the latest build timestamp
npm run builds:latest

# Apply renames
./scripts/apply-build-renames.sh 2025-01-06T12-30-45
```

## Analysis Features

### Detected Issues
- **BLANK** - Blank or nearly blank pages
- **ORPHAN** - Orphaned paragraphs
- **WIDOW** - Widow lines
- **MISALIGNED** - Alignment issues
- **CUTOFF** - Content cut off at margins
- **OVERFLOW** - Text overflow
- **OVERLAP** - Overlapping elements

### Content Elements
- **TABLE** - Contains tables
- **IMAGE** - Contains images
- **CALLOUT** - Call-out boxes

### Example Filenames
```
001-ORPHAN-MISALIGNED-OVERFLOW-Lake-Recreation-Section.png
027-TABLE-CUTOFF-Fire-Safety-Guidelines.png
042-Community-Welcome-Letter.png (no issues)
056-BLANK.png
```

## Benefits

1. **Version Control** - Keep multiple builds for comparison
2. **Quality Assurance** - Automatically identify layout issues
3. **Efficient Storage** - JPEGs for analysis, PNGs for high quality
4. **Interrupted Recovery** - Analysis can resume if interrupted
5. **Batch Processing** - All images converted at once for efficiency

## Disk Space Management

Each build uses approximately:
- PDF: ~3.4 MB
- PNGs: ~120 MB (100 pages @ ~1.2 MB each)
- JPEGs: ~5 MB (100 pages @ ~50 KB each)
- Total: ~130 MB per build

Use `npm run builds:clean` to remove old builds (keeps 3 most recent).

## Troubleshooting

### Analysis Not Starting
- Check if `pdftoppm` is installed: `brew install poppler`
- Check if ImageMagick is installed: `brew install imagemagick`
- Manually start: `npm run builds:analyze`

### Resume Interrupted Analysis
The analysis automatically resumes from where it left off:
```bash
./scripts/analyze-latest-build.sh
```

### View Build Details
```bash
npm run builds
```
Shows for each build:
- Creation timestamp
- Number of pages
- Analysis status (Not Started/In Progress/Complete)
- Issues found
- Rename status
- Total size