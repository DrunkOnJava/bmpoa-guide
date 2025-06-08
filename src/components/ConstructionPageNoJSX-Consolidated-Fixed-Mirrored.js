import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout } from '../designTokens.js';
import { styles } from '../theme.js';
import { 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { 
  MirroredTwoColumnLayout, 
  TallQuickFactsBox, 
  TallInfoBox, 
  ExtraTallInfoBox
} from './MirroredLayoutComponents.js';

export default function ConstructionPageNoJSXConsolidatedFixedMirrored({ pageNumberMap = {} }) {
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
    // Page 1: Approval Process & Requirements
    e(
      Page,
      { key: 'construction-1', size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'CONSTRUCTION GUIDELINES')
      ),
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'APPROVAL TIMELINE',
            facts: [
              { label: 'Initial Review', value: '14 days' },
              { label: 'Complete Plans', value: '30 days' },
              { label: 'Major Projects', value: '45 days' },
              { label: 'Appeals', value: '30 days' },
              { label: 'County Permits', value: 'Varies' },
              { label: 'Start Work', value: 'After approval' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '📋 REQUIRED DOCUMENTS' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Site Plans:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Property survey with improvements'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Architectural Plans:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Floor plans, elevations, materials'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Engineering:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Structural, septic, well plans'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Environmental:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Erosion control, tree protection'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Signatures:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Property owner acknowledgment')
          ),
          
          e(TallInfoBox, { title: '⚠️ CRITICAL WARNINGS' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: '#D32F2F' } }, 'NO WORK WITHOUT APPROVAL:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Violations result in stop work orders'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: '#D32F2F', marginTop: 4 } }, 'DAILY FINES:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Accumulate until compliance'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: '#D32F2F', marginTop: 4 } }, 'FORCED REMOVAL:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'At owner expense if necessary')
          )
        ]
      },
        e(CompactSectionHeader, null, 'ARCHITECTURAL REVIEW PROCESS'),
        
        e(DenseText, null,
          'All construction, modifications, and improvements must receive BMPOA Architectural Review Committee approval before beginning work. This process ensures projects maintain Blue Mountain\'s character while complying with county regulations and community standards.'
        ),

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

        e(CompactSubsectionHeader, null, 'APPROVAL REQUIREMENTS'),
        
        e(DenseText, null,
          'Submit complete application packages including detailed plans, engineering documents, and environmental protection measures. Incomplete submissions will be returned without review, delaying your project timeline.'
        ),

        e(CompactTable, {
          headers: ['Project Type', 'Review Time', 'Plans Required', 'County Permit'],
          rows: [
            ['New Home', '45 days', 'Complete architectural', 'Yes'],
            ['Addition', '30 days', 'Plans + existing survey', 'Yes'],
            ['Deck/Porch', '21 days', 'Site plan + elevations', 'Maybe'],
            ['Shed/Garage', '21 days', 'Site plan + specs', 'Maybe'],
            ['Driveway', '14 days', 'Site plan + materials', 'No'],
            ['Landscaping', '14 days', 'Planting plan', 'No']
          ]
        }),

        e(CompactSubsectionHeader, null, 'SUBMISSION PROCESS'),
        
        e(DenseText, null,
          'Applications must be submitted electronically via email to architecture@bmpoa.org with all required documents in PDF format. Hard copies are not accepted. Include property address and brief project description in the subject line.'
        ),

        e(View, { style: constructionStyles.approvalBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: colors.forestGreen } }, 
            '✅ APPROVAL LETTER REQUIRED'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'You must receive written approval before starting any work. Verbal approvals are not valid. Keep the approval letter on-site during construction for inspection purposes.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.construction || '39')
      )
    ),

    // Page 2: Contractor Requirements & Environmental Guidelines
    e(
      Page,
      { key: 'construction-2', size: 'LETTER', style: styles.page },
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'CONTRACTOR REQUIREMENTS',
            facts: [
              { label: 'License', value: 'Virginia Class A/B/C' },
              { label: 'Insurance', value: '$1M minimum' },
              { label: 'Bond', value: 'Required for major work' },
              { label: 'References', value: '3 recent projects' },
              { label: 'Cleanup', value: 'Daily requirement' },
              { label: 'Hours', value: '7 AM - 6 PM only' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '🌳 ENVIRONMENTAL PROTECTION' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Tree Protection:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Minimize removal, protect root zones'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Erosion Control:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Silt fencing, sediment traps'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Water Protection:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'No contamination of wells/streams'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Restoration:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Disturbed areas must be reseeded'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Compliance:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Follow all state/federal regulations')
          ),
          
          e(TallInfoBox, { title: '📞 CONTACTS' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'BMPOA Architecture:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'architecture@bmpoa.org'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Warren County Building:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 635-2441'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'DEQ (Environmental):'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 574-7800')
          )
        ]
      },
        e(CompactSectionHeader, null, 'CONTRACTOR QUALIFICATIONS'),
        
        e(DenseText, null,
          'All contractors working on Blue Mountain must meet specific qualification requirements including proper licensing, insurance, and bonding. Property owners are responsible for verifying contractor credentials before work begins.'
        ),

        e(View, { style: constructionStyles.contractorBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: '#F57F17' } }, 
            '🔧 CONTRACTOR CHECKLIST'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Valid Virginia contractor license • General liability insurance ($1M minimum) • Workers compensation coverage • Performance bond for projects >$50k • Three recent project references • Written contract with timeline • Daily cleanup commitment'
          )
        ),

        e(CompactSubsectionHeader, null, 'WORK STANDARDS & HOURS'),
        
        e(DenseText, null,
          'Construction activities are permitted Monday through Saturday from 7:00 AM to 6:00 PM only. No work is allowed on Sundays or federal holidays. Contractors must maintain clean job sites with daily debris removal.'
        ),

        e(CompactTable, {
          headers: ['Requirement', 'Standard', 'Enforcement'],
          rows: [
            ['Work Hours', 'Mon-Sat 7 AM-6 PM', 'Community complaints'],
            ['Site Cleanup', 'Daily debris removal', 'Weekly inspections'],
            ['Road Protection', 'No damage to pavement', 'Repair at owner cost'],
            ['Noise Control', 'Reasonable levels only', 'Neighbor complaints'],
            ['Parking', 'On-property only', 'Towing if necessary'],
            ['Porta-Potty', 'Required for major work', 'Health requirements']
          ]
        }),

        e(CompactSubsectionHeader, null, 'ENVIRONMENTAL COMPLIANCE'),
        
        e(DenseText, null,
          'Blue Mountain\'s mountain environment requires special protection during construction. Projects must minimize tree removal, prevent erosion, and protect water quality. Environmental violations may result in work stoppage and remediation requirements.'
        ),

        e(View, { style: constructionStyles.environmentBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: '#1976D2' } }, 
            '🌲 ENVIRONMENTAL REQUIREMENTS'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Install silt fencing before ground disturbance • Protect mature trees during construction • Minimize impervious surfaces • Use native plants for landscaping • Restore all disturbed areas • Follow DEQ stormwater regulations'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 39) + 1)
      )
    )
  ];
}