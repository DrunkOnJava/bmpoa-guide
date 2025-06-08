import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles } from '../theme.js';
import {
  CardGrid,
  HierarchicalList,
  Timeline,
  FeatureBox,
  SidebarBox,
  QuoteBox,
  Badge,
  MixedLayout,
  CoverHeader,
  TOCEntry
} from './AdvancedLayoutComponents.js';

// Example 1: Services Page with Card Grid
export function ServicesPageCardGrid() {
  const e = React.createElement;
  
  const serviceCards = [
    {
      title: 'Road Maintenance',
      content: 'Snow removal, pothole repair, and grading services for all community roads.'
  },
    {
      title: 'Trash Collection',
      content: 'Weekly pickup service and access to the community convenience site.'
  },
    {
      title: 'Internet Access',
      content: 'High-speed fiber and satellite options available throughout the community.'
  },
    {
      title: 'Emergency Services',
      content: '24/7 fire and EMS coverage with rapid response times.'
  }
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(Text, { style: styles.sectionHeader }, 'COMMUNITY SERVICES'),
      e(CardGrid, { cards: serviceCards })
    )
  );
}

// Example 2: Governance Page with Hierarchical List
export function GovernancePageHierarchical() {
  const e = React.createElement;
  
  const governanceStructure = [
    {
      title: 'I. BMPOA BOARD OF DIRECTORS',
      subItems: [
        {
          title: 'A. Executive Officers',
          subItems: ['President', 'Vice President', 'Secretary', 'Treasurer']
      },
        {
          title: 'B. Directors at Large',
          subItems: ['4 elected positions', '2-year terms']
      }
      ]
  },
    {
      title: 'II. COMMITTEES',
      subItems: [
        {
          title: 'A. Architectural Review Committee',
          subItems: ['Reviews construction plans', 'Enforces design standards']
      },
        {
          title: 'B. Roads Committee',
          subItems: ['Oversees maintenance', 'Plans improvements']
      }
      ]
  }
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(Text, { style: styles.sectionHeader }, 'GOVERNANCE STRUCTURE'),
      e(HierarchicalList, { items: governanceStructure })
    )
  );
}

// Example 3: History Page with Timeline
export function HistoryPageTimeline() {
  const e = React.createElement;
  
  const historyEvents = [
    { date: '1975', description: 'Blue Mountain Property Owners Association established' },
    { date: '1982', description: 'Sanitary District created for infrastructure management' },
    { date: '1995', description: 'Community Lodge construction completed' },
    { date: '2005', description: 'Major road improvement project undertaken' },
    { date: '2015', description: 'High-speed internet infrastructure installed' },
    { date: '2025', description: 'Comprehensive community guide published' }
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(Text, { style: styles.sectionHeader }, 'COMMUNITY HISTORY'),
      e(Timeline, { events: historyEvents })
    )
  );
}

// Example 4: Mixed Layout Page
export function MixedLayoutExample() {
  const e = React.createElement;
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(MixedLayout, null,
      // Full width header
      e(Text, { style: styles.sectionHeader }, 'LIVING IN BLUE MOUNTAIN'),
      
      // Quote box
      e(QuoteBox, {
        quote: 'Blue Mountain offers a unique combination of natural beauty, privacy, and community that makes it truly special.',
        attribution: 'Long-time Resident'
    }),
      
      // Feature boxes
      e(FeatureBox, {
        title: 'Natural Beauty',
        content: 'Surrounded by the Shenandoah National Forest with spectacular mountain views and abundant wildlife.'
    }),
      
      // Sidebar boxes in a row
      e(View, { style: { flexDirection: 'row', gap: 8 } },
        e(View, { style: { flex: 1 } },
          e(SidebarBox, {
            title: 'Did You Know?',
            content: 'Blue Mountain is home to over 50 species of native wildflowers.',
            type: 'info'
        })
        ),
        e(View, { style: { flex: 1 } },
          e(SidebarBox, {
            title: 'Important',
            content: 'All new construction requires ARC approval before beginning.',
            type: 'warning'
        })
        )
      )
    )
  );
}

// Example 5: Enhanced Table of Contents
export function EnhancedTOCExample() {
  const e = React.createElement;
  
  const pageStyles = StyleSheet.create({
    tocPage: {
      padding: '1in',
      backgroundColor: colors.white,
  },
    tocHeader: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.weights.bold,
      color: colors.darkGray,
      marginBottom: layout.spacing.xl,
      textAlign: 'center',
  }
});
  
  return e(Page, { size: 'LETTER', style: pageStyles.tocPage },
    e(View, null,
      e(Text, { style: pageStyles.tocHeader }, 'TABLE OF CONTENTS'),
      
      e(TOCEntry, { number: 'I', title: 'GOVERNANCE & STRUCTURE', page: 4 }),
      e(TOCEntry, { title: 'A. BMPOA Overview', page: 4, level: 2 }),
      e(TOCEntry, { title: 'B. Sanitary District Explained', page: 6, level: 2 }),
      e(TOCEntry, { title: 'C. Board & Committee Structure', page: 8, level: 2 }),
      
      e(TOCEntry, { number: 'II', title: 'A MOUNTAIN HOME', page: 11 }),
      e(TOCEntry, { title: 'A. Community Origins', page: 11, level: 2 }),
      e(TOCEntry, { title: 'B. Natural Beauty & Wildlife', page: 13, level: 2 }),
      
      e(TOCEntry, { number: 'III', title: 'WOOD-CHIPPING PROGRAM', page: 17 }),
      e(TOCEntry, { title: 'A. Annual Chipping Schedule', page: 17, level: 2 }),
      e(TOCEntry, { title: 'B. Brush Pile Guidelines', page: 19, level: 2 })
    )
  );
}

// Example 6: Alternative Cover Page
export function AlternativeCoverPage() {
  const e = React.createElement;
  
  const coverStyles = StyleSheet.create({
    coverPage: {
      backgroundColor: colors.white,
      padding: '1in',
  },
    titleBlock: {
      marginTop: layout.spacing.md0,
      alignItems: 'center',
  },
    mainTitle: {
      fontSize: typography.sizes.dividerTitle,
      fontWeight: typography.weights.bold,
      color: colors.darkGray,
      textAlign: 'center',
      marginBottom: layout.spacing.sm,
  },
    subtitle: {
      fontSize: typography.sizes.toc,
      color: colors.mediumGray,
      textAlign: 'center',
      marginBottom: layout.spacing.xl,
  },
    description: {
      fontSize: typography.sizes.medium,
      color: colors.mediumGray,
      textAlign: 'center',
      fontStyle: 'italic',
  },
    footer: {
      position: 'absolute',
      bottom: 72,
      left: 72,
      right: 72,
      alignItems: 'center',
  },
    footerText: {
      fontSize: typography.sizes.base,
      color: colors.mediumGray,
      marginBottom: layout.spacing.xs,
  }
});
  
  return e(Page, { size: 'LETTER', style: coverStyles.coverPage },
    e(View, null,
      e(CoverHeader, { established: '1975', type: 'COMMUNITY GUIDE' }),
      
      e(View, { style: coverStyles.titleBlock },
        e(Text, { style: coverStyles.mainTitle }, 'BLUE MOUNTAIN'),
        e(Text, { style: coverStyles.mainTitle }, 'PROPERTY OWNERS'),
        e(Text, { style: coverStyles.mainTitle }, 'ASSOCIATION'),
        e(Text, { style: coverStyles.subtitle }, 
          'Your Complete Guide to Mountain Living in Linden, Virginia'
        ),
        e(Text, { style: coverStyles.description },
          'A comprehensive resource for new and existing residents'
        )
      ),
      
      e(View, { style: coverStyles.footer },
        e(Text, { style: coverStyles.footerText }, 'BMPOA • P.O. Box 114 • Linden, VA 22642'),
        e(Text, { style: coverStyles.footerText }, 'www.bmpoa.org')
      )
    )
  );
}

export default {
  ServicesPageCardGrid,
  GovernancePageHierarchical,
  HistoryPageTimeline,
  MixedLayoutExample,
  EnhancedTOCExample,
  AlternativeCoverPage
};