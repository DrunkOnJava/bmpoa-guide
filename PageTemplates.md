# BMPOA Community Guide - Page Templates & Layout Standards

This document serves as the single source of truth for all page layout designs and styling options available in the BMPOA Community Guide PDF generation system.

## 📚 Developer Resources

Before implementing any page, consult these essential documents:
- **[COMPONENT-CATALOG.md](COMPONENT-CATALOG.md)** - Comprehensive documentation of all components with examples
- **[VISUAL-COMPONENT-GUIDE.md](VISUAL-COMPONENT-GUIDE.md)** - Visual representation of each component
- **[COMPONENT-QUICK-REFERENCE.md](COMPONENT-QUICK-REFERENCE.md)** - Printable quick reference card

**Important**: Always use existing components from our libraries instead of creating custom solutions.

## Table of Contents
1. [Cover Page Templates](#cover-page-templates)
2. [Table of Contents Templates](#table-of-contents-templates)
3. [Section Divider Templates](#section-divider-templates)
4. [Content Page Templates](#content-page-templates)
5. [**NEW: Mirrored Layout Templates**](#mirrored-layout-templates)
6. [**NEW: Enhanced Sidebar Components**](#enhanced-sidebar-components)
7. [Special Component Templates](#special-component-templates)
8. [Typography Standards](#typography-standards)
9. [Color Palette](#color-palette)
10. [Spacing Guidelines](#spacing-guidelines)

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

### Full Width Info Box
```
Background: #DBEAFE (customizable)
Padding: 16pt
Title: 14pt bold uppercase
Body: 11pt regular
Use: Important announcements
```

### Decorative Stars Separator
```
Symbol: ★
Size: 14pt
Color: Primary blue
Spacing: 4pt between stars
Use: Visual section breaks
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

### Enhanced Checklist Box
```
Background: #FEF3C7 (yellow)
Border: 1pt #F59E0B
Title: 12pt bold uppercase
Checkmarks: ✓ green (#059669)
Items: 10pt regular
Use: Important checklists
```

### Burn Ban Alert Box
```
Background: #FEE2E2
Border: 1.5pt #DC2626
Title: 12pt bold #B91C1C uppercase
Body: 10pt #7F1D1D
Use: Fire safety warnings
```

### Risk Level Box
```
Title: 12pt bold
Body: 10pt regular
Spacing: 8pt between levels
Use: Categorizing risk information
```

### Contact Card
```
Background: #F9FAFB
Border: 0.5pt #E5E7EB
Icon: 24x24 circle with symbol
Label: 9pt gray
Value: 11pt bold
Use: Contact information display
```

### Section Header Underlined
```
Title: 16pt bold
Underline: 3pt height, 40pt width
Color: Primary blue
Use: Major section breaks
```

### Image Caption Box
```
Image area: Variable height
Background: #F3F4F6 (if no image)
Caption: 10pt italic centered
Padding: 20pt horizontal
Use: Featured images
```

### Numbered Requirements
```
Number: 11pt bold
Text: 11pt regular
Spacing: 8pt between items
Use: Sequential requirements
```

### Specification List
```
Bullet: • (8pt)
Text: 10pt regular
Indent: 16pt
Spacing: 6pt between items
Use: Technical specifications
```

### Meeting Places Box
```
Title: 14pt bold
Items: Numbered list
Spacing: 8pt between items
Use: Location listings
```

### Seasonal Info
```
Label: Bold inline
Dates: Regular inline
Format: "Season: Date Range"
Use: Time-based information
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

## Mirrored Layout Templates

### Template 1: Mirrored Two-Column
- **Component**: `MirroredTwoColumnLayout`
- **Layout**: Sidebar LEFT, main content RIGHT
- **Gap**: 16pt between columns
- **Ratio**: 1:2 (sidebar:main)
- **Use**: Create layout variety, visual interest

```javascript
import { MirroredTwoColumnLayout } from './MirroredLayoutComponents.js';

e(MirroredTwoColumnLayout, { sidebarContent },
  // Main content goes here (will appear on RIGHT)
)
```

### When to Use Mirrored Layout
- Alternate with standard TwoColumnLayout for visual variety
- Emphasize sidebar content (appears first in reading order)
- Create balanced spread across facing pages
- Break up long sections with consistent layouts

## Enhanced Sidebar Components

### Size Comparison Chart
| Component | Height Increase | Font Size | Padding | Best Use Case |
|-----------|----------------|-----------|---------|---------------|
| Standard InfoBox | Baseline | 9pt | 12px | Basic information |
| TallInfoBox | +25% | 10pt | 14px | Enhanced details |
| ExtraTallInfoBox | +50% | 10pt | 16px | Complex information |
| JumboInfoBox | +75% | 11pt | 18px | Extensive content |

### TallInfoBox
```
Height: +25% increase
Font: 10pt (vs 9pt standard)
Padding: 14px (vs 12px standard)
Min Height: 120pt
Use: Enhanced details, longer lists
```

### ExtraTallInfoBox  
```
Height: +50% increase
Font: 10pt body, 13pt title
Padding: 16px
Min Height: 160pt
Use: Complex multi-step information
```

### JumboInfoBox
```
Height: +75% increase
Font: 11pt body, 14pt title
Padding: 18px
Min Height: 200pt
Use: Extensive content, emergency procedures
```

### TallQuickFactsBox
```
Height: +25% increase
Font: 10pt labels/values
Spacing: 5px row padding
Use: Extended fact lists, detailed specifications
```

### ExtendedSidebarBox
```
Multiple titled sections in one component
Type colors: info, warning, danger, success
Sections: title + content pairs
Use: Organizing related information categories
```

### TabbedSidebarBox
```
Multiple tabs with content switching
Tab headers with active state styling
Flexible content areas
Use: Seasonal info, categorized data, time-based content
```

### Component Selection Guidelines

**Use TallInfoBox when:**
- Standard InfoBox feels cramped
- Content needs better breathing room
- Displaying 5-8 bullet points
- Enhanced readability is priority

**Use ExtraTallInfoBox when:**
- Displaying complex procedures
- Multiple related concepts
- Step-by-step instructions
- 8-12 content items

**Use JumboInfoBox when:**
- Emergency procedures
- Comprehensive checklists  
- Detailed safety information
- 12+ content items
- Maximum visual impact needed

**Use ExtendedSidebarBox when:**
- Multiple related topics
- Categorized information
- Contact lists by type
- Organized reference data

**Use TabbedSidebarBox when:**
- Seasonal variations
- Time-based information
- Alternative approaches
- Space-efficient categorization

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