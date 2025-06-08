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
  CompactTable,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import { FeatureBox, SidebarBox } from './AdvancedLayoutComponents.js';

export default function WoodChippingPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'program-facts',
      title: 'PROGRAM DETAILS',
      facts: [
        { label: 'Season', value: 'May-October' },
        { label: 'Frequency', value: 'Monthly' },
        { label: 'Max Diameter', value: '6 inches' },
        { label: 'Pile Location', value: 'Roadside' },
        { label: 'Cost', value: 'HOA Funded' },
        { label: 'Schedule', value: 'Posted monthly' }
      ]
    }),
    
    e(SidebarBox, {
      key: 'schedule-alert',
      type: 'warning',
      title: '📅 2025 SCHEDULE',
      content: 'Check www.bmpoa.org or Facebook for monthly dates. Piles must be ready by 7 AM on collection day.'
    }),
    
    e(InfoBox, {
      key: 'quick-rules',
      title: '✓ QUICK RULES',
      type: 'success',
      content: [
        '• Max 6" diameter',
        '• Within 10ft of road',
        '• Brush only - no trash',
        '• Stack neatly',
        '• Cut ends toward road',
        '• No poison ivy/oak'
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
        number: '03',
        title: 'WOOD-CHIPPING PROGRAM',
        description: 'Free brush removal service for fire safety and property maintenance'
      }),
      
      e(FeatureBox, {
        title: '🌲 KEEPING OUR MOUNTAIN SAFE',
        content: 'The BMPOA wood-chipping program provides free monthly brush removal from May through October. This essential service helps property owners maintain fire-safe conditions while keeping our roads clear and properties neat.'
      }),
      
      e(CompactSubsectionHeader, null, 'ACCEPTABLE MATERIALS'),
      e(TwoColumnList, {
        items: [
          'Tree branches up to 6" diameter',
          'Brush and shrub trimmings',
          'Storm debris (natural only)',
          'Pine needles in manageable piles',
          'Small logs from tree work',
          'Bamboo (cut to 4ft lengths)'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'NOT ACCEPTED'),
      e(TwoColumnList, {
        items: [
          'Construction materials',
          'Treated/painted lumber',
          'Poison ivy or poison oak',
          'Trash or yard waste bags',
          'Root balls with soil',
          'Stumps or logs over 6"'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'PLACEMENT GUIDELINES'),
      e(CompactTable, {
        headers: ['Requirement', 'Details'],
        rows: [
          ['Location', 'Within 10 feet of road edge'],
          ['Stack Height', 'Maximum 4 feet high'],
          ['Organization', 'Cut ends facing the road'],
          ['Timing', 'Ready by 7 AM on chip day'],
          ['Weather', 'Service runs rain or shine']
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'PREPARATION TIPS'),
      e(DenseText, null,
        'Stack brush neatly with all cut ends facing the road for efficient loading. Remove any foreign objects like wire, nails, or non-organic materials. Keep piles compact and accessible - the crew will not enter private property or move piles.'
      ),
      
      e(SidebarBox, {
        type: 'info',
        title: '💡 PRO TIP',
        content: 'Start your pile 2-3 days before collection. This gives you time to add last-minute trimmings and ensures you don\'t miss the truck.'
      }),
      
      e(CompactSubsectionHeader, null, 'SPECIAL SITUATIONS'),
      e(DenseText, null,
        'For large tree removal projects generating excessive debris, contact the Board before chip day. Special arrangements may be needed for volumes exceeding normal monthly limits. The chipper cannot handle stumps or logs over 6 inches - these require separate removal.'
      ),
      
      e(InfoBox, {
        title: 'Alternative Disposal',
        content: [
          'Warren County Landfill:',
          '• 164 Landfill Rd, Front Royal',
          '• (540) 635-7515',
          '• Accepts stumps & large logs',
          '• Fees apply by weight'
        ]
      })
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['wood-chipping'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}