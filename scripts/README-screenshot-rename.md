# PDF Screenshot Rename Scripts

These scripts help analyze and rename the PNG screenshots generated from the PDF build process, including detection of layout issues and content problems.

## Prerequisites

- ImageMagick: `brew install imagemagick`
- Claude CLI with Haiku model access

## Scripts

### Basic Scripts

#### 1. `test-single-rename.sh`
Test the rename process on a single image (basic content analysis).

```bash
./scripts/test-single-rename.sh 001
```

#### 2. `rename-pdf-screenshots.sh`
Process all PDF screenshots with basic content analysis.

```bash
./scripts/rename-pdf-screenshots.sh
```

### Enhanced Scripts (Recommended)

#### 3. `test-single-rename-enhanced.sh`
Test enhanced analysis on a single image, including layout issue detection.

```bash
./scripts/test-single-rename-enhanced.sh 001
```

#### 4. `rename-pdf-screenshots-enhanced.sh`
Process all PDF screenshots with comprehensive analysis.

```bash
./scripts/rename-pdf-screenshots-enhanced.sh
```

This enhanced script:
- Pre-converts all images to JPEG at once (faster processing)
- Analyzes content AND layout issues
- Detects: blank pages, orphaned text, alignment issues, tables, images, call-out boxes, cut-off content
- Creates two output files:
  - `output/suggested-filenames-enhanced.txt` - All rename suggestions
  - `output/layout-issues.txt` - List of pages with problems
- Appends issue codes to filenames (e.g., `005-Fire-Safety-TABLE-ALIGN.png`)

#### 5. `rename-pdf-range.sh`
Process a specific range of pages.

```bash
./scripts/rename-pdf-range.sh 1 10
```

#### 6. `apply-screenshot-renames.sh`
Apply the suggested renames after reviewing them.

```bash
# For basic suggestions
./scripts/apply-screenshot-renames.sh

# For enhanced suggestions
./scripts/apply-screenshot-renames.sh output/suggested-filenames-enhanced.txt
```

This creates renamed copies in `output/PDF-Screenshots-Renamed/`

## Issue Codes

The enhanced scripts prepend these flags to filenames when issues are detected:

Layout Issues:
- **BLANK** - Blank or nearly blank page
- **ORPHAN** - Orphaned paragraph (single paragraph at top/bottom)
- **WIDOW** - Widow line (single line at top of page)
- **MISALIGNED** - Text or element alignment issues
- **CUTOFF** - Content is cut off at margins
- **OVERFLOW** - Text overflows margins
- **OVERLAP** - Elements overlap each other

Content Elements:
- **TABLE** - Page contains a table
- **IMAGE** - Page contains images
- **CALLOUT** - Contains call-out boxes or highlighted sections

Filename Structure:
```
[PageNum]-[FLAGS]-[Content-Description].png
```

## Workflow

### Quick Analysis (Enhanced - Recommended)

1. Generate PDF and screenshots:
   ```bash
   npm run pdf
   ```

2. Test enhanced analysis on one image:
   ```bash
   ./scripts/test-single-rename-enhanced.sh 001
   ```

3. Process all images with layout analysis:
   ```bash
   ./scripts/rename-pdf-screenshots-enhanced.sh
   ```

4. Review layout issues:
   ```bash
   cat output/layout-issues.txt
   ```

5. Review all suggestions:
   ```bash
   cat output/suggested-filenames-enhanced.txt
   ```

6. Apply renames:
   ```bash
   ./scripts/apply-screenshot-renames.sh output/suggested-filenames-enhanced.txt
   ```

### Example Output

Pages are renamed to show issues first, then content:
- `page-001.png` → `001-ORPHAN-MISALIGNED-OVERFLOW-Lake-Recreation-Section.png`
- `page-027.png` → `027-TABLE-CUTOFF-Fire-Safety-Guidelines.png`
- `page-042.png` → `042-Community-Welcome-Letter.png` (no issues)
- `page-056.png` → `056-BLANK.png`

This format makes it easy to:
- Sort files to see all issues of a certain type
- Quickly identify pages that need fixing
- Understand content while seeing problems

## Notes

- Images are temporarily resized to 50% and converted to JPEG for processing
- Original PNG files are preserved
- Processing ~100 images may take 5-10 minutes
- Add a delay between requests to avoid rate limiting