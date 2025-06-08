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
import assetMap from '../assetMap.json' with { type: 'json' };

export default function DeerLakePageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lakeStyles = StyleSheet.create({
    amenityGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.md,
  },
    amenityBox: {
      flex: '1 1 45%',
      backgroundColor: colors.lightBlue,
      padding: spacing.sm,
      borderRadius: callout.radius,
  },
    amenityTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: layout.spacing.xs,
  },
    amenityText: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
      lineHeight: typography.lineHeights.normal,
  }
});
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'lake-facts',
      title: 'LAKE DETAILS',
      facts: [
        { label: 'Size', value: '3.5 acres' },
        { label: 'Depth', value: 'Up to 18 ft' },
        { label: 'Season', value: 'May-October' },
        { label: 'Hours', value: 'Dawn to Dusk' },
        { label: 'Passes', value: 'Required' },
        { label: 'Guests', value: 'With member' }
      ]
  }),
    
    e(SidebarBox, {
      key: 'pass-info',
      type: 'info',
      title: '🎫 PASSES',
      content: 'Annual passes required\nAvailable from Board\nMust show current dues\nGuest passes available'
  }),
    
    e(InfoBox, {
      key: 'prohibited',
      title: '🚫 PROHIBITED',
      type: 'danger',
      content: [
        '• Motorized boats',
        '• Alcohol',
        '• Glass containers',
        '• Pets in water',
        '• Camping',
        '• Fires',
        '• Loud music',
        '• After dark use'
      ]
  })
  ];

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      TwoColumnLayout,
      { sidebarContent },
      
      e(InlineSectionHeader, {
        number: '06',
        title: 'DEER LAKE RECREATION',
        description: 'Community lake facilities, rules, and seasonal activities'
    }),
      
      e(FeatureBox, {
        title: '🏊 YOUR PRIVATE LAKE',
        content: 'Deer Lake provides a peaceful retreat for swimming, fishing, and relaxation. This 3.5-acre spring-fed lake offers clear water, sandy beach areas, and beautiful mountain views. All property owners in good standing may obtain annual passes.'
    }),
      
      e(CompactSubsectionHeader, null, 'FACILITIES & AMENITIES'),
      e(View, { style: lakeStyles.amenityGrid },
        e(View, { style: lakeStyles.amenityBox },
          e(Text, { style: lakeStyles.amenityTitle }, '🏖️ Beach Areas'),
          e(Text, { style: lakeStyles.amenityText }, 'Sandy swimming areas with gradual entry. Roped shallow section for children.')
        ),
        e(View, { style: lakeStyles.amenityBox },
          e(Text, { style: lakeStyles.amenityTitle }, '🚻 Facilities'),
          e(Text, { style: lakeStyles.amenityText }, 'Porta-potties maintained May-Oct. Picnic tables and grills available.')
        ),
        e(View, { style: lakeStyles.amenityBox },
          e(Text, { style: lakeStyles.amenityTitle }, '🎣 Fishing'),
          e(Text, { style: lakeStyles.amenityText }, 'Catch & release only. Bass, bluegill, and catfish. VA license required.')
        ),
        e(View, { style: lakeStyles.amenityBox },
          e(Text, { style: lakeStyles.amenityTitle }, '🛶 Boating'),
          e(Text, { style: lakeStyles.amenityText }, 'Non-motorized only. Canoes, kayaks, paddleboards welcome.')
        )
      ),
      
      e(CompactSubsectionHeader, null, 'RULES & REGULATIONS'),
      e(CompactTable, {
        headers: ['Rule', 'Details'],
        rows: [
          ['Pass Required', 'Must display current year pass'],
          ['Guest Policy', 'Max 4 guests per member visit'],
          ['Hours', 'Dawn to dusk only'],
          ['Supervision', 'Children under 14 need adult'],
          ['Parking', 'Designated areas only']
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'WATER SAFETY'),
      e(DenseText, null,
        'No lifeguard on duty - swim at your own risk. Parents must supervise children at all times. Life jackets recommended for weak swimmers. Be aware of changing depths and underwater obstacles. In emergencies, call 911.'
      ),
      
      e(InfoBox, {
        title: 'Lake Etiquette',
        type: 'success',
        content: [
          '✓ Respect quiet atmosphere',
          '✓ Clean up all trash',
          '✓ Share facilities courteously',
          '✓ Report violations to Board',
          '✓ Help maintain property'
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'SEASONAL ACTIVITIES'),
      e(DenseText, null,
        'Spring brings excellent fishing as water warms. Summer is peak swimming season with many families enjoying the beach. Fall offers peaceful paddling with beautiful foliage views. Winter closure allows the lake to recharge naturally.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['deer-lake'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}