import { StyleSheet, Font } from '@react-pdf/renderer';
import { 
  typography as designTypography, 
  layout, 
  colors as designColors, 
  callout, 
  footer,
  compositeStyles 
} from './designTokens.js';
import { additionalColors, legacyTypography, spacing } from './themeExtensions.js';

// Register fonts - using Helvetica family for consistency
Font.register({ family: 'Helvetica' });
Font.register({ 
  family: 'Helvetica-Bold',
  src: 'Helvetica-Bold'
});

// Export merged colors (design tokens + legacy)
export const colors = {
  ...designColors,
  ...additionalColors
};

// Export merged typography
export const typography = {
  ...legacyTypography,
  // Ensure design token values take precedence
  families: designTypography.families,
  sizes: designTypography.sizes,
  lineHeights: designTypography.lineHeights,
  weights: designTypography.weights,
};

export { spacing, layout, callout, footer };

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingTop: layout.margins.content,
    paddingBottom: layout.margins.content,
    paddingHorizontal: layout.margins.content,
    fontFamily: designTypography.families.base,
    fontSize: designTypography.sizes.base,
    color: colors.warmGray,
    lineHeight: designTypography.lineHeights.relaxed,
    textBreakStrategy: 'simple',
    wordBreak: 'normal',
  },
  
  // Cover page styles
  coverPage: {
    backgroundColor: colors.black,
    position: 'relative',
  },
  coverTitle: {
    fontSize: typography.sizes.xlarge,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    lineHeight: 34,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  coverSubtitle: {
    fontSize: typography.sizes.medium,
    marginBottom: spacing.lg,
    lineHeight: designTypography.lineHeights.relaxed,
  },
  
  // Headers and footers
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    fontSize: typography.small,
    color: colors.warmGray,
    fontStyle: 'italic',
  },
  pageFooter: {
    position: 'absolute',
    bottom: 36,
    left: 54,
    right: 54,
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.slateGray,
    marginBottom: layout.spacing.xs,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: typography.tiny,
    color: colors.warmGray,
    fontFamily: designTypography.families.base,
  },
  footerPageNumber: {
    marginHorizontal: spacing.xs,
    fontSize: typography.tiny,
    color: colors.warmGray,
    fontFamily: designTypography.families.base,
  },
  
  // Section styles
  sectionBanner: {
    backgroundColor: colors.forestGreen,
    color: colors.white,
    padding: spacing.md,
    marginBottom: spacing.lg,
    fontSize: typography.sectionBanner,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionSubBanner: {
    backgroundColor: colors.slateGray,
    color: colors.white,
    padding: spacing.xs,
    marginTop: -spacing.lg,
    marginBottom: spacing.lg,
    fontSize: typography.caption,
    textAlign: 'center',
  },
  
  // Typography styles (Updated for consistency)
  h1: {
    fontSize: typography.pageTitle,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.forestGreen,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: typography.subtitle,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.darkCharcoal,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.sm,
  },
  h3: {
    fontSize: designTypography.sizes.base,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.slateGray,
    marginTop: layout.spacing.sm,
    marginBottom: 6,
  },
  h4: {
    fontSize: designTypography.sizes.base,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.slateGray,
    marginTop: 6,
    marginBottom: layout.spacing.xs,
  },
  
  // Page titles (standardized)
  pageTitle: {
    fontSize: typography.pageTitle,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.forestGreen,
    textAlign: 'center',
    marginBottom: layout.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Body text
  paragraph: {
    fontSize: typography.body,
    lineHeight: designTypography.lineHeights.relaxed,
    marginBottom: 6,
    textAlign: 'left',
    color: colors.warmGray,
    fontFamily: designTypography.families.base,
    textBreakStrategy: 'simple',
    wordBreak: 'normal',
  },
  
  // Lists
  bulletList: {
    marginBottom: layout.spacing.md,
    paddingLeft: 0,
  },
  bulletItem: {
    fontSize: typography.body,
    marginBottom: layout.spacing.md,
    lineHeight: typography.lineHeightLists,
    color: colors.warmGray,
    paddingLeft: 28.8,
    position: 'relative',
    fontFamily: designTypography.families.base,
  },
  bullet: {
    position: 'absolute',
    left: 14.4,
    top: 0,
    fontSize: typography.body,
    color: colors.warmGray,
  },
  
  // Callout boxes
  calloutBox: {
    backgroundColor: colors.lightGray,
    borderWidth: 0.5,
    borderColor: colors.slateGray,
    borderRadius: callout.radius,
    padding: spacing.sm,
    marginVertical: spacing.sm,
  },
  calloutTitle: {
    fontSize: typography.body,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    marginBottom: spacing.xs,
    color: colors.darkCharcoal,
  },
  
  // Tables
  table: {
    marginVertical: 12,
    borderWidth: 0.5,
    borderColor: colors.slateGray,
  },
  tableHeaderRow: {
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.slateGray,
  },
  tableHeaderCell: {
    fontSize: designTypography.sizes.base,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.forestGreen,
    padding: layout.spacing.xs,
  },
  tableRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.slateGray,
  },
  tableCell: {
    fontSize: typography.body,
    color: colors.warmGray,
    padding: layout.spacing.xs,
    fontFamily: designTypography.families.base,
  },
  
  // Two-column layout
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 21.6,
  },
  column: {
    flex: 1,
  },
  
  // TOC styles
  tocTitle: {
    fontSize: designTypography.sizes.h1,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
    color: colors.forestGreen,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  tocEntry: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    alignItems: 'flex-end',
  },
  tocItemText: {
    fontSize: typography.subtitle,
    color: colors.darkCharcoal,
  },
  tocDots: {
    flex: 1,
    marginHorizontal: spacing.xs,
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: colors.warmGray,
    marginBottom: 2,
  },
  tocPageNum: {
    fontSize: typography.subtitle,
    color: colors.forestGreen,
    fontFamily: designTypography.families.heading,
    fontWeight: designTypography.weights.bold,
  },
  
  // Special callout styles
  warningBox: {
    backgroundColor: colors.lightPink,
    borderWidth: 1,
    borderColor: colors.alertRed,
    borderRadius: callout.radius,
    padding: spacing.sm,
    marginVertical: spacing.sm,
  },
  infoBox: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 0.5,
    borderColor: colors.slateGray,
    borderRadius: callout.radius,
    padding: spacing.sm,
    marginVertical: spacing.sm,
  },
  
  // Icon styles
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  iconSmall: {
    width: 12,
    height: 12,
    marginRight: 2,
  },
  
  // Quote styles
  quote: {
    fontStyle: 'italic',
    marginHorizontal: 28.8,
    marginVertical: spacing.sm,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.slateGray,
    color: colors.slateGray,
  },
  
  // Cover page specific
  coverEstLine: {
    fontSize: designTypography.sizes.base,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  
  // Image styles
  imageWithBorder: {
    borderWidth: 0.5,
    borderColor: colors.forestGreen,
  },
  imageCaption: {
    fontSize: typography.caption,
    color: colors.slateGray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: layout.spacing.xs,
  },
});