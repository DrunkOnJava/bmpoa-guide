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
import { FeatureBox, SidebarBox } from './AdvancedLayoutComponents.js';

export default function BearSafetyPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const warningStyles = StyleSheet.create({
    dangerBox: {
      backgroundColor: colors.backgroundDanger,
      borderLeft: `4px solid #DC2626`,
      padding: spacing.md,
      marginBottom: spacing.md,
  },
    dangerTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.danger,
      marginBottom: spacing.xs,
  }
});
  
  const sidebarContent = [
    e(SidebarBox, {
      key: 'bear-emergency',
      type: 'danger',
      title: '🐻 BEAR ENCOUNTER',
      content: 'DO NOT RUN!\n\n1. Make yourself large\n2. Back away slowly\n3. Make noise\n4. Fight if attacked\n\nReport: (540) 635-4128'
  }),
    
    e(QuickFactsBox, {
      key: 'bear-facts',
      title: 'BEAR BEHAVIOR',
      facts: [
        { label: 'Active Season', value: 'March-November' },
        { label: 'Peak Activity', value: 'Dawn/Dusk' },
        { label: 'Smell Range', value: '5+ miles' },
        { label: 'Population', value: 'Growing' },
        { label: 'Attacks Rare', value: 'But increasing' },
        { label: 'Habituation', value: 'Major problem' }
      ]
  }),
    
    e(InfoBox, {
      key: 'prevention',
      title: '🔒 PREVENTION',
      type: 'success',
      content: [
        '• Secure all food sources',
        '• Clean grills after use',
        '• Bring feeders in at night',
        '• Lock garbage containers',
        '• Never feed bears',
        '• Report bear activity'
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
        number: '12',
        title: 'BEAR SAFETY',
        description: 'Living safely with black bears in our mountain community'
    }),
      
      e(View, { style: warningStyles.dangerBox },
        e(Text, { style: warningStyles.dangerTitle }, '⚠️ VIRGINIA LAW: FEEDING BEARS IS ILLEGAL'),
        e(DenseText, null,
          'Intentionally feeding bears or leaving food where bears can access it is a Class 4 misdemeanor punishable by fine up to $250. Habituated bears often must be destroyed.'
        )
      ),
      
      e(FeatureBox, {
        title: '🐻 INCREASING BEAR ACTIVITY',
        content: 'Black bear populations are growing throughout Virginia. Blue Mountain\'s forest habitat and proximity to Shenandoah National Park make bear encounters increasingly common. Property owners must take active steps to prevent conflicts.'
    }),
      
      e(CompactSubsectionHeader, null, 'BEAR-PROOFING YOUR PROPERTY'),
      e(TwoColumnList, {
        title: 'Secure these attractants:',
        items: [
          'Garbage cans (use bear-proof or garage)',
          'Bird feeders (bring in March-December)',
          'Pet food (feed indoors only)',
          'Grills (clean after each use)',
          'Compost piles (avoid food scraps)',
          'Fruit trees (harvest promptly)',
          'Beehives (electric fence required)',
          'Chicken coops (reinforced construction)'
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'IF YOU ENCOUNTER A BEAR'),
      e(CompactTable, {
        headers: ['Situation', 'Action'],
        rows: [
          ['Bear at distance', 'Back away slowly, make noise'],
          ['Bear charges', 'Stand ground, use bear spray'],
          ['Bear attacks', 'Fight back with everything'],
          ['Surprised bear', 'Avoid eye contact, retreat'],
          ['Defensive bear', 'Play dead if knocked down']
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'SEASONAL BEHAVIOR'),
      e(DenseText, null,
        'Spring bears emerge hungry after winter denning. Summer activity focuses on berry patches and water sources. Fall brings peak activity as bears prepare for winter, making them more aggressive around food sources. Sows with cubs are especially dangerous.'
      ),
      
      e(InfoBox, {
        title: 'Report Bear Activity',
        type: 'warning',
        content: [
          'Warren County Sheriff: (540) 635-4128',
          'VA Wildlife Conflict Helpline: (855) 571-9003',
          '',
          'Report immediately:',
          '• Property damage',
          '• Aggressive behavior',
          '• Repeated visits'
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'COMMUNITY RESPONSIBILITY'),
      e(DenseText, null,
        'Bear safety requires community-wide cooperation. One property owner feeding bears (intentionally or not) affects the entire neighborhood. Educate visitors about bear safety. Report neighbors who violate bear safety practices. Working together keeps bears wild and our community safe.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['bear-safety'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}