import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { largeProportionalImage, captionStyle } from '../imageStyles.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  InlineInfo,
  TwoColumnList 
} from './EnhancedLayoutComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function LodgePageNoJSXEnhancedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lodgeStyles = StyleSheet.create({
    eventBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    rentalHighlight: {
      backgroundColor: '#E8F5E9',
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.sm,
    },
    priceBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 2,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.md,
      alignItems: 'center',
      marginBottom: layout.spacing.sm,
    },
    priceAmount: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
    },
    checklistBox: {
      backgroundColor: '#FFF9C4',
      padding: layout.spacing.sm,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.sm,
    }
  });

  return [
    // Page 1: Community Gathering Place
    e(
      Page,
      { key: 'lodge-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, { 
            facts: [
              { label: 'Capacity', value: '~60 people' },
              { label: 'Size', value: '1,800 sq ft' },
              { label: 'Built', value: 'Renovated 2018' },
              { label: 'Parking', value: '20+ spaces' },
              { label: 'Access', value: 'ADA compliant' }
            ]
          }),
          e(InfoBox, { title: '📍 LOCATION' },
            e(Text, { style: { fontSize: typography.sizes.sm } }, 'Blue Mountain Road'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'Central to community'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'Near mailbox cluster'),
            e(Text, { style: { fontSize: typography.sizes.xs, marginTop: layout.spacing.xs, fontStyle: 'italic' } }, 
              'GPS coordinates available at www.bmpoa.org'
            )
          )
        ]
      },
        e(CompactSectionHeader, null, 'COMMUNITY GATHERING PLACE'),
        
        e(View, { style: lodgeStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.primary, marginBottom: 4 } }, 
            'THE HEART OF BLUE MOUNTAIN'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'The Lodge serves as our community\'s central gathering place - a beautifully renovated space where neighbors become friends. From monthly potlucks to holiday celebrations, exercise classes to board meetings, the Lodge brings our mountain community together year-round.'
          )
        ),
        
        // Lodge interior image
        assetMap.lodgeinterior && e(
          View,
          { style: { marginVertical: 8 } },
          e(Image, { 
            src: assetMap.lodgeinterior, 
            style: largeProportionalImage 
          }),
          e(Text, { style: captionStyle }, 
            'Spacious interior perfect for community gatherings'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'FACILITY FEATURES'),
        
        e(CompactTable, {
          headers: ['Area', 'Features'],
          rows: [
            ['Hardwood floors', 'Throughout main area'],
            ['Stage area', 'For presentations/music'],
            ['Heat & A/C', 'Year-round comfort'],
            ['Ample parking', 'Gravel lot + overflow'],
            ['Full kitchen', 'Tables & chairs included'],
            ['Two restrooms', 'ADA accessible'],
            ['WiFi available', 'High-speed internet']
          ]
        }),
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '31'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Rental Information (Consolidated to prevent overflow)
    e(
      Page,
      { key: 'lodge-2', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(View, { style: lodgeStyles.priceBox },
            e(Text, { style: lodgeStyles.priceAmount }, '$100'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 'Half Day (4 hrs)'),
            e(Text, { style: { ...lodgeStyles.priceAmount, marginTop: layout.spacing.sm } }, '$150'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 'Full Day (8 hrs)'),
            e(Text, { style: { fontSize: typography.sizes.xs, marginTop: layout.spacing.sm, fontStyle: 'italic' } }, 
              'Members Only'
            )
          ),
          e(View, { style: lodgeStyles.checklistBox },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
              'RENTAL INCLUDES'
            ),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Tables & chairs'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Kitchen access'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Restroom facilities'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Parking area'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Basic cleaning supplies'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Trash removal')
          )
        ]
      },
        e(CompactSectionHeader, null, 'RENTAL INFORMATION'),
        
        e(View, { style: lodgeStyles.rentalHighlight },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            'HOST YOUR EVENT'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            'The Lodge is available for private rentals by property owners in good standing. Perfect for birthday parties, family reunions, wedding receptions, and other special occasions. Our affordable rates make it easy to host memorable gatherings.'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'BOOKING PROCESS'),
        
        e(View, { style: { marginBottom: layout.spacing.sm } },
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            '• Check availability online or call Board member'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            '• Submit rental agreement at least 2 weeks prior'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            '• Pay rental fee and security deposit'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            '• Receive access instructions and guidelines'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            '• Complete walk-through before event'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            '• Return keys and complete checkout'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'RENTAL GUIDELINES'),
        
        e(View, { style: { ...callout.container, backgroundColor: '#FFEBEE', marginBottom: layout.spacing.sm } },
          e(Text, { style: { ...callout.title, color: colors.accent } }, 'IMPORTANT RULES'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, '• No smoking inside'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, '• Clean as you go'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, '• Music levels respectful'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, '• Events end by 10 PM'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, '• Leave as found')
        ),
        
        e(CompactSubsectionHeader, null, 'CONTACT & BOOKING'),
        
        e(View, { style: { ...callout.container, backgroundColor: '#FFF9C4' } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 
            'Reserve Your Date'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 4 } }, 
            'Contact any Board member for availability'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            'Rental forms available at www.bmpoa.org'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, marginTop: layout.spacing.xs, fontStyle: 'italic', textAlign: 'center' } }, 
            'The Lodge rental fees help maintain and improve this valuable community asset for everyone to enjoy.'
          )
        ),
        
        e(DenseText, { style: { marginTop: layout.spacing.sm } },
          'Community Meetings: Board meetings and special events. Check calendar for current schedule.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '32'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}