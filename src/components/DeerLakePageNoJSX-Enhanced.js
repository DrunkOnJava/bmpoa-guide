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
import { FeatureBox, Badge, CardGrid } from './AdvancedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function DeerLakePageNoJSXEnhanced({ pageNumberMap = {} }) {
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
    facilityCard: {
      backgroundColor: '#F0F9FF',
      borderRadius: 8,
      padding: spacing.md,
      alignItems: 'center',
      width: '48%',
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: '#0EA5E9',
  },
    facilityIcon: {
      fontSize: typography.sizes.h1,
      marginBottom: spacing.xs,
  },
    facilityTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: 2,
  },
    facilityDesc: {
      fontSize: typography.sizes.sm,
      textAlign: 'center',
      color: colors.darkGray,
      lineHeight: typography.lineHeights.normal,
  },
    passBox: {
      backgroundColor: '#F0FDF4',
      borderLeft: `3px solid ${colors.forestGreen}`,
      padding: layout.spacing.sm,
      marginVertical: 8,
      borderRadius: callout.radius,
  },
    amenityGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginVertical: spacing.md,
  },
    highlightBox: {
      backgroundColor: '#FEF3C7',
      borderRadius: callout.radius,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderWidth: 1,
      borderColor: '#F59E0B',
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, {
      title: 'LAKE DETAILS',
      facts: [
        { label: 'Location', value: '3367 Blue Mt Rd' },
        { label: 'Type', value: 'Private lake' },
        { label: 'Access', value: 'Pass required' },
        { label: 'Season', value: 'May-October' },
        { label: 'Hours', value: 'Dawn to dusk' }
      ]
  }),
    e(InfoBox, { title: '📋 Pass Info' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 3 } }, 
        'Annual Distribution:'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• 2 owner passes'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Guest passes vary'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Mailed by June 1'),
      e(Text, { style: { fontSize: typography.sizes.sm } }, '• Must be current')
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
    e(InfoBox, { 
      title: '⚠️ Safety',
      type: 'warning'
  },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.danger, marginBottom: 3 } }, 
        'NO LIFEGUARD ON DUTY'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
        'Swimming is at your own risk. Children under 12 must be supervised by an adult at all times.'
      )
    )
  ];

  // Facility amenities data
  const facilities = [
    {
      icon: '🏖️',
      title: 'Sandy Beach',
      description: 'Maintained beach area with seasonal sand replenishment'
  },
    {
      icon: '🏊',
      title: 'Swimming Area',
      description: 'Designated swimming zone with depth markers'
  },
    {
      icon: '🧺',
      title: 'Picnic Area',
      description: 'Tables and grassy areas for family gatherings'
  },
    {
      icon: '🎣',
      title: 'Fishing Dock',
      description: 'Catch & release fishing from dock and shoreline'
  }
  ];

  return [
    // Section Divider Page - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '06',
    //   title: 'DEER LAKE\nRECREATION AREA',
    //   description: 'Private recreational area exclusively for Blue Mountain property owners and their guests',
    //   backgroundColor: colors.primary,
    //   backgroundImage: assetMap.deerlakedock
    // }),
    
    // Page 1: Location & Access with Enhanced Features
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'LOCATION & ACCESS'),
        
        // Feature Box for Exclusive Access
        e(FeatureBox, {
          title: '🏔️ EXCLUSIVE MOUNTAIN RETREAT',
          content: 'Deer Lake serves as Blue Mountain\'s crown jewel - a private oasis reserved exclusively for property owners and their guests. This pristine recreational area offers a peaceful escape for swimming, fishing, and family gatherings in a natural mountain setting.'
      }),
        
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
        
        e(View, { style: lakeStyles.passBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: 2 } }, 
            '📧 Haven\'t received passes by June 1?'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 
            'Contact bmpoadeerlake@gmail.com with ownership verification'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'SEASONAL HOURS'),
        e(InlineInfo, {
          items: [
            { label: 'Summer (May-Sept)', value: 'Dawn to Dusk' },
            { label: 'Off-season', value: 'Weather permitting' }
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap['deer-lake'] || '27'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Facilities & Rules with Enhanced Amenities
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'FACILITIES & AMENITIES'),
        
        // Highlighted amenity features
        e(View, { style: lakeStyles.amenityGrid },
          ...facilities.map((facility, index) => 
            e(View, { key: index, style: lakeStyles.facilityCard },
              e(Text, { style: lakeStyles.facilityIcon }, facility.icon),
              e(Text, { style: lakeStyles.facilityTitle }, facility.title),
              e(Text, { style: lakeStyles.facilityDesc }, facility.description)
            )
          )
        ),
        
        e(CompactSubsectionHeader, null, 'SEASONAL ACTIVITIES'),
        
        e(FeatureBox, {
          title: '☀️ SUMMER HIGHLIGHTS',
          content: 'Peak season brings daily swimming, family picnics, and catch-and-release fishing. The beach area is maintained throughout summer with periodic sand replenishment. Popular for birthday parties and family reunions - advance planning recommended for large gatherings.'
      }),
        
        e(CompactSubsectionHeader, null, 'IMPORTANT GUIDELINES'),
        e(View, { style: { flexDirection: 'row', gap: 12 } },
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Water Safety'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• No lifeguard on duty'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Supervise children'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• No glass containers'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Swim at own risk')
          ),
          e(View, { style: { flex: 1 } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Activities'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• No motorized boats'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Catch & release only'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 1 } }, '• Quiet after 10 PM'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Clean up required')
          )
        ),
        
        e(View, { style: lakeStyles.highlightBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
            '🌟 COMMUNITY TIP'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Best swimming times are mid-afternoon when the sun has warmed the water. Early morning offers peaceful fishing and wildlife viewing. Consider bringing water shoes as the lake bottom can be rocky in places.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap['deer-lake'] || 27) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}