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

export default function GovernancePageNoJSXNoOrphans({ pageNumberMap = {} }) {
  const e = React.createElement;

  const governanceStyles = StyleSheet.create({
    missionBox: {
      backgroundColor: colors.lightGray,
      borderLeft: `4px solid ${colors.forestGreen}`,
      padding: spacing.md,
      marginBottom: spacing.md,
  }
});

  return [
    // Section Divider
    e(SectionDivider, {
      number: '01',
      title: 'GOVERNANCE &\nSTRUCTURE',
      description: 'Understanding how our mountain community is organized and governed',
      backgroundColor: colors.forestGreen
  }),

    // Main content page - NO ORPHANED HEADER
    e(
      Page,
      { size: 'LETTER', style: styles.page },
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
                '1. Board assesses needs',
                '2. Develops budget',
                '3. Presents at Annual Meeting',
                '4. Submits to Warren County',
                '5. Published to all owners'
              ]
          })
          ]
      },
        
        // Content starts directly - no redundant header
        e(CompactSectionHeader, null, 'BMPOA OVERVIEW'),
        
        e(DenseText, null, 
          'The Blue Mountain Property Owners Association (BMPOA) is your voice in maintaining and improving our mountain community. Established in 1975, the Association serves all property owners within the Blue Mountain Subdivision in Warren County, Virginia.'
        ),

        e(View, {
          style: governanceStyles.missionBox
      },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 'OUR MISSION'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'To preserve and enhance the natural beauty, property values, and quality of life for all Blue Mountain residents through responsible governance, community engagement, and careful stewardship of our shared resources.'
          )
        ),

        e(CompactSubsectionHeader, null, 'LEGAL STATUS'),
        e(DenseText, null,
          'BMPOA operates under Virginia state law as a property owners association. Our governing documents include recorded covenants, bylaws, and board-adopted policies. These documents are available on our website and establish the framework for community governance.'
        ),

        e(CompactSubsectionHeader, null, 'WHAT WE DO'),
        
        e(ChecklistBox, {
          title: 'CORE RESPONSIBILITIES',
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

        e(CompactSubsectionHeader, null, 'SANITARY DISTRICT'),
        e(DenseText, null,
          'The Warren County Sanitary District provides water service to Blue Mountain. Established in 1982, the District operates independently with its own elected board. Property owners are automatically members of both BMPOA and the Sanitary District.'
        ),

        e(CompactTable, {
          headers: ['Service', 'Provider', 'Contact'],
          rows: [
            ['Water Service', 'Warren County SD', '(540) 636-9790'],
            ['Billing Issues', 'WCSD Office', '(540) 636-9790'],
            ['Emergencies', 'WCSD On-Call', '(540) 635-7819'],
            ['New Connections', 'WCSD', 'wcsd@warrencountyva.net']
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