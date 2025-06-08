import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { PageFooterNoJSX } from './DesignComponents.js';

export default function TOCPageNoJSXAllPages({ pageNumberMap = {}, totalPages = 71 }) {
  const e = React.createElement;
  
  const tocStyles = StyleSheet.create({
    tocTitle: {
      fontSize: typography.sizes.large,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      textAlign: 'center',
      marginBottom: spacing.xs,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    pageInfo: {
      fontSize: typography.sizes.tiny,
      color: colors.mediumGray,
      textAlign: 'center',
      marginBottom: spacing.sm,
      fontStyle: 'italic',
    },
    columnsContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    column: {
      flex: 1,
    },
    tocEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: 1,
      paddingHorizontal: 2,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.lightGray,
    },
    tocEntryAlt: {
      backgroundColor: '#FAFAFA',
    },
    pageNumber: {
      fontSize: typography.sizes.tiny,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      minWidth: 15,
      marginRight: 4,
    },
    pageTitle: {
      fontSize: typography.sizes.tiny,
      color: colors.darkGray,
      flex: 1,
    },
    sectionDivider: {
      backgroundColor: colors.forestGreen,
      color: colors.white,
      fontWeight: typography.weights.bold,
    },
    subsectionHeader: {
      fontWeight: typography.weights.bold,
      color: colors.accent,
      backgroundColor: colors.backgroundAlt,
      marginTop: 2,
    },
    legendBox: {
      backgroundColor: colors.background,
      padding: spacing.xs,
      marginBottom: spacing.xs,
      borderRadius: callout.radius,
    },
    legendTitle: {
      fontSize: typography.sizes.tiny,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: 2,
    },
    legendRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: 0,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    legendIcon: {
      width: 8,
      height: 8,
      borderRadius: 1,
    },
    legendText: {
      fontSize: 8,
      color: colors.darkGray,
    }
  });

  // Manual page mapping based on the 71-page PDF structure
  // Updated based on actual PDF analysis
  const allPages = [
    { page: 1, title: 'Cover Page', type: 'cover' },
    { page: 2, title: 'Table of Contents', type: 'toc' },
    { page: 3, title: 'Welcome Letter', type: 'content' },
    { page: 4, title: 'Introduction - Blue Mountain Living', type: 'content' },
    { page: 5, title: 'Introduction - Timeline & History', type: 'content' },
    { page: 6, title: 'Introduction - Community Overview', type: 'content' },
    { page: 7, title: 'Introduction - Mountain Living Tips', type: 'content' },
    { page: 8, title: 'Introduction - Getting Started', type: 'content' },
    { page: 9, title: 'Introduction - Resources', type: 'content' },
    { page: 10, title: 'Introduction - Quick Reference', type: 'content' },
    { page: 11, title: 'Section 1: Governance & Structure', type: 'section' },
    { page: 12, title: 'BMPOA Overview', type: 'content' },
    { page: 13, title: 'Sanitary District Information', type: 'content' },
    { page: 14, title: 'Board Structure & Officers', type: 'content' },
    { page: 15, title: 'Meetings & Voting', type: 'content' },
    { page: 16, title: 'Committees Overview', type: 'content' },
    { page: 17, title: 'Your Rights & Responsibilities', type: 'content' },
    { page: 18, title: 'Governance Resources', type: 'content' },
    { page: 19, title: 'Section 2: A Mountain Home', type: 'section' },
    { page: 20, title: 'Living on Blue Mountain', type: 'content' },
    { page: 21, title: 'Mountain Living Guidelines', type: 'content' },
    { page: 22, title: 'Section 3: Wood-Chipping Program', type: 'section' },
    { page: 23, title: 'Annual Chipping & Fire Mitigation', type: 'content' },
    { page: 24, title: 'Brush Pile Guidelines', type: 'content' },
    { page: 25, title: 'Wood Chip Access & Delivery', type: 'content' },
    { page: 26, title: 'Chipping Schedule & Contacts', type: 'content' },
    { page: 27, title: 'Section 4: Fire Safety & Emergency', type: 'section' },
    { page: 28, title: 'Wildfire Prevention', type: 'content' },
    { page: 29, title: 'Open Burning Regulations', type: 'content' },
    { page: 30, title: 'Defensible Space Requirements', type: 'content' },
    { page: 31, title: 'Emergency Preparedness', type: 'content' },
    { page: 32, title: 'Evacuation Planning', type: 'content' },
    { page: 33, title: 'Emergency Contacts', type: 'content' },
    { page: 34, title: 'Fire Safety Resources', type: 'content' },
    { page: 35, title: 'Section 5: Community Services', type: 'section' },
    { page: 36, title: 'Services Overview', type: 'content' },
    { page: 37, title: 'Road Maintenance', type: 'content' },
    { page: 38, title: 'Utilities & Infrastructure', type: 'content' },
    { page: 39, title: 'Waste Management', type: 'content' },
    { page: 40, title: 'Service Contacts', type: 'content' },
    { page: 41, title: 'Section 6: Deer Lake Recreation', type: 'section' },
    { page: 42, title: 'Lake Overview & Rules', type: 'content' },
    { page: 43, title: 'Boating Guidelines', type: 'content' },
    { page: 44, title: 'Fishing Regulations', type: 'content' },
    { page: 45, title: 'Section 7: The Lodge', type: 'section' },
    { page: 46, title: 'Lodge Facilities', type: 'content' },
    { page: 47, title: 'Rental Information', type: 'content' },
    { page: 48, title: 'Lodge Activities & Events', type: 'content' },
    { page: 49, title: 'Section 8: Communication', type: 'section' },
    { page: 50, title: 'Staying Connected', type: 'content' },
    { page: 51, title: 'Community Newsletter', type: 'content' },
    { page: 52, title: 'Social Media & Website', type: 'content' },
    { page: 53, title: 'Section 9: Contacts', type: 'section' },
    { page: 54, title: 'Emergency Contacts', type: 'content' },
    { page: 55, title: 'Board & Committee Contacts', type: 'content' },
    { page: 56, title: 'Service Provider Directory', type: 'content' },
    { page: 57, title: 'Local Business Directory', type: 'content' },
    { page: 58, title: 'Section 10: Natural Attractions', type: 'section' },
    { page: 59, title: 'Wildflowers & Wildlife', type: 'content' },
    { page: 60, title: 'Hiking Trails & Parks', type: 'content' },
    { page: 61, title: 'Local Wineries', type: 'content' },
    { page: 62, title: 'Area Attractions', type: 'content' },
    { page: 63, title: 'Section 11: Construction', type: 'section' },
    { page: 64, title: 'Architectural Review Committee', type: 'content' },
    { page: 65, title: 'Building Guidelines & Permits', type: 'content' },
    { page: 66, title: 'Construction Standards', type: 'content' },
    { page: 67, title: 'Environmental Considerations', type: 'content' },
    { page: 68, title: 'ARC Contact Information', type: 'content' },
    { page: 69, title: 'Section 12: Bear Safety', type: 'section' },
    { page: 70, title: 'Living with Bears & Prevention', type: 'content' },
    { page: 71, title: 'Back Cover', type: 'cover' }
  ];

  // Split pages into two columns for display
  const midPoint = Math.ceil(allPages.length / 2);
  const leftColumn = allPages.slice(0, midPoint);
  const rightColumn = allPages.slice(midPoint);

  const renderTOCEntry = (entry, index) => {
    const entryStyle = [tocStyles.tocEntry];
    
    if (index % 2 === 1) {
      entryStyle.push(tocStyles.tocEntryAlt);
    }
    
    if (entry.type === 'section') {
      entryStyle.push(tocStyles.sectionDivider);
    } else if (entry.type === 'subsection') {
      entryStyle.push(tocStyles.subsectionHeader);
    }
    
    return e(
      View,
      { key: `page-${entry.page}`, style: entryStyle },
      e(Text, { style: tocStyles.pageNumber }, entry.page),
      e(Text, { style: tocStyles.pageTitle }, entry.title)
    );
  };

  const renderColumn = (pages, startIndex = 0) => {
    return e(
      View,
      { style: tocStyles.column },
      pages.map((entry, index) => renderTOCEntry(entry, startIndex + index))
    );
  };

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    
    // Title
    e(Text, { style: tocStyles.tocTitle }, 'COMPLETE TABLE OF CONTENTS'),
    
    // Page count info
    e(Text, { style: tocStyles.pageInfo }, 
      `Complete listing of all ${totalPages} pages in the BMPOA Community Guide`
    ),
    
    // Legend
    e(View, { style: tocStyles.legendBox },
      e(Text, { style: tocStyles.legendTitle }, 'LEGEND'),
      e(View, { style: tocStyles.legendRow },
        e(View, { style: tocStyles.legendItem },
          e(View, { style: [tocStyles.legendIcon, { backgroundColor: colors.forestGreen }] }),
          e(Text, { style: tocStyles.legendText }, 'Section Dividers')
        ),
        e(View, { style: tocStyles.legendItem },
          e(View, { style: [tocStyles.legendIcon, { backgroundColor: colors.backgroundAlt }] }),
          e(Text, { style: tocStyles.legendText }, 'Subsections')
        ),
        e(View, { style: tocStyles.legendItem },
          e(View, { style: [tocStyles.legendIcon, { backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.lightGray }] }),
          e(Text, { style: tocStyles.legendText }, 'Content Pages')
        )
      )
    ),
    
    // Two-column layout for all pages
    e(View, { style: tocStyles.columnsContainer },
      renderColumn(leftColumn, 0),
      renderColumn(rightColumn, leftColumn.length)
    ),
    
    // Footer
    e(PageFooterNoJSX, { pageNumber: 2 })
  );
}