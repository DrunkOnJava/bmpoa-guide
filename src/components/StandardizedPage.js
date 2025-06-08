import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, colors, spacing } from '../designTokens.js';

const standardPageStyles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    fontFamily: typography.families.base,
    fontSize: typography.sizes.base,
    paddingTop: '0.75in',
    paddingBottom: '1in', // Extra space for footer
    paddingHorizontal: '0.75in',
    position: 'relative',
  },
  // FIXED: Section ID positioning
  sectionId: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    fontSize: 12,
    fontFamily: typography.families.base,
    fontWeight: typography.weights.normal,
    color: colors.muted,
  },
  // FIXED: Page header with proper spacing
  pageHeader: {
    marginTop: 60, // FIXED: ≥60px top margin
    marginBottom: spacing.lg,
  },
  pageTitle: {
    fontSize: 18, // FIXED: 18pt for h3
    fontFamily: typography.families.heading,
    fontWeight: 600, // FIXED: weight 600
    lineHeight: 1.3, // FIXED: 1.3x line-height
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // FIXED: Footer with proper height and styling
  pageFooter: {
    position: 'absolute',
    bottom: 34, // FIXED: 12mm safe zone
    left: '0.75in',
    right: '0.75in',
    height: 21.6, // FIXED: 0.3" tall
    paddingTop: 8,
    borderTopWidth: 1, // FIXED: 1pt border
    borderTopColor: colors.border, // FIXED: #CCCCCC
    borderTopStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10, // FIXED: 10pt
    fontFamily: typography.families.base,
    color: colors.muted, // FIXED: #666666
  },
  content: {
    flex: 1,
    paddingBottom: 40, // Ensure content doesn't overlap footer
  },
});

// Helper to format section IDs
const formatSectionId = (section, subsection) => {
  const sectionStr = section.toString().padStart(2, '0');
  const subsectionStr = subsection ? `.${subsection}` : '';
  return `${sectionStr}${subsectionStr}`;
};

// Standardized page component with all fixes
export default function StandardizedPage({ 
  children, 
  title, 
  sectionNumber,
  subsectionNumber,
  pageNumber,
  showSectionId = true,
  footerTitle = 'BMPOA Community Guide',
  ...props 
}) {
  const e = React.createElement;
  
  return e(
    Page,
    { size: 'LETTER', style: standardPageStyles.page, ...props },
    [
      // Section ID (X.Y marker)
      showSectionId && sectionNumber && e(
        Text,
        { key: 'sectionId', style: standardPageStyles.sectionId },
        formatSectionId(sectionNumber, subsectionNumber)
      ),
      
      // Page header with title
      title && e(
        View,
        { key: 'header', style: standardPageStyles.pageHeader },
        e(Text, { style: standardPageStyles.pageTitle }, title)
      ),
      
      // Main content area
      e(
        View,
        { key: 'content', style: standardPageStyles.content },
        children
      ),
      
      // Footer with proper styling
      e(
        View,
        { key: 'footer', style: standardPageStyles.pageFooter },
        [
          e(Text, { key: 'footerTitle', style: standardPageStyles.footerText }, footerTitle),
          e(Text, { key: 'pageNum', style: standardPageStyles.footerText }, pageNumber || '')
        ]
      )
    ]
  );
}

// Export helper components for consistent styling

// FIXED: Standardized heading component
export function StandardHeading({ children, level = 3 }) {
  const styles = StyleSheet.create({
    h2: {
      fontSize: 24,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      marginTop: spacing.lg,
      marginBottom: spacing.md,
      color: colors.text,
    },
    h3: {
      fontSize: 18, // FIXED: 18pt
      fontFamily: typography.families.heading,
      fontWeight: 600, // FIXED: weight 600
      lineHeight: 1.3, // FIXED: 1.3x
      marginTop: 60, // FIXED: ≥60px
      marginBottom: spacing.md,
      color: colors.text,
    },
    h4: {
      fontSize: 16,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.semibold,
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.text,
    },
  });
  
  const style = level === 2 ? styles.h2 : level === 4 ? styles.h4 : styles.h3;
  
  return React.createElement(Text, { style }, children);
}

// FIXED: Standardized bullet list
export function StandardBulletList({ items }) {
  const styles = StyleSheet.create({
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
  
  const e = React.createElement;
  
  return e(
    View,
    { style: styles.listContainer },
    items.map((item, index) => 
      e(
        View,
        { key: index, style: styles.listItem },
        [
          e(View, { key: 'bullet', style: styles.bullet }),
          e(Text, { key: 'text', style: styles.listText }, item)
        ]
      )
    )
  );
}