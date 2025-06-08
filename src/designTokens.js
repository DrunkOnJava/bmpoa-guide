// BMPOA Community Guide - Design Token System
// Source-of-Truth Style Guide Implementation
// This file centralizes all design tokens for consistent styling across the entire guide

import { StyleSheet } from '@react-pdf/renderer';

// ==================================
// 1. TYPOGRAPHY TOKENS
// ==================================

export const typography = {
  // Font families
  families: {
    base: 'Helvetica',
    heading: 'Helvetica-Bold',
    fallback: 'Helvetica'
  },
  
  // Font sizes (in points)
  sizes: {
    base: 12,      // Body copy, captions
    sm: 10,        // Footnotes, footer, disclaimers
    h3: 16,        // Section headings (content)
    toc: 18,       // Table of contents title
    h2: 24,        // Chapter sub-titles
    h1: 32,        // Chapter covers
    dividerTitle: 36,    // Section divider titles
    dividerNumber: 72,   // Section divider numbers
    // Additional sizes for edge cases
    tiny: 8,       // Very small text
    small: 9,      // Small text
    medium: 14,    // Medium text
    large: 20,     // Large text
    xlarge: 28,    // Extra large text
    jumbo: 48,     // Jumbo text
  },
  
  // Line heights (multipliers)
  lineHeights: {
    tight: 1.2,    // For h1
    normal: 1.3,   // For headings
    relaxed: 1.4,  // For body text
  },
  
  // Font weights
  weights: {
    normal: 400,   // Body text
    semibold: 600, // Section headings
    bold: 700,     // Chapter sub-titles, TOC
    extrabold: 800 // Chapter covers
  },
  
  // Computed styles
  styles: {
    base: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.4,
      fontWeight: 400
    },
    sm: {
      fontFamily: 'Helvetica',
      fontSize: 10,
      lineHeight: 1.4,
      fontWeight: 400
    },
    h3: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 16,
      lineHeight: 1.3,
      fontWeight: 600
    },
    h2: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 24,
      lineHeight: 1.3,
      fontWeight: 700
    },
    h1: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 32,
      lineHeight: 1.2,
      fontWeight: 800
    },
    toc: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 18,
      lineHeight: 1.3,
      fontWeight: 700
    }
  }
};

// ==================================
// 2. LAYOUT & GRID TOKENS
// ==================================

export const layout = {
  // Page dimensions (US Letter)
  page: {
    width: 612,    // 8.5" in points
    height: 792,   // 11" in points
  },
  
  // Margins and safe zones (in points)
  margins: {
    bleed: 9,      // 0.125" (3mm)
    trimSafe: 18,  // 0.25" (6mm) inside trim
    content: 36,   // 0.5" (12mm) all sides
    footer: 36,    // 0.5" from bottom trim
  },
  
  // Grid system
  grid: {
    columns: 12,
    gutter: 9,     // 0.125" (3mm)
    // Column width calculation: (612 - 2*36 - 11*9) / 12 = 36.75pt
    columnWidth: 36.75,
    containerWidth: 540, // 612 - 2*36
  },
  
  // Baseline grid
  baseline: 4,     // 4pt vertical rhythm
  
  // Spacing scale (based on baseline)
  spacing: {
    xs: 4,         // 1 × baseline
    sm: 8,         // 2 × baseline
    md: 12,        // 3 × baseline
    lg: 16,        // 4 × baseline
    xl: 24,        // 6 × baseline
    xxl: 32,       // 8 × baseline
  }
};

// ==================================
// 3. COLOR TOKENS
// ==================================

export const colors = {
  // Primary palette - UNIFIED
  primary: '#004235',      // Dark green (unified for all uses)
  secondary: '#003049',    // Dark blue
  accent: '#006644',       // Green accent for headers
  danger: '#C81D25',       // Red for alerts
  coverBar: '#004235',     // Cover page bar (same as primary)
  sectionDividerBg: '#228B22', // Section divider background
  
  // Text colors
  text: '#333333',         // Primary body text
  muted: '#666666',        // Secondary text, footers
  inverse: '#FFFFFF',      // White text on dark backgrounds
  
  // Background colors
  background: '#FFFFFF',   // Main background
  backgroundAlt: '#F5F5F5', // Alternative background
  backgroundDanger: '#FEE2E2', // Alert background
  
  // Border and divider colors
  border: '#CCCCCC',       // Default border
  borderStrong: '#999999', // Stronger borders
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.3)', // 30% black overlay
  overlayLight: 'rgba(255, 255, 255, 0.9)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
  
  // Extended color palette for edge cases
  black: '#000000',
  white: '#FFFFFF',
  
  // Browns
  brown: '#5D4037',
  brownDark: '#92400E',
  saddleBrown: '#8B4513',
  
  // Extended danger/red colors
  dangerDark: '#B91C1C',
  dangerDarker: '#991B1B',
  dangerDarkest: '#7F1D1D',
  dangerLight: '#FFE4E1',
  error: '#EF4444',
  errorLight: '#FEF2F2',
  
  // Extended success/green colors
  success: '#10B981',
  successDark: '#059669',
  successLight: '#E8F5E9',
  successVeryLight: '#F0FDF4',
  greenAlt: '#228B22',
  greenExtraLight: '#F0F8F0',
  forestGreen: '#228B22', // Forest green for section dividers and accents
  
  // Extended warning/yellow colors
  warning: '#F59E0B',
  warningLight: '#FDF7ED',
  warningVeryLight: '#FEF3C7',
  warningPale: '#FFF3CD',
  yellowLight: '#FEFCE8',
  yellowPale: '#FFFBEB',
  yellowExtraLight: '#FEF9E7',
  
  // Extended info/blue colors
  blue: '#2563EB',
  blueAlt: '#0369A1',
  blueDark: '#1E40AF',
  blueDarker: '#2C5282',
  blueLight: '#E0F2FE',
  blueVeryLight: '#EFF6FF',
  blueExtraLight: '#DBEAFE',
  infoDark: '#1976D2',
  infoLight: '#E3F2FD',
  infoVeryLight: '#F0F9FF',
  
  // Extended gray colors
  grayLight: '#E2E8F0',
  grayVeryLight: '#F9FAFB',
  grayExtraLight: '#F7FAFC',
  grayUltraLight: '#F8FAFC',
  grayMedium: '#718096',
  
  // Other light backgrounds
  backgroundLight: '#FAFAFA',
  neutral: '#F5F5F5',
  cyanLight: '#E6FFFA',
  orangeLight: '#FFF7ED',
  amberLight: '#FFFAEB',

  // Overlay colors
  overlayLight: 'rgba(255, 255, 255, 0.9)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
  
  // Additional colors from standardizedStyles
  primaryDark: '#1E3A6F',
  secondaryDark: '#2F5233',
  backgroundDanger: '#FEE2E2',
  backgroundAlt: '#F8FAFC',
  dangerDark: '#991B1B',
  blueLight: '#DBEAFE',
  blueAlt: '#1E40AF',
  brown: '#92400E',
  mustard: '#F59E0B',
  saddleBrown: '#8B4513'
};

// ==================================
// 4. CALL-OUT COMPONENT TOKENS
// ==================================

export const callout = {
  // Border properties
  border: {
    width: 1.5,              // 1.5pt
    style: 'solid',
    color: colors.accent,
  },
  
  // Dimensions
  radius: 4,                 // Border radius in px
  padding: 12,               // Internal padding (8pt)
  headerHeight: 24,          // Header bar height
  
  // Colors
  headerBg: colors.accent,   // Header background
  bodyBg: colors.background, // Body background
  
  // Typography
  headerFontSize: 12,        // Header font size
  bodyFontSize: 10,          // Body font size
  
  // Spacing
  verticalGap: 16,           // Gap between callout and content
  
  // Computed styles
  styles: {
    container: {
      borderWidth: 1.5,
      borderStyle: 'solid',
      borderColor: colors.accent,
      borderRadius: 4,
      marginVertical: 16,
      overflow: 'hidden',
    },
    header: {
      backgroundColor: colors.accent,
      color: colors.inverse,
      padding: '6 12',
      fontSize: 12,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      minHeight: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: {
      backgroundColor: colors.background,
      padding: 12,
      fontSize: 10,
      fontFamily: typography.families.base,
      lineHeight: 1.4,
    }
  }
};

// ==================================
// 5. FOOTER TOKENS
// ==================================

export const footer = {
  // Dimensions - FIXED
  height: 21.6,              // 0.3" (21.6pt) - FIXED from 0.25"
  bottomMargin: 34,          // 12mm safe zone - FIXED from 6mm
  
  // Typography
  font: typography.styles.sm,
  color: colors.muted,
  
  // Layout positions
  positions: {
    left: '12%',             // Document title position
    center: '50%',           // Page number position
    right: '88%',            // URL position
  },
  
  // Border
  borderTop: {
    width: 1,
    color: colors.border,
  },
  
  // Content
  content: {
    title: 'BMPOA Community Guide',
    url: 'www.bmpoa.org',
  },
  
  // Computed styles
  styles: {
    container: {
      position: 'absolute',
      bottom: 36,
      left: 36,
      right: 36,
      height: 21,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 4,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 10,
      fontFamily: 'Helvetica',
      color: colors.muted,
    },
    left: {
      position: 'absolute',
      left: 0,
    },
    center: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    right: {
      position: 'absolute',
      right: 0,
    }
  }
};

// ==================================
// 6. UTILITY FUNCTIONS
// ==================================

// Calculate column spans
export const getColumnWidth = (spans = 1) => {
  const totalWidth = layout.grid.columnWidth * spans + layout.grid.gutter * (spans - 1);
  return totalWidth;
};

// Get grid position
export const getGridPosition = (column = 1) => {
  const position = (column - 1) * (layout.grid.columnWidth + layout.grid.gutter);
  return position;
};

// Create consistent box shadow
export const getBoxShadow = (level = 1) => {
  const shadows = {
    1: { shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    2: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
    3: { shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  };
  return shadows[level] || shadows[1];
};

// ==================================
// 7. COMPOSITE STYLES
// ==================================

export const compositeStyles = StyleSheet.create({
  // Page container with proper margins
  page: {
    width: layout.page.width,
    height: layout.page.height,
    padding: layout.margins.content,
    paddingBottom: layout.margins.content + footer.height + 8,
    fontFamily: typography.families.base,
    fontSize: typography.sizes.base,
    lineHeight: typography.lineHeights.relaxed,
    color: colors.text,
  },
  
  // Grid container
  gridContainer: {
    width: layout.grid.containerWidth,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  // Standard callout box
  calloutBox: {
    ...callout.styles.container,
  },
  
  calloutHeader: {
    ...callout.styles.header,
  },
  
  calloutBody: {
    ...callout.styles.body,
  },
  
  // Standard footer
  footer: {
    ...footer.styles.container,
  },
  
  footerContent: {
    ...footer.styles.content,
  },
  
  // Typography presets
  h1: typography.styles.h1,
  h2: typography.styles.h2,
  h3: typography.styles.h3,
  body: typography.styles.base,
  small: typography.styles.sm,
  
  // Utility classes
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  
  // Spacing utilities
  mb4: { marginBottom: layout.spacing.xs },
  mb8: { marginBottom: layout.spacing.sm },
  mb12: { marginBottom: layout.spacing.md },
  mb16: { marginBottom: layout.spacing.lg },
  mb24: { marginBottom: layout.spacing.xl },
  
  // Grid columns
  col1: { width: getColumnWidth(1) },
  col2: { width: getColumnWidth(2) },
  col3: { width: getColumnWidth(3) },
  col4: { width: getColumnWidth(4) },
  col6: { width: getColumnWidth(6) },
  col8: { width: getColumnWidth(8) },
  col12: { width: getColumnWidth(12) },
});

// ==================================
// 8. THEME EXPORT
// ==================================

export const theme = {
  typography,
  layout,
  colors,
  callout,
  footer,
  compositeStyles,
  // Utility functions
  getColumnWidth,
  getGridPosition,
  getBoxShadow,
};

export default theme;