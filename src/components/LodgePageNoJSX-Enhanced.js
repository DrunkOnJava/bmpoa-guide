import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
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
  InlineInfo
} from './EnhancedLayoutComponents.js';
import { FeatureBox, Badge, CardGrid } from './AdvancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function LodgePageNoJSXEnhanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lodgeStyles = StyleSheet.create({
    sectionTitle: {
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
    sectionDescription: {
      fontSize: typography.sizes.base,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: typography.lineHeights.relaxed,
      fontStyle: 'italic',
  },
    compactImage: {
      width: '100%',
      height: 120,
      marginVertical: 8,
      borderRadius: callout.radius,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
  },
    pricingCard: {
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#0EA5E9',
      borderRadius: callout.radius,
      padding: spacing.md,
      marginVertical: spacing.sm,
      alignItems: 'center',
  },
    priceAmount: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: 2,
  },
    priceLabel: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
  },
    featureGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginVertical: spacing.sm,
  },
    featureItem: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 12,
      width: '48%',
  },
    featureText: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
      textAlign: 'center',
  },
    eventBox: {
      backgroundColor: '#FEF3C7',
      borderWidth: 1,
      borderColor: '#F59E0B',
      padding: spacing.sm,
      marginTop: spacing.sm,
      borderRadius: callout.radius,
  },
    activityCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
      borderLeft: `3px solid ${colors.accent}`,
  },
    activityTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.accent,
      marginBottom: 2,
  },
    activityDesc: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
      lineHeight: typography.lineHeights.normal,
  }
});

  // Lodge features data
  const lodgeFeatures = [
    'Hardwood floors',
    'Full kitchen',
    'Stage area',
    'Tables & chairs',
    'Heat & A/C',
    'Two restrooms',
    'Ample parking',
    'WiFi available'
  ];

  // Regular activities
  const regularActivities = [
    {
      title: 'Monthly Potlucks',
      description: 'First Saturday of each month at 6 PM. Bring a dish to share and meet your neighbors!',
      icon: '🍽️'
  },
    {
      title: 'Game Nights',
      description: 'Third Friday evenings. Cards, board games, and fellowship. All ages welcome.',
      icon: '🎲'
  },
    {
      title: 'Exercise Classes',
      description: 'Tuesday/Thursday mornings. Yoga and low-impact fitness for all levels.',
      icon: '🧘'
  },
    {
      title: 'Community Meetings',
      description: 'Board meetings and special events. Check calendar for current schedule.',
      icon: '📅'
  }
  ];

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      title: 'LODGE SPECS',
      facts: [
        { label: 'Capacity', value: '~60 people' },
        { label: 'Size', value: '1,800 sq ft' },
        { label: 'Built', value: 'Renovated 2018' },
        { label: 'Parking', value: '20+ spaces' },
        { label: 'Access', value: 'ADA compliant' }
      ]
  }),
    e(InfoBox, { 
      title: '📍 Location',
      content: [
        'Blue Mountain Road',
        'Central to community',
        'Near mailbox cluster',
        '',
        'GPS coordinates available',
        'at www.bmpoa.org'
      ]
  })
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(View, { style: lodgeStyles.pricingCard },
      e(Text, { style: lodgeStyles.priceAmount }, '$100'),
      e(Text, { style: lodgeStyles.priceLabel }, 'Half Day (4 hrs)'),
      e(View, { style: { height: spacing.sm } }),
      e(Text, { style: lodgeStyles.priceAmount }, '$150'),
      e(Text, { style: lodgeStyles.priceLabel }, 'Full Day (8 hrs)'),
      e(View, { style: { height: spacing.sm } }),
      e(Badge, { 
        text: 'Members Only',
        color: colors.primary
    })
    ),
    e(ChecklistBox, {
      title: 'RENTAL INCLUDES',
      items: [
        'Tables & chairs',
        'Kitchen access',
        'Restroom facilities',
        'Parking area',
        'Basic cleaning supplies',
        'Trash removal'
      ]
  })
  ];

  return [
    // Section Divider Page - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '07',
    //   title: 'THE LODGE',
    //   description: 'Community gathering place for meetings, celebrations, and social events',
    //   backgroundColor: colors.primary,
    //   backgroundImage: assetMap.lodgeinterior
    // }),
    
    // Page 1: Overview & Features
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'COMMUNITY GATHERING PLACE'),
        
        // Feature Box highlighting the Lodge
        e(FeatureBox, {
          title: '🏛️ THE HEART OF BLUE MOUNTAIN',
          content: 'The Lodge serves as our community\'s central gathering place - a beautifully renovated space where neighbors become friends. From monthly potlucks to holiday celebrations, exercise classes to board meetings, the Lodge brings our mountain community together year-round.'
      }),
        
        // Lodge interior image
        assetMap.lodgeinterior && e(
          View,
          { style: { marginVertical: spacing.sm } },
          e(Image, { 
            src: assetMap.lodgeinterior, 
            style: lodgeStyles.compactImage 
        }),
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', textAlign: 'center', marginTop: layout.spacing.xs } }, 
            'Spacious interior perfect for community gatherings'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'FACILITY FEATURES'),
        
        // Features grid
        e(View, { style: lodgeStyles.featureGrid },
          ...lodgeFeatures.map((feature, index) => 
            e(View, { key: index, style: lodgeStyles.featureItem },
              e(Text, { style: lodgeStyles.featureText }, `✓ ${feature}`)
            )
          )
        ),
        
        e(CompactSubsectionHeader, null, 'REGULAR ACTIVITIES'),
        
        // Activity cards
        ...regularActivities.map((activity, index) => 
          e(View, { key: index, style: lodgeStyles.activityCard },
            e(View, { style: { flexDirection: 'row', alignItems: 'center' } },
              e(Text, { style: { fontSize: typography.sizes.h3, marginRight: spacing.xs } }, activity.icon),
              e(Text, { style: lodgeStyles.activityTitle }, activity.title)
            ),
            e(Text, { style: lodgeStyles.activityDesc }, activity.description)
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap.lodge || '30'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Rental Information
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'RENTAL INFORMATION'),
        
        e(FeatureBox, {
          title: '🎉 HOST YOUR EVENT',
          content: 'The Lodge is available for private rentals by property owners in good standing. Perfect for birthday parties, family reunions, wedding receptions, and other special occasions. Our affordable rates make it easy to host memorable gatherings.'
      }),
        
        e(CompactSubsectionHeader, null, 'BOOKING PROCESS'),
        e(TwoColumnList, {
          items: [
            'Check availability online or call Board member',
            'Submit rental agreement at least 2 weeks prior',
            'Pay rental fee and security deposit',
            'Receive access instructions and guidelines',
            'Complete walk-through before event',
            'Return keys and complete checkout'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'RENTAL GUIDELINES'),
        e(InfoBox, { 
          title: 'Important Rules',
          type: 'highlight' 
      },
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• No smoking inside'),
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Clean as you go'),
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Music levels respectful'),
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Events end by 10 PM'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, '• Leave as found')
        ),
        
        e(CompactSubsectionHeader, null, 'CONTACT & BOOKING'),
        e(View, { style: lodgeStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
            '📞 Reserve Your Date'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, 
            'Contact any Board member for availability'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            'Rental forms available at www.bmpoa.org'
          )
        ),
        
        e(View, { style: { marginTop: spacing.md, padding: spacing.sm, backgroundColor: '#F0FDF4', borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', textAlign: 'center', color: colors.forestGreen } }, 
            'The Lodge rental fees help maintain and improve this valuable community asset for everyone to enjoy.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap.lodge || 30) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}