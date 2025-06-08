import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, colors, spacing } from '../designTokens.js';

// FIXED: Standardized table with 12-column grid system
const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
    marginVertical: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 24, // FIXED: 24px minimum row height
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  tableHeader: {
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderStrong,
  },
  tableCell: {
    padding: 6,
    fontSize: 10,
    fontFamily: typography.families.base,
    lineHeight: 1.4,
    flexWrap: 'wrap', // FIXED: Enforce word-wrap
    flexShrink: 1,
  },
  headerCell: {
    fontWeight: typography.weights.bold,
    fontSize: 10,
    fontFamily: typography.families.heading,
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
  // Alignment options
  alignLeft: { textAlign: 'left' },
  alignCenter: { textAlign: 'center' },
  alignRight: { textAlign: 'right' },
  // Special styles
  compactCell: { padding: 4, fontSize: 9 },
  wrapText: { 
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
});

// Helper to get column width style
const getColumnWidth = (span) => {
  if (typeof span === 'number' && span >= 1 && span <= 12) {
    return tableStyles[`col${span}`];
  }
  return { flex: 1 }; // Default to flex if no valid span
};

export default function StandardizedTable({ 
  headers = [], 
  rows = [], 
  columnSpans = [],
  alignments = [],
  compact = false,
  showHeader = true,
  alternateRows = true,
  borderless = false,
}) {
  const e = React.createElement;
  
  // Calculate column widths
  const columnWidths = headers.map((_, index) => 
    getColumnWidth(columnSpans[index] || Math.floor(12 / headers.length))
  );
  
  // Get alignment for each column
  const columnAlignments = headers.map((_, index) => {
    const align = alignments[index] || 'left';
    return tableStyles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`];
  });
  
  return e(
    View,
    { style: [tableStyles.table, borderless && { borderWidth: 0 }] },
    [
      // Header row
      showHeader && headers.length > 0 && e(
        View,
        { key: 'header', style: [tableStyles.tableRow, tableStyles.tableHeader] },
        headers.map((header, index) => 
          e(
            View,
            { 
              key: index, 
              style: [
                tableStyles.tableCell,
                compact && tableStyles.compactCell,
                columnWidths[index],
                columnAlignments[index]
              ] 
            },
            e(Text, { style: tableStyles.headerCell }, header)
          )
        )
      ),
      
      // Data rows
      ...rows.map((row, rowIndex) => 
        e(
          View,
          { 
            key: `row-${rowIndex}`, 
            style: [
              tableStyles.tableRow,
              alternateRows && rowIndex % 2 === 1 && { backgroundColor: colors.backgroundAlt },
              rowIndex === rows.length - 1 && { borderBottomWidth: 0 }
            ] 
          },
          row.map((cell, cellIndex) => 
            e(
              View,
              { 
                key: cellIndex, 
                style: [
                  tableStyles.tableCell,
                  compact && tableStyles.compactCell,
                  columnWidths[cellIndex],
                  columnAlignments[cellIndex],
                  tableStyles.wrapText
                ] 
              },
              e(Text, { style: { fontSize: compact ? 9 : 10 } }, cell || '')
            )
          )
        )
      )
    ]
  );
}

// Export convenience components for common table types

// Two-column key-value table
export function KeyValueTable({ data = [], title = null }) {
  const e = React.createElement;
  
  const rows = data.map(item => [item.label || item.key, item.value]);
  
  return e(
    View,
    null,
    [
      title && e(Text, { 
        key: 'title',
        style: { 
          fontSize: 12, 
          fontWeight: typography.weights.bold,
          marginBottom: spacing.xs 
        } 
      }, title),
      e(StandardizedTable, {
        key: 'table',
        headers: [],
        rows,
        columnSpans: [4, 8],
        showHeader: false,
        compact: true,
      })
    ]
  );
}

// Comparison table with highlighted differences
export function ComparisonTable({ headers, rows, highlightColumn = -1 }) {
  const e = React.createElement;
  
  const enhancedRows = rows.map(row => 
    row.map((cell, index) => 
      index === highlightColumn 
        ? e(Text, { style: { fontWeight: typography.weights.bold, color: colors.accent } }, cell)
        : cell
    )
  );
  
  return e(StandardizedTable, {
    headers,
    rows: enhancedRows,
    alternateRows: true,
  });
}