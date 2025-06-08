import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { Timeline, FeatureBox, QuoteBox } from './AdvancedLayoutComponents.js';

export default function IntroductionPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const introStyles = StyleSheet.create({
    historySection: {
      marginTop: spacing.md,
    },
    timelineContainer: {
      marginVertical: spacing.md,
    }
  });

  // BMPOA Timeline data
  const bmpoaHistory = [
    { year: '1975', title: 'BMPOA Founded', description: 'Association established to manage community' },
    { year: '1982', title: 'Sanitary District Created', description: 'Warren County establishes water system' },
    { year: '1995', title: 'Lodge Built', description: 'Community gathering place constructed' },
    { year: '2008', title: 'FireWise Certified', description: 'Recognized for wildfire preparedness' },
    { year: '2018', title: 'Lodge Renovated', description: 'Major updates to community facility' },
    { year: '2025', title: 'Today', description: '425+ properties, thriving community' }
  ];

  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'community-stats',
      title: 'COMMUNITY OVERVIEW',
      facts: [
        { label: 'Established', value: '1975' },
        { label: 'Properties', value: '425+' },
        { label: 'Elevation', value: '1,000-1,400 ft' },
        { label: 'Total Area', value: '1,200+ acres' },
        { label: 'Road Miles', value: '12+ private' },
        { label: 'Residents', value: 'Mix year/weekend' }
      ]
    }),
    
    e(InfoBox, {
      key: 'quick-start',
      title: '🚀 QUICK START',
      type: 'highlight',
      content: [
        '1. Save emergency contacts',
        '2. Join Facebook group',
        '3. Get Deer Lake passes',
        '4. Meet your neighbors',
        '5. Attend board meeting',
        '6. Review covenants',
        '',
        'Questions? Contact Board'
      ]
    }),
    
    e(InfoBox, {
      key: 'benefits',
      title: '🏔️ MOUNTAIN LIVING',
      content: [
        '• Cooler temperatures',
        '• Wildlife viewing',
        '• Dark skies',
        '• Four seasons',
        '• Privacy & peace',
        '• Natural beauty',
        '• Strong community',
        '• Low crime rate'
      ]
    })
  ];

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      TwoColumnLayout,
      { sidebarContent },
      
      e(CompactSectionHeader, null, 'WELCOME TO BLUE MOUNTAIN'),
      
      e(FeatureBox, {
        title: '🌲 YOUR MOUNTAIN COMMUNITY',
        content: 'Welcome to Blue Mountain, where natural beauty meets community spirit. This guide provides essential information for property owners, covering everything from emergency contacts to community events. Whether you\'re a full-time resident or weekend visitor, you\'re part of our special mountain community.'
      }),
      
      e(CompactSubsectionHeader, null, 'GETTING INVOLVED'),
      e(DenseText, null,
        'Blue Mountain thrives because of active resident participation. Join monthly board meetings, volunteer for committees, participate in community workdays, and connect with neighbors at social events. Your involvement helps preserve our unique mountain lifestyle.'
      ),
      
      e(CompactSubsectionHeader, null, 'COMMUNITY HISTORY'),
      e(DenseText, null,
        'Created in the late 1950s as a vacation retreat for Washington D.C. area residents, Blue Mountain has evolved into a vibrant community of full-time and part-time residents who share a love for mountain living.'
      ),
      
      e(View, { style: introStyles.timelineContainer },
        e(Timeline, { events: bmpoaHistory })
      ),
      
      e(CompactSubsectionHeader, null, 'ABOUT THIS GUIDE'),
      e(InfoBox, {
        title: 'What\'s Inside',
        type: 'info',
        content: [
          '• Emergency procedures & contacts',
          '• Community rules & covenants',
          '• Amenity information & access',
          '• Service schedules & providers',
          '• Natural attractions & activities',
          '• Construction guidelines',
          '• Wildlife safety information'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'STAY CONNECTED'),
      e(View, { style: { flexDirection: 'row', gap: spacing.md } },
        e(InfoBox, {
          title: '📱 Online',
          style: { flex: 1 },
          content: [
            'www.bmpoa.org',
            'Facebook: Blue Mountain POA',
            'Email updates monthly'
          ]
        }),
        e(InfoBox, {
          title: '🤝 In Person',
          style: { flex: 1 },
          content: [
            'Board meetings',
            'Social events',
            'Work days'
          ]
        })
      ),
      
      e(QuoteBox, {
        content: 'Keep this guide handy — in your home, car, or saved on your phone. It contains vital information for emergencies and everyday mountain living.',
        source: null
      })
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, '3'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}