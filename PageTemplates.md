# BMPOA Community Guide - Page Templates & Layout Standards

This document serves as the single source of truth for all page layout designs and styling options available in the BMPOA Community Guide PDF generation system.

## Table of Contents
1. [Cover Page Templates](#cover-page-templates)
2. [Table of Contents Templates](#table-of-contents-templates)
3. [Section Divider Templates](#section-divider-templates)
4. [Content Page Templates](#content-page-templates)
5. [Special Component Templates](#special-component-templates)
6. [Typography Standards](#typography-standards)
7. [Color Palette](#color-palette)
8. [Spacing Guidelines](#spacing-guidelines)

## Cover Page Templates

### Template 1: Classic Centered
- Full-page dark background (slate blue #3B4856)
- Centered white text
- Main title: 36pt Helvetica Bold
- Subtitle: 16pt Helvetica Regular
- Minimalist design with generous white space

### Template 2: Box Frame
- White background with dark content box
- Rounded corners (8pt radius)
- Organization name in all caps
- Edition/year at bottom
- Header/footer metadata

### Template 3: Badge Style
- Corner badges ("EST. 1975", "COMMUNITY GUIDE")
- Centered title block
- Contact information at bottom
- Clean, professional appearance

## Table of Contents Templates

### Template 1: Clean Single Column
- Section numbers with titles aligned left
- Page numbers aligned right
- No dot leaders
- 12pt spacing between entries
- Subsections indented 0.25"

### Template 2: Hierarchical with Subsections
- Roman numerals for main sections
- Letters (A, B, C) for subsections
- Dotted lines connecting titles to page numbers
- Gray text for subsections
- Blue accent for section headers

## Section Divider Templates

### Template 1: Full Bleed Color
- Full-page background color (forestGreen or primary blue)
- Large section number (72pt)
- Section title (36pt, all caps)
- Descriptive subtitle (12pt italic)
- Centered layout

### Template 2: Numbered Banner
- White background
- Colored banner across top (1/3 page height)
- Section number in circle or square
- Title below in large text
- Optional icon or graphic element

## Content Page Templates

### Template 1: Single Column Classic
- 0.75" margins all around
- 11pt body text, justified
- 15pt line height
- Headers: 16pt bold
- Subheaders: 12pt bold

### Template 2: Two-Column with Sidebar
- Main content: 65% width
- Sidebar: 35% width
- 0.30" gutter between columns
- Sidebar for:
  - Quick facts boxes
  - Key dates
  - Tips and notes
  - Contact information

### Template 3: Dense Two-Column
- Equal 50/50 columns
- Tight 0.25" gutter
- 10pt body text
- 13pt line height
- Maximizes content per page

### Template 4: Mixed Layout
- Full-width headers and introductions
- Two-column for detailed content
- Full-width for tables and images
- Call-out boxes break the grid

### Template 5: Card-Based Grid
- 2x2 or 3x2 grid layout
- Each card contains:
  - Icon or number
  - Title
  - Brief content
  - Optional action item
- Great for directories or service listings

## Special Component Templates

### Info Box (Blue)
```
Background: #EBF4FF
Border: 1pt #2563EB
Padding: 10pt
Header: 11pt bold forest green
Body: 10pt regular
Icon: Optional 16x16px
```

### Warning Box (Red)
```
Background: #FEF2F2
Border: 1.5pt #DC2626
Padding: 10pt
Header: 12pt bold #B91C1C
Body: 10pt italic #5D4037
Icon: 🚨 or ⚠️
```

### Quote Box
```
Background: #F9FAFB
Border-left: 4pt #2563EB
Padding: 12pt
Quote: 12pt italic
Attribution: 10pt regular, right-aligned
```

### Quick Facts Box
```
Background: #F5F5F5
Border: 0.5pt #6B7280
Padding: 8pt
Title: 11pt bold
Facts: Label/value pairs
Spacing: 6pt between items
```

### Compact Table
```
Header: 11pt bold white on forest green
Body: 10pt regular on alternating #F9FAFB
Border: 0.5pt #6B7280
Padding: 4pt vertical, 6pt horizontal
```

### Emergency Contact Box
```
Background: #FEE2E2
Border: 2pt #DC2626
Padding: 10pt
Title: 12pt bold #B91C1C
Numbers: 11pt bold
Descriptions: 10pt regular
```

### Checklist Box
```
Background: #F5F5F5
Border: 0.5pt #4B5563
Checkmarks: ✓ in forest green
Items: 10pt regular
Indent: 0.25"
```

## Typography Standards

### Font Families
- **Primary**: Helvetica (Headers, UI elements)
- **Secondary**: Merriweather (Body text)
- **Monospace**: Courier (Codes, references)

### Size Hierarchy
1. **Section Divider Number**: 72pt
2. **Section Divider Title**: 36pt
3. **Page Headers**: 16pt bold
4. **Subheaders**: 12pt bold
5. **Body Text**: 11pt regular (10pt for dense layouts)
6. **Captions**: 10pt regular
7. **Footer Text**: 8pt regular

### Text Styles
- **Headers**: All caps for main sections, title case for subsections
- **Body**: Justified alignment with hyphenation
- **Lists**: 0.25" indent, consistent bullet styles
- **Emphasis**: Bold for strong emphasis, italic for subtle emphasis

## Color Palette

### Primary Colors
```javascript
colors: {
  // Brand Colors
  primary: '#2563EB',        // Blue
  forestGreen: '#1B4332',    // Dark Green
  
  // Text Colors
  darkGray: '#374151',       // Primary text
  mediumGray: '#6B7280',     // Secondary text
  lightGray: '#9CA3AF',      // Disabled text
  
  // Background Colors
  white: '#FFFFFF',
  offWhite: '#F9FAFB',
  lightBg: '#F5F5F5',
  
  // Accent Colors
  red: '#DC2626',            // Warnings
  amber: '#F59E0B',          // Cautions
  green: '#10B981',          // Success
  blue: '#2563EB',           // Information
}
```

### Usage Guidelines
- **Section 1-5**: Forest green backgrounds
- **Section 6-12**: Primary blue backgrounds
- **Body text**: Dark gray on white
- **Captions**: Medium gray
- **Links**: Primary blue
- **Warnings**: Red backgrounds and borders

## Spacing Guidelines

### Page Margins
- **Standard**: 0.75" all sides
- **Dense**: 0.5" all sides
- **Section Dividers**: Full bleed (negative margins)

### Content Spacing
```javascript
spacing: {
  xs: 2,    // Inline elements
  sm: 4,    // Between related items
  md: 8,    // Between sections
  lg: 12,   // Major breaks
  xl: 16,   // Page sections
  xxl: 24,  // Major divisions
}
```

### Component Spacing
- **Paragraph spacing**: 8pt
- **List item spacing**: 6pt
- **Header margin top**: 16pt
- **Header margin bottom**: 8pt
- **Image caption spacing**: 6pt
- **Box padding**: 10pt standard, 6pt compact

## Implementation Notes

### When to Use Each Template

1. **Single Column Classic**: 
   - Introduction pages
   - Policy text
   - Long-form content

2. **Two-Column with Sidebar**:
   - Service descriptions
   - Facility information
   - Process explanations

3. **Dense Two-Column**:
   - Contact directories
   - Lists and inventories
   - Maximizing content

4. **Mixed Layout**:
   - Complex sections
   - Varied content types
   - Visual interest

5. **Card-Based Grid**:
   - Service catalogs
   - Contact cards
   - Feature highlights

### Accessibility Considerations
- Maintain 11pt minimum font size for body text
- Ensure color contrast ratios meet WCAG standards
- Use semantic heading hierarchy
- Provide alternative text for images
- Keep line lengths between 45-75 characters

### Performance Guidelines
- Optimize images to under 500KB each
- Use vector graphics where possible
- Limit special effects (shadows, gradients)
- Test with 50+ page documents
- Monitor memory usage during generation

## Version History
- v1.0.0 (January 2025): Initial template documentation
- Based on ComponentGarden analysis and existing BMPOA components