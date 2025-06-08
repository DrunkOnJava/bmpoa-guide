import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import InlineSectionHeader from './InlineSectionHeader.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox,
  DenseText,
  CompactSubsectionHeader,
  CompactTable
} from './EnhancedLayoutComponents.js';
import { FeatureBox, Timeline } from './AdvancedLayoutComponents.js';

export default function MountainHomePageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'property-facts',
      title: 'PROPERTY FACTS',
      facts: [
        { label: 'Total Lots', value: '425+' },
        { label: 'Active Homes', value: '300+' },
        { label: 'Weekend Homes', value: '60%' },
        { label: 'Full-Time', value: '40%' },
        { label: 'Avg Lot Size', value: '2-5 acres' },
        { label: 'HOA Founded', value: '1975' }
      ]
    }),
    
    e(InfoBox, {
      key: 'seasonal-tips',
      title: '🍂 SEASONAL TIPS',
      type: 'highlight',
      content: [
        'Spring: Check gutters & drains',
        'Summer: Fire prevention prep',
        'Fall: Winterize water lines',
        'Winter: Keep heat at 55°F+',
        '',
        'Year-round: Monitor for pests'
      ]
    }),
    
    e(InfoBox, {
      key: 'wildlife',
      title: '🦌 WILDLIFE',
      content: [
        '• Black bears (common)',
        '• White-tailed deer',
        '• Wild turkeys',
        '• Red foxes',
        '• Various raptors',
        '• Occasional bobcats'
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
        number: '02',
        title: 'A MOUNTAIN HOME',
        description: 'Life at Blue Mountain - history, nature, and community spirit'
      }),
      
      e(FeatureBox, {
        title: '🏔️ MOUNTAIN LIVING',
        content: 'Blue Mountain offers a unique lifestyle combining natural beauty with modern conveniences. Our community provides peaceful mountain retreats while remaining accessible to urban amenities, creating the perfect balance for weekend escapes or full-time residence.'
      }),
      
      e(CompactSubsectionHeader, null, 'OUR HISTORY'),
      e(DenseText, null,
        'Blue Mountain Property Owners Association was established in 1975 to manage and protect our mountain community. What began as a small vacation retreat has grown into a vibrant community of over 425 properties, each maintaining the character that makes our mountain special.'
      ),
      
      e(DenseText, null,
        'The Warren County Sanitary District was created in 1982 to provide reliable water service to our properties. This essential infrastructure improvement allowed for year-round residence and marked the beginning of our transition from seasonal retreat to permanent community.'
      ),
      
      e(CompactSubsectionHeader, null, 'NATURAL ENVIRONMENT'),
      e(DenseText, null,
        'Our properties span elevations from 1,000 to 1,400 feet, providing cooler temperatures and spectacular views. The varied terrain supports diverse ecosystems including hardwood forests, mountain meadows, and seasonal streams that create unique microclimates throughout the community.'
      ),
      
      e(CompactTable, {
        headers: ['Season', 'Avg Temp', 'Highlights'],
        rows: [
          ['Spring', '50-70°F', 'Wildflowers, migrating birds'],
          ['Summer', '65-85°F', 'Cool nights, lush forests'],
          ['Fall', '45-65°F', 'Spectacular foliage'],
          ['Winter', '25-45°F', 'Occasional snow, peaceful quiet']
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'COMMUNITY SPIRIT'),
      e(DenseText, null,
        'What truly defines Blue Mountain is our strong sense of community. Neighbors look out for each other, share local knowledge, and work together to preserve our mountain environment. Regular social events, volunteer workdays, and board meetings provide opportunities to connect and contribute.'
      ),
      
      e(InfoBox, {
        title: 'Community Values',
        type: 'info',
        content: [
          '• Environmental stewardship',
          '• Neighbor helping neighbor',
          '• Preserving natural beauty',
          '• Fire safety awareness',
          '• Wildlife conservation',
          '• Dark sky preservation'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'LIVING RESPONSIBLY'),
      e(DenseText, null,
        'Mountain living requires awareness and preparation. Property owners must manage vegetation for fire safety, protect homes from weather extremes, and coexist peacefully with wildlife. Following community guidelines ensures everyone can enjoy the beauty and tranquility of Blue Mountain.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['mountain-home'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}