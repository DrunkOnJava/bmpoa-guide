# Multi-Format Build System

The BMPOA Guide now supports multiple output formats from a single React component source.

## Available Formats

### PDF (Original)
- High-quality print-ready document
- 51 pages with full styling and images
- Table of contents with accurate page numbers
- Vector graphics for crisp printing

### HTML (New)
- Responsive web version
- Mobile/tablet/desktop friendly
- Interactive navigation menu
- Print stylesheets included
- Smooth scrolling between sections

## Build Commands

### Generate Individual Formats
```bash
# PDF only
npm run pdf
npm run build:pdf

# HTML only  
npm run html
npm run build:html
```

### Generate Both Formats
```bash
# Sequential build
npm run build

# Parallel build (faster)
npm run build:all

# Interactive build with summary
npm run build:multi
```

## Output Locations

After running any build command:

- **PDF**: `output/BMPOA-Guide.pdf`
- **HTML**: `output/BMPOA-Guide.html`
- **Build artifacts**: `output/builds/[timestamp]/`

## HTML Features

The HTML version includes:

1. **Responsive Design**
   - Adapts to screen size
   - Mobile-optimized navigation
   - Touch-friendly interface

2. **Interactive Elements**
   - Collapsible navigation menu
   - Smooth scroll to sections
   - Print button in navigation

3. **Print Support**
   - Optimized print stylesheet
   - Page breaks at sections
   - Hidden navigation when printing
   - Automatic page numbering

4. **Accessibility**
   - Semantic HTML structure
   - Proper heading hierarchy
   - Alt text for images
   - Keyboard navigation

## Architecture

The system uses a single source of truth:

```
React Components (NoJSX)
         |
    +---------+
    |         |
   PDF      HTML
   
@react-pdf  convertToHTML()
```

The same React component tree generates both formats:
- PDF uses @react-pdf/renderer
- HTML uses custom conversion function

## Viewing HTML Locally

### Quick Preview
```bash
open output/BMPOA-Guide.html
```

### Local Server (better for testing)
```bash
cd output
python3 -m http.server 8000
# Visit: http://localhost:8000/BMPOA-Guide.html
```

### With Live Reload
```bash
cd output
npx live-server --port=8000 --open=BMPOA-Guide.html
```

## Extending to Other Formats

The architecture supports adding more formats:

1. **Markdown**: Convert React tree to .md
2. **DOCX**: Use pandoc with HTML as intermediate
3. **EPUB**: Package HTML with metadata
4. **LaTeX**: Convert to .tex for academic use

To add a new format:
1. Create `src/generate-[format].js`
2. Add conversion function
3. Add npm script
4. Update build commands

## Best Practices

1. **Always test both formats** after component changes
2. **Use semantic components** that convert well
3. **Keep styles in theme.js** for consistency
4. **Test on mobile** for HTML version
5. **Check print preview** for both formats

## Troubleshooting

### HTML not rendering correctly
- Check browser console for errors
- Verify all images copied to build dir
- Test with different browsers

### Styles not applying
- Ensure CSS classes map correctly
- Check responsive breakpoints
- Verify print styles separately

### Build fails
- Run `npm run scan:assets` first
- Check for syntax errors in components
- Ensure pageNumberMap.json exists for PDF