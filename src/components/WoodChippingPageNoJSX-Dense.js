import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  ForestGreenTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  TwoColumnList 
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

export default function WoodChippingPageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const woodStyles = StyleSheet.create({
    alertBox: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 1,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: 6,
      marginBottom: layout.spacing.sm,
  },
    alertTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.dangerDark,
      marginBottom: layout.spacing.xs,
  },
    checklistBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 0.5,
      borderColor: colors.slateGray,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
  },
    checklistItem: {
      fontSize: typography.sizes.sm,
      marginBottom: 3,
      paddingLeft: 14,
      position: 'relative',
  },
    checkbox: {
      position: 'absolute',
      left: 0,
      top: 0,
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Program', value: 'Free annually' },
        { label: 'When', value: 'Early spring' },
        { label: 'Duration', value: '1 week' },
        { label: 'Partner', value: 'VA Forestry' }
      ]
  }),
    e(InfoBox, { title: '📞 Contact' },
      e(Text, { style: { fontSize: typography.sizes.sm } }, 'Jim Cook'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'jcook0313@gmail.com'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginTop: layout.spacing.xs, fontStyle: 'italic' } }, 
        'Contact for delivery requests or questions'
      )
    ),
    e(InfoBox, { title: '🔥 Fire Facts' },
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, 
        '• Blue Mountain is a Wildland-Urban Interface'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, 
        '• Defensible space reduces fire risk by 80%'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm } }, 
        '• Dead branches are primary fuel source'
      )
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(ForestGreenTable, {
      headers: ['Schedule', 'Date'],
      rows: [
        ['Collection starts', 'March 15-30'],
        ['Chipping week', 'April 1-7'],
        ['Chip delivery', 'April 8-15'],
        ['Final cleanup', 'April 16-20']
      ]
  }),
    e(InfoBox, { title: '⚠️ Not Accepted' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Lumber/treated wood'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Root balls with dirt'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Stumps > 8" diameter'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Grass/leaves'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• Any trash')
      )
    ),
    e(InfoBox, { title: '💡 Pro Tips' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic' } }, 
        'Start collecting brush year-round. Mark pile location with reflector. Focus on dead branches first.'
      )
    )
  ];

  // Sidebar content for page 3
  const page3Sidebar = [
    e(QuickFactsBox, {
      facts: [
        { label: 'Pickup 1', value: 'Lodge parking' },
        { label: 'Pickup 2', value: 'Dam at lake' },
        { label: 'Delivery', value: 'Free on request' },
        { label: 'Uses', value: 'Mulch, paths' }
      ]
  }),
    e(InfoBox, { title: '🌱 Garden Tip' },
      e(Text, { style: { fontSize: typography.sizes.sm } }, 
        'Fresh chips tie up nitrogen. Age 3-6 months for gardens or add nitrogen fertilizer. Keep away from stems.'
      )
    ),
    e(ForestGreenTable, {
      headers: ['Use', 'Fresh OK?'],
      rows: [
        ['Paths', '✓'],
        ['Mulch', '✓'],
        ['Slopes', '✓'],
        ['Gardens', '✗'],
        ['Compost', '✓*']
      ]
  })
  ];

  return [
    // Page 1: Annual Chipping & Fire Mitigation (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'ANNUAL CHIPPING & FIRE MITIGATION'),
        
        e(CompactSubsectionHeader, null, 'FREE ANNUAL WOOD CHIPPING'),
        e(DenseText, null,
          'All property owners within the BMPOA Sanitary District are eligible for free wood chipping annually. This valuable service helps reduce fire hazards around homes while providing a convenient way to dispose of woody debris.'
        ),
        
        e(View, { style: { backgroundColor: colors.backgroundAlt, padding: 6, marginBottom: layout.spacing.sm, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: 3 } }, 
            '🔥 FIRE PREVENTION BENEFIT'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Removing dead branches, brush, and small trees creates defensible space—one of the most effective wildfire protection strategies. Participation helps reduce risk for the entire mountain community.'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'PARTNERSHIP WITH VIRGINIA FORESTRY'),
        e(DenseText, null,
          'The program is conducted with the Virginia Department of Forestry as part of wildfire prevention efforts in our Wildland-Urban Interface area.'
        ),
        
        e(TwoColumnList, {
          items: [
            'Professional equipment & expertise',
            'Cost-sharing for sustainability',
            'Educational resources on defensible space',
            'Follow-up assessments & recommendations'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'PREPARING YOUR BRUSH PILE'),
        e(DenseText, null,
          'Proper preparation ensures efficient chipping. Follow guidelines for successful processing:'
        ),
        
        e(View, { style: woodStyles.checklistBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
            '✓ BRUSH PILE CHECKLIST'
          ),
          e(View, null,
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'Place within 5 feet of roadside')
            ),
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'Cut ends facing road')
            ),
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'Keep pile under 4 feet high')
            ),
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'Nothing over 8" diameter')
            ),
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'Branches 12 feet max')
            ),
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'No wire, nails, or rope')
            ),
            e(View, { style: woodStyles.checklistItem },
              e(Text, { style: woodStyles.checkbox }, '☐'),
              e(Text, null, 'Separate vines/thorns')
            )
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '12'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Wood Chip Access & Delivery (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page3Sidebar },
        e(CompactSectionHeader, null, 'WOOD CHIP ACCESS & DELIVERY'),
        
        e(CompactSubsectionHeader, null, 'WOOD CHIP AVAILABILITY'),
        e(DenseText, null,
          'Wood chips generated from the program are available to Blue Mountain residents at no charge. These chips are valuable for landscaping, erosion control, path creation, weed suppression, and composting.'
        ),
        
        e(CompactSubsectionHeader, null, 'DIRECT DELIVERY OPTIONS'),
        e(DenseText, null,
          'Surplus chips are available for free delivery during the chipping process. When crews process your pile, request they leave the chips rather than hauling away.'
        ),
        
        e(CompactSubsectionHeader, null, 'COMMUNITY ACCESS POINTS'),
        e(DenseText, null,
          'Wood chips are available at communal stockpile locations:'
        ),
        
        e(ForestGreenTable, {
          headers: ['Location', 'Details'],
          rows: [
            ['Lodge Parking', '540 Cliff Road, near main building'],
            ['Dam Parking', 'Deer Lake dam area, marked pile']
          ]
      }),
        
        e(View, { style: { marginTop: layout.spacing.sm, padding: layout.spacing.sm, backgroundColor: colors.lightGray, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center', fontStyle: 'italic' } }, 
            'Map showing pickup locations available at Lodge'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'YEAR-ROUND PREPARATION'),
        e(DenseText, null,
          'Start collecting brush throughout the year for easier management. This spreads workload, allows prompt hazard removal, improves defensible space continuously, and reduces storm damage risk.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '13'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}