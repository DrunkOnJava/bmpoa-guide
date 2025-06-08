import { StyleSheet, Font } from '@react-pdf/renderer';
import { typography, layout, colors as designColors, callout, footer } from './designTokens.js';
import { theme as THEME_CONFIG } from '../config.js';

// Register fonts - using Helvetica family for consistency
Font.register({ family: 'Helvetica' });
Font.register({ 
  family: 'Helvetica-Bold',
  src: 'Helvetica-Bold'
});

// Professional color palette - extending design tokens
export const colors = {
  ...designColors,
  // Primary colors
  forestGreen: '#1B4332',     // Deep forest green for headers
  slateGray: '#475569',       // Slate gray for sub-headers
  warmGray: '#6B7280',        // Warm gray for body text
  
  // Accent colors
  mustard: '#D97706',         // Mustard for callouts
  warmTan: '#F5E6D3',         // Warm tan for info boxes
  lightGray: '#F3F4F6',       // Light gray for backgrounds
  
  // Functional colors
  darkCharcoal: '#1F2937',    // Dark charcoal for emphasis
  white: '#FFFFFF',
  black: '#000000',
  
  // Alert colors
  alertRed: '#DC2626',        // Red for warnings
  lightPink: '#FEE2E2',       // Light pink for alert backgrounds
  lightGreen: '#D1FAE5',      // Light green for tips
  lightOrange: '#FED7AA',     // Light orange for bear safety
  
  // Original theme colors (backwards compatibility)
  primary: THEME_CONFIG.colors.primary || '#1B4332',
  accent: THEME_CONFIG.colors.accent || '#D97706',
  text: THEME_CONFIG.colors.text || '#374151',
  background: THEME_CONFIG.colors.background || '#F9FAFB',
};

export const spacing = THEME_CONFIG.spacing;

// Typography sizes - Updated for consistency
export const typography = {
  // Headers (Standardized)
  pageTitle: 16,         // Page titles (16pt as required)
  sectionBanner: 16,     // Section banner titles 
  sectionTitle: 16,      // Section titles (standardized to 16pt)
  subtitle: 14,          // Subtitles and subheads (14pt)
  body: 10.5,           // Body text (10.5pt as required)
  caption: 10,          // Captions and footnotes
  small: 9,             // Footer text
  tiny: 8,              // Badges and very small text
  
  // Line heights (Optimized for density)
  lineHeightTight: 1.2,
  lineHeightNormal: 1.4,  // Primary line height for body text
  lineHeightRelaxed: 1.5,
  lineHeightLists: 1.15,  // For bullet lists
};

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingTop: layout.margins.content,    // 0.75" margin
    paddingBottom: layout.margins.content,
    paddingHorizontal: layout.margins.content,
    fontFamily: typography.families.base,
    fontSize: typography.body,
    color: colors.warmGray,
    lineHeight: typography.lineHeightNormal,
    // Disable hyphenation globally
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
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    lineHeight: 34,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  coverSubtitle: {
    fontSize: typography.sizes.medium,
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeightNormal,
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
    fontFamily: typography.families.base,
  },
  footerPageNumber: {
    marginHorizontal: spacing.xs,
    fontSize: typography.tiny,
    color: colors.warmGray,
    fontFamily: typography.families.base,
  },
  
  // Section styles
  sectionBanner: {
    backgroundColor: colors.forestGreen,
    color: colors.white,
    padding: spacing.md,
    marginBottom: spacing.lg,
    fontSize: typography.sectionBanner,
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
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
    fontSize: typography.pageTitle,  // 16pt for all main headings
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.forestGreen,
    marginTop: layout.spacing.md,  // 12pt above
    marginBottom: layout.spacing.md,  // 12pt below
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: typography.subtitle,  // 14pt for subheadings
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.darkCharcoal,
    marginTop: layout.spacing.md,  // 12pt above
    marginBottom: layout.spacing.sm,  // 8pt below
  },
  h3: {
    fontSize: typography.sizes.base,  // 12pt for sub-subheadings
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.slateGray,
    marginTop: layout.spacing.sm,
    marginBottom: 6,
  },
  h4: {
    fontSize: typography.sizes.base,  // 11pt for minor headings
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.slateGray,
    marginTop: 6,
    marginBottom: layout.spacing.xs,
  },
  
  // Page titles (standardized)
  pageTitle: {
    fontSize: typography.pageTitle,  // 16pt for page titles
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.forestGreen,
    textAlign: 'center',
    marginBottom: layout.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Body text (Updated for consistency)
  paragraph: {
    fontSize: typography.body,  // 10.5pt as required
    lineHeight: typography.lineHeightNormal,  // 1.4 for better density
    marginBottom: 6,  // 6pt after paragraphs
    textAlign: 'left',  // Changed from justify to avoid bad word spacing
    color: colors.warmGray,
    fontFamily: typography.families.base,
    // Prevent hyphenation
    textBreakStrategy: 'simple',
    wordBreak: 'normal',
  },
  
  // Lists
  bulletList: {
    marginBottom: layout.spacing.md,  // 12pt after lists
    paddingLeft: 0,  // Reset padding, use on items instead
  },
  bulletItem: {
    fontSize: typography.body,
    marginBottom: layout.spacing.md,  // 12pt between list items
    lineHeight: typography.lineHeightLists,  // 1.15 line spacing
    color: colors.warmGray,
    paddingLeft: 28.8,  // 0.4" indent
    position: 'relative',
    fontFamily: typography.families.base,
  },
  bullet: {
    position: 'absolute',
    left: 14.4,  // Half of indent for bullet position
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
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
    color: colors.darkCharcoal,
  },
  
  // Tables
  table: {
    marginVertical: 12,  // 12pt above and below tables
    borderWidth: 0.5,
    borderColor: colors.slateGray,
  },
  tableHeaderRow: {
    backgroundColor: colors.backgroundAlt,  // Light gray background
    borderBottomWidth: 0.5,
    borderBottomColor: colors.slateGray,
  },
  tableHeaderCell: {
    fontSize: typography.sizes.base,  // 11pt forest green text
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.forestGreen,
    padding: layout.spacing.xs,  // 4pt cell padding
  },
  tableRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.slateGray,
  },
  tableCell: {
    fontSize: typography.body,
    color: colors.warmGray,
    padding: layout.spacing.xs,  // 4pt cell padding
    fontFamily: typography.families.base,
  },
  
  // Two-column layout
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 21.6, // 0.30" gutter (0.3 * 72)
  },
  column: {
    flex: 1,
  },
  
  // TOC styles
  tocTitle: {
    fontSize: typography.sizes.h1,
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
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
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
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
    marginHorizontal: 28.8,  // 0.4" indent
    marginVertical: spacing.sm,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.slateGray,
    color: colors.slateGray,
  },
  
  // Cover page specific
  coverEstLine: {
    fontSize: typography.sizes.base,
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