import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout, 
  QuickFactsBox,
  DenseText,
  CompactSubsectionHeader,
  CompactTable,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import { ChecklistBox, RiskLevelBox } from './ExtendedLayoutComponents.js';
import { SidebarBox } from './AdvancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

export default function ConstructionPageNoJSXNoOrphans({ pageNumberMap = {} }) {
  const e = React.createElement;

  const constructionStyles = StyleSheet.create({
    processBox: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.md,
  },
    processStep: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
  },
    stepNumber: {
      width: 24,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.primary,
  },
    stepText: {
      flex: 1,
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
  }
});

  const approvalSidebar = [
    e(SidebarBox, {
      key: 'arc-required',
      type: 'danger',
      title: '🚨 ARC APPROVAL REQUIRED',
      content: 'All exterior work requires ARC approval BEFORE beginning. Failure to obtain approval may result in fines and required removal of non-compliant work.'
  }),
    
    e(QuickFactsBox, {
      key: 'arc-facts',
      title: 'ARC PROCESS',
      facts: [
        { label: 'Submit', value: '30 days before' },
        { label: 'Review', value: '30 days max' },
        { label: 'Approval', value: '1 year valid' },
        { label: 'Extensions', value: 'Available' },
        { label: 'Fee', value: 'None' }
      ]
  }),
    
    e(InfoBox, {
      key: 'arc-contact',
      title: '📋 SUBMIT TO ARC',
      content: [
        'Email: arc@bmpoa.org',
        'Mail: BMPOA ARC',
        'P.O. Box 114',
        'Linden, VA 22642',
        '',
        'Include all required documents'
      ]
  })
  ];

  const complianceSidebar = [
    e(SidebarBox, {
      key: 'county-permits',
      type: 'warning',
      title: '⚠️ COUNTY PERMITS',
      content: 'Warren County building permits required for most construction. Apply AFTER ARC approval. Call (540) 635-2180 for requirements.'
  }),
    
    e(InfoBox, {
      key: 'inspections',
      title: '🔍 INSPECTIONS',
      content: [
        'Foundation',
        'Framing',
        'Electrical',
        'Plumbing',
        'Insulation',
        'Final',
        '',
        'Schedule: (540) 635-2180'
      ]
  }),
    
    e(InfoBox, {
      key: 'contractors',
      title: '🔨 CONTRACTORS',
      content: [
        'Must be licensed',
        'Insurance required',
        'Follow ARC approval',
        'Respect neighbors',
        'Clean job sites daily'
      ]
  })
  ];

  return [
    // Section Divider
    e(SectionDivider, {
      number: '11',
      title: 'CONSTRUCTION',
      description: 'Building guidelines, approval process, and compliance requirements',
      backgroundColor: colors.primary
  }),

    // Page 1: Approval Process - NO ORPHANED HEADER
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        TwoColumnLayout,
        { sidebarContent: approvalSidebar },
        
        // Content starts directly without redundant header
        e(Text, { style: styles.h2 }, 'BUILDING IN BLUE MOUNTAIN'),
        
        e(DenseText, null,
          'All construction projects require Architectural Review Committee (ARC) approval BEFORE any work begins. This ensures projects maintain community standards, protect property values, and comply with covenants.'
        ),

        e(CompactSubsectionHeader, null, 'WHAT REQUIRES APPROVAL'),
        e(TwoColumnList, {
          items: [
            'New home construction',
            'Additions to existing homes',
            'Outbuildings (sheds, garages)',
            'Decks, patios, porches',
            'Fencing and walls',
            'Driveways and parking areas',
            'Major landscaping changes',
            'Exterior color changes',
            'Solar panel installations',
            'Pool/hot tub installations'
          ]
      }),

        e(CompactSubsectionHeader, null, 'SUBMISSION REQUIREMENTS'),
        e(ChecklistBox, {
          title: 'Required Documents',
          items: [
            'Completed ARC application form',
            'Site plan showing all structures and setbacks',
            'Building plans and elevations',
            'Material specifications and colors',
            'Contractor information and timeline',
            'Neighbor notification (if required)'
          ]
      }),

        e(CompactSubsectionHeader, null, 'DESIGN STANDARDS'),
        e(CompactTable, {
          headers: ['Element', 'Requirement'],
          rows: [
            ['Setbacks', '25ft sides/rear, varies front'],
            ['Height', '35 feet maximum'],
            ['Colors', 'Earth tones preferred'],
            ['Roofing', 'Architectural shingles min'],
            ['Siding', 'Natural materials encouraged']
          ]
      }),

        e(CompactSubsectionHeader, null, 'APPROVAL TIMELINE'),
        e(View, { style: constructionStyles.processBox },
          e(View, { style: constructionStyles.processStep },
            e(Text, { style: constructionStyles.stepNumber }, '1.'),
            e(Text, { style: constructionStyles.stepText }, 'Submit complete application 30+ days before planned start')
          ),
          e(View, { style: constructionStyles.processStep },
            e(Text, { style: constructionStyles.stepNumber }, '2.'),
            e(Text, { style: constructionStyles.stepText }, 'ARC reviews within 30 days')
          ),
          e(View, { style: constructionStyles.processStep },
            e(Text, { style: constructionStyles.stepNumber }, '3.'),
            e(Text, { style: constructionStyles.stepText }, 'Approval valid for 1 year')
          ),
          e(View, { style: constructionStyles.processStep },
            e(Text, { style: constructionStyles.stepNumber }, '4.'),
            e(Text, { style: constructionStyles.stepText }, 'Extensions available if needed')
          )
        )
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

    // Page 2: Process & Compliance - NO ORPHANED HEADER
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        TwoColumnLayout,
        { sidebarContent: complianceSidebar },
        
        // Content starts directly
        e(Text, { style: styles.h2 }, 'CONSTRUCTION PROCESS'),
        
        e(CompactSubsectionHeader, null, 'STEP-BY-STEP GUIDE'),
        e(ChecklistBox, {
          title: 'Construction Timeline',
          items: [
            'Submit ARC application',
            'Receive ARC approval',
            'Apply for county permits',
            'Schedule pre-construction meeting',
            'Begin construction',
            'Schedule county inspections',
            'Complete project',
            'Obtain final inspections',
            'Notify ARC of completion'
          ]
      }),

        e(CompactSubsectionHeader, null, 'DURING CONSTRUCTION'),
        e(DenseText, null,
          'Maintain a clean, safe job site. Control erosion and runoff. Limit work hours to minimize neighbor disruption. Ensure all workers follow community rules including speed limits.'
        ),

        e(CompactTable, {
          headers: ['Requirement', 'Details'],
          rows: [
            ['Work Hours', '7 AM - 6 PM Monday-Friday, 8 AM - 5 PM Saturday'],
            ['Sunday Work', 'Prohibited except emergencies'],
            ['Noise Limits', 'Follow county ordinances'],
            ['Debris', 'Remove regularly, no burning'],
            ['Parking', 'On-site only, not on roads']
          ]
      }),

        e(CompactSubsectionHeader, null, 'COMMON VIOLATIONS'),
        e(RiskLevelBox, {
          title: 'Avoid These Issues',
          items: [
            { level: 'HIGH', text: 'Starting work without ARC approval' },
            { level: 'HIGH', text: 'Deviating from approved plans' },
            { level: 'MEDIUM', text: 'Missing county inspections' },
            { level: 'MEDIUM', text: 'Exceeding height/setback limits' },
            { level: 'LOW', text: 'Minor color variations' }
          ]
      }),

        e(CompactSubsectionHeader, null, 'ENFORCEMENT'),
        e(DenseText, null,
          'The ARC conducts periodic inspections. Non-compliance may result in stop-work orders, fines, and required corrections at owner expense. Serious violations may lead to legal action.'
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