# BMPOA Guide - React PDF Implementation

This project generates a PDF version of the Blue Mountain Property Owners Association Guide with proper print formatting and image support.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate the PDF:**
   ```bash
   npm run build
   ```

3. **Find your PDF:**
   The generated PDF will be in `output/BMPOA-Guide.pdf`

## 📁 Project Structure

```
bmpoa-guide/
├── src/
│   ├── BMPOADocument.js       # Main document component
│   ├── PDFComponents.js       # Reusable components
│   └── generate-pdf.js        # PDF generation script
├── images/                    # All images (already loaded)
├── output/                    # Generated PDFs go here
└── package.json              # Dependencies
```

## 🖼️ Images

All images in the `images/` directory are automatically loaded and converted to base64 for embedding in the PDF. The following images are available:

- `bmpoa-emblem.png` - Community emblem (used on cover)
- `mountain-vista.jpeg` - Mountain views
- `TheLodge.jpg` - Lodge exterior
- `deer-lake-dock.jpeg` - Deer Lake
- And many more...

## 🎨 Key Features

- **No print overflow** - Content stays within page margins
- **No orphaned tables** - Tables and content blocks stay together
- **Consistent spacing** - Standardized margins throughout
- **Centered cover page** - With your emblem properly positioned
- **Automatic page numbering** - Professional formatting

## 🛠️ Customization

### Adding New Sections

1. Create new components in `src/BMPOADocument.js`
2. Use the provided components from `PDFComponents.js`
3. Keep content within the `keepTogether` wrapper to prevent breaking

### Styling

- All styles are in the `styles` object in `BMPOADocument.js`
- Use points (pt) not pixels for measurements
- Standard margins are 72pt (1 inch)

## 📝 Common Tasks

### Make the build script executable:
```bash
chmod +x build-pdf.sh
```

### Run in development mode (auto-rebuild):
```bash
npm run dev
```

### Check for missing images:
Look at the console output when running `npm run build` - it will show which images loaded successfully.

## 🐛 Troubleshooting

**PDF is blank or missing images:**
- Check console for image loading errors
- Ensure all image files exist in `images/` directory
- Image paths are case-sensitive

**Text overflow or spacing issues:**
- Use `breakInside: 'avoid'` on containers
- Keep related content in `View style={styles.keepTogether}`
- Check margins aren't doubled (use marginBottom only)

**Build fails:**
- Run `npm install` first
- Check Node.js version (v14+ required)
- Look for syntax errors in console output

## 📧 Support

For issues specific to the PDF generation, check the console output for detailed error messages. The script provides verbose logging to help identify problems.
