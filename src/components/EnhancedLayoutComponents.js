import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';

// Enhanced style system with tighter spacing
const enhancedStyles = StyleSheet.create({
  // Two-column layout
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: layout.spacing.lg,
},
  mainColumn: {
    flex: 2,
    paddingRight: 8,
},
  sidebarColumn: {
    flex: 1,
    gap: 12,
},
  
  // Compact info box for sidebars (Enhanced for professionalism)
  infoBox: {
    border: '1px solid #E2E8F0',
    borderRadius: 6,
    marginBottom: layout.spacing.md,
    backgroundColor: '#FAFBFC',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
},
  infoBoxHeader: {
    backgroundColor: colors.forestGreen,
    padding: '8px 12px',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
},
  infoBoxTitle: {
    color: colors.inverse,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
  infoBoxContent: {
    padding: '10px 12px',
    fontSize: typography.small,  // 9pt consistent
    lineHeight: typography.lineHeights.normal5,
    color: colors.warmGray,
},
  
  // Compact table styles
  compactTable: {
    border: '1px solid #E2E8F0',
    borderRadius: callout.radius,
    overflow: 'hidden',
},
  tableHeader: {
    backgroundColor: '#2C5282',
    flexDirection: 'row',
    padding: '6px 8px',
},
  tableHeaderText: {
    color: colors.inverse,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    flex: 1,
},
  tableRow: {
    flexDirection: 'row',
    padding: '4px 8px',
    borderBottom: '1px solid #E2E8F0',
},
  evenRow: {
    backgroundColor: '#F7FAFC',
},
  oddRow: {
    backgroundColor: colors.background,
},
  tableCell: {
    flex: 1,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.normal,
},
  
  // Quick facts sidebar component (Enhanced for professionalism)
  quickFactsBox: {
    backgroundColor: '#F8FAFC',
    border: '2px solid #E2E8F0',
    borderLeftColor: colors.forestGreen,
    borderLeftWidth: 4,
    borderRadius: 6,
    padding: layout.spacing.md,
    marginBottom: layout.spacing.md,
},
  quickFactsTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.sm,
    color: colors.forestGreen,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
  quickFactItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
},
  quickFactLabel: {
    fontSize: typography.small,  // 9pt consistent
    fontWeight: typography.weights.bold,
    width: '45%',
    color: colors.darkCharcoal,
},
  quickFactValue: {
    fontSize: typography.small,  // 9pt consistent
    width: '55%',
    color: colors.warmGray,
},
  
  // Inline key-value pairs
  inlineInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: typography.sizes.sm,
    marginBottom: layout.spacing.sm,
},
  inlineItem: {
    marginRight: 12,
},
  
  // Compact bullet lists
  twoColumnList: {
    flexDirection: 'row',
    gap: 16,
},
  listColumn: {
    flex: 1,
},
  compactListItem: {
    flexDirection: 'row',
    marginBottom: 3,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.normal,
},
  bullet: {
    marginRight: 4,
},
  
  // Dense paragraph styles (Updated for consistency)
  denseText: {
    fontSize: typography.body,  // 10.5pt consistent with theme
    lineHeight: typography.lineHeightNormal,  // 1.4 consistent
    marginBottom: layout.spacing.sm,
    textAlign: 'left',  // Changed from justify for better readability
},
  
  // Compact section headers (Updated for consistency)
  sectionHeader: {
    backgroundColor: colors.forestGreen,
    color: colors.inverse,
    padding: '8px 12px',
    fontSize: typography.pageTitle,  // 16pt consistent
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.md,
},
  subsectionHeader: {
    fontSize: typography.subtitle,  // 14pt consistent
    fontWeight: typography.weights.bold,
    color: colors.forestGreen,
    marginBottom: 6,
    marginTop: layout.spacing.sm,
},
  
  // Emergency contact box
  emergencyBox: {
    backgroundColor: colors.backgroundDanger,
    borderWidth: 2,
    borderColor: '#DC2626',
    borderRadius: callout.radius,
    padding: 10,
    marginBottom: layout.spacing.md,
},
});

// Two-column layout component
export const TwoColumnLayout = ({ children, sidebarContent }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.twoColumnContainer },
    e(View, { style: enhancedStyles.mainColumn }, children),
    e(View, { style: enhancedStyles.sidebarColumn }, sidebarContent)
  );
};

// Compact info box for sidebars
export const InfoBox = ({ title, children, content, type = 'info' }) => {
  const e = React.createElement;
  
  // Handle different content formats for backwards compatibility
  const renderContent = () => {
    if (content) {
      if (Array.isArray(content)) {
        return content.map((item, i) => 
          e(Text, { key: `content-${i}`, style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal, marginBottom: 2 } }, item)
        );
    } else {
        return e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, content);
    }
  }
    return children;
};

  // Type-specific header colors for consistency
  const headerStyle = type === 'highlight' ? 
    { ...enhancedStyles.infoBoxHeader, backgroundColor: '#10B981' } :
    enhancedStyles.infoBoxHeader;

  return e(View, { style: enhancedStyles.infoBox },
    e(View, { style: headerStyle },
      e(Text, { style: enhancedStyles.infoBoxTitle }, title)
    ),
    e(View, { style: enhancedStyles.infoBoxContent }, renderContent())
  );
};

// Quick facts sidebar component
export const QuickFactsBox = ({ facts, title = 'Quick Facts' }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.quickFactsBox },
    e(Text, { key: 'title', style: enhancedStyles.quickFactsTitle }, title),
    ...facts.map((fact, i) => 
      e(View, { key: `fact-${i}`, style: enhancedStyles.quickFactItem },
        e(Text, { key: `label-${i}`, style: enhancedStyles.quickFactLabel }, fact.label + ':'),
        e(Text, { key: `value-${i}`, style: enhancedStyles.quickFactValue }, fact.value)
      )
    )
  );
};

// Inline information display
export const InlineInfo = ({ items }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.inlineInfo },
    items.map((item, i) => 
      e(Text, { key: `info-${i}`, style: enhancedStyles.inlineItem },
        e(Text, { key: `label-${i}`, style: { fontWeight: typography.weights.bold } }, item.label + ': '),
        item.value,
        i < items.length - 1 ? ' | ' : ''
      )
    )
  );
};

// Two-column bullet list
export const TwoColumnList = ({ items }) => {
  const e = React.createElement;
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);
  
  return e(View, { style: enhancedStyles.twoColumnList },
    e(View, { style: enhancedStyles.listColumn },
      leftItems.map((item, i) => 
        e(View, { key: `left-${i}`, style: enhancedStyles.compactListItem },
          e(Text, { key: `bullet-left-${i}`, style: enhancedStyles.bullet }, '•'),
          e(Text, { key: `text-left-${i}` }, item)
        )
      )
    ),
    e(View, { style: enhancedStyles.listColumn },
      rightItems.map((item, i) => 
        e(View, { key: `right-${i}`, style: enhancedStyles.compactListItem },
          e(Text, { key: `bullet-right-${i}`, style: enhancedStyles.bullet }, '•'),
          e(Text, { key: `text-right-${i}` }, item)
        )
      )
    )
  );
};

// Compact table component
export const CompactTable = ({ headers, rows }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.compactTable },
    e(View, { key: 'header-row', style: enhancedStyles.tableHeader },
      headers.map((header, i) => 
        e(Text, { key: `header-${i}`, style: enhancedStyles.tableHeaderText }, header)
      )
    ),
    rows.map((row, i) => 
      e(View, { 
        key: `row-${i}`, 
        style: [
          enhancedStyles.tableRow,
          i % 2 === 0 ? enhancedStyles.evenRow : enhancedStyles.oddRow
        ]
    },
        row.map((cell, j) => 
          e(Text, { key: `cell-${i}-${j}`, style: enhancedStyles.tableCell }, cell)
        )
      )
    )
  );
};

// Forest Green table component (per style guide requirements)
export const ForestGreenTable = ({ headers, rows, columnWidths }) => {
  const e = React.createElement;
  
  const forestTableStyles = StyleSheet.create({
    table: {
      border: '1px solid #E2E8F0',
      borderRadius: callout.radius,
      overflow: 'hidden',
  },
    header: {
      backgroundColor: colors.backgroundAlt,
      flexDirection: 'row',
      padding: '6px 8px',
  },
    headerText: {
      color: colors.primary, // Forest green
      fontSize: typography.sizes.base,     // 11pt as required
      fontWeight: typography.weights.bold,
      flex: 1,
  },
    row: {
      flexDirection: 'row',
      padding: '4px 8px',
      borderBottom: '1px solid #E2E8F0',
  },
    evenRow: {
      backgroundColor: '#F7FAFC',
  },
    oddRow: {
      backgroundColor: colors.background,
  },
    cell: {
      flex: 1,
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.normal,
  }
});
  
  return e(View, { style: forestTableStyles.table },
    e(View, { key: 'forest-header-row', style: forestTableStyles.header },
      headers.map((header, i) => 
        e(Text, { 
          key: `forest-header-${i}`, 
          style: [
            forestTableStyles.headerText, 
            columnWidths && { flex: columnWidths[i] || 1 }
          ] 
      }, header)
      )
    ),
    rows.map((row, i) => 
      e(View, { 
        key: `forest-row-${i}`, 
        style: [
          forestTableStyles.row,
          i % 2 === 0 ? forestTableStyles.evenRow : forestTableStyles.oddRow
        ]
    },
        row.map((cell, j) => 
          e(Text, { 
            key: `forest-cell-${i}-${j}`, 
            style: [
              forestTableStyles.cell,
              columnWidths && { flex: columnWidths[j] || 1 }
            ] 
        }, cell)
        )
      )
    )
  );
};

// Dense text paragraph
export const DenseText = ({ children }) => {
  const e = React.createElement;
  return e(Text, { style: enhancedStyles.denseText }, children);
};

// Compact section headers
export const CompactSectionHeader = ({ children }) => {
  const e = React.createElement;
  return e(Text, { style: enhancedStyles.sectionHeader }, children);
};

export const CompactSubsectionHeader = ({ children }) => {
  const e = React.createElement;
  return e(Text, { style: enhancedStyles.subsectionHeader }, children);
};

// Emergency contact box
export const EmergencyBox = ({ children }) => {
  const e = React.createElement;
  return e(View, { style: enhancedStyles.emergencyBox }, children);
};

export { enhancedStyles };