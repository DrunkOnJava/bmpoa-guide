import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout,
  QuickFactsBox,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';

export default function GovernancePageNoJSXSimpleFixed({ pageNumberMap = {} }) {
  const e = React.createElement;

  const governanceStyles = StyleSheet.create({
    missionBox: {
      backgroundColor: colors.lightGray,
      borderLeft: `4px solid ${colors.forestGreen}`,
      padding: layout.spacing.md,
      marginBottom: layout.spacing.md,
    },
    officerList: {
      paddingLeft: layout.spacing.md,
      marginTop: layout.spacing.xs,
    },
    benefitItem: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      marginBottom: layout.spacing.xs,
    }
  });

  // Return a single page element, NOT an array
  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      View,
      { style: styles.pageHeader },
      e(Text, { style: styles.pageTitle }, 'GOVERNANCE & STRUCTURE')
    ),
    e(
      TwoColumnLayout,
      { 
        sidebarContent: [
          e(InfoBox, {
            key: 'membership',
            title: 'YOUR MEMBERSHIP',
            content: [
              'As a Blue Mountain property owner, you are automatically a member of the Association.',
              '',
              'No additional dues required - community services are funded through the Sanitary District tax collected with your property taxes.'
            ]
          }),

          e(QuickFactsBox, {
            key: 'board-structure',
            facts: [
              { label: 'Board Size', value: '9 members' },
              { label: 'Officers', value: '5 positions' },
              { label: 'Directors', value: '4 at-large' },
              { label: 'Terms', value: '2 years' },
              { label: 'Election', value: 'Annual Meeting' }
            ]
          }),

          e(InfoBox, {
            key: 'officers',
            title: 'BOARD OFFICERS',
            content: [
              '• President',
              '• First Vice President', 
              '• Second Vice President',
              '• Secretary',
              '• Treasurer',
              '',
              'Plus 4 Directors-at-Large'
            ]
          }),

          e(InfoBox, {
            key: 'budget-process',
            title: 'ANNUAL BUDGET',
            content: [
              'Board → Annual Meeting → County → Owners',
              '',
              'Ensures community oversight.'
            ]
          })
        ]
      },
      
      e(Text, { style: styles.h2 }, 'BMPOA OVERVIEW'),
      
      e(DenseText, null, 
        'The Blue Mountain Property Owners Association (BMPOA) is your voice in maintaining and improving our mountain community. Established in 1975, the Association serves all property owners within the Blue Mountain Subdivision in Warren County, Virginia.'
      ),

      e(View, {
        style: governanceStyles.missionBox
      },
        e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs, color: colors.forestGreen } }, 
          'BMPOA MISSION'
        ),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } },
          '• Promote the health, safety, and general welfare of its members\n' +
          '• Preserve the natural beauty of the subdivision\n' +
          '• Maintain roads and common areas\n' +
          '• Protect property values\n' +
          '• Foster a sense of community among residents\n' +
          '• Provide information and resources to property owners'
        )
      ),

      e(Text, { style: styles.h3 }, 'LEGAL STATUS'),
      
      e(DenseText, null, 
        'The BMPOA is a Virginia non-stock corporation formed under state law. We operate as the managing agent for the Blue Mountain Sanitary District, which provides funding for our operations through a special tax assessment collected with your property taxes.'
      ),

      e(Text, { style: styles.h3 }, 'SANITARY DISTRICT BENEFITS'),
      
      e(FeatureBox, {
        title: 'WHY THIS MATTERS TO YOU',
        content: 'Our Sanitary District status ensures that all property owners, including developers, contribute fairly to community maintenance. Taxes are collected reliably by Warren County, may be tax-deductible, and qualify us for disaster relief funds.'
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
  );
}