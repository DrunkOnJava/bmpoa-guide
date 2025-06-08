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
  CompactSubsectionHeader,
  CompactTable
} from './EnhancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox, SidebarBox } from './AdvancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

export default function GovernancePageNoJSXConsolidated({ pageNumberMap = {} }) {
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
    e(QuickFactsBox, {
      key: 'bmpoa-facts',
      title: 'QUICK FACTS',
      facts: [
        { label: 'Founded', value: '1975' },
        { label: 'Properties', value: '425+' },
        { label: 'Annual Budget', value: '$145,000' },
        { label: 'Board Size', value: '5 elected' },
        { label: 'Meetings', value: 'Monthly' },
        { label: 'Your Vote', value: '1 per lot' }
      ]
  }),
    
    e(InfoBox, {
      key: 'board-officers',
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
    
    e(SidebarBox, {
      key: 'annual-budget',
      type: 'info',
      title: '💰 ANNUAL BUDGET',
      content: 'Roads: 40%\nAdmin: 20%\nLodge/Lake: 20%\nReserves: 20%'
  })
  ];

  return [
    // Section Divider
    e(SectionDivider, {
      number: '01',
      title: 'GOVERNANCE &\nSTRUCTURE',
      description: 'Understanding how our mountain community is organized and governed',
      backgroundColor: colors.forestGreen
  }),

    // Single consolidated page with all governance content
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        TwoColumnLayout,
        { sidebarContent },
        
        e(CompactSectionHeader, null, 'BMPOA OVERVIEW'),
        
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
          title: 'CORE RESPONSIBILITIES',
          items: [
            { text: 'Maintain private roads and common areas', checked: true },
            { text: 'Manage community amenities (Lodge, Deer Lake)', checked: true },
            { text: 'Enforce covenants and architectural standards', checked: true },
            { text: 'Coordinate emergency preparedness', checked: true },
            { text: 'Organize community events and communications', checked: true },
            { text: 'Collect assessments and manage finances', checked: true },
            { text: 'Represent owners in county matters', checked: true }
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'SANITARY DISTRICT'),
        e(DenseText, null,
          'The Warren County Sanitary District (WCSD) provides water service to BMPOA properties. Established in 1982, WCSD operates independently from BMPOA with its own elected board and budget. Water issues should be directed to WCSD at (540) 636-9790.'
        ),
        
        e(CompactTable, {
          headers: ['Service', 'Provider', 'Contact'],
          rows: [
            ['Water Service', 'Warren County SD', '(540) 636-9790'],
            ['Billing Issues', 'WCSD Office', '(540) 636-9790'],
            ['Emergencies', 'WCSD On-Call', '(540) 635-7819'],
            ['New Connections', 'WCSD', 'wcsd@warrencountyva.net']
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'YOUR MEMBERSHIP'),
        e(DenseText, null,
          'As a property owner in Blue Mountain, you are automatically a member of BMPOA and the Sanitary District. Annual dues are collected with property taxes and fund all community services and amenities. Your participation in meetings and committees strengthens our community.'
        ),
        
        e(InfoBox, {
          title: 'Get Involved',
          type: 'success',
          content: [
            '✓ Attend monthly board meetings',
            '✓ Join a committee',
            '✓ Run for board positions',
            '✓ Volunteer for events',
            '✓ Share your expertise'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap['governance'] || '—'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}