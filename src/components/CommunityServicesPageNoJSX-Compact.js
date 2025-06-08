import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import InlineSectionHeader from './InlineSectionHeader.js';
import {
  TwoColumnLayout,
  QuickFactsBox,
  InfoBox,
  DenseText,
  CompactSubsectionHeader,
  CompactTable
} from './EnhancedLayoutComponents.js';
import { CardGrid, FeatureBox } from './AdvancedLayoutComponents.js';

export default function CommunityServicesPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const serviceCards = [
    {
      title: '🚰 WATER SERVICE',
      content: 'Warren County Sanitary District\n(540) 636-9790\n\nEmergencies: (540) 635-7819\nNew connections & billing\nQuarterly meter readings'
    },
    {
      title: '🛣️ ROAD MAINTENANCE',
      content: 'BMPOA maintains 12+ miles\nSpring grading & graveling\nSnow removal (main roads)\nPothole repair as needed'
    },
    {
      title: '♻️ WASTE MANAGEMENT',
      content: 'County Convenience Center\n151 Landfill Road\nTue-Sat: 7:30 AM - 4:00 PM\nClosed Sunday & Monday'
    },
    {
      title: '🌲 WOOD CHIPPING',
      content: 'Monthly May-October\nFree HOA service\nMax 6" diameter\nRoadside placement'
    }
  ];
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'service-facts',
      title: 'SERVICE INFO',
      facts: [
        { label: 'Water District', value: 'Warren County' },
        { label: 'Electric', value: 'REC/Dominion' },
        { label: 'Internet', value: 'Limited options' },
        { label: 'Propane', value: 'Multiple vendors' },
        { label: 'Mail', value: 'Cluster boxes' },
        { label: 'Snow Removal', value: 'Main roads only' }
      ]
    }),
    
    e(InfoBox, {
      key: 'utility-contacts',
      title: '📞 UTILITIES',
      type: 'info',
      content: [
        'REC: (800) 552-3904',
        'Dominion: (866) 366-4357',
        'Centurylink: (800) 788-3600',
        'Comcast: (800) 934-6489',
        '',
        'Report outages immediately'
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
        number: '05',
        title: 'COMMUNITY SERVICES',
        description: 'Essential services, utilities, and maintenance for mountain properties'
      }),
      
      e(View, { style: { marginBottom: spacing.lg } },
        e(CardGrid, { cards: serviceCards })
      ),
      
      e(CompactSubsectionHeader, null, 'UTILITY PROVIDERS'),
      e(CompactTable, {
        headers: ['Service', 'Provider', 'Notes'],
        rows: [
          ['Electric', 'REC or Dominion', 'Check address for provider'],
          ['Internet', 'Various', 'Limited high-speed options'],
          ['Phone', 'Centurylink/Cell', 'Cell coverage varies'],
          ['Propane', 'Multiple', 'Shop for best rates'],
          ['Septic', 'Private', 'Pump every 3-5 years']
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'ROAD MAINTENANCE'),
      e(DenseText, null,
        'BMPOA maintains over 12 miles of private roads. Spring grading addresses winter damage. Gravel is applied to problem areas. Report severe potholes to the Board. Property owners must maintain their private driveways.'
      ),
      
      e(InfoBox, {
        title: 'Winter Roads',
        type: 'warning',
        content: [
          '• Main roads plowed first',
          '• Secondary roads as possible',
          '• Private drives not plowed',
          '• Carry chains/sand',
          '• 4WD recommended'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'MAIL & PACKAGES'),
      e(DenseText, null,
        'USPS delivers to cluster mailboxes on main roads. Large packages may require pickup at Front Royal post office. Consider informed delivery notifications. Some carriers (UPS/FedEx) may not deliver to all addresses - verify before ordering.'
      ),
      
      e(FeatureBox, {
        title: '📦 DELIVERY TIPS',
        content: 'Provide detailed directions for delivery drivers. Include "BMPOA" in address. Consider delivery to workplace or Amazon lockers in town for valuable items. Install a lockbox for packages if theft is a concern.'
      })
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['community-services'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}