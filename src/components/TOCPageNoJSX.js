import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { PageFooterNoJSX } from './DesignComponents.js';
// Enhanced components not currently used
import { pages } from '../../config.js';

export default function TOCPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const tocStyles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: spacing.lg,
      paddingHorizontal: spacing.xl,
    },
    tocEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 12,
      width: '100%',
    },
    sectionTitle: {
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: colors.darkCharcoal,
      flex: 1,
      paddingRight: spacing.md,
    },
    tocPageNum: {
      fontSize: 12,
      color: colors.darkCharcoal,
      fontFamily: 'Helvetica',
      minWidth: 30,
      textAlign: 'right',
    },
    tocTitle: {
      fontSize: 24,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      color: colors.forestGreen,
      textAlign: 'center',
      marginBottom: spacing.xl,
      letterSpacing: 1,
      textTransform: 'uppercase',
    }
  });
  
  // Section information with preview text
  const sectionInfo = {
    'governance': {
      title: 'Section 1: Governance & Structure',
      preview: 'How BMPOA is organized, Sanitary District details, Board composition',
      // subsections: ['BMPOA Overview', 'Sanitary District Explained'] // Removed for compact view
    },
    'mountain-home': {
      title: 'Section 2: A Mountain Home',
      preview: 'Community origins, natural beauty, seasonal and permanent residents',
      // subsections: ['Community Origins', 'Natural Beauty & Wildlife'] // Removed for compact view
    },
    'wood-chipping': {
      title: 'Section 3: Wood-Chipping Program',
      preview: 'Annual program guidelines, brush pile requirements, collection dates',
      subsections: ['Brush Pile Guidelines', 'Program Schedule']
    },
    'fire-safety': {
      title: 'Section 4: Fire Safety & Emergency',
      preview: 'Wildfire risk levels, evacuation plans, burning laws, emergency contacts',
      subsections: ['Understanding Risk', 'Evacuation Planning', '4 PM Burning Law']
    },
    'community-services': {
      title: 'Section 5: Community Services',
      preview: 'Road guidelines, utilities, waste disposal, winter traction',
      subsections: ['Roads & Winter Weather', 'Refuse Collection', 'Internet Services']
    },
    'deer-lake': {
      title: 'Section 6: Deer Lake Recreation',
      preview: 'Private lake access, recreational passes, rules and amenities',
      subsections: ['Location & Access', 'Rules & Regulations']
    },
    'lodge': {
      title: 'Section 7: The Lodge',
      preview: 'Community gathering place, rental information, regular activities',
      subsections: ['Lodge Features', 'Rental Information']
    },
    'communication': {
      title: 'Section 8: Communication',
      preview: 'Social events, Facebook groups, newsletters, community updates',
      subsections: ['Annual Events', 'Online Resources']
    },
    'contacts': {
      title: 'Section 9: Contacts',
      preview: 'Board officers, emergency numbers, important contact information',
      subsections: ['Board Directory', 'Emergency Contacts']
    },
    'natural-attractions': {
      title: 'Section 10: Natural Attractions',
      preview: 'Spring wildflowers, local wineries, hiking trails, native plants',
      subsections: ['Trilliums & Wildflowers', 'Local Wineries', 'Hiking Trails']
    },
    'construction': {
      title: 'Section 11: Construction',
      preview: 'ARC requirements, submission process, building guidelines',
      subsections: ['Submission Process', 'Building Requirements']
    },
    'bear-safety': {
      title: 'Section 12: Bear Safety',
      preview: 'Living with black bears, prevention strategies, legal requirements',
      subsections: ['Bear Behavior', 'Prevention Checklist']
    }
  };
  
  // Get all sections
  const allSections = pages.slice(2, -1).filter(page => sectionInfo[page.key]);
  
  const renderSection = (page) => {
    const info = sectionInfo[page.key];
    if (!info) return null;
    
    return e(
      View,
      { key: page.key, style: tocStyles.tocEntry },
      e(Text, { style: tocStyles.sectionTitle }, info.title),
      e(Text, { style: tocStyles.tocPageNum }, pageNumberMap[page.key] || '—')
    );
  };

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    // Title
    e(Text, { style: tocStyles.tocTitle }, 'TABLE OF CONTENTS'),
    
    // Simple single-column layout
    e(
      View,
      { style: tocStyles.container },
      allSections.map(page => renderSection(page))
    ),
    
    // Footer
    e(PageFooterNoJSX, { pageNumber: 2 })
  );
}