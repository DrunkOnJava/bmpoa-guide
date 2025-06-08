import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { typography, layout, colors, callout } from '../designTokens.js';
import { styles } from '../theme.js';
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
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function NaturalAttractionsPageNoJSXConsolidatedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const attractionStyles = StyleSheet.create({
    trailBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    wildlifeBox: {
      backgroundColor: '#E8F5E9',
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.xs,
    },
    floraBox: {
      backgroundColor: '#FFF9C4',
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.xs,
    }
  });

  return [
    // Page 1: Trails & Wildlife
    e(
      Page,
      { key: 'attractions-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, { 
            facts: [
              { label: 'Elevation', value: '1,800+ feet' },
              { label: 'Trails', value: '5+ miles' },
              { label: 'Wildlife', value: '40+ species' },
              { label: 'Season', value: 'Year-round' },
              { label: 'Difficulty', value: 'Easy-Moderate' }
            ]
          }),
          e(InfoBox, { title: '🌲 FLORA GUIDE' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginBottom: 2 } }, 'Common Trees:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• American Beech'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Eastern Hemlock'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Virginia Pine'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• White Oak'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4, marginBottom: 2 } }, 'Spring Wildflowers:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Trillium • Virginia Bluebells'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Bloodroot • Wild Ginger'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Jack-in-the-Pulpit'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Spring Beauty')
          ),
          e(InfoBox, { title: '🦌 WILDLIFE TIPS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Best viewing: Early morning/evening'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Stay quiet and move slowly'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Keep pets leashed'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Bring binoculars')
          )
        ]
      },
        e(CompactSectionHeader, null, 'NATURAL ATTRACTIONS'),
        
        e(DenseText, null,
          'Blue Mountain offers abundant opportunities to experience Virginia\'s natural beauty. Our elevated location provides cooler summers, spectacular fall foliage, and diverse wildlife viewing throughout the year.'
        ),

        e(CompactSubsectionHeader, null, 'HIKING TRAILS & PATHS'),
        
        e(View, { style: attractionStyles.trailBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'BLUE MOUNTAIN TRAIL NETWORK'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Multiple connected trails wind through our community offering easy to moderate hiking. ' +
            'Well-marked paths lead to scenic overlooks, seasonal wildflower displays, and peaceful forest settings. ' +
            'Trail maps available at the Lodge and online.'
          )
        ),

        e(CompactSubsectionHeader, null, 'SEASONAL HIGHLIGHTS'),
        
        e(CompactTable, {
          headers: ['Season', 'Highlights', 'Best Activities'],
          rows: [
            ['Spring', 'Wildflower blooms, migrating birds', 'Hiking, photography'],
            ['Summer', 'Cool temperatures, full foliage', 'Trail walking, wildlife viewing'],
            ['Fall', 'Spectacular foliage, clear skies', 'Hiking, stargazing'],
            ['Winter', 'Snow-covered landscape, wildlife tracks', 'Snowshoeing, tracking']
          ]
        }),

        e(CompactSubsectionHeader, null, 'WILDLIFE VIEWING'),
        
        e(DenseText, null,
          'Blue Mountain is home to diverse wildlife including white-tailed deer, black bears, wild turkeys, various raptors, and numerous songbird species. The best viewing opportunities occur during early morning and evening hours when animals are most active.'
        ),

        e(View, { style: { flexDirection: 'row', flexWrap: 'wrap', marginTop: layout.spacing.xs } },
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• White-tailed deer'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Wild turkey'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Black bears'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Red-tailed hawks'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Barred owls'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Songbirds (40+ species)')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '43'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Conservation & Guidelines
    e(
      Page,
      { key: 'attractions-2', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(InfoBox, { title: '📋 TRAIL ETIQUETTE' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Stay on marked trails'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Pack out all trash'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Keep pets leashed'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• Respect private property'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '• No campfires or smoking')
          ),
          e(InfoBox, { title: '🚨 SAFETY REMINDERS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Tell someone your hiking plans'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Carry water and first aid'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Watch for poisonous plants'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Be bear aware (see Bear Safety)'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Check weather conditions')
          )
        ]
      },
        e(CompactSectionHeader, null, 'CONSERVATION & STEWARDSHIP'),
        
        e(DenseText, null,
          'As residents of this beautiful mountain environment, we all share responsibility for preserving and protecting the natural resources that make Blue Mountain special for current and future generations.'
        ),

        e(CompactSubsectionHeader, null, 'ENVIRONMENTAL PROTECTION'),
        
        e(View, { style: attractionStyles.wildlifeBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 
            'WILDLIFE HABITAT PRESERVATION'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Maintain native vegetation where possible • Avoid excessive outdoor lighting that disrupts nocturnal wildlife • ' +
            'Create wildlife corridors between properties • Minimize use of chemicals and pesticides near water sources'
          )
        ),

        e(CompactSubsectionHeader, null, 'TRAIL MAINTENANCE'),
        
        e(DenseText, null,
          'Trail maintenance is a community effort coordinated by volunteers. Work days are scheduled seasonally to clear debris, repair erosion damage, and update trail markers. Contact the BMPOA Board to volunteer.'
        ),

        e(CompactSubsectionHeader, null, 'PHOTOGRAPHY GUIDELINES'),
        
        e(DenseText, null,
          'Blue Mountain offers excellent photography opportunities year-round. Please practice ethical wildlife photography by maintaining safe distances, avoiding flash photography that may disturb animals, and not baiting or feeding wildlife for photos.'
        ),

        e(CompactSubsectionHeader, null, 'REPORTING ISSUES'),
        
        e(View, { style: attractionStyles.floraBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 
            'WHAT TO REPORT'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Damaged trail markers or bridges • Erosion or safety hazards • Invasive plant species • ' +
            'Injured wildlife • Unauthorized trail modifications • Littering or vandalism'
          )
        ),

        e(DenseText, null,
          'Report trail issues to any Board member or post on the BMPOA Facebook group. Emergency situations involving injured wildlife should be reported to Virginia Department of Wildlife Resources.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '44'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}