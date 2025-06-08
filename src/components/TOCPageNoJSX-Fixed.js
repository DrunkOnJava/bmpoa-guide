import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors } from '../designTokens.js';
import { styles } from '../theme.js';

export default function TOCPageNoJSXFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const tocStyles = StyleSheet.create({
    page: {
      ...styles.page,
      paddingTop: 60, // FIXED: 60px top margin
    },
    tocTitle: {
      fontSize: 18, // FIXED: 18pt not 24pt
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.text,
      textAlign: 'center',
      marginBottom: layout.spacing.lg,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    pageInfo: {
      fontSize: typography.sizes.sm,
      color: colors.muted,
      textAlign: 'center',
      marginBottom: layout.spacing.lg,
      fontStyle: 'italic',
    },
    sectionEntry: {
      marginBottom: layout.spacing.sm,
    },
    entryRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      minHeight: 20,
    },
    entryNumber: {
      width: 20,
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
    },
    entryTitle: {
      flex: 1,
      fontSize: typography.sizes.base,
      color: colors.text,
      paddingRight: layout.spacing.xs,
    },
    dotLeader: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomStyle: 'dotted',
      borderBottomColor: colors.border,
      marginBottom: 3,
      marginHorizontal: 4,
      maxWidth: '68%', // FIXED: Consistent dot leader ending at 68%
    },
    pageNumber: {
      width: 50,
      fontSize: typography.sizes.base,
      color: colors.text,
      textAlign: 'right',
    },
    subsectionEntry: {
      marginLeft: 30,
      marginBottom: 4,
    },
    subsectionTitle: {
      fontSize: typography.sizes.sm,
      color: colors.muted,
    },
    // Fixed footer
    footer: {
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
    },
    footerText: {
      fontSize: 10, // FIXED: 10pt
      fontFamily: typography.families.base,
      color: colors.muted,
    },
  });

  // TOC entries with proper structure
  const sections = [
    { number: '1', title: 'Governance & Structure', pages: '7-9' },
    { number: '2', title: 'A Mountain Home', pages: '10-11' },
    { number: '3', title: 'Wood-Chipping Program', pages: '12-14' },
    { number: '4', title: 'Fire Safety & Emergency', pages: '15-23' },
    { number: '5', title: 'Community Services & Amenities', pages: '24-29' },
    { number: '6', title: 'Deer Lake', pages: '30-31' },
    { number: '7', title: 'The Lodge', pages: '32-35' },
    { number: '8', title: 'Communication', pages: '36-40' },
    { number: '9', title: 'Contacts & Location', pages: '41-43' },
    { number: '10', title: 'Natural Attractions & Activities', pages: '44-45' },
    { number: '11', title: 'Construction', pages: '46-60' },
    { number: '12', title: 'Bear Safety', pages: '61-64' },
  ];

  const renderEntry = (entry) => 
    e(View, { key: entry.number, style: tocStyles.sectionEntry },
      e(View, { style: tocStyles.entryRow }, [
        e(Text, { key: 'num', style: tocStyles.entryNumber }, entry.number),
        e(Text, { key: 'title', style: tocStyles.entryTitle }, entry.title),
        e(View, { key: 'dots', style: tocStyles.dotLeader }),
        e(Text, { key: 'pages', style: tocStyles.pageNumber }, entry.pages)
      ])
    );

  return e(
    Page,
    { size: 'LETTER', style: tocStyles.page },
    [
      // Title
      e(Text, { key: 'title', style: tocStyles.tocTitle }, 'TABLE OF CONTENTS'),
      
      // Page count info
      e(Text, { key: 'info', style: tocStyles.pageInfo }, 
        'This guide contains 69 pages of essential community information'
      ),
      
      // Section entries
      e(View, { key: 'sections', style: { marginTop: layout.spacing.lg } },
        sections.map(renderEntry)
      ),
      
      // Footer with correct page number
      e(View, { key: 'footer', style: tocStyles.footer }, [
        e(Text, { key: 'footerTitle', style: tocStyles.footerText }, 'BMPOA Community Guide'),
        e(Text, { key: 'pageNum', style: tocStyles.footerText }, '2') // FIXED: Correct page number
      ])
    ]
  );
}