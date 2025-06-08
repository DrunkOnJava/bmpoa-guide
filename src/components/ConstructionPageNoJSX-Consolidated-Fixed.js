import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout } from '../designTokens.js';
import { styles } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';

export default function ConstructionPageNoJSXConsolidatedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const constructionStyles = StyleSheet.create({
    warningBox: {
      backgroundColor: '#FFEBEE',
      borderWidth: 2,
      borderColor: '#D32F2F',
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    approvalBox: {
      backgroundColor: '#E8F5E9',
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    contractorBox: {
      backgroundColor: '#FFF9C4',
      borderWidth: 1,
      borderColor: '#F57F17',
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    environmentBox: {
      backgroundColor: '#E3F2FD',
      borderWidth: 1,
      borderColor: '#1976D2',
      borderRadius: callout.radius,
      padding: layout.spacing.xs,
      marginBottom: layout.spacing.sm,
    }
  });

  return [
    // Page 1: General Guidelines & Requirements
    e(
      Page,
      { key: 'construction-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, { 
            facts: [
              { label: 'Approval', value: 'Required' },
              { label: 'Permits', value: 'County + BMPOA' },
              { label: 'Work Hours', value: 'M-F 7AM-6PM' },
              { label: 'Weekend', value: 'Sat 8AM-5PM' },
              { label: 'Sundays', value: 'No work allowed' }
            ]
          }),
          e(View, { style: constructionStyles.warningBox },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: '#D32F2F', marginBottom: 4 } }, 
              '⚠️ START WORK WITHOUT APPROVAL?'
            ),
            e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
              'Consequences include:\n' +
              '• Stop work order\n' +
              '• Daily fines\n' +
              '• Forced removal\n' +
              '• Legal action\n' +
              '• Denial of future requests'
            )
          ),
          e(InfoBox, { title: '📋 APPROVAL PROCESS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, '1. Submit plans to Board'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '2. Review period (30 days)'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '3. Obtain county permits'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '4. Schedule pre-work meeting'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '5. Begin construction')
          )
        ]
      },
        e(CompactSectionHeader, null, 'CONSTRUCTION GUIDELINES'),
        
        e(DenseText, null,
          'All construction, renovations, and major landscaping projects within Blue Mountain require prior approval from the BMPOA Board. These guidelines ensure that development maintains our community\'s mountain character while protecting property values and natural resources.'
        ),

        e(CompactSubsectionHeader, null, 'APPROVAL REQUIREMENTS'),
        
        e(View, { style: constructionStyles.approvalBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: 4 } }, 
            'LANDSCAPING & TREE REMOVAL'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Major plantings, tree removal (>6" diameter), grading, or landscape modifications require written approval. ' +
            'Submit detailed plans showing existing trees, proposed changes, and drainage impacts. ' +
            'Approval typically takes 2-4 weeks for standard requests.'
          )
        ),

        e(CompactSubsectionHeader, null, 'BUILDING STANDARDS'),
        
        e(CompactTable, {
          headers: ['Category', 'Requirement', 'Notes'],
          rows: [
            ['Setbacks', 'Per county code minimum', 'Additional restrictions may apply'],
            ['Height', '35 feet maximum', 'Measured from finished grade'],
            ['Materials', 'Earth tones preferred', 'Reflective materials discouraged'],
            ['Roofing', 'Architectural shingles', 'Metal roofing with approval'],
            ['Lighting', 'Dark-sky compliant', 'Minimize light pollution'],
            ['Drainage', 'Maintain natural flow', 'Divert runoff appropriately']
          ]
        }),

        e(CompactSubsectionHeader, null, 'ENVIRONMENTAL COMPLIANCE'),
        
        e(View, { style: constructionStyles.environmentBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '🌿 ENVIRONMENTAL REQUIREMENTS'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Minimize tree removal and grading • Preserve natural drainage patterns • ' +
            'Protect existing vegetation during construction • Use erosion control measures • ' +
            'Restore disturbed areas with native plants'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '47'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Contractor Requirements & Work Rules
    e(
      Page,
      { key: 'construction-2', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(InfoBox, { title: '📞 CONTACT INFO' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Board approval required'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Submit plans via email'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Include detailed drawings'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Allow 30 days for review')
          ),
          e(InfoBox, { title: '⏰ WORK SCHEDULE' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Monday-Friday: 7AM-6PM'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Saturday: 8AM-5PM'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Sunday: No work allowed'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Holidays: No work allowed')
          ),
          e(InfoBox, { title: '🚧 VIOLATIONS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Work outside approved hours'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Starting without approval'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Inadequate site maintenance'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Environmental damage')
          )
        ]
      },
        e(CompactSectionHeader, null, 'CONTRACTOR REQUIREMENTS'),
        
        e(View, { style: constructionStyles.contractorBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: '#F57F17', marginBottom: layout.spacing.xs } }, 
            'MANDATORY CONTRACTOR REQUIREMENTS'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: 1.4, marginBottom: layout.spacing.xs } },
            'All contractors working in Blue Mountain must meet these requirements:'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: 1.4 } },
            '• Proof of liability insurance (minimum $1M coverage)\n' +
            '• Required county permits and licenses\n' +
            '• Follow BMPOA work hours strictly\n' +
            '• Maintain clean, safe job site\n' +
            '• Provide emergency contact information\n' +
            '• Use appropriate dust and noise control'
          )
        ),

        e(CompactSubsectionHeader, null, 'WORK HOURS & RESTRICTIONS'),
        
        e(DenseText, null,
          'Construction work is permitted Monday through Friday from 7:00 AM to 6:00 PM, and Saturdays from 8:00 AM to 5:00 PM. No construction work is allowed on Sundays or federal holidays. These restrictions help maintain quality of life for all residents.'
        ),

        e(CompactSubsectionHeader, null, 'SITE MAINTENANCE'),
        
        e(CompactTable, {
          headers: ['Requirement', 'Frequency', 'Responsibility'],
          rows: [
            ['Debris removal', 'Weekly minimum', 'Contractor'],
            ['Dust control', 'As needed', 'Contractor'],
            ['Traffic safety', 'Continuous', 'Contractor/Owner'],
            ['Erosion control', 'Monitor daily', 'Contractor'],
            ['Neighbor notification', 'Before start', 'Property owner'],
            ['Final cleanup', 'Project completion', 'Contractor/Owner']
          ]
        }),

        e(CompactSubsectionHeader, null, 'VIOLATION ENFORCEMENT'),
        
        e(DenseText, null,
          'Violations of construction guidelines may result in work stoppage orders, daily fines, or required removal of non-compliant work. Repeat violations may affect approval of future projects. Property owners are ultimately responsible for ensuring contractors comply with all requirements.'
        ),

        e(View, { style: { backgroundColor: colors.lightGray, padding: layout.spacing.xs, borderRadius: callout.radius, marginTop: layout.spacing.sm } },
          e(Text, { style: { fontSize: typography.sizes.xs, textAlign: 'center', fontStyle: 'italic' } },
            'Questions about construction guidelines? Contact any Board member for clarification before beginning your project.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '48'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}