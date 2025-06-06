import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
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
      fontSize: 12,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.5,
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
      backgroundColor: '#FEE2E2',
      borderWidth: 2,
      borderColor: '#DC2626',
      borderRadius: 4,
      padding: 8,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bearIcon: {
      fontSize: 20,
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
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
    },
    travelTimeBox: {
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#0EA5E9',
      borderRadius: 4,
      padding: 6,
      marginTop: 8,
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
      e(Text, { style: { fontSize: 9, fontWeight: 'bold' } }, 'bmpoaroads@gmail.com'),
      e(Text, { style: { fontSize: 8, marginTop: 2 } }, 'Include location & photos'),
      e(Text, { style: { fontSize: 8, marginTop: 4, fontWeight: 'bold' } }, 'Emergency:'),
      e(Text, { style: { fontSize: 8 } }, 'Contact Board member')
    ),
    e(InfoBox, { title: '❄️ Winter Tips' },
      e(View, null,
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Keep tire chains'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Use gravel barrels'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• 4WD recommended'),
        e(Text, { style: { fontSize: 9 } }, '• NO SALT on roads')
      )
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(CompactTable, {
      headers: ['Site', 'Miles'],
      rows: [
        ['Linden', '6.2'],
        ['Cooley', '10.5'],
        ['Rockledge', '12.8'],
        ['S. Farms', '13.1'],
        ['Bentonville*', '15.7']
      ]
    }),
    e(Text, { style: { fontSize: 8, fontStyle: 'italic', marginTop: -4 } }, 
      '*Accepts large items'
    ),
    e(InfoBox, { title: '🐻 Bear Alert' },
      e(Text, { style: { fontSize: 9, fontWeight: 'bold', color: '#B91C1C', marginBottom: 3 } }, 
        'SECURE ALL TRASH!'
      ),
      e(Text, { style: { fontSize: 8, lineHeight: 1.3 } }, 
        'Use bear-resistant containers. Never leave trash out overnight. Bears are active Mar-Nov.'
      )
    ),
    e(InfoBox, { title: '♻️ Recycling' },
      e(View, null,
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Paper/cardboard'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Plastic #1-7'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Glass bottles'),
        e(Text, { style: { fontSize: 9 } }, '• Aluminum cans')
      )
    )
  ];

  // Sidebar content for page 3
  const page3Sidebar = [
    e(CompactTable, {
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
        e(Text, { style: { fontSize: 9, fontWeight: 'bold', marginBottom: 2 } }, 'Cell Service:'),
        e(Text, { style: { fontSize: 8, marginBottom: 1 } }, '• Verizon: Good'),
        e(Text, { style: { fontSize: 8, marginBottom: 1 } }, '• AT&T: Fair'),
        e(Text, { style: { fontSize: 8, marginBottom: 3 } }, '• Others: Poor'),
        e(Text, { style: { fontSize: 9, fontWeight: 'bold', marginBottom: 2 } }, 'Internet:'),
        e(Text, { style: { fontSize: 8, marginBottom: 1 } }, '• Satellite best'),
        e(Text, { style: { fontSize: 8 } }, '• No cable/fiber')
      )
    )
  ];

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '05',
      title: 'COMMUNITY SERVICES\n& AMENITIES',
      description: 'Essential services, utilities, and infrastructure that support mountain living',
      backgroundColor: colors.forestGreen
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
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: '#1976D2' } }, 
            '❄️ WINTER PREPARATION'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Keep tire chains, snow shovel, and emergency supplies. Practice chain installation before winter. Cable chains easier than traditional. 4WD/AWD strongly recommended.'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'TRACTION ASSISTANCE'),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: colors.forestGreen } }, 
            'Gravel Chip Barrels'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Blue poly barrels placed on steep hills contain crushed gravel for traction. Free for resident use. Report empty barrels to Roads Committee.'
          )
        ),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: colors.forestGreen } }, 
            'Problem Reporting'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
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
        
        // Bear Warning
        e(View, { style: servicesStyles.bearWarning },
          e(Text, { style: servicesStyles.bearIcon }, '🐻'),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: '#B91C1C' } }, 
              'BEAR COUNTRY WARNING'
            ),
            e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
              'Improperly stored trash attracts bears. Use bear-resistant containers.'
            )
          )
        ),
        
        e(CompactSubsectionHeader, null, 'CONVENIENCE SITES'),
        
        // Compact waste site table
        e(CompactTable, {
          headers: ['Location', 'Hours'],
          rows: [
            ['Linden (2664 Dismal Hollow)', 'Tu-Sa: 7AM-7PM\nSu: 9AM-5PM'],
            ['Cooley (10037 Winchester)', 'Tu-Sa: 7AM-7PM\nSu: 9AM-5PM'],
            ['Rockledge (9823 S. Jackson)', 'Tu-Sa: 7AM-7PM\nSu: 9AM-5PM'],
            ['Shenandoah Farms (47 Blue Mt)', 'Tu-Sa: 7AM-7PM\nSu: 9AM-5PM']
          ]
        }),
        e(Text, { style: { fontSize: 8, fontStyle: 'italic', marginTop: 4 } }, 
          'All sites closed Mondays and holidays. Bentonville site accepts large/bulky items.'
        ),
        
        // Warren County Map
        assetMap.warrencountywastemap && e(
          View,
          { style: { marginVertical: 6 } },
          e(Image, { 
            src: assetMap.warrencountywastemap, 
            style: servicesStyles.compactMap 
          }),
          e(Text, { style: { fontSize: 9, fontStyle: 'italic', textAlign: 'center' } }, 
            'Warren County disposal sites - Linden is closest to BMPOA'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'DISPOSAL GUIDELINES'),
        
        e(View, { style: { flexDirection: 'row', gap: 12 } },
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: 10, fontWeight: 'bold', marginBottom: 2 } }, 'Accepted:'),
            e(Text, { style: { fontSize: 9, marginBottom: 1 } }, '• Household trash'),
            e(Text, { style: { fontSize: 9, marginBottom: 1 } }, '• Recyclables'),
            e(Text, { style: { fontSize: 9 } }, '• Yard waste')
          ),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: 10, fontWeight: 'bold', marginBottom: 2 } }, 'Special:'),
            e(Text, { style: { fontSize: 9, marginBottom: 1 } }, '• Electronics (fee)'),
            e(Text, { style: { fontSize: 9, marginBottom: 1 } }, '• Tires (limit 4)'),
            e(Text, { style: { fontSize: 9 } }, '• Appliances')
          )
        ),
        
        e(View, { style: servicesStyles.travelTimeBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: '#0284C7', marginBottom: 2 } }, 
            '🚗 Travel Times from Lodge'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Linden: 15 min • Cooley: 25 min • Rockledge: 30 min\nPlan trips to combine with shopping or errands'
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
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: colors.forestGreen } }, 
            'Internet Options'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Satellite internet (HughesNet, Viasat, Starlink) most reliable. Limited DSL in some areas. No cable or fiber optic service available.'
          )
        ),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: colors.forestGreen } }, 
            'Emergency Preparedness'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Mountain living requires self-sufficiency. Keep emergency supplies: water, food, medications, flashlights, batteries, first aid, generator fuel.'
          )
        ),
        
        e(View, { style: { backgroundColor: colors.lightGray, padding: 8, marginTop: 8, borderRadius: 4 } },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center' } }, 
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