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
import { FeatureBox, SidebarBox, Badge } from './AdvancedLayoutComponents.js';

export default function ConstructionPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const sidebarContent = [
    e(SidebarBox, {
      key: 'arc-contact',
      type: 'info',
      title: '🏗️ ARC APPROVAL',
      content: 'ALL exterior work needs ARC approval BEFORE starting\n\nContact: arc@bmpoa.org\nAllows 30 days for review'
    }),
    
    e(QuickFactsBox, {
      key: 'construction-facts',
      title: 'REQUIREMENTS',
      facts: [
        { label: 'ARC Review', value: '30 days max' },
        { label: 'Warren Permit', value: 'Required' },
        { label: 'Setbacks', value: '25ft sides/rear' },
        { label: 'Height Limit', value: '35 feet' },
        { label: 'Coverage', value: '30% max' },
        { label: 'Approval Valid', value: '12 months' }
      ]
    }),
    
    e(InfoBox, {
      key: 'contact-permits',
      title: '📋 PERMITS',
      content: [
        'Warren County:',
        '(540) 635-2180',
        '',
        'Required for:',
        '• New construction',
        '• Major additions',
        '• Septic systems',
        '• Structural changes'
      ]
    })
  ];

  return [
    // Page 1 - Construction Overview
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        TwoColumnLayout,
        { sidebarContent },
        
        e(InlineSectionHeader, {
          number: '11',
          title: 'CONSTRUCTION',
          description: 'Building guidelines, ARC approval process, and county requirements'
        }),
        
        e(FeatureBox, {
          title: '🏡 BUILDING ON THE MOUNTAIN',
          content: 'All construction projects require Architectural Review Committee (ARC) approval BEFORE beginning work. This ensures projects maintain community standards and comply with covenants. Early consultation prevents costly delays and modifications.'
        }),
        
        e(CompactSubsectionHeader, null, 'ARC APPROVAL PROCESS'),
        e(TwoColumnList, {
          title: 'Required for ARC Review:',
          items: [
            'New home construction',
            'Additions & modifications',
            'Outbuildings & sheds',
            'Fencing projects',
            'Decks & patios',
            'Driveways & parking',
            'Pool installations',
            'Major landscaping'
          ]
        }),
        
        e(CompactSubsectionHeader, null, 'BUILDING STANDARDS'),
        e(CompactTable, {
          headers: ['Requirement', 'Standard', 'Notes'],
          rows: [
            ['Setbacks', '25ft sides/rear', 'Front varies by lot'],
            ['Height Limit', '35 feet max', 'Measured to highest point'],
            ['Lot Coverage', '30% maximum', 'Includes all structures'],
            ['Materials', 'Natural preferred', 'Must complement setting'],
            ['Colors', 'Earth tones', 'No bright/neon colors']
          ]
        }),
        
        e(CompactSubsectionHeader, null, 'SUBMISSION REQUIREMENTS'),
        e(DenseText, null,
          'Submit complete applications including site plans, elevations, material samples, and contractor information. Include survey showing setbacks and existing features. Applications missing required elements will be returned without review.'
        ),
        
        e(InfoBox, {
          title: 'Application Checklist',
          content: [
            '✓ Completed ARC application form',
            '✓ Site plan with dimensions',
            '✓ Building elevations (all sides)',
            '✓ Material & color samples',
            '✓ Contractor information',
            '✓ Timeline for completion'
          ]
        })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap['construction'] || '—'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),
    
    // Page 2 - Compliance & Considerations
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageContent },
        
        e(CompactSubsectionHeader, null, 'COUNTY PERMITS'),
        e(DenseText, null,
          'Warren County requires permits for most construction projects. Obtain county permits AFTER ARC approval. Some projects may also require state permits (septic, well, stream impacts). Check with county building department early in planning.'
        ),
        
        e(CompactTable, {
          headers: ['Project Type', 'County Permit', 'ARC Required'],
          rows: [
            ['New Home', 'Yes', 'Yes'],
            ['Addition > 200 sq ft', 'Yes', 'Yes'],
            ['Deck > 30" high', 'Yes', 'Yes'],
            ['Shed > 200 sq ft', 'Yes', 'Yes'],
            ['Driveway changes', 'Maybe', 'Yes'],
            ['Fence installation', 'No', 'Yes']
          ]
        }),
        
        e(CompactSubsectionHeader, null, 'SEASONAL CONSIDERATIONS'),
        e(SidebarBox, {
          type: 'warning',
          title: '❄️ WINTER BUILDING',
          content: 'Limited concrete work Nov-Mar. Plan delivery access carefully. Some roads may be impassable.'
        }),
        
        e(DenseText, null,
          'Mountain weather affects construction schedules. Snow and ice can block access roads. Spring mud season may prevent heavy equipment access. Plan material deliveries for all-weather road conditions.'
        ),
        
        e(CompactSubsectionHeader, null, 'UTILITY CONNECTIONS'),
        e(DenseText, null,
          'Coordinate utility connections early. Water service requires Sanitary District approval. Electric service may require new transformers for large homes. Septic systems need county and state permits. Internet options are limited - research before building.'
        ),
        
        e(InfoBox, {
          title: 'Common Violations to Avoid',
          type: 'danger',
          content: [
            '• Starting without ARC approval',
            '• Exceeding height/setback limits',
            '• Using prohibited materials',
            '• Failing to follow approved plans',
            '• Not maintaining erosion control'
          ]
        }),
        
        e(CompactSubsectionHeader, null, 'COMPLIANCE & ENFORCEMENT'),
        e(DenseText, null,
          'The ARC conducts periodic inspections to ensure compliance with approved plans. Violations may result in stop-work orders and require corrective action at owner expense. Serious violations may result in legal action and liens against the property.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap['construction'] || 0) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}