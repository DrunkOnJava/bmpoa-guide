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
  TwoColumnList 
} from './EnhancedLayoutComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function DeerLakePageNoJSXEnhancedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lakeStyles = StyleSheet.create({
    featureBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    seasonalHours: {
      backgroundColor: colors.lightGray,
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginTop: layout.spacing.xs,
      marginBottom: layout.spacing.sm,
    },
    accessItem: {
      fontSize: typography.sizes.sm,
      marginBottom: 3,
      paddingLeft: 10,
    }
  });

  return [
    // Page 1: Recreation & Facilities
    e(
      Page,
      { key: 'deerlake-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, { 
            facts: [
              { label: 'Size', value: '~3 acres' },
              { label: 'Depth', value: '20+ feet' },
              { label: 'Type', value: 'Natural lake' },
              { label: 'Fish', value: 'Bass, bluegill' }
            ]
          }),
          e(InfoBox, { title: '📍 LOCATION' },
            e(Text, { style: { fontSize: typography.sizes.sm } }, '3367 Blue Mountain Road'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'Near Lodge'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: layout.spacing.xs, fontStyle: 'italic' } }, 
              'Look for Deer Lake sign'
            )
          ),
          e(InfoBox, { title: '🎣 FISHING' },
            e(Text, { style: { fontSize: typography.sizes.sm } }, 'Catch & release encouraged'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'State license required'),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 'No boat motors')
          )
        ]
      },
        e(CompactSectionHeader, null, 'DEER LAKE RECREATION'),
        
        e(DenseText, null,
          'Deer Lake serves as Blue Mountain\'s crown jewel - a private oasis reserved exclusively for property owners and their guests. This pristine recreational area offers a peaceful escape for swimming, fishing, and family gatherings in a natural mountain setting.'
        ),
        
        e(CompactSubsectionHeader, null, 'FACILITIES & AMENITIES'),
        
        e(CompactTable, {
          headers: ['Facility', 'Description', 'Notes'],
          rows: [
            ['Swimming Area', 'Sandy beach entry', 'No lifeguard'],
            ['Fishing Dock', 'Wooden pier structure', 'Catch & release'],
            ['Picnic Area', 'Tables and grills', 'First come basis'],
            ['Parking', 'Gravel lot for 20 cars', 'Overflow on grass'],
            ['Restrooms', 'Portable facilities', 'Seasonal only'],
            ['Boat Launch', 'Small craft only', 'No motors allowed']
          ]
        }),
        
        // Lake image
        assetMap.deerlakedock && e(
          View,
          { style: { marginVertical: 8 } },
          e(Image, { 
            src: assetMap.deerlakedock, 
            style: largeProportionalImage 
          }),
          e(Text, { style: captionStyle }, 
            'The Deer Lake dock — ideal for fishing and relaxation'
          )
        ),
        
        e(View, { style: { backgroundColor: '#E8F5E9', padding: layout.spacing.xs, borderRadius: callout.radius, marginBottom: layout.spacing.sm } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            'LAKE ACTIVITIES'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Swimming • Fishing (VA license) • Kayaking • Canoeing • Picnicking • Grilling • Wildlife observation • Photography'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '25'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Location & Access (Fixed to include all content)
    e(
      Page,
      { key: 'deerlake-2', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(InfoBox, { title: 'LAKE DETAILS' },
            e(View, null,
              e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, 
                'Location: 3367 Blue Mt Rd'
              ),
              e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, 
                'Type: Private lake'
              ),
              e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, 
                'Access: Pass required'
              ),
              e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, 
                'Season: May-October'
              ),
              e(Text, { style: { fontSize: typography.sizes.sm } }, 
                'Hours: Dawn to dusk'
              )
            )
          ),
          e(InfoBox, { title: 'PASS INFO' },
            e(Text, { style: { fontSize: typography.sizes.sm } }, 
              'Annual Distribution:'
            ),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, 
              '• 2 owner passes'
            ),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 
              '• Guest passes vary'
            ),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 
              '• Mailed by June 1'
            ),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 
              '• Must be current'
            )
          )
        ]
      },
        e(CompactSectionHeader, null, 'LOCATION & ACCESS'),
        
        e(View, { style: lakeStyles.featureBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
            'EXCLUSIVE MOUNTAIN RETREAT'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Deer Lake serves as Blue Mountain\'s crown jewel - a private oasis reserved exclusively for property owners and their guests. This pristine recreational area offers a peaceful escape for swimming, fishing, and family gatherings in a natural mountain setting.'
          )
        ),
        
        // Lake image with caption
        assetMap.deerlakedock && e(
          View,
          { style: { marginVertical: 8 } },
          e(Image, { 
            src: assetMap.deerlakedock, 
            style: { ...largeProportionalImage, height: 150 }
          }),
          e(Text, { style: captionStyle }, 
            'The Deer Lake dock — seasonal swimming and relaxation'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'ACCESS REQUIREMENTS'),
        
        e(View, null,
          e(Text, { style: lakeStyles.accessItem }, 
            '• Blue Mountain Recreational Pass required'
          ),
          e(Text, { style: { ...lakeStyles.accessItem, fontStyle: 'italic' } }, 
            '  Trespassing violations will be reported'
          ),
          e(Text, { style: lakeStyles.accessItem }, 
            '• Guests under 18 need owner present'
          ),
          e(Text, { style: lakeStyles.accessItem }, 
            '• Renters must obtain passes from owner'
          ),
          e(Text, { style: { ...lakeStyles.accessItem, fontStyle: 'italic', marginTop: 4 } }, 
            'Haven\'t received passes by June 1? Contact bmpoadeerake@gmail.com with ownership verification'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'SEASONAL HOURS'),
        
        // Fixed: Include all seasonal hours content on same page
        e(View, { style: lakeStyles.seasonalHours },
          e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center' } }, 
            'Summer (May-Sept): Dawn to Dusk | Off-season: Weather permitting'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '26'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}