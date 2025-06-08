import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout,
  QuickFactsBox,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';
import InlineSectionHeader from './InlineSectionHeader.js';

export default function GovernancePageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;

  const governanceStyles = StyleSheet.create({
    missionBox: {
      backgroundColor: colors.lightGray,
      borderLeft: `4px solid ${colors.forestGreen}`,
      padding: spacing.md,
      marginBottom: spacing.md,
  },
    officerList: {
      paddingLeft: spacing.md,
      marginTop: spacing.xs,
  },
    benefitItem: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      marginBottom: spacing.xs,
  }
});

  const sidebarContent = [
    e(InfoBox, { 
      key: 'membership',
      title: 'YOUR MEMBERSHIP',
      type: 'highlight',
      content: [
        'As a property owner in Blue Mountain, you are automatically a member of BMPOA and the Sanitary District.',
        '',
        'Annual dues are collected with property taxes and fund all community services and amenities.'
      ]
  }),
    e(QuickFactsBox, {
      key: 'facts',
      title: 'QUICK FACTS',
      facts: [
        { label: 'Founded', value: '1975' },
        { label: 'Properties', value: '425+' },
        { label: 'Annual Budget', value: '$145,000' },
        { label: 'Board Size', value: '5 elected' },
        { label: 'Meetings', value: 'Monthly' }
      ]
  }),
    e(InfoBox, {
      key: 'officers',
      title: '📋 BOARD OFFICERS',
      content: [
        '• President',
        '• Vice President',
        '• Secretary',
        '• Treasurer',
        '• At-Large Member',
        '',
        'Terms: 3 years',
        'Elections: Annual meeting'
      ]
  }),
    e(InfoBox, {
      key: 'budget',
      title: '💰 ANNUAL BUDGET',
      content: [
        'Roads: 40%',
        'Admin: 20%',
        'Amenities: 15%',
        'Reserves: 15%',
        'Other: 10%',
        '',
        'View detailed budget at',
        'www.bmpoa.org'
      ]
  })
  ];

  return [
    // BMPOA Overview & Sanitary District Combined Page with Inline Header
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      // Inline Section Header
      e(InlineSectionHeader, {
        number: '01',
        title: 'GOVERNANCE & STRUCTURE',
        description: 'Understanding how our mountain community is organized and governed'
    }),
      
      e(
        TwoColumnLayout,
        { sidebarContent },
        
        e(CompactSectionHeader, null, 'BMPOA OVERVIEW'),
        
        e(DenseText, null,
          'The Blue Mountain Property Owners Association (BMPOA) is a non-profit organization established in 1975 to manage community affairs and maintain common areas. Every property owner within Blue Mountain automatically becomes a member of BMPOA upon purchasing property.'
        ),
        
        e(FeatureBox, {
          title: 'OUR MISSION',
          content: 'To preserve and enhance the natural beauty, property values, and quality of life for all Blue Mountain residents through responsible governance, community engagement, and careful stewardship of our shared resources.'
      }),
        
        e(CompactSubsectionHeader, null, 'LEGAL STATUS'),
        e(DenseText, null,
          'BMPOA operates under Virginia state law as a property owners association. Our governing documents include recorded covenants, bylaws, and board-adopted policies. These documents are available on our website and establish the framework for community governance.'
        ),
        
        e(CompactSubsectionHeader, null, 'WHAT WE DO'),
        e(ChecklistBox, {
          title: 'Core Responsibilities',
          items: [
            'Maintain private roads and common areas',
            'Manage community amenities (Lodge, Deer Lake)',
            'Enforce covenants and architectural standards',
            'Coordinate emergency preparedness',
            'Organize community events and communications',
            'Collect assessments and manage finances',
            'Represent owners in county matters'
          ]
      }),
        
        e(CompactSectionHeader, null, 'SANITARY DISTRICT'),
        
        e(DenseText, null,
          'The Blue Mountain Sanitary District is a separate legal entity created by Warren County to provide essential utilities. While it shares board members with BMPOA for efficiency, it operates under different legal authority and maintains separate finances.'
        ),
        
        e(CompactSubsectionHeader, null, 'DISTRICT BENEFITS'),
        e(View, { style: governanceStyles.benefitItem },
          e(Text, null, '• Central water system with regular testing and maintenance'),
          e(Text, null, '• Reduced fire insurance rates due to hydrant system'),
          e(Text, null, '• Professional management of utilities'),
          e(Text, null, '• Economies of scale for all property owners'),
          e(Text, null, '• Emergency water supply backup systems')
        ),
        
        e(InfoBox, {
          title: 'Important Note',
          type: 'warning',
          content: [
            'Both BMPOA and Sanitary District assessments are mandatory and collected with property taxes. These funds ensure continuous operation of essential services.'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap.governance || '4'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}