import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
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
import { CardGrid, FeatureBox, SidebarBox } from './AdvancedLayoutComponents.js';
import assetMap from '../assetMap.json' with { type: 'json' };

export default function LodgePageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lodgeStyles = StyleSheet.create({
    imageContainer: {
      marginVertical: spacing.md,
      borderRadius: callout.radius,
      overflow: 'hidden',
  },
    lodgeImage: {
      width: '100%',
      height: 120,
      objectFit: 'cover',
  }
});
  
  const activityCards = [
    {
      title: '🎉 EVENTS',
      content: 'Birthday parties\nFamily reunions\nHoliday gatherings\nClub meetings'
  },
    {
      title: '🏃 ACTIVITIES',
      content: 'Yoga classes\nGame nights\nPotluck dinners\nMovie nights'
  },
    {
      title: '🤝 MEETINGS',
      content: 'Board meetings\nCommittee work\nEducational talks\nSocial hours'
  },
    {
      title: '🎊 SEASONAL',
      content: 'Summer BBQs\nFall festival\nWinter social\nSpring cleanup'
  }
  ];
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'lodge-facts',
      title: 'FACILITY INFO',
      facts: [
        { label: 'Capacity', value: '80 people' },
        { label: 'Kitchen', value: 'Full service' },
        { label: 'Parking', value: '25 spaces' },
        { label: 'WiFi', value: 'Available' },
        { label: 'A/C & Heat', value: 'Yes' },
        { label: 'Restrooms', value: '2 (ADA)' }
      ]
  }),
    
    e(SidebarBox, {
      key: 'rental-rates',
      type: 'highlight',
      title: '💰 RENTAL RATES',
      content: 'Members: $100/day\nCleanup deposit: $100\nNon-profit: $50/day\n\nMulti-day discounts\navailable'
  }),
    
    e(InfoBox, {
      key: 'booking',
      title: '📅 BOOKING',
      content: [
        'Contact Board member',
        'Check calendar first',
        'Submit rental form',
        'Pay fees in advance',
        '',
        'Popular dates book',
        'early - plan ahead!'
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
        number: '07',
        title: 'THE LODGE',
        description: 'Community gathering place for events, meetings, and celebrations'
    }),
      
      ...(assetMap['lodge-interior.jpeg'] || assetMap['TheLodge.jpg']) ? [
        e(View, { style: lodgeStyles.imageContainer },
          e(Image, { 
            src: assetMap['lodge-interior.jpeg'] || assetMap['TheLodge.jpg'], 
            style: lodgeStyles.lodgeImage 
        })
        )
      ] : [],
      
      e(FeatureBox, {
        title: '🏛️ YOUR COMMUNITY CENTER',
        content: 'The BMPOA Lodge serves as the heart of our community. Built in 1995 and renovated in 2018, this beautiful facility hosts everything from board meetings to wedding receptions. Available for rental by members in good standing.'
    }),
      
      e(CompactSubsectionHeader, null, 'POPULAR USES'),
      e(CardGrid, { cards: activityCards, columns: 2 }),
      
      e(CompactSubsectionHeader, null, 'RENTAL GUIDELINES'),
      e(CompactTable, {
        headers: ['Requirement', 'Details'],
        rows: [
          ['Reservation', 'Book through Board member'],
          ['Payment', 'Due at booking confirmation'],
          ['Setup/Cleanup', 'Renter responsibility'],
          ['Alcohol', 'Allowed with restrictions'],
          ['Time Limit', 'Must end by 10 PM']
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'AMENITIES INCLUDED'),
      e(TwoColumnList, {
        items: [
          'Tables and chairs for 80',
          'Full kitchen with appliances',
          'Coffee makers & serving ware',
          'Projector and screen',
          'Sound system',
          'Heating and air conditioning',
          'Accessible restrooms',
          'Ample parking'
        ]
    }),
      
      e(InfoBox, {
        title: 'Renter Responsibilities',
        type: 'warning',
        content: [
          '• Leave facility as found',
          '• Remove all trash',
          '• Clean kitchen/bathrooms',
          '• Lock all doors',
          '• Report any damage',
          '• Respect neighbors'
        ]
    })
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['lodge'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}