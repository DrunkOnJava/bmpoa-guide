import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import InlineSectionHeader from './InlineSectionHeader.js';
import {
  TwoColumnLayout,
  QuickFactsBox,
  InfoBox,
  DenseText,
  CompactSubsectionHeader,
  CompactTable,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import { FeatureBox, SidebarBox, Badge } from './AdvancedLayoutComponents.js';

export default function FireSafetyPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const pageStyles = StyleSheet.create({
    emergencyBox: {
      backgroundColor: colors.backgroundDanger,
      borderLeft: `4px solid #DC2626`,
      padding: spacing.md,
      marginBottom: spacing.md,
  },
    emergencyTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.danger,
      marginBottom: spacing.xs,
  },
    emergencyText: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkGray,
  }
});
  
  const sidebarContent = [
    e(SidebarBox, {
      key: 'emergency-numbers',
      type: 'danger',
      title: '🚨 EMERGENCY',
      content: 'FIRE/MEDICAL: 911\n\nWarren Co Dispatch:\n(540) 635-4128\n\nFire Marshal:\n(540) 635-2111'
  }),
    
    e(QuickFactsBox, {
      key: 'fire-facts',
      title: 'FIRE DANGER',
      facts: [
        { label: 'High Season', value: 'Mar-May, Oct-Nov' },
        { label: 'Burn Ban', value: 'Feb 15 - Apr 30' },
        { label: 'Permit Req', value: 'Year-round' },
        { label: 'FireWise', value: 'Certified 2008' },
        { label: 'Hydrants', value: 'Limited coverage' },
        { label: 'Response', value: '15-20 minutes' }
      ]
  }),
    
    e(InfoBox, {
      key: 'evacuation-kit',
      title: '🎒 GO-BAG ITEMS',
      type: 'warning',
      content: [
        '• Important documents',
        '• Medications (2 week)',
        '• Cash & credit cards',
        '• Phone chargers',
        '• Flashlight & radio',
        '• First aid kit',
        '• Pet supplies',
        '• Water & snacks'
      ]
  })
  ];

  return [
    // Page 1 - Fire Safety Overview
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        TwoColumnLayout,
        { sidebarContent },
        
        e(InlineSectionHeader, {
          number: '04',
          title: 'FIRE SAFETY & EMERGENCY',
          description: 'Wildfire prevention, emergency procedures, and evacuation planning'
      }),
        
        e(View, { style: pageStyles.emergencyBox },
          e(Text, { style: pageStyles.emergencyTitle }, 'IN CASE OF WILDFIRE'),
          e(Text, { style: pageStyles.emergencyText }, 
            '1. CALL 911 immediately\n' +
            '2. Alert neighbors if safe to do so\n' +
            '3. Follow evacuation orders - DO NOT DELAY\n' +
            '4. Use predetermined evacuation route\n' +
            '5. Check in with family contact after evacuating'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'WILDFIRE RISK'),
        e(DenseText, null,
          'Blue Mountain faces significant wildfire risk due to steep terrain, dense forest, and limited water sources. Spring and fall bring the highest danger when humidity is low and winds are strong. Every property owner must take fire prevention seriously.'
        ),
        
        e(CompactSubsectionHeader, null, 'DEFENSIBLE SPACE'),
        e(CompactTable, {
          headers: ['Zone', 'Distance', 'Requirements'],
          rows: [
            ['Zone 1', '0-30 ft', 'Remove all dead vegetation, trim trees'],
            ['Zone 2', '30-100 ft', 'Reduce vegetation density, space trees'],
            ['Zone 3', '100-200 ft', 'Thin forest, remove ladder fuels']
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'BURNING REGULATIONS'),
        e(FeatureBox, {
          title: '🔥 BURN BAN: FEBRUARY 15 - APRIL 30',
          content: 'Virginia law prohibits outdoor burning before 4 PM during burn ban season. Year-round, all outdoor fires require a permit from the Fire Marshal. Violations carry heavy fines and liability for suppression costs.'
      }),
        
        e(CompactSubsectionHeader, null, 'PERMITTED BURNING'),
        e(TwoColumnList, {
          title: 'When allowed with permit:',
          items: [
            'Brush piles under 4ft diameter',
            'Natural vegetation only',
            'Attended at all times',
            'Water/tools on hand',
            'Calm wind conditions',
            'Notify neighbors first'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap['fire-safety'] || '—'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),
    
    // Page 2 - Evacuation Planning
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageContent },
        
        e(CompactSubsectionHeader, null, 'EVACUATION PLANNING'),
        
        e(SidebarBox, {
          type: 'warning',
          title: '⚠️ EVACUATION LEVELS',
          content: 'READY: Prepare to leave\nSET: Be ready to go immediately\nGO!: Leave immediately - danger!'
      }),
        
        e(CompactSubsectionHeader, null, 'EVACUATION ROUTES'),
        e(DenseText, null,
          'Know multiple exit routes from your property. Primary routes typically follow main BMPOA roads to Route 522. Have backup routes planned in case primary roads are blocked. Practice driving routes in daylight and darkness.'
        ),
        
        e(CompactTable, {
          headers: ['Area', 'Primary Route', 'Alternate Route'],
          rows: [
            ['Lower Mountain', 'Strasburg Rd to 522', 'Pine Ridge to 522'],
            ['Upper Mountain', 'Deer Lake Rd to 522', 'Back Mountain Rd'],
            ['Lodge Area', 'Lodge Rd to Strasburg', 'Connect to Pine Ridge']
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'PROPERTY PREPARATION'),
        e(InfoBox, {
          title: 'Before You Leave',
          content: [
            '✓ Close all windows and doors',
            '✓ Remove flammable items from decks',
            '✓ Shut off propane at tank',
            '✓ Connect garden hoses to faucets',
            '✓ Turn on exterior lights',
            '✓ Leave gates unlocked for firefighters',
            '✓ Take pets and livestock'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'FIREWISE PRACTICES'),
        e(DenseText, null,
          'Maintain your property year-round for fire safety. Remove dead vegetation, clean gutters regularly, stack firewood away from structures, and keep driveways clear for emergency vehicles. Consider fire-resistant landscaping near your home.'
        ),
        
        e(FeatureBox, {
          title: '📱 EMERGENCY NOTIFICATIONS',
          content: 'Sign up for Warren County Emergency Alerts at warrencountyva.gov. Enable wireless emergency alerts on your phone. Follow BMPOA Facebook for community-specific updates during emergencies.'
      }),
        
        e(CompactSubsectionHeader, null, 'COMMUNITY COOPERATION'),
        e(DenseText, null,
          'Fire safety requires everyone\'s participation. Report hazardous conditions to the Board. Participate in community cleanup days. Share evacuation plans with neighbors. Consider forming neighborhood phone trees for emergency communication.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap['fire-safety'] || 0) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}