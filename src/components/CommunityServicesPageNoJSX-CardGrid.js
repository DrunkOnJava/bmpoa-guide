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
import { 
  CardGrid,
  FeatureBox,
  MixedLayout,
  Badge
} from './AdvancedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js'; // Removed to fix blank pages

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function CommunityServicesPageNoJSXCardGrid({ pageNumberMap = {} }) {
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
  },
    bearIcon: {
      fontSize: typography.sizes.h3,
      color: colors.saddleBrown,
  },
    bearWarning: {
      backgroundColor: '#FEF2F2',
      borderWidth: 1,
      borderColor: '#B91C1C',
      borderRadius: callout.radius,
      padding: 6,
      marginBottom: layout.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
  },
    utilizationCard: {
      backgroundColor: '#F9FAFB',
      border: '1pt solid #E5E7EB',
      borderRadius: callout.radius,
      padding: layout.spacing.md,
      marginBottom: layout.spacing.sm,
  },
    cardTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: 6,
  },
    cardContent: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkGray,
  },
    badge: {
      backgroundColor: colors.primary,
      color: colors.white,
      fontSize: typography.sizes.sm,
      padding: 2,
      paddingHorizontal: 6,
      borderRadius: 2,
      textAlign: 'center',
      marginBottom: layout.spacing.xs,
  }
});

  // Define service cards for Card Grid layout
  const serviceCards = [
    {
      title: 'Road Maintenance',
      badge: 'YEAR-ROUND',
      content: 'Snow removal, pothole repair, grading, and vegetation control for all community roads except Fire Trail Road.',
      details: [
        '• Snow plow trigger: 4" accumulation',
        '• Gravel chip barrels available',
        '• Emergency contact: bmpoareads@gmail.com'
      ]
  },
    {
      title: 'Waste Management',
      badge: 'WEEKLY SERVICE',
      content: 'Refuse collection and access to four Warren County convenience sites with extended hours.',
      details: [
        '• Tuesday-Saturday 7AM-7PM',
        '• Sunday 9AM-5PM',
        '• Bear-proof containers required'
      ]
  },
    {
      title: 'Utilities Coordination',
      badge: 'ESSENTIAL',
      content: 'Electric, propane, internet, and water/septic service coordination and emergency response.',
      details: [
        '• REC Electric: 800-552-3904',
        '• Propane delivery available',
        '• High-speed internet options'
      ]
  },
    {
      title: 'Emergency Preparedness',
      badge: 'SAFETY FIRST',
      content: 'Fire safety, evacuation planning, and emergency communication systems for mountain living.',
      details: [
        '• Three evacuation zones',
        '• Warren911.com alerts',
        '• NOAA weather radio'
      ]
  }
  ];

  return [
    // Section Divider removed - now in FullAppNoJSX.js

    // NEW: Services Overview Page with Card Grid
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(MixedLayout, null,
        e(View, { style: styles.pageHeader },
          e(Text, { style: styles.pageTitle }, 'COMMUNITY SERVICES OVERVIEW')
        ),
        
        // Introduction
        e(DenseText, null,
          'The Blue Mountain Property Owners Association provides essential services funded through the Sanitary District tax collected with your property taxes. No additional dues are required for community services.'
        ),
        
        // Feature highlight
        e(FeatureBox, {
          title: 'FUNDED THROUGH SANITARY DISTRICT',
          content: 'All services are supported by a special tax assessment collected reliably by Warren County, ensuring sustainable funding and qualifying the community for disaster relief assistance.'
      }),
        
        // Service Cards Grid
        e(View, { style: { marginTop: spacing.md } },
          e(Text, { style: { ...styles.h3, marginBottom: spacing.sm } }, 'AVAILABLE SERVICES'),
          
          // Row 1: Roads & Waste
          e(View, { style: { flexDirection: 'row', marginBottom: spacing.sm } },
            e(View, { style: { ...servicesStyles.utilizationCard, flex: 1, marginRight: spacing.xs } },
              e(Text, { style: servicesStyles.badge }, serviceCards[0].badge),
              e(Text, { style: servicesStyles.cardTitle }, serviceCards[0].title),
              e(Text, { style: servicesStyles.cardContent }, serviceCards[0].content),
              e(View, { style: { marginTop: spacing.xs } },
                ...serviceCards[0].details.map((detail, i) =>
                  e(Text, { 
                    key: `road-detail-${i}`,
                    style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal, marginBottom: 2 } 
                }, detail)
                )
              )
            ),
            e(View, { style: { ...servicesStyles.utilizationCard, flex: 1, marginLeft: spacing.xs } },
              e(Text, { style: servicesStyles.badge }, serviceCards[1].badge),
              e(Text, { style: servicesStyles.cardTitle }, serviceCards[1].title),
              e(Text, { style: servicesStyles.cardContent }, serviceCards[1].content),
              e(View, { style: { marginTop: spacing.xs } },
                ...serviceCards[1].details.map((detail, i) =>
                  e(Text, { 
                    key: `waste-detail-${i}`,
                    style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal, marginBottom: 2 } 
                }, detail)
                )
              )
            )
          ),
          
          // Row 2: Utilities & Emergency
          e(View, { style: { flexDirection: 'row' } },
            e(View, { style: { ...servicesStyles.utilizationCard, flex: 1, marginRight: spacing.xs } },
              e(Text, { style: servicesStyles.badge }, serviceCards[2].badge),
              e(Text, { style: servicesStyles.cardTitle }, serviceCards[2].title),
              e(Text, { style: servicesStyles.cardContent }, serviceCards[2].content),
              e(View, { style: { marginTop: spacing.xs } },
                ...serviceCards[2].details.map((detail, i) =>
                  e(Text, { 
                    key: `utilities-detail-${i}`,
                    style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal, marginBottom: 2 } 
                }, detail)
                )
              )
            ),
            e(View, { style: { ...servicesStyles.utilizationCard, flex: 1, marginLeft: spacing.xs } },
              e(Text, { style: servicesStyles.badge }, serviceCards[3].badge),
              e(Text, { style: servicesStyles.cardTitle }, serviceCards[3].title),
              e(Text, { style: servicesStyles.cardContent }, serviceCards[3].content),
              e(View, { style: { marginTop: spacing.xs } },
                ...serviceCards[3].details.map((detail, i) =>
                  e(Text, { 
                    key: `emergency-detail-${i}`,
                    style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal, marginBottom: 2 } 
                }, detail)
                )
              )
            )
          )
        ),
        
        // Contact information
        e(InfoBox, {
          title: 'SERVICE COORDINATION',
          type: 'highlight',
          content: 'For service issues or emergencies, contact the appropriate provider directly. For general community concerns, contact the BMPOA Board at info@bmpoa.org'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.communityServices || '20')
      )
    ),
    
    // Page 1: Roads & Winter Weather (Dense) - Keep existing content
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, {
            key: 'road-facts',
            facts: [
              { label: 'Roads', value: 'Private' },
              { label: 'Miles', value: '~20' },
              { label: 'Snow Plow', value: '4"' },
              { label: 'Gravel', value: 'No Salt' }
            ]
        }),
          
          e(InfoBox, {
            key: 'reporting',
            title: 'REPORT ISSUES',
            content: [
              'bmpoareads@gmail.com',
              '',
              'Photos helpful',
              'Emergency:',
              'Contact Board member'
            ]
        }),
          
          e(InfoBox, {
            key: 'winter-tips',
            title: 'WINTER TIPS',
            content: [
              '• Keep tire chains',
              '• Use gravel barrels',
              '• 4WD recommended',
              '• NO SALT on roads'
            ]
        })
        ]
    },
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
            'Steep sections plowed last',
            'No salt use (damages roads)',
            'Patience during storms',
            'Check road conditions first'
          ]
      }),
        
        e(InfoBox, {
          title: 'WINTER PREPARATION',
          type: 'highlight',
          content: 'Keep tire chains, snow shovel, and emergency supplies. Practice chain installation before winter. Cable chains easier than traditional. 4WD/AWD strongly recommended.'
      }),
        
        e(CompactSubsectionHeader, null, 'TRACTION ASSISTANCE'),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 'Gravel Chip Barrels'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } },
            'Blue poly barrels placed on steep hills contain crushed gravel for traction. Free for resident use. Report empty barrels to Roads Committee.'
          )
        ),
        
        e(View, { style: servicesStyles.serviceBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 'Problem Reporting'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } },
            'Report potholes, drainage issues, fallen trees, or road damage to bmpoareads@gmail.com. Include specific location and photos if possible.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.communityServices || 20) + 1)
      )
    ),

    // Page 2: Refuse Collection (Dense) - Keep existing with minor enhancements
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(InfoBox, {
            key: 'site-hours',
            title: 'CONVENIENCE SITES',
            content: [
              'Tuesday-Saturday',
              '7:00 AM - 7:00 PM',
              '',
              'Sunday',
              '9:00 AM - 5:00 PM',
              '',
              'Closed Mondays'
            ]
        }),
          
          e(InfoBox, {
            key: 'locations',
            title: 'LOCATIONS',
            content: [
              'Linden (closest)',
              'Cooley',
              'Rockledge', 
              'Shenandoah Farms'
            ]
        }),
          
          e(InfoBox, {
            key: 'bear-safety',
            title: 'BEAR COUNTRY',
            type: 'highlight',
            content: 'Use bear-proof containers. Never leave trash out overnight. Bears are active March-November.'
        })
        ]
    },
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
        
        e(CompactSubsectionHeader, null, 'COLLECTION GUIDELINES'),
        
        e(TwoColumnList, {
          items: [
            'Use bear-proof containers only',
            'No loose bags or overflow',
            'Separate recyclables properly',
            'No hazardous materials',
            'No electronics or batteries',
            'Large items require special trip'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'ACCEPTABLE MATERIALS'),
        
        e(ForestGreenTable, {
          headers: ['Category', 'Examples', 'Notes'],
          rows: [
            ['Household', 'Food waste, papers, plastics', 'Normal trash'],
            ['Recyclables', 'Bottles, cans, cardboard', 'Clean & sorted'],
            ['Yard Waste', 'Leaves, grass clippings', 'Biodegradable bags'],
            ['Large Items', 'Furniture, appliances', 'Special pickup']
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'PROHIBITED ITEMS'),
        
        e(EmergencyBox, {
          title: 'NOT ACCEPTED',
          items: [
            'Hazardous chemicals or paint',
            'Car batteries and motor oil',
            'Electronics and computers',
            'Construction debris',
            'Tires and automotive parts'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.communityServices || 20) + 2)
      )
    ),

    // Page 3: Utilities & Services (Dense) - Keep existing
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, {
            key: 'utility-contacts',
            facts: [
              { label: 'Electric', value: 'REC' },
              { label: 'Outages', value: '800-552-3904' },
              { label: 'Internet', value: 'Multiple' },
              { label: 'Propane', value: 'Delivery' }
            ]
        }),
          
          e(InfoBox, {
            key: 'internet-options',
            title: 'INTERNET OPTIONS',
            content: [
              'Shentel Fiber',
              'Hughes Net Satellite',
              'Viasat Satellite',
              'Starlink (Elon Musk)',
              '',
              'Speeds vary by location'
            ]
        }),
          
          e(InfoBox, {
            key: 'propane-tips',
            title: 'PROPANE DELIVERY',
            content: [
              'Multiple suppliers',
              'Year-round access',
              'Keep roads clear',
              'Tank accessibility'
            ]
        })
        ]
    },
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
          'Multiple propane suppliers deliver to Blue Mountain year-round. Ensure clear road access to your tank. Popular suppliers include Amerigas, Ferrellgas, and local dealers.'
        ),
        
        e(CompactSubsectionHeader, null, 'INTERNET & COMMUNICATIONS'),
        
        e(ForestGreenTable, {
          headers: ['Provider', 'Technology', 'Coverage'],
          rows: [
            ['Shentel', 'Fiber', 'Limited areas'],
            ['HughesNet', 'Satellite', 'Mountain-wide'],
            ['Viasat', 'Satellite', 'Mountain-wide'],
            ['Starlink', 'Low-orbit satellite', 'Beta/limited']
          ]
      }),
        
        e(InfoBox, {
          title: 'BACKUP POWER RECOMMENDATIONS',
          type: 'highlight',
          content: 'Consider generator or battery backup due to occasional outages. Propane generators work well in mountain conditions. Solar backup systems increasingly popular.'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.communityServices || 20) + 3)
      )
    )
  ];
}