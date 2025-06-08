import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { largeProportionalImage, captionStyle } from '../imageStyles.js';
import { 
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  CompactTable
} from './EnhancedLayoutComponents.js';
import { 
  MirroredTwoColumnLayout, 
  TallQuickFactsBox, 
  TallInfoBox, 
  ExtraTallInfoBox
} from './MirroredLayoutComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function LodgePageNoJSXEnhancedFixedMirrored({ pageNumberMap = {} }) {
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
    facilityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 3,
      borderBottom: '1px solid #E2E8F0',
    },
    facilityLabel: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
      flex: 1,
    },
    facilityStatus: {
      fontSize: typography.sizes.sm,
      color: colors.forestGreen,
      fontWeight: typography.weights.bold,
      textAlign: 'right',
      flex: 1,
    }
  });

  return [
    // Page 1: Lodge Overview & Features
    e(
      Page,
      { key: 'lodge-1', size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'THE LODGE')
      ),
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'LODGE FEATURES',
            facts: [
              { label: 'Built', value: '1985' },
              { label: 'Capacity', value: '75 people' },
              { label: 'Size', value: '2,400 sq ft' },
              { label: 'Parking', value: '20+ vehicles' },
              { label: 'Kitchen', value: 'Full commercial' },
              { label: 'WiFi', value: 'High-speed internet' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '🏠 FACILITIES' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Main Hall:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Large gathering space with fireplace'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Kitchen:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Commercial appliances, prep space'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Deck:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Covered outdoor space with mountain views'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Bathrooms:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Two full restrooms'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Storage:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Tables, chairs, and event supplies')
          ),
          
          e(TallInfoBox, { title: '📅 AVAILABILITY' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Available year-round'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Advance booking required'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Community events have priority'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Check calendar for open dates')
          )
        ]
      },
        e(CompactSectionHeader, null, 'HISTORIC COMMUNITY CENTER'),
        
        e(DenseText, null,
          'The Lodge serves as Blue Mountain\'s community center and gathering place. Built in 1985 by community volunteers, this rustic building provides a welcoming space for celebrations, meetings, and social events. The Lodge embodies the spirit of mountain hospitality and community cooperation.'
        ),

        e(Image, { 
          src: assetMap.lodgeinterior || assetMap['lodge-interior.jpeg'], 
          style: largeProportionalImage 
        }),
        e(Text, { style: captionStyle }, 
          'The Lodge main hall features a stone fireplace and rustic mountain décor'
        ),

        e(CompactSubsectionHeader, null, 'BUILDING FEATURES & AMENITIES'),
        
        e(DenseText, null,
          'The Lodge combines rustic charm with modern convenience. The main hall accommodates up to 75 people for seated events or 100+ for standing receptions. Large windows provide natural light and mountain views, while the stone fireplace creates a cozy atmosphere.'
        ),

        e(CompactTable, {
          headers: ['Facility', 'Capacity', 'Features', 'Status'],
          rows: [
            ['Main Hall', '75 seated', 'Fireplace, windows', 'Excellent'],
            ['Commercial Kitchen', '10 cooks', 'Full appliances', 'Updated 2019'],
            ['Covered Deck', '30 people', 'Mountain views', 'Good'],
            ['Parking Area', '20+ cars', 'Gravel surface', 'Adequate'],
            ['WiFi available', 'High-speed internet', 'Fiber connection', 'Excellent']
          ]
        }),

        e(CompactSubsectionHeader, null, 'COMMUNITY EVENTS'),
        
        e(DenseText, null,
          'The Lodge hosts numerous community events throughout the year including holiday parties, potluck dinners, game nights, and special celebrations. These gatherings strengthen neighborhood bonds and create lasting memories for residents and their families.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.lodge || '28')
      )
    ),

    // Page 2: Rental Information & Policies
    e(
      Page,
      { key: 'lodge-2', size: 'LETTER', style: styles.page },
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'RENTAL RATES',
            facts: [
              { label: 'Members', value: '$150/day' },
              { label: 'Non-Members', value: '$250/day' },
              { label: 'Deposit', value: '$100 refundable' },
              { label: 'Cleaning Fee', value: '$50 if needed' },
              { label: 'Key Deposit', value: '$25 refundable' },
              { label: 'Booking', value: '30 days advance' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '📋 RENTAL INCLUDES' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Tables & Chairs:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '8 round tables (seat 8 each)'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '64 folding chairs available'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Kitchen Access:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Full commercial kitchen use'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Refrigerator, stove, microwave'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Utilities:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Electricity, heat, water'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'WiFi internet access')
          ),
          
          e(TallInfoBox, { title: '📞 BOOKING CONTACT' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Lodge Coordinator:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Contact through Board'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Email: rentals@bmpoa.org'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Allow 48 hours for response'),
            e(Text, { style: { fontSize: typography.sizes.xs, marginTop: 4 } }, 'Include event date, size, and purpose in inquiry')
          )
        ]
      },
        e(CompactSectionHeader, null, 'LODGE RENTAL INFORMATION'),
        
        e(DenseText, null,
          'The Lodge is available for private rental by BMPOA members and their guests. The facility is perfect for family reunions, birthday parties, anniversary celebrations, and other special occasions. Advance booking is required with priority given to community events.'
        ),

        e(View, { style: lodgeStyles.rentalHighlight },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '🎉 PERFECT FOR YOUR EVENT'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Family Reunions • Birthday Parties • Anniversary Celebrations • Wedding Receptions • Corporate Retreats • Holiday Gatherings • Memorial Services • Club Meetings'
          )
        ),

        e(CompactSubsectionHeader, null, 'RENTAL POLICIES & PROCEDURES'),
        
        e(DenseText, null,
          'Reservations must be made at least 30 days in advance. A signed rental agreement and security deposit are required to confirm booking. Renters are responsible for setup, cleanup, and returning the facility to its original condition.'
        ),

        e(CompactTable, {
          headers: ['Requirement', 'Details', 'Timeline'],
          rows: [
            ['Initial Contact', 'Submit rental inquiry', '30+ days ahead'],
            ['Site Visit', 'Schedule walkthrough', '2-3 weeks ahead'],
            ['Contract Signing', 'Submit agreement & deposit', '2 weeks ahead'],
            ['Key Pickup', 'Collect keys from coordinator', '1 day before'],
            ['Event Day', 'Setup, event, cleanup', 'As scheduled'],
            ['Key Return', 'Return keys & final inspection', 'Day after event']
          ]
        }),

        e(CompactSubsectionHeader, null, 'RENTER RESPONSIBILITIES'),
        
        e(DenseText, null,
          'Renters must provide their own decorations, linens, and serving supplies. The kitchen includes basic cookware but renters should bring specialized items. All trash must be removed and the facility left clean. Smoking is prohibited inside the building.'
        ),

        e(View, { style: lodgeStyles.rentalHighlight },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '✅ BEFORE YOU LEAVE'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Clean kitchen & appliances • Wipe down tables • Sweep floors • Empty trash • Stack chairs • Turn off lights • Lock all doors • Return keys to coordinator'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.lodge || 28) + 1)
      )
    )
  ];
}