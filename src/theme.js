import { StyleSheet, Font } from '@react-pdf/renderer';
import { theme as THEME_CONFIG } from '../config.js';

// Register fonts - using Helvetica family for consistency
Font.register({ family: 'Helvetica' });
Font.register({ 
  family: 'Helvetica-Bold',
  src: 'Helvetica-Bold'
});

// Professional color palette
export const colors = {
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

// Typography sizes
export const typography = {
  // Headers
  sectionBanner: 16,      // Section banner titles
  sectionTitle: 14,       // Section titles in TOC
  subtitle: 12,           // Subtitles and subheads
  body: 11,              // Body text
  caption: 10,           // Captions and footnotes
  small: 9,              // Footer text
  tiny: 8,               // Badges and very small text
  
  // Line heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.4,
  lineHeightRelaxed: 1.5,
  lineHeightLists: 1.15,  // For bullet lists
};

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingTop: 54,    // 0.75" margin
    paddingBottom: 54,
    paddingHorizontal: 54,
    fontFamily: 'Helvetica',
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
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    lineHeight: 34,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  coverSubtitle: {
    fontSize: 14,
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
    marginBottom: 4,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: typography.tiny,
    color: colors.warmGray,
    fontFamily: 'Helvetica',
  },
  footerPageNumber: {
    marginHorizontal: spacing.xs,
    fontSize: typography.tiny,
    color: colors.warmGray,
    fontFamily: 'Helvetica',
  },
  
  // Section styles
  sectionBanner: {
    backgroundColor: colors.forestGreen,
    color: colors.white,
    padding: spacing.md,
    marginBottom: spacing.lg,
    fontSize: typography.sectionBanner,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
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
  
  // Typography styles
  h1: {
    fontSize: 14,  // Fixed 14pt for all main headings
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: colors.forestGreen,
    marginTop: 12,  // 12pt above
    marginBottom: 12,  // 12pt below
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: 14,  // Fixed 14pt for subheadings
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: colors.darkCharcoal,
    marginTop: 12,  // 12pt above
    marginBottom: 8,  // 8pt below
  },
  h3: {
    fontSize: 12,  // 12pt for sub-subheadings
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: colors.slateGray,
    marginTop: 8,
    marginBottom: 6,
  },
  
  // Body text
  paragraph: {
    fontSize: typography.body,
    lineHeight: typography.lineHeightRelaxed,
    marginBottom: 6,  // 6pt after paragraphs
    textAlign: 'left',  // Changed from justify to avoid bad word spacing
    color: colors.warmGray,
    fontFamily: 'Helvetica',
    // Prevent hyphenation
    textBreakStrategy: 'simple',
    wordBreak: 'normal',
  },
  
  // Lists
  bulletList: {
    marginBottom: 12,  // 12pt after lists
    paddingLeft: 0,  // Reset padding, use on items instead
  },
  bulletItem: {
    fontSize: typography.body,
    marginBottom: 12,  // 12pt between list items
    lineHeight: typography.lineHeightLists,  // 1.15 line spacing
    color: colors.warmGray,
    paddingLeft: 28.8,  // 0.4" indent
    position: 'relative',
    fontFamily: 'Helvetica',
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
    borderRadius: 4,
    padding: spacing.sm,
    marginVertical: spacing.sm,
  },
  calloutTitle: {
    fontSize: typography.body,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
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
    backgroundColor: '#F3F4F6',  // Light gray background
    borderBottomWidth: 0.5,
    borderBottomColor: colors.slateGray,
  },
  tableHeaderCell: {
    fontSize: 11,  // 11pt forest green text
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: colors.forestGreen,
    padding: 4,  // 4pt cell padding
  },
  tableRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.slateGray,
  },
  tableCell: {
    fontSize: typography.body,
    color: colors.warmGray,
    padding: 4,  // 4pt cell padding
    fontFamily: 'Helvetica',
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
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
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
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
  },
  
  // Special callout styles
  warningBox: {
    backgroundColor: colors.lightPink,
    borderWidth: 1,
    borderColor: colors.alertRed,
    borderRadius: 4,
    padding: spacing.sm,
    marginVertical: spacing.sm,
  },
  infoBox: {
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: colors.slateGray,
    borderRadius: 4,
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
    fontSize: 12,
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
    marginTop: 4,
  },
});