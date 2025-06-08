import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  InfoBox, 
  TwoColumnLayout
} from './EnhancedLayoutComponents.js';
import { ContactCard, ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';
import { ImageCaptionBox } from './ExtendedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js';
import { largeProportionalImage, mediumProportionalImage } from '../imageStyles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function NaturalAttractionsPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;

  const attractionStyles = StyleSheet.create({
    trailContainer: {
      borderLeft: `3px solid ${colors.primary}`,
      paddingLeft: 18,
      marginBottom: spacing.md,
  },
    trailName: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.accent,
      marginBottom: 2,
  },
    trailInfo: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
      marginBottom: spacing.xs,
  },
    wineryCard: {
      backgroundColor: '#FAFAFA',
      border: `1px solid ${colors.background}`,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginBottom: spacing.md,
  },
    wineryName: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: layout.spacing.xs,
  },
    plantCategory: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
      color: colors.accent,
  },
    plantList: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.normal,
      paddingLeft: spacing.sm,
  }
});

  return [
    // Section Divider with Virginia Bluebells - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '10',
    //   title: 'NATURAL ATTRACTIONS',
    //   description: 'Discover the natural beauty surrounding Blue Mountain, from scenic trails and wildlife to nearby wineries and outdoor recreation opportunities.',
    //   backgroundColor: colors.forestGreen,
    //   backgroundImage: assetMap.virginiabluebells
    // }),
    
    // Hiking Trails Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'HIKING TRAILS & SCENIC AREAS')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'Blue Mountain offers exceptional access to some of Virginia\'s most beautiful hiking trails and natural areas. From challenging mountain climbs to gentle nature walks, there\'s something for every outdoor enthusiast.'
        ),
        
        e(Text, { style: styles.h3 }, 'SHENANDOAH NATIONAL PARK'),
        
        e(InfoBox, {
          title: 'PARK ACCESS',
          content: [
            'Just 20 minutes from Blue Mountain',
            'Thornton Gap Entrance (Route 211)',
            'Annual Pass: $55 per vehicle',
            'Senior Pass: $20 (lifetime)',
            'Over 500 miles of trails'
          ]
      }),
        
        e(Text, { style: styles.h4 }, 'Popular Trails Near Blue Mountain'),
        
        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Old Rag Mountain'),
          e(Text, { style: attractionStyles.trailInfo }, 'Distance: 9.2 miles circuit'),
          e(Text, { style: attractionStyles.trailInfo }, 'Difficulty: Strenuous (rock scramble)'),
          e(Text, { style: attractionStyles.trailInfo }, 'Highlights: 360° summit views, unique rock formations'),
          e(Text, { style: attractionStyles.trailInfo }, 'Parking: Reserve at recreation.gov ($1 fee)')
        ),
        
        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Whiteoak Canyon'),
          e(Text, { style: attractionStyles.trailInfo }, 'Distance: 4.6 miles to first falls'),
          e(Text, { style: attractionStyles.trailInfo }, 'Difficulty: Moderate to strenuous'),
          e(Text, { style: attractionStyles.trailInfo }, 'Highlights: Six waterfalls, swimming holes'),
          e(Text, { style: attractionStyles.trailInfo }, 'Best time: Spring for full waterfalls')
        ),
        
        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Stony Man Summit'),
          e(Text, { style: attractionStyles.trailInfo }, 'Distance: 1.6 miles round trip'),
          e(Text, { style: attractionStyles.trailInfo }, 'Difficulty: Easy to moderate'),
          e(Text, { style: attractionStyles.trailInfo }, 'Highlights: Panoramic valley views'),
          e(Text, { style: attractionStyles.trailInfo }, 'Elevation: 4,011 feet summit')
        ),
        
        e(Text, { style: styles.h3 }, 'THOMPSON WILDLIFE MANAGEMENT AREA'),
        
        e(FeatureBox, {
          title: 'LOCAL HIKING DESTINATION',
          content: 'Located adjacent to Blue Mountain, Thompson WMA offers 4,000 acres of public land with miles of trails, hunting opportunities, and wildlife viewing. The Appalachian Trail runs along the western boundary.'
      }),
        
        e(ChecklistBox, {
          title: 'Thompson WMA Features',
          items: [
            'Multiple trail access points from Freezeland Road',
            'Lake Thompson for fishing (license required)',
            'Seasonal hunting (wear orange in season)',
            'Wildlife viewing: bear, deer, turkey',
            'Spring wildflowers and fall foliage'
          ]
      }),
        
        e(InfoBox, {
          title: 'TRAIL SAFETY',
          type: 'highlight',
          content: 'Always inform someone of your hiking plans. Carry water, snacks, and a first-aid kit. Cell service is limited in many areas. Download offline maps before hiking.'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.naturalAttractions || '42')
      )
    ),

    // Wildlife & Flora Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'WILDLIFE & FLORA')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            assetMap.trilliumbloomatthompsonwmainvirginia && e(ImageCaptionBox, {
              key: 'trillium',
              src: assetMap.trilliumbloomatthompsonwmainvirginia,
              caption: 'Trillium blooms herald spring on Blue Mountain',
              style: mediumProportionalImage
          }),
            
            e(InfoBox, {
              key: 'wildlife-safety',
              title: 'WILDLIFE SAFETY',
              type: 'highlight',
              content: 'Never feed wildlife. Secure garbage and bird feeders. If you encounter a bear, do not run - make noise and back away slowly.'
          }),
            
            e(InfoBox, {
              key: 'nature-ethics',
              title: 'Nature Ethics',
              type: 'highlight',
              content: [
                'Leave No Trace principles:',
                '• Pack out all trash',
                '• Stay on marked trails',
                '• Don\'t pick wildflowers',
                '• Observe from distance',
                '• Respect wildlife'
              ]
          })
          ]
      },
        
        e(Text, { 
          style: { marginBottom: spacing.sm }, 
          key: 'intro' 
      },
          'Blue Mountain\'s diverse ecosystem supports abundant wildlife and native plants. Understanding and respecting our natural neighbors enhances the mountain living experience.'
        ),
        
        e(Text, { 
          style: styles.h3, 
          key: 'wildlife' 
      }, 'COMMON WILDLIFE'),
        
        e(Text, { 
          style: styles.h4, 
          key: 'mammals' 
      }, 'Mammals'),
        
        e(ChecklistBox, {
          key: 'mammal-list',
          title: null,
          items: [
            'Black Bears - Active spring through fall',
            'White-tailed Deer - Year-round residents',
            'Gray & Red Foxes - Often seen at dusk',
            'Coyotes - Increasingly common',
            'Bobcats - Rare but present',
            'Raccoons, Opossums, Skunks'
          ]
      }),
        
        e(Text, { 
          style: styles.h4, 
          key: 'birds' 
      }, 'Birds'),
        
        e(ChecklistBox, {
          key: 'bird-list',
          title: null,
          items: [
            'Wild Turkeys - Large flocks common',
            'Hawks & Eagles - Red-tailed, Cooper\'s, Bald',
            'Owls - Great Horned, Barred, Screech',
            'Vultures - Turkey & Black',
            'Songbirds - Cardinals, Blue Jays, Wrens',
            'Hummingbirds - Ruby-throated (Apr-Oct)'
          ]
      }),
        
        e(Text, { 
          style: styles.h3, 
          key: 'flora' 
      }, 'NATIVE FLORA'),
        
        e(Text, { 
          style: { marginBottom: spacing.sm }, 
          key: 'flora-intro' 
      },
          'Blue Mountain features a mix of deciduous and evergreen forests with diverse understory plants:'
        ),
        
        e(View, { key: 'trees' },
          e(Text, { style: attractionStyles.plantCategory }, 'Trees'),
          e(Text, { style: attractionStyles.plantList }, 
            '• Oak (White, Red, Chestnut)\n• Hickory (Shagbark, Pignut)\n• Tulip Poplar\n• American Beech\n• Eastern Hemlock\n• Virginia Pine'
          )
        ),
        
        e(View, { key: 'flowering' },
          e(Text, { style: attractionStyles.plantCategory }, 'Spring Wildflowers'),
          e(Text, { style: attractionStyles.plantList }, 
            '• Trillium (Apr-May)\n• Virginia Bluebells (Mar-Apr)\n• Bloodroot (Mar-Apr)\n• Wild Ginger\n• Jack-in-the-Pulpit\n• Spring Beauty'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.naturalAttractions || 42) + 1)
      )
    ),

    // Wineries & Local Attractions Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'WINERIES & LOCAL ATTRACTIONS')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'Warren County is home to numerous wineries, breweries, and attractions that showcase the beauty and bounty of the Shenandoah Valley. Many offer stunning mountain views and are perfect for entertaining visiting friends and family.'
        ),
        
        e(Text, { style: styles.h3 }, 'NEARBY WINERIES'),
        
        e(View, { style: attractionStyles.wineryCard },
          e(Text, { style: attractionStyles.wineryName }, 'Winding Road Cellars'),
          e(Text, { style: { fontSize: typography.sizes.base, marginBottom: layout.spacing.xs } }, '467 Winding Road, Linden • 10 minutes'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Small family winery specializing in estate-grown wines. Beautiful sunset views from the deck. Live music weekends. Pet and family-friendly.'
          )
        ),
        
        e(View, { style: attractionStyles.wineryCard },
          e(Text, { style: attractionStyles.wineryName }, 'Slater Run Vineyards'),
          e(Text, { style: { fontSize: typography.sizes.base, marginBottom: layout.spacing.xs } }, '467 Slater Run Road, Linden • 15 minutes'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Boutique winery with panoramic mountain views. Known for their Bordeaux-style blends. Picnic areas available. Food trucks on weekends.'
          )
        ),
        
        e(View, { style: attractionStyles.wineryCard },
          e(Text, { style: attractionStyles.wineryName }, 'Glen Manor Vineyards'),
          e(Text, { style: { fontSize: typography.sizes.base, marginBottom: layout.spacing.xs } }, '2244 Browntown Road, Front Royal • 20 minutes'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Historic estate at 900ft elevation. Award-winning reds. Tours by appointment. Annual wine dinners and special events.'
          )
        ),
        
        e(Text, { style: styles.h3 }, 'LOCAL ATTRACTIONS'),
        
        e(InfoBox, {
          title: 'SKYLINE CAVERNS',
          content: [
            'Located in Front Royal (25 minutes)',
            'Year-round 54°F temperature',
            'Unique anthodite formations',
            'Mirror maze and mini golf',
            'Open daily, tours every 20-30 minutes'
          ]
      }),
        
        e(InfoBox, {
          title: 'SHENANDOAH RIVER',
          content: [
            'Multiple outfitters for tubing/kayaking',
            'Front Royal Canoe Company',
            'Shenandoah River Outfitters',
            'Best conditions: May through October',
            'Half-day and full-day trips available'
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'SEASONAL ATTRACTIONS'),
        
        e(FeatureBox, {
          title: 'APPLE ORCHARDS',
          content: 'September-October: Visit local orchards for apple picking, cider, and fall festivities. Rinker Orchards and Stribling Orchard offer pick-your-own apples, pumpkins, and family activities.'
      }),
        
        e(FeatureBox, {
          title: 'FARMERS MARKETS',
          content: 'Warren County Farmers Market (Saturdays, May-Oct) in Front Royal. Fresh produce, local meats, artisan goods, and live music. Great source for local honey and seasonal vegetables.'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.naturalAttractions || 42) + 2)
      )
    ),

    // Additional pages would continue here...
    // For brevity, I'm including just the key pages that demonstrate the enhancement
  ];
}