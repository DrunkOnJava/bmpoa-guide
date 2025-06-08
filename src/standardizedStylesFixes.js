// BMPOA Community Guide - Standardized Style Fixes
// This file contains all the fixes needed to address style deviations

import { StyleSheet } from '@react-pdf/renderer';
import { typography, colors, layout, spacing } from './designTokens.js';

// 1. SECTION DIVIDER FIXES - Proper bar height and centering
export const sectionDividerFixes = StyleSheet.create({
  pageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40, // FIXED: Was 15px, should be 40px
    backgroundColor: colors.primary, // FIXED: Unified to #004235
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlock: {
    position: 'absolute',
    top: '40%', // FIXED: Vertically centered at 40%
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '80%',
  },
  sectionNumber: {
    fontSize: 72,
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.lg,
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 36,
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.white,
  },
});

// 2. CONTENT PAGE HEADER FIXES - Section IDs and proper spacing
export const contentHeaderFixes = StyleSheet.create({
  sectionId: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    fontSize: 12,
    fontFamily: 'Helvetica', // Using Helvetica as Montserrat isn't available
    fontWeight: typography.weights.normal,
    color: colors.muted,
  },
  pageHeader: {
    marginTop: 60, // FIXED: ≥60px top margin
    marginBottom: spacing.lg,
  },
  h3: {
    fontSize: 18, // FIXED: 18pt for h3
    fontFamily: typography.families.heading,
    fontWeight: 600, // FIXED: weight 600
    lineHeight: 1.3, // FIXED: 1.3x line-height
    color: colors.text,
    marginBottom: spacing.md,
  },
});

// 3. FOOTER FIXES - Proper height, margins, and styling
export const footerFixes = StyleSheet.create({
  pageFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '0.3in', // FIXED: 0.3" tall
    paddingTop: 8,
    paddingHorizontal: '0.75in',
    borderTopWidth: 1, // FIXED: 1pt border
    borderTopColor: colors.border, // FIXED: #CCCCCC
    borderTopStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12mm', // FIXED: ≥12mm safe zone
  },
  footerText: {
    fontSize: 10, // FIXED: 10pt
    fontFamily: typography.families.base, // Source Sans Pro fallback to Helvetica
    color: colors.muted, // FIXED: #666666
  },
});

// 4. CALL-OUT BOX FIXES
export const calloutBoxFixes = StyleSheet.create({
  container: {
    borderWidth: 1.5, // FIXED: 1.5pt border
    borderStyle: 'solid',
    borderColor: colors.accent,
    borderRadius: 4, // FIXED: 4px radius
    marginVertical: spacing.md,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.accent, // FIXED: #006644
    height: 24, // FIXED: 24px tall
    padding: 12, // FIXED: 12px padding
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 12, // FIXED: 12pt headers
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textTransform: 'uppercase',
  },
  body: {
    backgroundColor: colors.background,
    padding: 12, // FIXED: 12px all sides
  },
  bodyText: {
    fontSize: 10, // FIXED: 10pt body
    fontFamily: typography.families.base,
    lineHeight: 1.4,
    color: colors.text,
  },
});

// 5. TABLE FIXES - Grid system and proper row heights
export const tableFixes = StyleSheet.create({
  table: {
    width: '100%',
    marginVertical: spacing.md,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 24, // FIXED: 24px minimum row height
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  tableHeader: {
    backgroundColor: colors.backgroundAlt,
    fontWeight: typography.weights.bold,
  },
  tableCell: {
    padding: 6,
    fontSize: 10,
    lineHeight: 1.4,
    flexWrap: 'wrap', // FIXED: Enforce word-wrap
  },
  // 12-column grid system
  col1: { width: '8.333%' },
  col2: { width: '16.667%' },
  col3: { width: '25%' },
  col4: { width: '33.333%' },
  col5: { width: '41.667%' },
  col6: { width: '50%' },
  col7: { width: '58.333%' },
  col8: { width: '66.667%' },
  col9: { width: '75%' },
  col10: { width: '83.333%' },
  col11: { width: '91.667%' },
  col12: { width: '100%' },
});

// 6. LIST/BULLET FIXES
export const listFixes = StyleSheet.create({
  listContainer: {
    marginVertical: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 8, // FIXED: 8px indent
  },
  bullet: {
    width: 4, // FIXED: 4px filled circle
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text,
    marginTop: 5,
    marginRight: 8,
  },
  listText: {
    fontSize: typography.sizes.base,
    lineHeight: 1.4, // FIXED: 1.4x line-height
    flex: 1,
  },
});

// 7. PAGE LAYOUT FIXES - Remove blank pages
export const pageLayoutFixes = {
  // Helper to determine if content fits on current page
  shouldBreakPage: (currentHeight, contentHeight, pageHeight = 792) => {
    const footerHeight = 72; // 1 inch footer area
    const usableHeight = pageHeight - footerHeight;
    return (currentHeight + contentHeight) > usableHeight;
  },
  
  // Ensure no orphaned content
  preventOrphans: (content) => {
    // Keep at least 3 lines together
    return {
      minPresenceAhead: 3,
      ...content
    };
  },
};

// 8. PAGINATION FIXES
export const paginationFixes = {
  // Calculate correct folio based on actual PDF page
  getCorrectFolio: (pdfPage, startingFolio = 1) => {
    // Account for cover pages, blanks, etc.
    const contentPages = pdfPage - 2; // Assuming 2 preliminary pages
    return Math.max(startingFolio, contentPages);
  },
  
  // Format page number consistently
  formatPageNumber: (pageNum) => {
    return String(pageNum);
  },
};

// 9. COLOR UNIFICATION
export const unifiedColors = {
  primary: '#004235', // Single primary green
  coverBarColor: '#004235', // Unified cover bar color
  sectionDividerBg: '#228B22', // Forest green for dividers
};

// Export helper to apply all fixes
export const applyStyleFixes = (componentType, existingStyles = {}) => {
  switch (componentType) {
    case 'sectionDivider':
      return { ...existingStyles, ...sectionDividerFixes };
    case 'contentHeader':
      return { ...existingStyles, ...contentHeaderFixes };
    case 'footer':
      return { ...existingStyles, ...footerFixes };
    case 'calloutBox':
      return { ...existingStyles, ...calloutBoxFixes };
    case 'table':
      return { ...existingStyles, ...tableFixes };
    case 'list':
      return { ...existingStyles, ...listFixes };
    default:
      return existingStyles;
  }
};

// Export all fixes
export default {
  sectionDividerFixes,
  contentHeaderFixes,
  footerFixes,
  calloutBoxFixes,
  tableFixes,
  listFixes,
  pageLayoutFixes,
  paginationFixes,
  unifiedColors,
  applyStyleFixes,
};