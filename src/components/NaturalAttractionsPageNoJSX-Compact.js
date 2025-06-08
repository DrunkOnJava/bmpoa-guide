import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import InlineSectionHeader from './InlineSectionHeader.js';
import {
  TwoColumnLayout,
  QuickFactsBox,
  InfoBox,
  DenseText,
  CompactSubsectionHeader,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import { FeatureBox, CardGrid, Badge } from './AdvancedLayoutComponents.js';
import assetMap from '../assetMap.json' with { type: 'json' };

export default function NaturalAttractionsPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const attractionCards = [
    {
      title: '🌸 WILDFLOWERS',
      content: 'Spring: Trilliums, Bluebells\nSummer: Mountain Laurel\nFall: Asters, Goldenrod\n\nPeak bloom: April-May'
    },
    {
      title: '🥾 HIKING',
      content: 'Informal trails throughout\nVarying difficulty levels\nMountain views\nWildlife spotting'
    },
    {
      title: '🍷 WINERIES',
      content: 'Chester Gap Cellars\n4615 Remount Rd\n(540) 636-8086\n\nTasting & tours'
    },
    {
      title: '⭐ STARGAZING',
      content: 'Dark sky preserve\nMinimal light pollution\nBest: Winter nights\nBring red flashlight'
    }
  ];
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'nature-facts',
      title: 'NATURE GUIDE',
      facts: [
        { label: 'Peak Flowers', value: 'April-May' },
        { label: 'Bird Species', value: '100+' },
        { label: 'Tree Species', value: '50+' },
        { label: 'Best Photos', value: 'Golden hour' },
        { label: 'Dark Skies', value: 'Clear winter' },
        { label: 'Mushrooms', value: 'Spring/Fall' }
      ]
    }),
    
    e(InfoBox, {
      key: 'photo-tips',
      title: '📸 PHOTO TIPS',
      type: 'highlight',
      content: [
        '• Early morning light',
        '• Wildflower close-ups',
        '• Mountain vista shots',
        '• Macro mushroom pics',
        '• Star trail photography',
        '• Wildlife telephoto'
      ]
    }),
    
    e(InfoBox, {
      key: 'wildlife-safety',
      title: '🐻 WILDLIFE SAFETY',
      type: 'warning',
      content: [
        '• Make noise on trails',
        '• Keep food secured',
        '• Watch for bears',
        '• Don\'t feed animals',
        '• Respect nesting birds'
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
        number: '10',
        title: 'NATURAL ATTRACTIONS',
        description: 'Exploring the natural beauty and outdoor opportunities around Blue Mountain'
      }),
      
      e(FeatureBox, {
        title: '🌲 MOUNTAIN TREASURES',
        content: 'Blue Mountain\'s diverse ecosystem offers year-round natural attractions. From spectacular spring wildflower displays to dark winter skies perfect for stargazing, our mountain provides endless opportunities for nature appreciation and outdoor recreation.'
      }),
      
      e(View, { style: { marginBottom: spacing.md } },
        e(CardGrid, { cards: attractionCards, columns: 2 })
      ),
      
      e(CompactSubsectionHeader, null, 'SEASONAL HIGHLIGHTS'),
      e(TwoColumnList, {
        title: 'What to see when:',
        items: [
          'SPRING: Trilliums, Virginia Bluebells, migrating birds',
          'SUMMER: Mountain Laurel, butterfly activity, cool evenings',
          'FALL: Spectacular foliage, mushroom varieties, clear skies',
          'WINTER: Snow scenes, bare tree architecture, star shows',
          'YEAR-ROUND: Hawks, deer, turkey, changing light'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'PHOTOGRAPHY OPPORTUNITIES'),
      e(DenseText, null,
        'Blue Mountain offers exceptional photography opportunities throughout the year. The changing seasons provide diverse subjects from intimate wildflower portraits to sweeping mountain vistas. Early morning and late afternoon offer the best lighting for landscape photography.'
      ),
      
      e(InfoBox, {
        title: 'Prime Photo Locations',
        content: [
          '• Deer Lake dock (sunrise)',
          '• High overlooks (sunset)',
          '• Woodland floors (wildflowers)',
          '• Mountain ridges (wide views)',
          '• Meadow edges (wildlife)'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'DARK SKY VIEWING'),
      e(DenseText, null,
        'Our elevation and limited light pollution create excellent conditions for astronomy. Winter offers the clearest skies and longest nights for stargazing. The Milky Way is visible during summer months. Consider joining area astronomy clubs for guided observations.'
      ),
      
      e(CompactSubsectionHeader, null, 'RESPONSIBLE ENJOYMENT'),
      e(DenseText, null,
        'Please help preserve these natural treasures for future generations. Stay on established trails, don\'t pick wildflowers, pack out all trash, and maintain respectful distances from wildlife. Your stewardship helps protect what makes Blue Mountain special.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['natural-attractions'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}