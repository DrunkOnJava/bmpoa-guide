import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { baseImageStyle, captionStyle } from '../imageStyles.js';
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
// import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function MountainHomePageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const mountainStyles = StyleSheet.create({
    compactImage: {
      width: '100%',
      height: 120,
      marginBottom: layout.spacing.xs,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
  },
    bearAlert: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 1,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: 6,
      marginTop: layout.spacing.sm,
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Established', value: '1975' },
        { label: 'Lots', value: '350+' },
        { label: 'Elevation', value: '1,800 ft' },
        { label: 'County', value: 'Warren' }
      ]
  }),
    e(InfoBox, { title: '🏔️ Name Origin' },
      e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic' } }, 
        'Blue haze from tree isoprene emissions scatters blue light, creating our mountain\'s signature appearance.'
      )
    ),
    e(InfoBox, { title: '📋 Principles' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Respect nature'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Privacy between homes'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Wildlife habitat'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• Community spaces')
      )
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(ForestGreenTable, {
      headers: ['Season', 'Highlights'],
      rows: [
        ['Spring', 'Wildflowers, dogwood'],
        ['Summer', 'Green canopy, butterflies'],
        ['Fall', 'Foliage: red, orange, gold'],
        ['Winter', 'Snow-covered serenity']
      ]
  }),
    e(InfoBox, { title: '🦌 Wildlife' },
      e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• White-tailed deer'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Wild turkeys'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Black bears'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Red & gray foxes'),
        e(Text, { style: { fontSize: typography.sizes.sm } }, '• Songbirds & raptors')
      )
    ),
    e(View, { style: mountainStyles.bearAlert },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.dangerDark, marginBottom: 3 } }, 
        '🐻 Bear Safety'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.normal } }, 
        'Secure trash, remove feeders, clean grills. See Section 12.'
      )
    )
  ];

  return [
    // Page 1: Community Origins & Character (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'COMMUNITY ORIGINS & CHARACTER'),
        
        e(CompactSubsectionHeader, null, 'HISTORICAL DEVELOPMENT'),
        e(DenseText, null,
          'Blue Mountain was established in 1975 when developers recognized this beautiful mountain setting\'s unique appeal. The development preserved the natural landscape while creating parcels for homes with spectacular views.'
        ),
        
        e(DenseText, null,
          'Developed in phases with roads and infrastructure maximizing terrain beauty. The Sanitary District ensures ongoing maintenance of private roads and amenities. The community has grown steadily with year-round residents and weekend homeowners.'
        ),
        
        e(CompactSubsectionHeader, null, 'COMMUNITY CHARACTER'),
        e(DenseText, null,
          'Blue Mountain maintains its commitment to preserving the natural environment and fostering strong community bonds. Unlike modern subdivisions, we\'ve retained our wooded character with homes nestled among mature trees on spacious lots.'
        ),
        
        e(CompactSubsectionHeader, null, 'RESIDENT MIX'),
        e(InlineInfo, {
          items: [
            { label: 'Full-time', value: '~60%' },
            { label: 'Seasonal', value: '~40%' }
          ]
      }),
        
        e(TwoColumnList, {
          items: [
            'Retirees living full-time',
            'Commuting professionals',
            'Remote workers',
            'Weekend retreat owners',
            'Seasonal residents',
            'Future retirees'
          ]
      }),
        
        e(View, { style: { backgroundColor: colors.backgroundAlt, padding: 6, marginTop: layout.spacing.sm, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: 3 } }, 
            '🏠 RENTAL PROPERTIES'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Owners renting properties must ensure tenants follow community rules. Provide key documents and notify Board of rental status.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '9'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Natural Beauty & Wildlife (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'NATURAL BEAUTY & WILDLIFE'),
        
        e(DenseText, null,
          'Blue Mountain\'s most treasured aspects include abundant natural beauty and diverse wildlife. Living here means immersion in the natural world with opportunities to observe changing seasons and native species.'
        ),
        
        // Compact image
        assetMap.mountainvista && e(
          View,
          { style: { marginVertical: 6 } },
          e(
            Image,
            {
              src: assetMap.mountainvista,
              style: mountainStyles.compactImage
          }
          ),
          e(
            Text,
            { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', textAlign: 'center' } },
            'Blue Ridge views showcase nature\'s renewal'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'SCENIC VIEWS'),
        e(TwoColumnList, {
          items: [
            'Shenandoah Valley vistas',
            'Distant mountain ranges',
            'Dramatic sunrises/sunsets',
            'Dark sky star viewing'
          ]
      }),
        
        e(CompactSubsectionHeader, null, 'COMMUNITY PARTICIPATION'),
        e(DenseText, null,
          'Whether full-time resident or occasional visitor, participate in community activities and know your neighbors. Our blend of perspectives enriches Blue Mountain life.'
        ),
        
        e(View, { style: { backgroundColor: colors.lightGray, padding: layout.spacing.sm, marginTop: layout.spacing.sm, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, fontStyle: 'italic', textAlign: 'center' } }, 
            'The natural beauty and wildlife of Blue Mountain are precious resources that all residents help protect through mindful living practices.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '10'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}