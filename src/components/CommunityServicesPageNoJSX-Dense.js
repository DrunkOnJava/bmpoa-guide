import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { largeProportionalImage, mediumProportionalImage, captionStyle } from '../imageStyles.js';
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

export default function CommunityServicesPageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const servicesStyles = StyleSheet.create({
    sectionTitle: {
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
    sectionDescription: {
      fontSize: typography.sizes.base,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: typography.lineHeights.relaxed,
      fontStyle: 'italic',
      color: colors.white,
      opacity: 0.9,
  },
    serviceBox: {
      backgroundColor: colors.lightGray,
      padding: 6,
      marginBottom: 6,
      borderLeftWidth: 3,
      borderLeftColor: colors.mustard,
      borderRadius: 2,
  },
    winterTip: {
      backgroundColor: '#E3F2FD',
      borderLeftWidth: 4,
      borderLeftColor: '#2196F3',
      padding: 6,
      marginVertical: 6,
      borderRadius: 2,
  },
    bearWarning: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 2,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
  },
    bearIcon: {
      fontSize: typography.sizes.large,
      marginRight: 8,
  },
    utilityIcon: {
      width: 16,
      height: 16,
      marginRight: 4,
  },
    compactMap: {
      width: '100%',
      height: 120,
      marginVertical: 6,
      borderRadius: callout.radius,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
  },
    travelTimeBox: {
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#0EA5E9',
      borderRadius: callout.radius,
      padding: 6,
      marginTop: layout.spacing.sm,
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Roads', value: 'Private' },
        { label: 'Miles', value: '~20' },
        { label: 'Snow Plow', value: '4"' },
        { label: 'Gravel', value: 'No Salt' }
      ]
  }),
    e(InfoBox, { title: '🛠️ Report Issues' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 'bmpoaroads@gmail.com'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'Include location & photos'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginTop: layout.spacing.xs, fontWeight: typography.weights.bold } }, 'Emergency:'),
      e(Text, { style: { fontSize: typography.sizes.sm } }, 'Contact Board member')
    ),
    e(InfoBox, { title: '❄️ Winter Tips' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Keep tire chains'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Use gravel barrels'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• 4WD recommended'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• NO SALT on roads')
      )
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(InfoBox, { title: '📋 DISPOSAL GUIDELINES' },
      e(View, { style: { flexDirection: 'row', gap: 8 } },
        e(View, { style: { flex: 1 } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 1 } }, 'Accepted:'),
          e(Text, { style: { fontSize: typography.sizes.tiny, marginBottom: 0.5 } }, '• Household trash'),
          e(Text, { style: { fontSize: typography.sizes.tiny, marginBottom: 0.5 } }, '• Recyclables'),
          e(Text, { style: { fontSize: typography.sizes.tiny } }, '• Yard waste')
        ),
        e(View, { style: { flex: 1 } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 1 } }, 'Special:'),
          e(Text, { style: { fontSize: typography.sizes.tiny, marginBottom: 0.5 } }, '• Electronics (fee)'),
          e(Text, { style: { fontSize: typography.sizes.tiny, marginBottom: 0.5 } }, '• Tires (limit 4)'),
          e(Text, { style: { fontSize: typography.sizes.tiny } }, '• Appliances')
        )
      )
    ),
    e(InfoBox, { title: '🚗 Travel Times from Lodge' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, 'Linden: 15 min'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, 'Cooley: 25 min'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, 'Rockledge: 30 min'),
        e(Text, { style: { fontSize: typography.sizes.tiny, fontStyle: 'italic', marginTop: 2 } }, 'Plan trips with shopping')
      )
    ),
    e(ForestGreenTable, {
      headers: ['Site', 'Miles'],
      rows: [
        ['Linden', '6.2'],
        ['Cooley', '10.5'],
        ['Rockledge', '12.8'],
        ['S. Farms', '13.1'],
        ['Bentonville*', '15.7']
      ]
  }),
    e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', marginTop: -4 } }, 
      '*Accepts large items'
    ),
    e(InfoBox, { title: '🐻 Bear Alert' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.dangerDark, marginBottom: 3 } }, 
        'SECURE ALL TRASH!'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
        'Use bear-resistant containers. Never leave trash out overnight. Bears are active Mar-Nov.'
      )
    )
  ];

  // Sidebar content for page 3
  const page3Sidebar = [
    e(ForestGreenTable, {
      headers: ['Utility', 'Provider'],
      rows: [
        ['Electric', 'Rappahannock'],
        ['Propane', 'Multiple'],
        ['Internet', 'Limited'],
        ['Water', 'Private wells'],
        ['Septic', 'Individual'],
        ['Trash', 'Self-haul']
      ]
  }),
    e(InfoBox, { title: '📱 Connectivity' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Cell Service:'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Verizon: Good'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• AT&T: Fair'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Others: Poor'),
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Internet:'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Satellite best'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• No cable/fiber')
      )
    )
  ];

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '05',
      title: 'COMMUNITY SERVICES\n& AMENITIES',
      description: 'Essential services, utilities, and infrastructure that support mountain living',
      backgroundColor: colors.forestGreen,
      backgroundImage: assetMap.VineyardGreen
  }),
    
    // Page 1: Roads & Winter Weather (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'ROADS & WINTER WEATHER'),
        
        e(DenseText, null,
          "Blue Mountain's road network presents unique challenges, particularly during winter weather. Understanding maintenance procedures helps you navigate safely year-round."
        ),
        
        e(CompactSubsectionHeader, null, 'ROAD MAINTENANCE'),
        e(DenseText, null,
          'BMPOA maintains all private roads within the community except Fire Trail Road (contact VDGIF) and state roads (VDOT maintained). Regular maintenance includes grading, pothole repair, drainage work, and vegetation control.'
        ),
        
        e(CompactSubsectionHeader, null, 'WINTER OPERATIONS'),
        e(InlineInfo, {
          items: [
            { label: 'Plow trigger', value: '4" snow' },
            { label: 'Priority', value: 'Main roads first' }
          ]
      }),
        
        e(TwoColumnList, {
          items: [
            'Snow removal services',
            'Gravel chip barrels on hills',
            'Steep sections priority',
            'No salt use (damages roads)',
            'Patience during storms',
            'Check road conditions first'
          ]
      }),
        
        e(View, { style: servicesStyles.winterTip },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.infoDark } }, 
            '❄️ WINTER PREPARATION'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Keep tire chains, snow shovel, and emergency supplies. Practice chain installation before winter. Cable chains easier than traditional. 4WD/AWD strongly recommended.'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'TRACTION ASSISTANCE'),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'Gravel Chip Barrels'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Blue poly barrels placed on steep hills contain crushed gravel for traction. Free for resident use. Report empty barrels to Roads Committee.'
          )
        ),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'Problem Reporting'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Report potholes, drainage issues, fallen trees, or road damage to bmpoaroads@gmail.com. Include specific location and photos if possible.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '22'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Refuse Collection (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'REFUSE COLLECTION & DISPOSAL'),
        
        // Compact Bear Warning
        e(View, { style: { ...servicesStyles.bearWarning, padding: 6, marginVertical: 6 } },
          e(Text, { style: { ...servicesStyles.bearIcon, fontSize: typography.sizes.toc, marginRight: 6 } }, '🐻'),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.dangerDark } }, 
              'BEAR COUNTRY WARNING: Improperly stored trash attracts bears!'
            )
          )
        ),
        
        // Compact convenience sites with inline format
        e(View, { style: { backgroundColor: '#f5f5f5', padding: 6, borderRadius: 3, marginBottom: layout.spacing.xs } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 3 } }, 'CONVENIENCE SITES'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            '• Linden (2664 Dismal Hollow)\n• Cooley (10037 Winchester)\n• Rockledge (9823 S. Jackson)\n• Shenandoah Farms (47 Blue Mt)'
          ),
          e(Text, { style: { fontSize: typography.sizes.tiny, fontWeight: typography.weights.bold, marginTop: 3 } }, 'Hours: Tu-Sa 7AM-7PM, Sun 9AM-5PM')
        ),
        e(Text, { style: { fontSize: typography.sizes.tiny, fontStyle: 'italic', marginTop: 2, marginBottom: layout.spacing.sm } }, 
          'All sites closed Mondays and holidays. Bentonville site accepts large/bulky items.'
        ),
        
        // Warren County Map - Proportionally scaled, no borders
        e(Image, { 
          src: assetMap.warrencountywastemap || assetMap['warren-county-waste-map'], 
          style: {
            width: 344,  // Scaled to ~17.5% of original 1968
            height: 327, // Scaled to ~17.5% of original 1872
            alignSelf: 'center',
            marginVertical: 8
        }
      }),
        
        e(Text, { style: { 
          fontSize: typography.sizes.sm, 
          fontStyle: 'italic', 
          textAlign: 'center', 
          marginBottom: 10,
          color: colors.darkCharcoal 
      } }, 
          'Warren County waste disposal sites - Linden location is closest to BMPOA'
        ),
        
        // Private services and best practices below map
        e(View, { style: { flexDirection: 'row', gap: 10, marginTop: 6 } },
          e(View, { style: { flex: 1, backgroundColor: '#f0f8f0', padding: layout.spacing.sm, borderRadius: callout.radius, borderWidth: 0.5, borderColor: colors.forestGreen } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: layout.spacing.xs } }, 'PRIVATE SERVICES'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Freedom Disposal: (540) 631-3467'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Skyline Trash: (540) 974-9418')
          ),
          e(View, { style: { flex: 1, backgroundColor: '#fef9e7', padding: layout.spacing.sm, borderRadius: callout.radius, borderWidth: 0.5, borderColor: colors.mustard } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.mustard, marginBottom: layout.spacing.xs } }, 'BEST PRACTICES'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Bear-resistant containers'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Morning pickup only'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Clean containers regularly')
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '23'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 3: Utilities & Services (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page3Sidebar },
        e(CompactSectionHeader, null, 'UTILITIES & SERVICES'),
        
        e(CompactSubsectionHeader, null, 'ELECTRIC SERVICE'),
        e(DenseText, null,
          'Rappahannock Electric Cooperative (REC) provides power. Report outages: 800-552-3904. Mountain location means occasional weather-related outages; backup power recommended.'
        ),
        
        e(CompactSubsectionHeader, null, 'WATER & SEPTIC'),
        e(TwoColumnList, {
          items: [
            'Private wells (test annually)',
            'Individual septic systems',
            'Pump septic every 3-5 years',
            'Conserve during droughts',
            'Winterize pipes in vacant homes',
            'Know shutoff valve location'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'PROPANE SERVICE'),
        e(DenseText, null,
          'Multiple providers serve the area. Schedule deliveries early in fall. Keep tank access clear and marked for winter deliveries. Monitor usage during cold snaps.'
        ),
        
        e(CompactSubsectionHeader, null, 'COMMUNICATIONS'),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'Internet Options'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Satellite internet (HughesNet, Viasat, Starlink) most reliable. Limited DSL in some areas. No cable or fiber optic service available.'
          )
        ),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'Emergency Preparedness'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
            'Mountain living requires self-sufficiency. Keep emergency supplies: water, food, medications, flashlights, batteries, first aid, generator fuel.'
          )
        ),
        
        e(View, { style: { backgroundColor: colors.lightGray, padding: layout.spacing.sm, marginTop: layout.spacing.sm, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, fontStyle: 'italic', textAlign: 'center' } }, 
            'Mountain infrastructure differs from suburban areas. Plan ahead, maintain equipment, and keep emergency supplies on hand.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '24'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}