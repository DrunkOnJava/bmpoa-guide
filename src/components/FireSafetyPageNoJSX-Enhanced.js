import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  PageFooterNoJSX, 
  SectionBannerNoJSX,
  CalloutBoxNoJSX,
  TwoColumnLayoutNoJSX,
  TableNoJSX 
} from './DesignComponents.js';
import SectionDivider from './SectionDivider.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function FireSafetyPageNoJSXEnhanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const fireStyles = StyleSheet.create({
    orangeRibbon: {
      backgroundColor: colors.orange,
      padding: '4 12',
      marginTop: -spacing.sm,
      marginHorizontal: -54,
      height: 18,
  },
    ribbonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      textAlign: 'center',
  },
    riskBar: {
      flexDirection: 'row',
      marginVertical: spacing.md,
      borderRadius: callout.radius,
      overflow: 'hidden',
      width: 300, // Exactly 300px (≈4″ at 72 dpi)
      alignSelf: 'center',
  },
    riskLevel: {
      padding: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
  },
    riskLevelText: {
      fontSize: typography.caption,
      fontWeight: typography.weights.bold,
      color: colors.white,
  },
    riskLevelDesc: {
      fontSize: typography.sizes.sm,
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
    evacuationMapBox: {
      borderWidth: 2,
      borderColor: colors.orange,
      borderStyle: 'dashed',
      padding: spacing.xl,
      marginVertical: spacing.lg,
      alignItems: 'center',
      backgroundColor: colors.lightGray,
      opacity: 0.3,
  },
    mapPlaceholderText: {
      fontSize: typography.subtitle,
      color: colors.slateGray,
      fontStyle: 'italic',
  },
    legalNotice: {
      backgroundColor: '#FEFCE8', // Light yellow
      borderWidth: 0.5,
      borderColor: colors.slateGray, // Dark gray border
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    legalTitle: {
      fontSize: typography.sizes.base, // 12pt bold
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.dangerDark, // Red
      marginBottom: spacing.xs,
  },
    legalText: {
      fontSize: typography.caption, // 10pt
      fontStyle: 'italic',
      color: colors.brown, // Dark brown
      lineHeight: typography.lineHeightNormal,
  },
    zoneBox: {
      backgroundColor: colors.lightGray,
      padding: spacing.sm,
      marginBottom: spacing.xs,
      borderLeftWidth: 3,
      borderLeftColor: colors.forestGreen,
  },
    zoneTitle: {
      fontSize: typography.body,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: 2,
  },
    checklistBox: {
      borderWidth: 1,
      borderColor: colors.forestGreen,
      padding: spacing.md,
      marginVertical: spacing.md,
      backgroundColor: colors.white,
  },
    checklistHeader: {
      fontSize: typography.subtitle,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: spacing.sm,
      textAlign: 'center',
  },
    checklistRow: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
  },
    checkbox: {
      width: 10,
      height: 10,
      borderWidth: 1,
      borderColor: colors.slateGray,
      marginRight: spacing.sm,
      marginTop: 2,
  },
    checklistItem: {
      fontSize: typography.body,
      flex: 1,
      color: colors.darkCharcoal,
  },
    fireImage: {
      width: '100%',
      height: 180,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    imageCaption: {
      fontSize: typography.caption,
      fontStyle: 'italic',
      color: colors.warmGray,
      textAlign: 'center',
      marginBottom: spacing.md,
  }
});

  // Return array of pages
  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '04',
      title: 'FIRE SAFETY &\nEMERGENCY PREPAREDNESS',
      description: 'Protecting our mountain community from wildfire through awareness, preparation, and collective action'
  }),
    
    // Wildfire Risk Understanding Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      // Section Banner with Orange Ribbon
      e(
        View,
        null,
        e(SectionBannerNoJSX, {
          number: 'SECTION 4',
          title: 'FIRE SAFETY & EMERGENCY PREPAREDNESS',
      }),
        e(
          View,
          { style: fireStyles.orangeRibbon },
          e(Text, { style: fireStyles.ribbonText }, 'Wildfire Risk & Evacuation')
        )
      ),
      
      e(Text, { style: styles.h1 }, 'WILDFIRE RISK UNDERSTANDING'),
      
      e(TwoColumnLayoutNoJSX, {
        left: e(
          View,
          null,
          e(Text, { style: styles.paragraph },
            "Blue Mountain's wooded environment presents significant wildfire risks. Our location in a Wildland-Urban Interface (WUI) area means homes are interspersed with forests, increasing vulnerability."
          ),
          
          // Risk Level Infographic
          e(Text, { style: [styles.h2, { marginTop: spacing.md }] }, 'RISK LEVELS'),
          e(
            View,
            { style: fireStyles.riskBar },
            e(
              View,
              { style: [fireStyles.riskLevel, fireStyles.highRisk] },
              e(Text, { style: fireStyles.riskLevelText }, 'HIGH'),
              e(Text, { style: fireStyles.riskLevelDesc }, 'Immediate Action')
            ),
            e(
              View,
              { style: [fireStyles.riskLevel, fireStyles.moderateRisk] },
              e(Text, { style: fireStyles.riskLevelText }, 'MODERATE'),
              e(Text, { style: fireStyles.riskLevelDesc }, 'Plan & Prepare')
            ),
            e(
              View,
              { style: [fireStyles.riskLevel, fireStyles.lowRisk] },
              e(Text, { style: fireStyles.riskLevelText }, 'LOW'),
              e(Text, { style: fireStyles.riskLevelDesc }, 'Stay Vigilant')
            )
          ),
          
          e(Text, { style: styles.h2 }, 'FIRE SEASONS'),
          e(
            CalloutBoxNoJSX,
            { type: 'warning' },
            e(Text, { style: styles.bulletItem }, '• Spring: February 15 - April 30'),
            e(Text, { style: styles.bulletItem }, '• Fall: October 15 - November 30'),
            e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold }] }, 
              '• Summer droughts can extend risk periods'
            )
          ),
          
          // Debris fire image
          assetMap.debrisfire && e(
            View,
            { style: { marginTop: spacing.md } },
            e(Image, { 
              src: assetMap.debrisfire, 
              style: fireStyles.fireImage 
          }),
            e(Text, { style: fireStyles.imageCaption }, 
              'Debris fires can quickly spread in dry conditions'
            )
          )
        ),
        right: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'HIGH RISK AREAS'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Steep slopes with dense vegetation'),
            e(Text, { style: styles.bulletItem }, '• Properties lacking defensible space'),
            e(Text, { style: styles.bulletItem }, '• Homes with wooden decks/roofs'),
            e(Text, { style: styles.bulletItem }, '• Areas with accumulated debris')
          ),
          
          e(Text, { style: [styles.h2, { marginTop: spacing.md }] }, 'MODERATE RISK AREAS'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Partial defensible space maintained'),
            e(Text, { style: styles.bulletItem }, '• Some vegetation management'),
            e(Text, { style: styles.bulletItem }, '• Mixed fire-resistant features')
          ),
          
          e(Text, { style: [styles.h2, { marginTop: spacing.md }] }, 'LOWER RISK AREAS'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• 30+ feet defensible space'),
            e(Text, { style: styles.bulletItem }, '• Fire-resistant landscaping'),
            e(Text, { style: styles.bulletItem }, '• Fire-resistant construction')
          ),
          
          // 4 PM Burning Law Box
          e(
            View,
            { style: fireStyles.legalNotice },
            e(Text, { style: fireStyles.legalTitle }, '🚨 4 PM BURNING LAW'),
            e(Text, { style: fireStyles.legalText }, 
              'Open burning is forbidden at all times within BMPOA. Warren County Code § 974.3575 prohibits burning within 300 ft of woods before 4 PM. BMPOA prohibits ALL open burning.'
            ),
            e(Text, { style: [fireStyles.legalText, { marginTop: spacing.xs, fontWeight: typography.weights.bold }] }, 
              'Violations: Class 3 misdemeanor, fines up to $500 plus suppression costs.'
            )
          )
        )
    }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 15 })
    ),

    // Evacuation Zones Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      e(Text, { style: styles.h1 }, 'EVACUATION ZONES & ROUTES'),
      
      // Evacuation Map Placeholder
      e(
        View,
        { style: fireStyles.evacuationMapBox },
        e(Text, { style: fireStyles.mapPlaceholderText }, 'EVACUATION MAP'),
        e(Text, { style: [fireStyles.mapPlaceholderText, { fontSize: typography.sizes.sm }] }, 
          'Detailed zone map showing primary and secondary routes'
        )
      ),
      
      e(Text, { style: styles.paragraph },
        'Blue Mountain has three evacuation zones to ensure orderly evacuation. Know your zone and routes.'
      ),
      
      e(TwoColumnLayoutNoJSX, {
        left: e(
          View,
          null,
          e(
            View,
            { style: fireStyles.zoneBox },
            e(Text, { style: fireStyles.zoneTitle }, 'ZONE 1 (Northern Area)'),
            e(View, { style: { paddingLeft: spacing.sm } },
              e(Text, { style: styles.bulletItem }, '• Far View, Shady Tree, Black Walnut'),
              e(Text, { style: styles.bulletItem }, '• Blue Mountain Rd, Dogwood Blossom'),
              e(Text, { style: styles.bulletItem }, '• Little Indian, Lonesome Pine'),
              e(Text, { style: styles.bulletItem }, '• Hawk Hill, Lost Creek'),
              e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold }] }, 
                'Route: To Blue Mt Rd, then as directed'
              )
            )
          ),
          
          e(
            View,
            { style: [fireStyles.zoneBox, { marginTop: spacing.md }] },
            e(Text, { style: fireStyles.zoneTitle }, 'ZONE 2 (Central Area)'),
            e(View, { style: { paddingLeft: spacing.sm } },
              e(Text, { style: styles.bulletItem }, '• Blood Root, Fern Trail, Jasper'),
              e(Text, { style: styles.bulletItem }, '• Mockingbird, Spring Hill'),
              e(Text, { style: styles.bulletItem }, '• Pee Wee, Rocky Boulder'),
              e(Text, { style: styles.bulletItem }, '• Indian Pipes, Paradise'),
              e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold }] }, 
                'Route: Via Fire Trail to Freezeland'
              )
            )
          )
        ),
        right: e(
          View,
          null,
          e(
            View,
            { style: fireStyles.zoneBox },
            e(Text, { style: fireStyles.zoneTitle }, 'ZONE 3 (Southern Area)'),
            e(View, { style: { paddingLeft: spacing.sm } },
              e(Text, { style: styles.bulletItem }, '• Blue Mountain Rd (upper)'),
              e(Text, { style: styles.bulletItem }, '• Chipmunk Trail, Cliff'),
              e(Text, { style: styles.bulletItem }, '• Henry, Old Dominion'),
              e(Text, { style: styles.bulletItem }, '• Trillium Trail'),
              e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold }] }, 
                'Route: Uphill to Freezeland'
              )
            )
          ),
          
          e(
            CalloutBoxNoJSX,
            { title: 'EVACUATION TIPS', type: 'tip' },
            e(Text, { style: styles.bulletItem }, '• Keep gas tanks at least half full'),
            e(Text, { style: styles.bulletItem }, '• Face vehicle toward exit when parking'),
            e(Text, { style: styles.bulletItem }, '• Have go-bag ready by door'),
            e(Text, { style: styles.bulletItem }, '• Know alternate routes'),
            e(Text, { style: styles.bulletItem }, '• Help neighbors who need assistance')
          )
        )
    }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 16 })
    ),

    // Family Emergency Planning Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      e(Text, { style: styles.h1 }, 'FAMILY EMERGENCY PLANNING'),
      
      // Family Evacuation Plan Checklist Table - Reduced spacing
      e(
        View,
        { style: [fireStyles.checklistBox, { marginVertical: spacing.sm, padding: spacing.sm }] },
        e(Text, { style: [fireStyles.checklistHeader, { marginBottom: spacing.xs }] }, 'FAMILY EVACUATION PLAN CHECKLIST'),
        e(TableNoJSX, {
          headers: [],
          rows: [
            ['□', 'Identify two escape routes from each room'],
            ['□', 'Choose multiple evacuation routes from neighborhood'],
            ['□', 'Establish meeting places (near home & outside area)'],
            ['□', 'Designate out-of-area contact person'],
            ['□', 'Plan for pets and livestock evacuation'],
            ['□', 'Prepare emergency supply kit'],
            ['□', 'Create home inventory with photos'],
            ['□', 'Identify special needs family members'],
            ['□', 'Practice evacuation plan twice yearly'],
            ['□', 'Post emergency numbers by all phones']
          ],
          columnWidths: [18, 482], // 0.25" for checkbox column
          compact: true
      })
      ),
      
      e(TwoColumnLayoutNoJSX, {
        gutter: 21.6,
        left: e(
          View,
          null,
          e(Text, { style: [styles.h2, { marginTop: spacing.xs }] }, 'EMERGENCY SUPPLY KIT'),
          e(View, { style: [styles.bulletList, { marginTop: spacing.xs }] },
            e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold, marginBottom: 2 }] }, 'Water & Food:'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ 1 gallon/person/day (3 days)'),
            e(Text, { style: [styles.bulletItem, { marginBottom: spacing.xs }] }, '✓ Non-perishable food (3 days)'),
            e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold, marginBottom: 2 }] }, 'Safety Equipment:'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ Battery/hand-crank radio'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ Flashlight & extra batteries'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ First aid kit'),
            e(Text, { style: [styles.bulletItem, { marginBottom: spacing.xs }] }, '✓ N95 masks for smoke'),
            e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold, marginBottom: 2 }] }, 'Personal Items:'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ Prescription medications'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ Important documents'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ Cash & credit cards'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '✓ Change of clothing')
          ),
          
          // Move STAY INFORMED to left column
          e(
            CalloutBoxNoJSX,
            { title: 'STAY INFORMED', type: 'info' },
            e(View, { style: { flexDirection: 'row', flexWrap: 'wrap' } },
              e(Text, { style: [styles.bulletItem, { width: '50%' }] }, '• Smart911.com'),
              e(Text, { style: [styles.bulletItem, { width: '50%' }] }, '• Warren County Alerts'),
              e(Text, { style: [styles.bulletItem, { width: '50%' }] }, '• NOAA Weather Radio'),
              e(Text, { style: [styles.bulletItem, { width: '50%' }] }, '• BMPOA Facebook')
            )
          )
        ),
        right: e(
          View,
          null,
          e(Text, { style: [styles.h2, { marginTop: spacing.xs }] }, 'DEFENSIBLE SPACE'),
          e(
            CalloutBoxNoJSX,
            { type: 'warning' },
            e(Text, { style: { fontWeight: typography.weights.bold, marginBottom: 2 } }, 
              'Zone 1: 0-30 feet'
            ),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '• Remove all dead vegetation'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '• Keep grass mowed short'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '• Prune trees 6-10 ft up'),
            e(Text, { style: [styles.bulletItem, { marginBottom: spacing.xs }] }, '• Space tree crowns 10 ft apart'),
            e(Text, { style: { fontWeight: typography.weights.bold, marginTop: spacing.xs, marginBottom: 2 } }, 
              'Zone 2: 30-100 feet'
            ),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '• Reduce vegetation density'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '• Remove ladder fuels'),
            e(Text, { style: [styles.bulletItem, { marginBottom: 2 }] }, '• Create fuel breaks'),
            e(Text, { style: styles.bulletItem }, '• Keep firewood 30+ ft away')
          ),
          
          e(Text, { style: [styles.h2, { marginTop: spacing.md }] }, 'EMERGENCY CONTACTS'),
          e(
            CalloutBoxNoJSX,
            { type: 'warning' },
            e(Text, { style: [styles.bulletItem, { fontWeight: typography.weights.bold }] }, 'Emergency: 911'),
            e(Text, { style: styles.bulletItem }, 'Warren County Sheriff: 540-635-7100'),
            e(Text, { style: styles.bulletItem }, 'Fire & Rescue: 540-636-3830'),
            e(Text, { style: styles.bulletItem }, 'BMPOA Emergency: 540-635-3589')
          )
        )
    }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 17 })
    )
  ];
}