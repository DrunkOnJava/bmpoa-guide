import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Enhanced style system with tighter spacing
const enhancedStyles = StyleSheet.create({
  // Two-column layout
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  mainColumn: {
    flex: 2,
    paddingRight: 8,
  },
  sidebarColumn: {
    flex: 1,
    gap: 12,
  },
  
  // Compact info box for sidebars
  infoBox: {
    border: '1px solid #E2E8F0',
    borderRadius: 4,
    marginBottom: 12,
  },
  infoBoxHeader: {
    backgroundColor: '#2C5282',
    padding: '6px 8px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  infoBoxTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoBoxContent: {
    padding: 8,
    fontSize: 9,
    lineHeight: 1.3,
  },
  
  // Compact table styles
  compactTable: {
    border: '1px solid #E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#2C5282',
    flexDirection: 'row',
    padding: '6px 8px',
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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
    backgroundColor: '#FFFFFF',
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.3,
  },
  
  // Quick facts sidebar component
  quickFactsBox: {
    backgroundColor: '#F7FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 4,
    padding: 10,
  },
  quickFactsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2C5282',
  },
  quickFactItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  quickFactLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    width: '40%',
  },
  quickFactValue: {
    fontSize: 9,
    width: '60%',
  },
  
  // Inline key-value pairs
  inlineInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    marginBottom: 8,
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
    fontSize: 9,
    lineHeight: 1.3,
  },
  bullet: {
    marginRight: 4,
  },
  
  // Dense paragraph styles
  denseText: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 8,
    textAlign: 'justify',
  },
  
  // Compact section headers
  sectionHeader: {
    backgroundColor: '#2C5282',
    color: '#FFFFFF',
    padding: '8px 12px',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subsectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C5282',
    marginBottom: 6,
    marginTop: 8,
  },
  
  // Emergency contact box
  emergencyBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#DC2626',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
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
export const InfoBox = ({ title, children }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.infoBox },
    e(View, { style: enhancedStyles.infoBoxHeader },
      e(Text, { style: enhancedStyles.infoBoxTitle }, title)
    ),
    e(View, { style: enhancedStyles.infoBoxContent }, children)
  );
};

// Quick facts sidebar component
export const QuickFactsBox = ({ facts }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.quickFactsBox },
    e(Text, { style: enhancedStyles.quickFactsTitle }, 'Quick Facts'),
    facts.map((fact, i) => 
      e(View, { key: `fact-${i}`, style: enhancedStyles.quickFactItem },
        e(Text, { style: enhancedStyles.quickFactLabel }, fact.label + ':'),
        e(Text, { style: enhancedStyles.quickFactValue }, fact.value)
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
        e(Text, { style: { fontWeight: 'bold' } }, item.label + ': '),
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
          e(Text, { style: enhancedStyles.bullet }, '•'),
          e(Text, null, item)
        )
      )
    ),
    e(View, { style: enhancedStyles.listColumn },
      rightItems.map((item, i) => 
        e(View, { key: `right-${i}`, style: enhancedStyles.compactListItem },
          e(Text, { style: enhancedStyles.bullet }, '•'),
          e(Text, null, item)
        )
      )
    )
  );
};

// Compact table component
export const CompactTable = ({ headers, rows }) => {
  const e = React.createElement;
  
  return e(View, { style: enhancedStyles.compactTable },
    e(View, { style: enhancedStyles.tableHeader },
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