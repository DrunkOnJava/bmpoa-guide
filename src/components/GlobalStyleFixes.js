import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, colors, spacing } from '../designTokens.js';

// Global styles for consistent formatting
export const globalStyles = StyleSheet.create({
  // Fixed heading styles
  h1: {
    fontSize: 32, // --font-h1
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    lineHeight: 1.3,
    marginTop: 60, // FIXED: 60px top margin
    marginBottom: spacing.lg,
    color: colors.text,
  },
  h2: {
    fontSize: 24, // --font-h2
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    lineHeight: 1.3,
    marginTop: 60,
    marginBottom: spacing.md,
    color: colors.text,
  },
  h3: {
    fontSize: 18, // FIXED: --font-h3
    fontFamily: typography.families.heading,
    fontWeight: 600, // FIXED: weight 600
    lineHeight: 1.3, // FIXED: 1.3x line-height
    marginTop: 60, // FIXED: 60px top margin
    marginBottom: spacing.md,
    color: colors.text,
  },
  
  // Fixed bullet list styles
  bulletList: {
    marginVertical: spacing.sm,
  },
  bulletItem: {
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
  bulletText: {
    fontSize: typography.sizes.base,
    lineHeight: 1.4, // FIXED: 1.4x line-height
    flex: 1,
  },
  
  // Fixed call-out box styles
  calloutBox: {
    borderWidth: 1.5, // FIXED: 1.5pt border
    borderStyle: 'solid',
    borderColor: colors.accent,
    borderRadius: 4, // FIXED: 4px radius
    marginVertical: spacing.md,
    overflow: 'hidden',
  },
  calloutHeader: {
    backgroundColor: colors.accent, // FIXED: #006644
    height: 24, // FIXED: 24px header
    paddingHorizontal: 12, // FIXED: 12px padding
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutHeaderText: {
    fontSize: 12, // FIXED: 12pt
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textTransform: 'uppercase',
  },
  calloutBody: {
    padding: 12, // FIXED: 12px all sides
    backgroundColor: colors.background,
  },
  calloutBodyText: {
    fontSize: 10, // FIXED: 10pt
    fontFamily: typography.families.base,
    lineHeight: 1.4,
    color: colors.text,
  },
  
  // Fixed table styles
  table: {
    width: '100%',
    marginVertical: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 24, // FIXED: 24px minimum
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
    flexWrap: 'wrap',
  },
});

// Section ID component
export function SectionID({ section, subsection }) {
  const sectionStr = section.toString().padStart(2, '0');
  const subsectionStr = subsection ? `.${subsection}` : '';
  const id = `${sectionStr}${subsectionStr}`;
  
  return React.createElement(
    Text,
    {
      style: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        fontSize: 12,
        fontFamily: typography.families.base,
        color: colors.muted,
      }
    },
    id
  );
}

// Fixed footer component
export function FixedFooter({ title = 'BMPOA Community Guide', pageNumber }) {
  const e = React.createElement;
  
  const footerStyle = {
    position: 'absolute',
    bottom: 34, // FIXED: 12mm safe zone
    left: '0.75in',
    right: '0.75in',
    height: 21.6, // FIXED: 0.3" height
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const textStyle = {
    fontSize: 10, // FIXED: 10pt
    fontFamily: typography.families.base,
    color: colors.muted,
  };
  
  return e(View, { style: footerStyle }, [
    e(Text, { key: 'title', style: textStyle }, title),
    e(Text, { key: 'page', style: textStyle }, pageNumber || '')
  ]);
}

// Enhanced page wrapper that applies all fixes
export function EnhancedPage({ 
  children, 
  sectionNumber, 
  subsectionNumber, 
  pageNumber,
  showSectionId = true,
  footerTitle = 'BMPOA Community Guide',
  style = {},
  ...props 
}) {
  const e = React.createElement;
  
  const pageStyle = {
    backgroundColor: colors.background,
    fontFamily: typography.families.base,
    fontSize: typography.sizes.base,
    paddingTop: '0.75in',
    paddingBottom: '1in',
    paddingHorizontal: '0.75in',
    position: 'relative',
    ...style,
  };
  
  return e(
    'Page',
    { size: 'LETTER', style: pageStyle, ...props },
    [
      // Section ID
      showSectionId && sectionNumber && e(SectionID, { 
        key: 'sectionId',
        section: sectionNumber, 
        subsection: subsectionNumber 
      }),
      
      // Main content
      e(View, { key: 'content', style: { flex: 1 } }, children),
      
      // Footer
      e(FixedFooter, { 
        key: 'footer',
        title: footerTitle, 
        pageNumber 
      })
    ]
  );
}

// Helper functions for consistent styling
export const StyleHelpers = {
  // Create a heading with proper styling
  heading: (text, level = 3) => {
    const style = level === 1 ? globalStyles.h1 : 
                  level === 2 ? globalStyles.h2 : 
                  globalStyles.h3;
    return React.createElement(Text, { style }, text);
  },
  
  // Create a bullet list
  bulletList: (items) => {
    const e = React.createElement;
    return e(View, { style: globalStyles.bulletList },
      items.map((item, index) => 
        e(View, { key: index, style: globalStyles.bulletItem }, [
          e(View, { key: 'bullet', style: globalStyles.bullet }),
          e(Text, { key: 'text', style: globalStyles.bulletText }, item)
        ])
      )
    );
  },
  
  // Create a callout box
  calloutBox: (title, content, type = 'default') => {
    const e = React.createElement;
    const headerColor = type === 'danger' ? colors.danger :
                       type === 'warning' ? '#F59E0B' :
                       colors.accent;
    
    return e(View, { style: globalStyles.calloutBox }, [
      title && e(View, { 
        key: 'header', 
        style: [globalStyles.calloutHeader, { backgroundColor: headerColor }] 
      },
        e(Text, { style: globalStyles.calloutHeaderText }, title)
      ),
      e(View, { key: 'body', style: globalStyles.calloutBody },
        typeof content === 'string' 
          ? e(Text, { style: globalStyles.calloutBodyText }, content)
          : content
      )
    ]);
  },
};