import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { largeProportionalImage, captionStyle } from '../imageStyles.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  ForestGreenTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  TwoColumnList,
  InlineInfo,
  EmergencyBox
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function FireSafetyPageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const fireStyles = StyleSheet.create({
    riskBar: {
      flexDirection: 'row',
      marginVertical: 6,
      borderRadius: callout.radius,
      overflow: 'hidden',
      width: 200,
      alignSelf: 'center',
      height: 32,
  },
    riskLevel: {
      padding: layout.spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
  },
    riskLevelText: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.white,
  },
    riskLevelDesc: {
      fontSize: typography.sizes.tiny,
      color: colors.white,
      opacity: 0.9,
  },
    highRisk: {
      backgroundColor: '#DC143C',
  },
    moderateRisk: {
      backgroundColor: colors.orange,
  },
    lowRisk: {
      backgroundColor: '#228B22',
  },
    legalNotice: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 1,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: 6,
      marginTop: layout.spacing.sm,
  },
    fireImage: {
      width: '100%',
      height: 100,
      marginVertical: 4,
      borderRadius: callout.radius,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
  },
    evacuationMap: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 2,
      borderColor: colors.orange,
      borderStyle: 'dashed',
      padding: layout.spacing.xl,
      marginVertical: 8,
      alignItems: 'center',
      borderRadius: callout.radius,
  },
    zoneBox: {
      backgroundColor: colors.lightGray,
      padding: 6,
      marginBottom: 6,
      borderLeftWidth: 3,
      borderLeftColor: colors.forestGreen,
      borderRadius: 2,
  },
    checklistBox: {
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginVertical: 8,
  },
    checklistItem: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'flex-start',
  },
    checkbox: {
      width: 8,
      height: 8,
      borderWidth: 1,
      borderColor: colors.slateGray,
      marginRight: 6,
      marginTop: 1,
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Risk Level', value: 'HIGH' },
        { label: 'Interface', value: 'WUI Area' },
        { label: 'Fire Season', value: 'Feb-Apr' },
        { label: 'Fall Season', value: 'Oct-Nov' }
      ]
  }),
    e(InfoBox, { title: '🚨 4PM LAW' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.dangerDark, marginBottom: 2 } }, 
        'NO OPEN BURNING'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
        'Warren County prohibits burning within 300ft of woods before 4PM. BMPOA prohibits ALL open burning.\n\nViolations: $500 fine + costs'
      )
    ),
    e(EmergencyBox, null,
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 3 } }, 
        'EMERGENCY CONTACTS'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '911 - Emergency'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '540-635-7100 - Sheriff'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '540-636-3830 - Fire'),
      e(Text, { style: { fontSize: typography.sizes.sm } }, '540-635-3589 - BMPOA')
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(ForestGreenTable, {
      headers: ['Zone', 'Areas'],
      rows: [
        ['1', 'Far View, Shady Tree\nBlue Mt Rd, Dogwood'],
        ['2', 'Blood Root, Fern Trail\nMockingbird, Spring Hill'],
        ['3', 'Blue Mt Rd (upper)\nChipmunk, Cliff, Henry']
      ]
  }),
    e(InfoBox, { title: '🚗 Evacuation Tips' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Keep gas ≥ half full'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Park facing exit'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Go-bag ready'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Know alt routes'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• Help neighbors')
      )
    ),
    e(InfoBox, { title: '📱 Stay Informed' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Smart911.com'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Warren Alerts'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• NOAA Radio'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• BMPOA Facebook')
      )
    )
  ];

  // Sidebar content for page 3
  const page3Sidebar = [
    e(InfoBox, { title: '🛡️ Defensible Space' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Zone 1: 0-30ft'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Remove dead plants'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Mow grass short'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Prune trees 6-10ft'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: layout.spacing.xs } }, '• Space crowns 10ft'),
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Zone 2: 30-100ft'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Reduce density'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Remove ladders'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Create fuel breaks'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• Firewood 30ft+')
      )
    ),
    e(ForestGreenTable, {
      headers: ['Item', 'Qty'],
      rows: [
        ['Water', '1gal/person/day'],
        ['Food', '3-day supply'],
        ['Radio', 'Battery/crank'],
        ['First Aid', 'Full kit'],
        ['N95 Masks', 'For smoke'],
        ['Meds', 'All Rx'],
        ['Docs', 'Copies'],
        ['Cash', 'Small bills']
      ]
  })
  ];

  return [
    // Page 1: Wildfire Risk Understanding (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'WILDFIRE RISK UNDERSTANDING'),
        
        e(DenseText, null,
          "Blue Mountain's wooded environment presents significant wildfire risks. Our location in a Wildland-Urban Interface (WUI) area means homes are interspersed with forests, increasing vulnerability."
        ),
        
        // Risk Level Bar
        e(View, { style: { alignItems: 'center', marginVertical: 8 } },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 'RISK LEVELS'),
          e(
            View,
            { style: fireStyles.riskBar },
            e(
              View,
              { style: [fireStyles.riskLevel, fireStyles.highRisk] },
              e(Text, { style: fireStyles.riskLevelText }, 'HIGH'),
              e(Text, { style: fireStyles.riskLevelDesc }, 'Act Now')
            ),
            e(
              View,
              { style: [fireStyles.riskLevel, fireStyles.moderateRisk] },
              e(Text, { style: fireStyles.riskLevelText }, 'MODERATE'),
              e(Text, { style: fireStyles.riskLevelDesc }, 'Prepare')
            ),
            e(
              View,
              { style: [fireStyles.riskLevel, fireStyles.lowRisk] },
              e(Text, { style: fireStyles.riskLevelText }, 'LOW'),
              e(Text, { style: fireStyles.riskLevelDesc }, 'Vigilant')
            )
          )
        ),
        
        e(CompactSubsectionHeader, null, 'HIGH RISK AREAS'),
        e(TwoColumnList, {
          items: [
            'Steep slopes with dense vegetation',
            'Properties lacking defensible space',
            'Homes with wooden decks/roofs',
            'Areas with accumulated debris',
            'Single-access roads',
            'Dense understory growth'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'FIRE SEASONS'),
        e(InlineInfo, {
          items: [
            { label: 'Spring', value: 'Feb 15 - Apr 30' },
            { label: 'Fall', value: 'Oct 15 - Nov 30' }
          ]
      }),
        e(DenseText, { style: { fontWeight: typography.weights.bold, color: colors.orange } },
          'Summer droughts can extend risk periods significantly'
        ),
        
        // Debris fire image - now larger and proportional
        assetMap.debrisfire && e(
          View,
          { style: { marginVertical: 12 } },
          e(Image, { 
            src: assetMap.debrisfire, 
            style: largeProportionalImage 
        }),
          e(Text, { style: captionStyle }, 
            'Debris fires can quickly spread in dry conditions'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'RISK REDUCTION'),
        e(TwoColumnList, {
          items: [
            'Maintain 30ft defensible space',
            'Remove dead vegetation regularly',
            'Install fire-resistant roofing',
            'Clear gutters of debris',
            'Trim trees away from structures',
            'Store firewood 30ft from home'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '15'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Evacuation Zones & Routes (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'EVACUATION ZONES & ROUTES'),
        
        e(DenseText, null,
          'Blue Mountain has three evacuation zones to ensure orderly evacuation. Know your zone and routes. Practice evacuation plans twice yearly.'
        ),
        
        // Evacuation Map Placeholder
        e(
          View,
          { style: fireStyles.evacuationMap },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.slateGray } }, 
            'EVACUATION MAP'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, color: colors.slateGray, fontStyle: 'italic' } }, 
            'Detailed zone map with primary/secondary routes'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'ZONE DETAILS'),
        
        e(View, { style: fireStyles.zoneBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'ZONE 1 (Northern) → Blue Mt Rd Exit'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Far View, Shady Tree, Black Walnut, Blue Mountain Rd, Dogwood Blossom, Little Indian, Lonesome Pine, Hawk Hill, Lost Creek'
          )
        ),
        
        e(View, { style: fireStyles.zoneBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'ZONE 2 (Central) → Fire Trail to Freezeland'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Blood Root, Fern Trail, Jasper, Mockingbird, Spring Hill, Pee Wee, Rocky Boulder, Indian Pipes, Paradise'
          )
        ),
        
        e(View, { style: fireStyles.zoneBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'ZONE 3 (Southern) → Uphill to Freezeland'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Blue Mountain Rd (upper), Chipmunk Trail, Cliff, Henry, Old Dominion, Trillium Trail'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'EVACUATION PROCEDURES'),
        e(TwoColumnList, {
          items: [
            'Listen for evacuation orders',
            'Follow assigned zone routes',
            'Take go-bag and essentials',
            'Check on neighbors',
            'Do not return until cleared',
            'Register at evacuation center'
          ]
      }),
        
        e(View, { style: fireStyles.legalNotice },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.dangerDark } }, 
            '⚠️ Failure to evacuate when ordered is a Class 1 misdemeanor'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '16'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 3: Family Emergency Planning (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page3Sidebar },
        e(CompactSectionHeader, null, 'FAMILY EMERGENCY PLANNING'),
        
        // Family Plan Checklist
        e(View, { style: fireStyles.checklistBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: layout.spacing.xs, textAlign: 'center' } }, 
            'FAMILY EVACUATION PLAN CHECKLIST'
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Identify two escape routes from each room')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Choose multiple evacuation routes from neighborhood')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Establish meeting places (near home & outside area)')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Designate out-of-area contact person')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Plan for pets and livestock evacuation')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Prepare emergency supply kit')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Create home inventory with photos')
          ),
          e(View, { style: fireStyles.checklistItem },
            e(View, { style: fireStyles.checkbox }),
            e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Practice evacuation plan twice yearly')
          )
        ),
        
        e(CompactSubsectionHeader, null, 'EMERGENCY SUPPLY KIT ESSENTIALS'),
        
        e(View, { style: { flexDirection: 'row', gap: 12, marginBottom: layout.spacing.sm } },
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Water & Food'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• 1 gal/person/day (3 days)'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Non-perishable food'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Manual can opener')
          ),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Safety Equipment'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Battery/crank radio'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Flashlight & batteries'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• First aid kit')
          )
        ),
        
        e(View, { style: { flexDirection: 'row', gap: 12 } },
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Personal Items'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Prescription meds'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Important documents'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Cash & credit cards')
          ),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Protection'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• N95 masks for smoke'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Change of clothing'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Sturdy shoes')
          )
        ),
        
        e(View, { style: { backgroundColor: colors.lightGray, padding: layout.spacing.sm, marginTop: layout.spacing.sm, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, fontStyle: 'italic', textAlign: 'center' } }, 
            'Store supplies in easily accessible location. Review and update contents annually. Keep a smaller kit in your vehicle.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '17'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}