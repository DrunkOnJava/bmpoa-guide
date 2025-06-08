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
  InlineInfo
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function DeerLakePageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lakeStyles = StyleSheet.create({
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
    facilityIcon: {
      width: 24,
      height: 24,
      marginBottom: layout.spacing.xs,
  },
    facilityGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginVertical: 8,
  },
    facilityItem: {
      alignItems: 'center',
      width: '22%',
  },
    compactImage: {
      width: '100%',
      height: 120,
      marginVertical: 6,
      borderRadius: callout.radius,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
  },
    passBox: {
      backgroundColor: colors.lightGray,
      padding: 6,
      marginVertical: 6,
      borderRadius: 3,
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Location', value: '3367 Blue Mt Rd' },
        { label: 'Access', value: 'Pass Required' },
        { label: 'Season', value: 'May-Sept' },
        { label: 'Hours', value: 'Dawn-Dusk' }
      ]
  }),
    e(InfoBox, { title: '📋 Pass Info' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'To Get Passes:'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, 'bmpoadeerlake@gmail.com'),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
        'Include proof of property ownership. Passes mailed annually in May.'
      )
    ),
    e(InfoBox, { title: '🏖️ Amenities' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Sandy beach area'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Swimming dock'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Picnic tables/grills'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Parking area'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• Seasonal restrooms')
      )
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(ForestGreenTable, {
      headers: ['Rule', 'Details'],
      rows: [
        ['Swimming', 'At own risk'],
        ['Children', 'Must supervise'],
        ['Glass', 'Not allowed'],
        ['Pets', 'Leashed only'],
        ['Boats', 'No motors'],
        ['Fishing', 'Catch & release'],
        ['Quiet', 'After 10 PM']
      ]
  }),
    e(InfoBox, { title: '⚠️ Safety' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.danger, marginBottom: 3 } }, 
        'NO LIFEGUARD ON DUTY'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
        'Swimming is at your own risk. Children under 12 must be supervised by an adult at all times.'
      )
    )
  ];

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '06',
      title: 'DEER LAKE\nRECREATION AREA',
      description: 'Private recreational area exclusively for Blue Mountain property owners and their guests',
      backgroundColor: colors.primary,
      backgroundImage: assetMap.deerlakedock
  }),
    
    // Page 1: Location & Access (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'LOCATION & ACCESS'),
        
        // Deer Lake dock image
        assetMap.deerlakedock && e(
          View,
          { style: { marginVertical: 12 } },
          e(Image, { 
            src: assetMap.deerlakedock, 
            style: largeProportionalImage 
        }),
          e(Text, { style: captionStyle }, 
            'The Deer Lake dock — seasonal swimming and relaxation'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'EXCLUSIVE ACCESS'),
        e(DenseText, null,
          'Deer Lake is for Blue Mountain property owners, their renters, and guests. Access is restricted to ensure the area remains a private amenity for our community members. Located at 3367 Blue Mountain Road, Linden, VA 22630.'
        ),
        
        e(CompactSubsectionHeader, null, 'ACCESS REQUIREMENTS'),
        e(TwoColumnList, {
          items: [
            'Blue Mountain Recreational Pass required',
            'Guests under 18 need owner present',
            'Renters must obtain passes from owner',
            'Trespassing violations will be reported',
            'Valid property ownership required',
            'Passes non-transferable'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'SEASONAL HOURS'),
        e(InlineInfo, {
          items: [
            { label: 'Summer', value: 'Dawn to Dusk' },
            { label: 'Off-season', value: 'Weather permitting' }
          ]
      }),
        e(DenseText, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic' } },
          'Swimming permitted when safe. Beach hours may be restricted during summer and posted at entrance.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '27'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Rules & Facilities (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'RULES & FACILITIES'),
        
        e(CompactSubsectionHeader, null, 'PASS DISTRIBUTION'),
        e(DenseText, null,
          'Each property owner is issued passes annually: typically two permanent passes for owners plus guest passes as determined by the Board. Passes are mailed to owners in good standing (current on taxes) each spring before summer season.'
        ),
        
        e(View, { style: lakeStyles.passBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: 2 } }, 
            '📧 Haven\'t received passes by June 1?'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            'Contact bmpoadeerlake@gmail.com with ownership verification'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'GENERAL RULES'),
        e(View, { style: { flexDirection: 'row', gap: 12 } },
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Water Safety'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• No lifeguard'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Supervise kids'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• No glass')
          ),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Activities'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• No motors'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Catch & release'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Quiet after 10pm')
          )
        ),
        
        e(CompactSubsectionHeader, null, 'FACILITIES'),
        
        // Facility icons grid
        e(View, { style: lakeStyles.facilityGrid },
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🏖️'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Beach')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🏊'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Swimming')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🧺'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Picnic')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🎣'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Fishing')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🚻'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Restroom')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🚗'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Parking')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🗑️'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Trash')
          ),
          e(View, { style: lakeStyles.facilityItem },
            e(Text, { style: { fontSize: typography.sizes.h2 } }, '🦮'),
            e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 'Pets OK')
          )
        ),
        
        e(View, { style: { backgroundColor: colors.lightGray, padding: layout.spacing.sm, marginTop: layout.spacing.sm, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, fontStyle: 'italic', textAlign: 'center' } }, 
            'Deer Lake is a shared community resource. Please respect the facilities, follow all rules, and help keep the area clean for everyone to enjoy.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '28'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}