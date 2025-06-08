import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { PageFooterNoJSX } from './DesignComponents.js';

export default function TOCPageNoJSXStructured({ pageNumberMap = {}, totalPages = 71 }) {
  const e = React.createElement;
  
  const tocStyles = StyleSheet.create({
    tocTitle: {
      fontSize: typography.sizes.xlarge,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      textAlign: 'center',
      marginBottom: spacing.md,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    pageInfo: {
      fontSize: typography.sizes.sm,
      color: colors.mediumGray,
      textAlign: 'center',
      marginBottom: spacing.lg,
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
    sectionEntry: {
      marginBottom: 6,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      backgroundColor: colors.forestGreen,
      paddingVertical: 3,
      paddingHorizontal: 4,
      marginBottom: 2,
    },
    sectionNumber: {
      fontSize: 9,
      fontWeight: typography.weights.bold,
      color: colors.white,
      minWidth: 12,
    },
    sectionTitle: {
      fontSize: 9,
      fontWeight: typography.weights.bold,
      color: colors.white,
      flex: 1,
    },
    sectionPageRange: {
      fontSize: 8,
      color: colors.white,
    },
    subsectionEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: 1,
      paddingLeft: 8,
      paddingRight: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.lightGray,
    },
    subsectionTitle: {
      fontSize: 8,
      color: colors.darkGray,
      flex: 1,
    },
    pageNumber: {
      fontSize: 8,
      color: colors.primary,
      fontWeight: typography.weights.medium,
    },
    introEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingVertical: 2,
      paddingHorizontal: 4,
      backgroundColor: colors.backgroundAlt,
      marginBottom: 2,
    },
    introTitle: {
      fontSize: 9,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      flex: 1,
    },
  });

  // Structured content with sections and key pages
  const structuredContent = [
    {
      title: 'Welcome & Introduction',
      pageRange: 'Pages 3-10',
      entries: [
        { title: 'Welcome Letter', page: 3 },
        { title: 'Introduction to Blue Mountain Living', page: 4 },
        { title: 'Timeline & History', page: 5 },
        { title: 'Community Overview', page: 6 },
        { title: 'Quick Reference Guide', page: 10 },
      ]
    },
    {
      section: '1',
      title: 'Governance & Structure',
      pageRange: 'Pages 11-18',
      entries: [
        { title: 'BMPOA Overview', page: 12 },
        { title: 'Board Structure & Officers', page: 14 },
        { title: 'Meetings & Voting', page: 15 },
        { title: 'Your Rights & Responsibilities', page: 17 },
      ]
    },
    {
      section: '2',
      title: 'A Mountain Home',
      pageRange: 'Pages 19-21',
      entries: [
        { title: 'Living on Blue Mountain', page: 20 },
        { title: 'Mountain Living Guidelines', page: 21 },
      ]
    },
    {
      section: '3',
      title: 'Wood-Chipping Program',
      pageRange: 'Pages 22-26',
      entries: [
        { title: 'Annual Chipping & Fire Mitigation', page: 23 },
        { title: 'Brush Pile Guidelines', page: 24 },
        { title: 'Wood Chip Access & Delivery', page: 25 },
      ]
    },
    {
      section: '4',
      title: 'Fire Safety & Emergency',
      pageRange: 'Pages 27-34',
      entries: [
        { title: 'Wildfire Prevention', page: 28 },
        { title: 'Open Burning Regulations', page: 29 },
        { title: 'Emergency Preparedness', page: 31 },
        { title: 'Evacuation Planning', page: 32 },
      ]
    },
    {
      section: '5',
      title: 'Community Services',
      pageRange: 'Pages 35-40',
      entries: [
        { title: 'Services Overview', page: 36 },
        { title: 'Road Maintenance', page: 37 },
        { title: 'Utilities & Infrastructure', page: 38 },
        { title: 'Waste Management', page: 39 },
      ]
    },
    {
      section: '6',
      title: 'Deer Lake Recreation',
      pageRange: 'Pages 41-44',
      entries: [
        { title: 'Lake Overview & Rules', page: 42 },
        { title: 'Boating Guidelines', page: 43 },
        { title: 'Fishing Regulations', page: 44 },
      ]
    },
    {
      section: '7',
      title: 'The Lodge',
      pageRange: 'Pages 45-48',
      entries: [
        { title: 'Lodge Facilities', page: 46 },
        { title: 'Rental Information', page: 47 },
        { title: 'Lodge Activities & Events', page: 48 },
      ]
    },
    {
      section: '8',
      title: 'Communication',
      pageRange: 'Pages 49-52',
      entries: [
        { title: 'Staying Connected', page: 50 },
        { title: 'Community Newsletter', page: 51 },
        { title: 'Social Media & Website', page: 52 },
      ]
    },
    {
      section: '9',
      title: 'Contacts',
      pageRange: 'Pages 53-57',
      entries: [
        { title: 'Emergency Contacts', page: 54 },
        { title: 'Board & Committee Contacts', page: 55 },
        { title: 'Service Provider Directory', page: 56 },
      ]
    },
    {
      section: '10',
      title: 'Natural Attractions',
      pageRange: 'Pages 58-62',
      entries: [
        { title: 'Wildflowers & Wildlife', page: 59 },
        { title: 'Hiking Trails & Parks', page: 60 },
        { title: 'Local Wineries', page: 61 },
      ]
    },
    {
      section: '11',
      title: 'Construction',
      pageRange: 'Pages 63-68',
      entries: [
        { title: 'Architectural Review Committee', page: 64 },
        { title: 'Building Guidelines & Permits', page: 65 },
        { title: 'Environmental Considerations', page: 67 },
      ]
    },
    {
      section: '12',
      title: 'Bear Safety',
      pageRange: 'Pages 69-70',
      entries: [
        { title: 'Living with Bears & Prevention', page: 70 },
      ]
    },
  ];

  // Split into three columns
  const itemsPerColumn = Math.ceil(structuredContent.length / 3);
  const column1 = structuredContent.slice(0, itemsPerColumn);
  const column2 = structuredContent.slice(itemsPerColumn, itemsPerColumn * 2);
  const column3 = structuredContent.slice(itemsPerColumn * 2);

  const renderSection = (section) => {
    return e(
      View,
      { key: section.title, style: tocStyles.sectionEntry },
      // Section header
      e(
        View,
        { style: section.section ? tocStyles.sectionHeader : tocStyles.introEntry },
        section.section && e(Text, { style: tocStyles.sectionNumber }, section.section),
        e(Text, { style: section.section ? tocStyles.sectionTitle : tocStyles.introTitle }, section.title),
        e(Text, { style: section.section ? tocStyles.sectionPageRange : tocStyles.pageNumber }, section.pageRange)
      ),
      // Subsections
      ...section.entries.map(entry =>
        e(
          View,
          { key: `${section.title}-${entry.page}`, style: tocStyles.subsectionEntry },
          e(Text, { style: tocStyles.subsectionTitle }, entry.title),
          e(Text, { style: tocStyles.pageNumber }, entry.page)
        )
      )
    );
  };

  const renderColumn = (sections) => {
    return e(
      View,
      { style: tocStyles.column },
      ...sections.map(renderSection)
    );
  };

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    
    // Title
    e(Text, { style: tocStyles.tocTitle }, 'TABLE OF CONTENTS'),
    
    // Page count info
    e(Text, { style: tocStyles.pageInfo }, 
      `Blue Mountain Property Owners Association Community Guide - ${totalPages} Pages`
    ),
    
    // Three-column layout
    e(View, { style: tocStyles.columnsContainer },
      renderColumn(column1),
      renderColumn(column2),
      renderColumn(column3)
    ),
    
    // Footer
    e(PageFooterNoJSX, { pageNumber: 2 })
  );
}