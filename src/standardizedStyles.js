// Standardized styles for BMPOA Guide
// This file ensures consistent styling across all components

import { StyleSheet } from '@react-pdf/renderer';
import { typography as designTypography, layout, colors as designColors, callout, footer } from './designTokens.js';

// Typography Standards (extending design tokens)
export const typography = {
  ...designTypography,
  // Minimum sizes to ensure readability
  minBodySize: 10,
  minCaptionSize: 9,
  
  // Standard sizes
  body: 10.5,
  bodyLarge: 11,
  caption: 9,
  footnote: 8,
  
  // Headers (consistent hierarchy)
  h1: 24,
  h2: 18,
  h3: 14,
  h4: 12,
  
  // Line heights
  bodyLineHeight: 1.4,
  listLineHeight: 1.5,
  captionLineHeight: 1.3,
  
  // Font families
  primary: 'Helvetica',
  secondary: 'Helvetica-Bold',
  italic: 'Helvetica-Oblique'
};

// Color Standards (extending design tokens)
export const colors = {
  ...designColors,
  // Primary palette
  primary: '#2B4C8C',
  primaryDark: '#1E3A6F',
  secondary: '#4A7C59',
  secondaryDark: '#2F5233',
  
  // Grays
  black: '#000000',
  darkGray: '#374151',
  mediumGray: '#6B7280',
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
  
  // Semantic colors
  danger: '#DC2626',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6',
  
  // Overlays
  overlayDark: 'rgba(0, 0, 0, 0.35)', // For text on images
  overlayLight: 'rgba(255, 255, 255, 0.9)' // For footer on images
};

// Box Standards
export const boxStyles = {
  // Consistent box styling
  standard: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
  },
  
  // Sidebar boxes
  sidebar: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  
  // Call-out boxes
  callout: {
    borderRadius: 4,
    borderWidth: 1.5,
    padding: 16,
    marginVertical: 12,
  },
  
  // Shadow (optional, for emphasis)
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
};

// Table Standards
export const tableStyles = {
  // Base table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginVertical: 12,
  },
  
  // Header row
  headerRow: {
    backgroundColor: colors.lightGray,
    borderBottomWidth: 2,
    borderBottomColor: colors.mediumGray,
  },
  
  headerCell: {
    padding: 8,
    fontSize: typography.body,
    fontFamily: typography.secondary,
    textAlign: 'left',
  },
  
  // Data rows
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  
  rowAlternate: {
    backgroundColor: '#FAFAFA',
  },
  
  cell: {
    padding: 8,
    fontSize: typography.body,
    textAlign: 'left',
  },
  
  // Narrow table variant
  narrowTable: {
    width: '66%', // 2/3 width
  }
};

// Image Standards
export const imageStyles = {
  // Full-bleed images (for section covers)
  fullBleed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  // Content images
  contentImage: {
    width: '100%',
    maxHeight: 300,
    objectFit: 'contain',
    marginVertical: 12,
  },
  
  // Image with overlay for text
  imageWithOverlay: {
    position: 'relative',
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlayDark,
  },
  
  // Caption styling
  caption: {
    fontSize: typography.caption,
    fontFamily: typography.italic,
    color: colors.mediumGray,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  }
};

// Page Layout Standards
export const layoutStyles = {
  // Page margins (reduced for better space utilization)
  page: {
    padding: '0.75in',
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    fontFamily: typography.primary,
  },
  
  // Two-column layout
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  
  mainColumn: {
    flex: 2, // 65% width
  },
  
  sidebarColumn: {
    flex: 1, // 35% width
  },
  
  // Text alignment
  leftAlign: {
    textAlign: 'left', // Ragged right, no justification
  },
  
  // Consistent spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  }
};

// Footer Standards
export const footerStyles = {
  // Standard footer
  footer: {
    position: 'absolute',
    bottom: 36,
    left: 54,
    right: 54,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Footer with background (for images)
  footerWithBg: {
    backgroundColor: colors.overlayLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
  },
  
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  
  pageNumber: {
    fontSize: 10,
    fontFamily: typography.families.base,
  }
};

// Create standardized StyleSheet
export const standardStyles = StyleSheet.create({
  // Headers
  h1: {
    fontSize: typography.h1,
    fontFamily: typography.secondary,
    marginBottom: layoutStyles.spacing.lg,
    color: colors.darkGray,
  },
  
  h2: {
    fontSize: typography.h2,
    fontFamily: typography.secondary,
    marginBottom: layoutStyles.spacing.md,
    color: colors.darkGray,
  },
  
  h3: {
    fontSize: typography.h3,
    fontFamily: typography.secondary,
    marginBottom: layoutStyles.spacing.sm,
    color: colors.darkGray,
  },
  
  h4: {
    fontSize: typography.h4,
    fontFamily: typography.secondary,
    marginBottom: layoutStyles.spacing.xs,
    color: colors.darkGray,
  },
  
  // Body text
  body: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
    textAlign: 'left', // No justification
    marginBottom: layoutStyles.spacing.sm,
  },
  
  bodyLarge: {
    fontSize: typography.bodyLarge,
    lineHeight: typography.bodyLineHeight,
    textAlign: 'left',
    marginBottom: layoutStyles.spacing.sm,
  },
  
  // Lists
  listItem: {
    fontSize: typography.body,
    lineHeight: typography.listLineHeight,
    marginBottom: layoutStyles.spacing.xs,
  },
  
  // Captions
  caption: imageStyles.caption,
  
  // Standard components
  ...boxStyles,
  ...tableStyles,
  ...imageStyles,
  ...layoutStyles,
  ...footerStyles,
});

// Utility function to ensure minimum font size
export const ensureMinimumFontSize = (size) => {
  return Math.max(size, typography.minBodySize);
};

// Utility function to create consistent box styling
export const createBoxStyle = (type = 'standard', color = colors.primary) => {
  const baseStyle = boxStyles[type] || boxStyles.standard;
  return {
    ...baseStyle,
    borderColor: color,
    backgroundColor: color + '10', // 10% opacity
  };
};

// Export all for easy access
export default {
  typography,
  colors,
  boxStyles,
  tableStyles,
  imageStyles,
  layoutStyles,
  footerStyles,
  standardStyles,
  ensureMinimumFontSize,
  createBoxStyle,
};