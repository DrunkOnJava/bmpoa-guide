import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { PageFooterNoJSX } from './DesignComponents.js';
import { MixedLayout, TOCEntry, Badge, CardGrid } from './AdvancedLayoutComponents.js';
import { InfoBox } from './EnhancedLayoutComponents.js';
import { pages } from '../../config.js';

export default function TOCPageNoJSXEnhanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const tocStyles = StyleSheet.create({
    tocTitle: {
      fontSize: typography.sizes.xlarge,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      textAlign: 'center',
      marginBottom: spacing.lg,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
  },
    welcomeBox: {
      backgroundColor: '#F0FDF4',
      borderLeft: `4px solid ${colors.primary}`,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderRadius: callout.radius,
  },
    welcomeText: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkGray,
      fontStyle: 'italic',
  },
    sectionGroup: {
      marginBottom: spacing.lg,
  },
    groupTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
  },
    tocGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xs,
  },
    tocRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: 6,
      paddingHorizontal: spacing.sm,
      backgroundColor: '#FAFAFA',
      borderRadius: 3,
  },
    tocRowAlt: {
      backgroundColor: colors.background,
  },
    sectionNumber: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.accent,
      marginRight: spacing.sm,
      minWidth: 20,
  },
    sectionTitle: {
      fontSize: typography.sizes.base,
      color: colors.darkGray,
      flex: 1,
  },
    pageNumber: {
      fontSize: typography.sizes.base,
      color: colors.darkGray,
      fontWeight: typography.weights.bold,
      minWidth: 30,
      textAlign: 'right',
  },
    quickNavBox: {
      marginTop: spacing.lg,
      padding: spacing.md,
      backgroundColor: colors.background,
      borderRadius: callout.radius,
  },
    quickNavTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: spacing.sm,
      textAlign: 'center',
  },
    quickNavGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      justifyContent: 'center',
  },
    quickNavItem: {
      backgroundColor: colors.white,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.mediumGray,
  },
    quickNavText: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
  }
});
  
  // Section information organized by category
  const sectionCategories = {
    'Community Information': [
      { key: 'governance', number: '1', title: 'Governance & Structure', keywords: ['Board', 'Sanitary District', 'Organization'] },
      { key: 'mountain-home', number: '2', title: 'A Mountain Home', keywords: ['History', 'Nature', 'Community'] },
      { key: 'communication', number: '8', title: 'Communication', keywords: ['Events', 'Facebook', 'Newsletter'] },
      { key: 'contacts', number: '9', title: 'Contacts', keywords: ['Emergency', 'Board', 'Services'] }
    ],
    'Safety & Regulations': [
      { key: 'fire-safety', number: '4', title: 'Fire Safety & Emergency', keywords: ['Wildfire', 'Evacuation', 'Burning'] },
      { key: 'bear-safety', number: '12', title: 'Bear Safety', keywords: ['Wildlife', 'Prevention', 'Laws'] },
      { key: 'construction', number: '11', title: 'Construction', keywords: ['ARC', 'Building', 'Permits'] }
    ],
    'Services & Amenities': [
      { key: 'wood-chipping', number: '3', title: 'Wood-Chipping Program', keywords: ['Brush', 'Schedule', 'Guidelines'] },
      { key: 'community-services', number: '5', title: 'Community Services', keywords: ['Roads', 'Utilities', 'Waste'] },
      { key: 'deer-lake', number: '6', title: 'Deer Lake Recreation', keywords: ['Lake', 'Swimming', 'Fishing'] },
      { key: 'lodge', number: '7', title: 'The Lodge', keywords: ['Rental', 'Events', 'Activities'] },
      { key: 'natural-attractions', number: '10', title: 'Natural Attractions', keywords: ['Trails', 'Wildflowers', 'Wineries'] }
    ]
};

  const renderTOCEntry = (section, index) => {
    const pageNum = pageNumberMap[section.key] || '—';
    const isAlt = index % 2 === 1;
    
    return e(
      View,
      { 
        key: section.key, 
        style: [tocStyles.tocRow, isAlt && tocStyles.tocRowAlt]
    },
      e(Text, { style: tocStyles.sectionNumber }, section.number),
      e(Text, { style: tocStyles.sectionTitle }, section.title),
      e(Text, { style: tocStyles.pageNumber }, pageNum)
    );
};

  const renderCategory = (categoryName, sections) => {
    return e(
      View,
      { key: categoryName, style: tocStyles.sectionGroup },
      e(Text, { style: tocStyles.groupTitle }, categoryName),
      e(
        View,
        { style: tocStyles.tocGrid },
        sections.map((section, index) => renderTOCEntry(section, index))
      )
    );
};

  // Quick navigation items
  const quickNavItems = [
    'Emergency p.' + (pageNumberMap['fire-safety'] || '—'),
    'Board p.' + (pageNumberMap['contacts'] || '—'),
    'ARC p.' + (pageNumberMap['construction'] || '—'),
    'Deer Lake p.' + (pageNumberMap['deer-lake'] || '—'),
    'Bears p.' + (pageNumberMap['bear-safety'] || '—'),
    'Events p.' + (pageNumberMap['communication'] || '—')
  ];

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    
    // Title with subtle decoration
    e(Text, { style: tocStyles.tocTitle }, 'TABLE OF CONTENTS'),
    
    // Welcome message
    e(View, { style: tocStyles.welcomeBox },
      e(Text, { style: tocStyles.welcomeText },
        'This guide contains essential information for Blue Mountain property owners. Sections are organized by topic to help you quickly find what you need. Keep this guide handy for reference throughout the year.'
      )
    ),
    
    // Table of Contents by Category
    e(
      View,
      { style: { flex: 1 } },
      Object.entries(sectionCategories).map(([category, sections]) => 
        renderCategory(category, sections)
      )
    ),
    
    // Quick Navigation Box
    e(View, { style: tocStyles.quickNavBox },
      e(Text, { style: tocStyles.quickNavTitle }, 'QUICK NAVIGATION'),
      e(View, { style: tocStyles.quickNavGrid },
        quickNavItems.map((item, index) => 
          e(View, { key: `nav-${index}`, style: tocStyles.quickNavItem },
            e(Text, { style: tocStyles.quickNavText }, item)
          )
        )
      )
    ),
    
    // Footer
    e(PageFooterNoJSX, { pageNumber: 2 })
  );
}