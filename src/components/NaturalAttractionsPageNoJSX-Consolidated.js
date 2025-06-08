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
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import { FeatureBox, SidebarBox, Badge } from './AdvancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function NaturalAttractionsPageNoJSXConsolidated({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const attractionStyles = StyleSheet.create({
    wildlifeBox: {
      backgroundColor: '#FEF3C7',
      borderRadius: callout.radius,
      padding: spacing.md,
      marginVertical: spacing.sm,
      borderWidth: 1,
      borderColor: '#F59E0B',
  },
    safetyBox: {
      backgroundColor: colors.backgroundDanger,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginVertical: spacing.sm,
      borderWidth: 1,
      borderColor: '#DC2626',
  },
    floraSection: {
      marginVertical: spacing.md,
  },
    plantCategory: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
  },
    plantList: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkGray,
      paddingLeft: spacing.sm,
  },
    seasonalBox: {
      backgroundColor: colors.background,
      padding: spacing.sm,
      borderRadius: callout.radius,
      marginVertical: spacing.xs,
      borderLeft: `3px solid ${colors.accent}`,
  },
    seasonTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.accent,
      marginBottom: 2,
  },
    trailBox: {
      backgroundColor: '#F0F9FF',
      padding: spacing.md,
      borderRadius: callout.radius,
      marginVertical: spacing.sm,
      borderWidth: 1,
      borderColor: '#0EA5E9',
  },
    wildflowerGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.sm,
  },
    wildflowerItem: {
      width: '48%',
      fontSize: typography.sizes.sm,
      marginBottom: 2,
  }
});

  // Sidebar content for wildlife page
  const wildlifeSidebar = [
    e(SidebarBox, { 
      key: 'wildlife-safety',
      type: 'danger',
      title: 'WILDLIFE SAFETY'
  },
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Never feed wildlife'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Secure garbage/bird feeders'),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, '• Make noise when hiking'),
      e(Text, { style: { fontSize: typography.sizes.sm } }, '• Keep pets leashed')
    ),
    
    e(InfoBox, {
      key: 'nature-ethics',
      title: 'NATURE ETHICS',
      content: [
        'Leave No Trace principles:',
        '• Pack out all trash',
        '• Stay on marked trails',
        '• Don\'t pick wildflowers',
        '• Observe from distance',
        '• Respect wildlife'
      ]
  })
  ];

  // Sidebar content for attractions page
  const attractionsSidebar = [
    e(QuickFactsBox, { 
      key: 'trail-facts',
      title: 'TRAIL INFO',
      facts: [
        { label: 'Total Trails', value: '5+ miles' },
        { label: 'Difficulty', value: 'Easy-Moderate' },
        { label: 'Best Season', value: 'Spring/Fall' },
        { label: 'Wildlife', value: 'Abundant' },
        { label: 'Views', value: 'Spectacular' }
      ]
  }),
    
    e(ChecklistBox, {
      key: 'hiker-checklist',
      title: 'HIKER CHECKLIST',
      items: [
        'Water bottle',
        'Trail map',
        'Sturdy shoes',
        'Bug spray',
        'Sun protection',
        'Emergency whistle'
      ]
  })
  ];

  return [
    // Section Divider
    e(SectionDivider, {
      number: '10',
      title: 'NATURAL ATTRACTIONS',
      description: 'Wildlife, wildflowers, trails, and local attractions',
      backgroundColor: colors.forestGreen,
      backgroundImage: assetMap.virginiabluebells
  }),
    
    // Page 1: Wildlife & Flora - includes all wildflower content
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: wildlifeSidebar },
        e(CompactSectionHeader, null, 'WILDLIFE & FLORA'),
        
        e(DenseText, null,
          'Blue Mountain\'s diverse ecosystems support abundant wildlife and native plants. Understanding and respecting our natural neighbors enhances the mountain living experience.'
        ),
        
        // Wildlife section
        e(CompactSubsectionHeader, null, 'COMMON WILDLIFE'),
        
        e(View, { style: attractionStyles.wildlifeBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.xs } }, 
            'Mammals'
          ),
          e(TwoColumnList, {
            items: [
              'Black Bears - Active spring through fall',
              'White-tailed Deer - Year-round residents',
              'Gray & Red Foxes - Often seen at dusk',
              'Coyotes - Increasingly common',
              'Bobcats - Rare but present',
              'Raccoons, Opossums, Skunks'
            ]
        })
        ),
        
        e(View, { style: attractionStyles.wildlifeBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.xs } }, 
            'Birds'
          ),
          e(TwoColumnList, {
            items: [
              'Wild Turkeys - Large flocks common',
              'Hawks & Eagles - Red-tailed, Cooper\'s, Bald',
              'Owls - Great Horned, Barred, Screech',
              'Vultures - Turkey & Black',
              'Songbirds - Cardinals, Blue Jays, Wrens',
              'Hummingbirds - Ruby-throated (Apr-Oct)'
            ]
        })
        ),
        
        // Flora section with consolidated wildflower lists
        e(CompactSubsectionHeader, null, 'NATIVE FLORA'),
        e(DenseText, null,
          'Blue Mountain features a mix of deciduous and evergreen forests with diverse understory plants.'
        ),
        
        e(View, { style: attractionStyles.floraSection },
          e(Text, { style: attractionStyles.plantCategory }, 'Trees'),
          e(View, { style: attractionStyles.wildflowerGrid },
            e(Text, { style: attractionStyles.wildflowerItem }, '• Oak (White, Red, Chestnut)'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Hickory (Shagbark, Pignut)'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Tulip Poplar'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• American Beech'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Eastern Hemlock'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Virginia Pine')
          ),
          
          e(Text, { style: attractionStyles.plantCategory }, 'Spring Wildflowers'),
          e(View, { style: attractionStyles.wildflowerGrid },
            e(Text, { style: attractionStyles.wildflowerItem }, '• Trillium (Apr-May)'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Virginia Bluebells (Mar-Apr)'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Bloodroot (Mar-Apr)'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Wild Ginger'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Jack-in-the-Pulpit'),
            e(Text, { style: attractionStyles.wildflowerItem }, '• Spring Beauty')
          )
        ),
        
        // Seasonal highlights box
        e(View, { style: attractionStyles.seasonalBox },
          e(Text, { style: attractionStyles.seasonTitle }, '🌸 BEST VIEWING TIMES'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 'Spring (Mar-May): Wildflowers, migrating birds'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 'Summer (Jun-Aug): Butterflies, full canopy'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 'Fall (Sep-Nov): Foliage, wildlife preparing for winter'),
          e(Text, { style: { fontSize: typography.sizes.sm } }, 'Winter (Dec-Feb): Animal tracks, evergreens')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap['natural-attractions'] || '42'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),
    
    // Page 2: Trails & Wineries
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: attractionsSidebar },
        e(CompactSectionHeader, null, 'TRAILS & RECREATION'),
        
        // Trail information
        e(View, { style: attractionStyles.trailBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.xs } }, 
            '🥾 COMMUNITY TRAILS'
          ),
          e(DenseText, null,
            'Explore miles of maintained trails winding through our mountain community. From easy walks to moderate hikes, our trail system offers something for everyone.'
          ),
          e(View, { style: { marginTop: spacing.sm } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 'Popular Routes:'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Ridge Trail - 2 miles, moderate, panoramic views'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Deer Lake Loop - 1 mile, easy, lakeside path'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Old Forest Road - 3 miles, easy, historic sites'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Waterfall Trail - 1.5 miles, moderate, seasonal falls')
          )
        ),
        
        e(CompactSubsectionHeader, null, 'NEARBY ATTRACTIONS'),
        
        e(FeatureBox, {
          title: '🍷 LOCAL WINERIES',
          content: 'Warren County is home to several award-winning wineries, all within 20 minutes of Blue Mountain. Enjoy tastings, tours, and events year-round.'
      }),
        
        e(TwoColumnList, {
          items: [
            'Barrel Oak Winery - 10 min',
            'Naked Mountain Vineyard - 15 min',
            'Winding Road Cellars - 12 min',
            'Rappahannock Cellars - 20 min',
            'Chester Gap Cellars - 18 min',
            'Linden Vineyards - 15 min'
          ]
      }),
        
        // Local attractions
        e(CompactSubsectionHeader, null, 'AREA HIGHLIGHTS'),
        e(InfoBox, {
          title: 'EXPLORE WARREN COUNTY',
          content: [
            '• Shenandoah National Park - 20 min',
            '• Skyline Drive - Scenic overlooks',
            '• Shenandoah River - Canoeing/tubing',
            '• Luray Caverns - 30 min',
            '• Historic Front Royal - 15 min',
            '• Apple orchards & farms'
          ]
      }),
        
        // Final note
        e(View, { style: { marginTop: spacing.lg, padding: spacing.sm, backgroundColor: colors.background, borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', textAlign: 'center' } }, 
            'Living at Blue Mountain puts you at the gateway to Virginia\'s natural and cultural treasures. Enjoy exploring!'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap['natural-attractions'] || 42) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}