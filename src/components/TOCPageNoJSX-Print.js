import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { PageFooter } from './EnhancedFooter.js';

export default function TOCPageNoJSXPrint({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const tocStyles = StyleSheet.create({
    tocTitle: {
      fontSize: typography.sizes.xlarge,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      textAlign: 'center',
      marginBottom: spacing.xl,
      letterSpacing: 1,
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
      borderTopWidth: 1,
      borderTopColor: colors.lightGray,
      paddingTop: spacing.xs,
    },
    tocRow: {
      flexDirection: 'row',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    tocRowAlt: {
      backgroundColor: '#FAFAFA',
    },
    sectionNumber: {
      width: 30,
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
    },
    sectionTitle: {
      flex: 1,
      fontSize: typography.sizes.base,
      color: colors.darkGray,
    },
    pageNumber: {
      width: 40,
      fontSize: typography.sizes.base,
      textAlign: 'right',
      color: colors.darkGray,
    },
    keywords: {
      fontSize: typography.sizes.sm,
      color: colors.mediumGray,
      marginTop: 2,
      fontStyle: 'italic',
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

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    
    // Title
    e(Text, { style: tocStyles.tocTitle }, 'TABLE OF CONTENTS'),
    
    // Table of Contents by Category
    e(
      View,
      { style: { flex: 1, marginTop: spacing.xl } },
      Object.entries(sectionCategories).map(([category, sections]) => 
        renderCategory(category, sections)
      )
    ),
    
    // Footer
    e(PageFooter, { pageNumber: 2 })
  );
}