import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, typography, tableStyles } from '../standardizedStyles.js';

const styles = StyleSheet.create({
  ...tableStyles,
  
  // Additional styles for enhanced features
  headerRepeat: {
    // This tells React PDF to repeat headers on new pages
    breakInside: 'avoid',
  },
  
  narrowTable: {
    width: '70%',
  },
  
  wideTable: {
    width: '100%',
  },
  
  compactCell: {
    padding: 6,
    fontSize: typography.body,
  },
  
  // Column width presets
  col1: { width: '50%' },
  col2: { width: '25%' },
  col3: { width: '25%' },
  colEqual: { flex: 1 },
  colNarrow: { width: '20%' },
  colWide: { width: '40%' },
});

// Enhanced table component with header repetition and consistent styling
export const EnhancedTable = ({ 
  headers = [], 
  rows = [], 
  width = 'wide',
  columnWidths = null,
  alternateRows = true,
  compact = false,
  caption = null,
  repeatHeader = true
}) => {
  const e = React.createElement;
  
  const tableStyle = width === 'narrow' ? styles.narrowTable : styles.wideTable;
  const cellStyle = compact ? styles.compactCell : styles.cell;
  
  // Function to render header
  const renderHeader = () => 
    e(View, { 
      style: [styles.headerRow, repeatHeader && styles.headerRepeat],
      wrap: false // Prevents header from breaking across pages
    },
      headers.map((header, index) => 
        e(Text, { 
          key: `header-${index}`, 
          style: [
            styles.headerCell, 
            cellStyle,
            columnWidths && columnWidths[index]
          ] 
        }, header)
      )
    );
  
  return e(View, { style: [styles.table, tableStyle] },
    // Caption if provided
    caption && e(Text, { style: styles.caption }, caption),
    
    // Header row
    renderHeader(),
    
    // Data rows
    rows.map((row, rowIndex) => 
      e(View, { 
        key: `row-${rowIndex}`, 
        style: [
          styles.row,
          alternateRows && rowIndex % 2 === 1 && styles.rowAlternate
        ],
        wrap: false // Try to keep rows together
      },
        row.map((cell, cellIndex) => 
          e(Text, { 
            key: `cell-${rowIndex}-${cellIndex}`, 
            style: [
              cellStyle,
              columnWidths && columnWidths[cellIndex]
            ] 
          }, cell)
        )
      )
    )
  );
};

// Preset table configurations
export const ServiceTable = ({ data, caption }) => {
  const e = React.createElement;
  return e(EnhancedTable, {
    headers: ['Service', 'Details', 'Contact'],
    rows: data,
    columnWidths: [styles.colWide, styles.colEqual, styles.colNarrow],
    caption,
    compact: true
  });
};

export const ScheduleTable = ({ data, caption }) => {
  const e = React.createElement;
  return e(EnhancedTable, {
    headers: ['Day', 'Time', 'Activity'],
    rows: data,
    columnWidths: [styles.colNarrow, styles.colNarrow, styles.colWide],
    caption,
    alternateRows: true
  });
};

export const RequirementsTable = ({ data, caption }) => {
  const e = React.createElement;
  return e(EnhancedTable, {
    headers: ['Requirement', 'Details'],
    rows: data,
    columnWidths: [styles.col1, styles.col1],
    caption,
    width: 'wide'
  });
};

export const ContactTable = ({ data, caption }) => {
  const e = React.createElement;
  return e(EnhancedTable, {
    headers: ['Name/Role', 'Phone', 'Email'],
    rows: data,
    columnWidths: [styles.colWide, styles.colNarrow, styles.colEqual],
    caption,
    compact: true,
    alternateRows: true
  });
};

// Export all table types
export default {
  EnhancedTable,
  ServiceTable,
  ScheduleTable,
  RequirementsTable,
  ContactTable
};