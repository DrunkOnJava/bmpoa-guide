import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox,
  TwoColumnLayout,
  QuickFactsBox,
  DenseText
} from './EnhancedLayoutComponents.js';
import { 
  FeatureBox, 
  Timeline,
  MixedLayout,
  QuoteBox 
} from './AdvancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';

export default function IntroductionPageNoJSXTimeline({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const introStyles = StyleSheet.create({
    timelineContainer: {
      marginBottom: spacing.lg,
  },
    highlightBox: {
      backgroundColor: '#F0F9FF',
      border: `1px solid ${colors.primary}`,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginTop: spacing.md,
  },
    mountainStats: {
      backgroundColor: '#F8FAFC',
      border: `1px solid ${colors.lightGray}`,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
  }
});
  
  // BMPOA Historical Timeline
  const bmpoaHistory = [
    {
      year: '1975',
      title: 'BMPOA Founded',
      description: 'Blue Mountain Property Owners Association established to serve the growing mountain community'
  },
    {
      year: '1982',
      title: 'Sanitary District Created',
      description: 'Special tax district formed to fund community services and infrastructure maintenance'
  },
    {
      year: '1995',
      title: 'Lodge Construction',
      description: 'Community Lodge built as central gathering place for events and meetings'
  },
    {
      year: '2005',
      title: 'Road Improvements',
      description: 'Major road infrastructure upgrade project completed throughout the community'
  },
    {
      year: '2015',
      title: 'Internet Expansion',
      description: 'High-speed fiber and satellite internet options made available mountain-wide'
  },
    {
      year: '2025',
      title: 'Community Guide',
      description: 'Comprehensive digital guide published to help residents navigate mountain living'
  }
  ];
  
  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    
    // Header
    e(
      View,
      { style: styles.pageHeader },
      e(Text, { style: styles.pageTitle }, 'INTRODUCTION')
    ),
    
    // Enhanced layout with Timeline and sidebar
    e(
      TwoColumnLayout,
      {
        sidebarContent: [
          e(QuickFactsBox, {
            key: 'community-overview',
            title: 'COMMUNITY OVERVIEW',
            facts: [
              { label: 'Established', value: '1975' },
              { label: 'Total Lots', value: '350+' },
              { label: 'Elevation', value: '1,800 ft' },
              { label: 'County', value: 'Warren' },
              { label: 'Nearest Town', value: 'Linden' },
              { label: 'To DC', value: '70 miles' }
            ]
        }),
          
          e(InfoBox, {
            key: 'quick-start',
            title: 'QUICK START',
            content: [
              'New residents should:',
              '',
              '1. Read Section 1 on Governance',
              '2. Review Covenants summary',
              '3. Note emergency contacts',
              '4. Join Facebook groups',
              '5. Introduce yourself to neighbors!'
            ]
        }),
          
          e(InfoBox, {
            key: 'guide-handy',
            title: 'KEEP THIS GUIDE HANDY',
            content: [
              'Store this guide where you can easily access it. Digital version available at www.bmpoa.org'
            ]
        })
        ]
    },
      
      // Main content with Timeline
      e(Text, { style: styles.h2 }, 'WELCOME TO BLUE MOUNTAIN'),
      
      e(DenseText, null,
        "Welcome to Blue Mountain Property Owners Association (BMPOA)! We're delighted that you've chosen to make our mountain community your home. This guide provides essential information about living in our community, local resources, and important contacts."
      ),
      
      e(DenseText, null,
        "Located in Warren County, Virginia, just outside Linden, our neighborhood offers stunning natural beauty and a close-knit community. Whether you're a full-time resident or weekend visitor, we hope this guide helps you settle in and enjoy all that Blue Mountain has to offer."
      ),
      
      // Feature quote box
      e(QuoteBox, {
        quote: "Blue Mountain is a special place with stunning views of the Shenandoah Valley, rich wildlife, and a close-knit community that values both privacy and neighborly support.",
        attribution: "BMPOA Resident"
    }),
      
      // BMPOA History Timeline
      e(Text, { style: { ...styles.h3, marginTop: spacing.md } }, 'OUR COMMUNITY HISTORY'),
      
      e(View, { style: introStyles.timelineContainer },
        e(Timeline, {
          events: bmpoaHistory,
          compact: true
      })
      ),
      
      // About this guide section
      e(Text, { style: styles.h3 }, 'ABOUT THIS GUIDE'),
      
      e(DenseText, null,
        'This comprehensive guide is organized into sections addressing different aspects of community life. Use the Table of Contents to quickly find specific information.'
      ),
      
      e(ChecklistBox, {
        title: 'This guide includes:',
        items: [
          'Governance structure and community organization',
          'Home maintenance and improvement guidelines',
          'Community services and utility information',
          'Recreation facilities and natural attractions',
          'Emergency procedures and safety protocols',
          'Contact information for all services'
        ]
    }),
      
      // Mountain living highlights
      e(FeatureBox, {
        title: 'MOUNTAIN LIVING BENEFITS',
        content: 'Experience clean mountain air, dark night skies perfect for stargazing, abundant wildlife viewing opportunities, and four distinct seasons with spectacular fall foliage. Our elevation provides cooler summers and beautiful winter snow coverage.'
    }),
      
      // Getting connected section
      e(Text, { style: styles.h3 }, 'GETTING CONNECTED'),
      
      e(DenseText, null,
        'Community communication happens through multiple channels including our official website, quarterly newsletter, and Facebook groups. Board meetings are held monthly and all residents are welcome to attend.'
      ),
      
      e(InfoBox, {
        title: 'COMMUNICATION CHANNELS',
        content: [
          '• Official Website: www.bmpoa.org',
          '• Quarterly Newsletter (email/mail)',
          '• Facebook: Blue Mountain POA',
          '• Board Meetings: 2nd Monday, 6PM',
          '• Emergency: Warren911.com alerts'
        ]
    })
    ),
    
    // Footer
    e(
      View,
      { style: styles.pageFooter },
      e(Text, null, 'BMPOA Community Guide'),
      e(Text, null, pageNumberMap.introduction || '3')
    )
  );
}