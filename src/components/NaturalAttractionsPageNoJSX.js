import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function NaturalAttractionsPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;

  const attractionStyles = StyleSheet.create({
    sectionDivider: {
      backgroundColor: colors.primary,
      color: '#fff',
      padding: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
    },
    sectionNumber: {
      fontSize: 72,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    sectionDescription: {
      fontSize: 16,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.6,
    },
    alertBox: {
      backgroundColor: '#FFE4E1',
      borderLeft: `4px solid #DC143C`,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    alertTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: '#DC143C',
    },
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    highlightBox: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    highlightTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: colors.primary,
    },
    paragraph: {
      marginBottom: spacing.sm,
      textAlign: 'justify',
    },
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
    },
    h4: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    wineryContainer: {
      borderWidth: 1,
      borderColor: colors.background,
      backgroundColor: '#FAFAFA',
      padding: spacing.md,
      marginBottom: spacing.md,
      borderRadius: 4,
    },
    wineryName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 2,
    },
    wineryAddress: {
      fontSize: 11,
      marginBottom: spacing.xs,
    },
    wineryInfo: {
      fontSize: 11,
      lineHeight: 1.4,
    },
    trailContainer: {
      borderLeft: `3px solid ${colors.primary}`,
      paddingLeft: 18,  // 0.25 inch = 18pt for proper indentation
      marginBottom: spacing.md,
    },
    trailName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.accent,
      marginBottom: 2,
    },
    trailInfo: {
      fontSize: 11,
      lineHeight: 1.4,
      marginBottom: spacing.xs,  // Proper spacing between items
    },
    prominentText: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderLeft: `4px solid ${colors.primary}`,
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.primary,
    },
    plantList: {
      marginTop: spacing.xs,
      paddingLeft: spacing.sm,
    },
    plantCategory: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
      color: colors.accent,
    },
    pageImage: {
      width: '100%',
      height: 200,
      marginBottom: spacing.sm,
      objectFit: 'cover',
    },
    imageFloat: {
      width: 180,
      height: 120,
      marginRight: spacing.md,
      marginBottom: spacing.sm,
      objectFit: 'cover',
    },
    imageCaption: {
      fontSize: 10,
      fontStyle: 'italic',
      color: colors.lightText,
      textAlign: 'center',
      marginTop: 6,  // Increased to 6pt per enhancement plan
      marginBottom: spacing.md,
    },
    imageGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: spacing.md,
    },
    gridImage: {
      width: '48%',
      height: 150,
      objectFit: 'cover',
    }
  });

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '10',
      title: 'NATURAL ATTRACTIONS',
      description: 'Blue Mountain\'s natural beauty is one of its greatest assets. From spectacular spring wildflower displays to scenic hiking trails and award-winning wineries, our community offers year-round opportunities to connect with nature and enjoy the mountain lifestyle.',
      backgroundColor: colors.primary
    }),

    // Trilliums & Spring Wildflowers Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'TRILLIUMS & SPRING WILDFLOWERS')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.paragraph },
          'Each spring, Blue Mountain transforms into a botanical wonderland as thousands of wildflowers carpet the forest floor. The star of our spring show is the large-flowered trillium (Trillium grandiflorum), whose brilliant white blooms create breathtaking displays throughout our community.'
        ),

        e(Text, { style: attractionStyles.h3 }, 'THE TRILLIUM SPECTACLE'),

        e(Text, { style: attractionStyles.paragraph },
          'From mid-April to early May, Blue Mountain hosts one of Virginia\'s most impressive trillium displays. These three-petaled beauties emerge as the forest canopy is still developing, taking advantage of the spring sunlight. The flowers open pure white and gradually fade to pink as they age, creating a stunning tapestry of colors.'
        ),
        
        assetMap.trilliumbloomatthompsonwmainvirginia && e(
          View,
          { style: { marginTop: spacing.sm } },
          e(Image, { src: assetMap.trilliumbloomatthompsonwmainvirginia, style: attractionStyles.pageImage }),
          e(Text, { style: attractionStyles.imageCaption }, 'Spectacular trillium blooms at Thompson Wildlife Management Area')
        ),

        e(View, { style: attractionStyles.infoBox },
          e(Text, { style: attractionStyles.highlightTitle }, 'BEST VIEWING LOCATIONS'),
          e(Text, { style: attractionStyles.listItem }, '• Along Freezeland Road - both sides feature extensive colonies'),
          e(Text, { style: attractionStyles.listItem }, '• Thompson Wildlife Management Area - spectacular displays on north-facing slopes'),
          e(Text, { style: attractionStyles.listItem }, '• Blue Mountain Road near the Sanitary District - mixed wildflower meadows'),
          e(Text, { style: attractionStyles.listItem }, '• Private properties throughout the community (respect boundaries)')
        ),

        e(Text, { style: attractionStyles.h3 }, 'TRILLIUM FACTS'),

        e(Text, { style: attractionStyles.listItem }, '• Trilliums can take 7-10 years to bloom from seed'),
        e(Text, { style: attractionStyles.listItem }, '• Each plant produces only one flower per year'),
        e(Text, { style: attractionStyles.listItem }, '• The name comes from the Latin "tri" - everything comes in threes'),
        e(Text, { style: attractionStyles.listItem }, '• Seeds are dispersed by ants attracted to their nutritious coating'),
        e(Text, { style: attractionStyles.listItem }, '• Picking the flower can kill the entire plant'),

        e(View, { style: attractionStyles.alertBox },
          e(Text, { style: attractionStyles.alertTitle }, 'CONSERVATION NOTICE'),
          e(Text, null,
            'Trilliums are protected wildflowers. Never pick or transplant them from the wild. If you want trilliums in your garden, purchase nursery-propagated plants from reputable sources. Digging wild plants is illegal and threatens these spectacular displays for future generations.'
          )
        ),

        e(Text, { style: attractionStyles.h3 }, 'PHOTOGRAPHY TIPS'),

        e(Text, { style: attractionStyles.paragraph },
          'The trillium bloom attracts photographers from across the region. For best results:'
        ),
        e(Text, { style: attractionStyles.listItem }, '• Visit early morning or late afternoon for soft light'),
        e(Text, { style: attractionStyles.listItem }, '• Overcast days provide even lighting without harsh shadows'),
        e(Text, { style: attractionStyles.listItem }, '• Get low for dramatic angles showcasing the flowers against the sky'),
        e(Text, { style: attractionStyles.listItem }, '• Use a polarizing filter to reduce glare on petals'),
        e(Text, { style: attractionStyles.listItem }, '• Stay on trails to avoid trampling other wildflowers')
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '42')
      )
    ),

    // Trilliums & Spring Wildflowers Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'TRILLIUMS & SPRING WILDFLOWERS')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.h3 }, 'OTHER SPRING WILDFLOWERS'),

        e(Text, { style: attractionStyles.paragraph },
          'While trilliums steal the show, Blue Mountain hosts dozens of other native wildflower species that create a succession of blooms from March through June:'
        ),

        e(Text, { style: attractionStyles.h4 }, 'Early Spring (March-April)'),
        e(Text, { style: attractionStyles.listItem }, '• Bloodroot - delicate white flowers that last only days'),
        e(Text, { style: attractionStyles.listItem }, '• Spring Beauty - tiny pink-striped flowers in large colonies'),
        e(Text, { style: attractionStyles.listItem }, '• Dutchman\'s Breeches - white pantaloon-shaped blooms'),
        e(Text, { style: attractionStyles.listItem }, '• Virginia Bluebells - nodding blue flowers in moist areas'),
        e(Text, { style: attractionStyles.listItem }, '• Hepatica - fuzzy stems with blue, pink, or white flowers'),
        
        assetMap.virginiabluebells && e(
          View,
          { style: { marginTop: spacing.sm } },
          e(Image, { src: assetMap.virginiabluebells, style: attractionStyles.pageImage }),
          e(Text, { style: attractionStyles.imageCaption }, 'Virginia bluebells add a splash of color to moist woodland areas')
        ),

        e(Text, { style: attractionStyles.h4 }, 'Mid-Spring (April-May)'),
        e(Text, { style: attractionStyles.listItem }, '• Wild Geranium - pink flowers with deeply cut leaves'),
        e(Text, { style: attractionStyles.listItem }, '• May Apple - umbrella leaves hiding waxy white flowers'),
        e(Text, { style: attractionStyles.listItem }, '• Jack-in-the-Pulpit - unique hooded flowers'),
        e(Text, { style: attractionStyles.listItem }, '• Wild Ginger - hidden maroon flowers at ground level'),
        e(Text, { style: attractionStyles.listItem }, '• Solomon\'s Seal - arching stems with dangling flowers'),

        e(Text, { style: attractionStyles.h4 }, 'Late Spring (May-June)'),
        e(Text, { style: attractionStyles.listItem }, '• Wild Columbine - red and yellow drooping flowers'),
        e(Text, { style: attractionStyles.listItem }, '• Fire Pink - brilliant red star-shaped blooms'),
        e(Text, { style: attractionStyles.listItem }, '• Wild Phlox - fragrant purple flower clusters'),
        e(Text, { style: attractionStyles.listItem }, '• Spiderwort - three-petaled purple flowers'),

        e(View, { style: attractionStyles.highlightBox },
          e(Text, { style: attractionStyles.highlightTitle }, 'CREATING A WILDFLOWER GARDEN'),
          e(Text, { style: attractionStyles.paragraph },
            'Many Blue Mountain residents have successfully established native wildflower gardens. Key tips:'
          ),
          e(Text, { style: attractionStyles.listItem }, '• Choose a shady spot that mimics forest conditions'),
          e(Text, { style: attractionStyles.listItem }, '• Amend clay soil with leaf mold and compost'),
          e(Text, { style: attractionStyles.listItem }, '• Plant in fall for spring blooms'),
          e(Text, { style: attractionStyles.listItem }, '• Be patient - wildflowers take time to establish'),
          e(Text, { style: attractionStyles.listItem }, '• Never collect plants or seeds from the wild')
        ),

        e(Text, { style: attractionStyles.h3 }, 'WILDFLOWER WALKS & EVENTS'),

        e(Text, { style: attractionStyles.paragraph },
          'The Virginia Native Plant Society occasionally offers guided wildflower walks at Thompson Wildlife Management Area. Check their website or the BMPOA newsletter for scheduled events. Some residents also organize informal neighborhood wildflower walks during peak bloom - watch the Facebook groups for announcements.'
        ),

        e(View, { style: attractionStyles.prominentText },
          e(Text, null,
            'The annual trillium bloom has become a beloved Blue Mountain tradition, drawing visitors and creating lasting memories. By protecting these natural treasures, we ensure future generations can enjoy the same spectacular displays that make our community special.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '43')
      )
    ),

    // Native Plants & Landscaping Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'NATIVE PLANTS & LANDSCAPING')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.paragraph },
          'Creating beautiful landscapes while preserving Blue Mountain\'s natural character requires thoughtful plant selection. Native plants offer the best solution - they\'re adapted to our climate, support local wildlife, and require minimal maintenance once established.'
        ),

        e(Text, { style: attractionStyles.h3 }, 'WHY CHOOSE NATIVE PLANTS?'),

        e(Text, { style: attractionStyles.listItem }, '• Drought tolerance - deep roots access groundwater'),
        e(Text, { style: attractionStyles.listItem }, '• No fertilizers needed - adapted to local soils'),
        e(Text, { style: attractionStyles.listItem }, '• Pest resistance - co-evolved with local insects'),
        e(Text, { style: attractionStyles.listItem }, '• Wildlife value - provide food and habitat'),
        e(Text, { style: attractionStyles.listItem }, '• Erosion control - extensive root systems stabilize slopes'),
        e(Text, { style: attractionStyles.listItem }, '• Four-season interest - flowers, fall color, winter structure'),

        e(Text, { style: attractionStyles.h3 }, 'RECOMMENDED NATIVE PLANTS'),

        e(Text, { style: attractionStyles.plantCategory }, 'TREES'),
        e(View, { style: attractionStyles.plantList },
          e(Text, { style: attractionStyles.listItem }, '• Serviceberry (Amelanchier) - spring flowers, edible berries, fall color'),
          e(Text, { style: attractionStyles.listItem }, '• Redbud (Cercis canadensis) - pink spring flowers, heart-shaped leaves'),
          e(Text, { style: attractionStyles.listItem }, '• Dogwood (Cornus florida) - classic spring blooms, red fall berries'),
          e(Text, { style: attractionStyles.listItem }, '• American Holly (Ilex opaca) - evergreen, red berries for birds'),
          e(Text, { style: attractionStyles.listItem }, '• Red Maple (Acer rubrum) - fast growth, brilliant fall color')
        ),

        e(Text, { style: attractionStyles.plantCategory }, 'SHRUBS'),
        e(View, { style: attractionStyles.plantList },
          e(Text, { style: attractionStyles.listItem }, '• Mountain Laurel (Kalmia latifolia) - evergreen with showy flowers'),
          e(Text, { style: attractionStyles.listItem }, '• Spicebush (Lindera benzoin) - yellow flowers, spicy berries'),
          e(Text, { style: attractionStyles.listItem }, '• Elderberry (Sambucus) - flowers and berries for wildlife'),
          e(Text, { style: attractionStyles.listItem }, '• Virginia Sweetspire (Itea virginica) - fragrant flowers, red fall color'),
          e(Text, { style: attractionStyles.listItem }, '• Oakleaf Hydrangea (Hydrangea quercifolia) - large blooms, burgundy fall leaves')
        ),

        e(Text, { style: attractionStyles.plantCategory }, 'PERENNIALS'),
        e(View, { style: attractionStyles.plantList },
          e(Text, { style: attractionStyles.listItem }, '• Black-eyed Susan (Rudbeckia) - long-blooming golden flowers'),
          e(Text, { style: attractionStyles.listItem }, '• Purple Coneflower (Echinacea) - drought-tolerant, attracts butterflies'),
          e(Text, { style: attractionStyles.listItem }, '• Wild Bergamot (Monarda fistulosa) - fragrant, loved by bees'),
          e(Text, { style: attractionStyles.listItem }, '• Coral Bells (Heuchera americana) - colorful foliage for shade'),
          e(Text, { style: attractionStyles.listItem }, '• Christmas Fern (Polystichum acrostichoides) - evergreen groundcover')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '44')
      )
    ),

    // Native Plants & Landscaping Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'NATIVE PLANTS & LANDSCAPING')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.h3 }, 'LANDSCAPING CHALLENGES'),

        e(Text, { style: attractionStyles.paragraph },
          'Blue Mountain\'s terrain presents unique landscaping challenges that native plants are perfectly suited to address:'
        ),

        e(Text, { style: attractionStyles.h4 }, 'Steep Slopes'),
        e(Text, { style: attractionStyles.listItem }, '• Plant deep-rooted natives like sumac and elderberry'),
        e(Text, { style: attractionStyles.listItem }, '• Use groundcovers like wild ginger and creeping phlox'),
        e(Text, { style: attractionStyles.listItem }, '• Install temporary erosion control while plants establish'),
        e(Text, { style: attractionStyles.listItem }, '• Consider terracing for severely sloped areas'),

        e(Text, { style: attractionStyles.h4 }, 'Clay Soil'),
        e(Text, { style: attractionStyles.listItem }, '• Many natives tolerate clay better than exotic plants'),
        e(Text, { style: attractionStyles.listItem }, '• Improve drainage with organic matter, not sand'),
        e(Text, { style: attractionStyles.listItem }, '• Plant in raised beds for better drainage'),
        e(Text, { style: attractionStyles.listItem }, '• Choose clay-lovers like Joe Pye Weed and Ironweed'),

        e(Text, { style: attractionStyles.h4 }, 'Deer Pressure'),
        e(Text, { style: attractionStyles.listItem }, '• Select deer-resistant natives (though hungry deer eat anything)'),
        e(Text, { style: attractionStyles.listItem }, '• Ferns, hellebores, and aromatic plants often avoided'),
        e(Text, { style: attractionStyles.listItem }, '• Protect young plants with temporary fencing'),
        e(Text, { style: attractionStyles.listItem }, '• Plant in masses - some damage less noticeable'),

        e(View, { style: attractionStyles.infoBox },
          e(Text, { style: attractionStyles.highlightTitle }, 'LOCAL NATIVE PLANT SOURCES'),
          e(Text, { style: attractionStyles.listItem }, '• Earth Sangha (native plant nursery) - Springfield, VA'),
          e(Text, { style: attractionStyles.listItem }, '• Watermark Woods Native Plants - Hamilton, VA'),
          e(Text, { style: attractionStyles.listItem }, '• Hill House Farm & Nursery - Castleton, VA'),
          e(Text, { style: attractionStyles.listItem }, '• Nature By Design - Alexandria, VA'),
          e(Text, { style: attractionStyles.listItem }, '• Virginia Native Plant Society sales - various locations')
        ),

        e(Text, { style: attractionStyles.h3 }, 'INVASIVE SPECIES TO AVOID'),

        e(Text, { style: attractionStyles.paragraph },
          'These non-native plants aggressively spread and damage local ecosystems:'
        ),
        e(Text, { style: attractionStyles.listItem }, '• Japanese Honeysuckle - smothers native plants'),
        e(Text, { style: attractionStyles.listItem }, '• English Ivy - kills trees and harbors rats'),
        e(Text, { style: attractionStyles.listItem }, '• Autumn Olive - displaces native shrubs'),
        e(Text, { style: attractionStyles.listItem }, '• Japanese Stiltgrass - carpets forest floors'),
        e(Text, { style: attractionStyles.listItem }, '• Bradford Pear - weak wood, invasive seedlings'),
        e(Text, { style: attractionStyles.listItem }, '• Burning Bush - pretty but highly invasive'),

        e(View, { style: attractionStyles.prominentText },
          e(Text, null,
            'By choosing native plants, we create landscapes that are both beautiful and beneficial, supporting the web of life that makes Blue Mountain special while reducing maintenance time and costs.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '45')
      )
    ),

    // Local Wineries Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LOCAL WINERIES')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.paragraph },
          'Warren County has emerged as a premier wine destination in Virginia, with numerous award-winning wineries just minutes from Blue Mountain. Whether you prefer bold reds, crisp whites, or unique Virginia varietals, our local wineries offer exceptional tasting experiences with stunning mountain views.'
        ),
        
        // Add lead winery image
        assetMap.VineyardGreen && e(
          View,
          { style: { marginVertical: spacing.md } },
          e(
            Image,
            {
              src: assetMap.VineyardGreen,
              style: attractionStyles.pageImage
            }
          ),
          e(
            Text,
            { style: attractionStyles.imageCaption },
            'Early spring growth at a hillside vineyard near Linden.'
          )
        ),
        
        // Winery image grid
        e(View, { style: attractionStyles.imageGrid },
          assetMap.winery1 && e(Image, { src: assetMap.winery1, style: attractionStyles.gridImage }),
          assetMap.OverlookatVineyard && e(Image, { src: assetMap.OverlookatVineyard, style: attractionStyles.gridImage })
        ),

        e(Text, { style: attractionStyles.h3 }, 'NEARBY WINERIES'),

        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Slater Run Vineyard'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 3815 Harmony Hollow Road, Linden, VA 22642'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Fri-Sun 11-5 (extended summer hours)'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Exceptional views, small-batch wines'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Intimate tasting room, picnic areas, often has live music')
        ),

        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Winding Road Cellars'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 82 Winding Road, Linden, VA 22642'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Fri 1-8, Sat-Sun 12-6'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Traditional European-style wines'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Family-owned, dog-friendly, beautiful gardens')
        ),

        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Blue Valley Vineyard & Winery'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 3185 Blue Valley Lane, Delaplane, VA 20144'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Daily 11-6'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Award-winning Cabernet Franc'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Historic property, restaurant on-site, event venue')
        ),

        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Glen Manor Vineyards'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 15203 Leeds Manor Road, Front Royal, VA 22630'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Fri-Mon 11-5 (by reservation)'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Estate-grown Bordeaux varietals'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Historic estate, panoramic views, wine club benefits')
        ),

        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Chester Gap Cellars'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 9357 John Marshall Highway, Front Royal, VA 22630'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Wed-Sun 11-6'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Small production, hand-crafted wines'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Cozy tasting room, friendly staff, cheese platters available')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '46')
      )
    ),

    // Local Wineries Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LOCAL WINERIES')
      ),
      e(
        View,
        null,
        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Barrel Oak Winery'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 3623 Grove Lane, Delaplane, VA 20144'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Thu-Mon 11-6'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Bold reds and unique blends'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Dog-friendly, food trucks, live music weekends')
        ),

        e(View, { style: attractionStyles.wineryContainer },
          e(Text, { style: attractionStyles.wineryName }, 'Rappahannock Cellars'),
          e(Text, { style: attractionStyles.wineryAddress }, '📍 14437 Hume Road, Huntly, VA 22640'),
          e(Text, { style: attractionStyles.wineryInfo }, '⏰ Thu-Mon 11-5'),
          e(Text, { style: attractionStyles.wineryInfo }, '🍷 Known for: Viognier and Meritage blends'),
          e(Text, { style: attractionStyles.wineryInfo }, '✨ Cheese shop on-site, picnic areas, valley views')
        ),

        // Second winery image with caption
        assetMap.winery3 && e(
          View,
          { style: { marginVertical: spacing.md } },
          e(
            Image,
            {
              src: assetMap.winery3,
              style: attractionStyles.pageImage
            }
          ),
          e(
            Text,
            { style: attractionStyles.imageCaption },
            'Evening glow at a boutique winery — a signature landscape of the region.'
          )
        ),
        
        e(Text, { style: attractionStyles.h3 }, 'WINE TASTING TIPS'),

        e(Text, { style: attractionStyles.listItem }, '• Make reservations, especially on weekends'),
        e(Text, { style: attractionStyles.listItem }, '• Most charge tasting fees ($10-20) waived with purchase'),
        e(Text, { style: attractionStyles.listItem }, '• Bring a picnic - many allow outside food'),
        e(Text, { style: attractionStyles.listItem }, '• Designated driver essential - mountain roads + wine = danger'),
        e(Text, { style: attractionStyles.listItem }, '• Join wine clubs for discounts and exclusive events'),
        e(Text, { style: attractionStyles.listItem }, '• Spring and fall offer the best weather and views'),

        e(View, { style: attractionStyles.highlightBox },
          e(Text, { style: attractionStyles.highlightTitle }, 'WINE EVENTS & FESTIVALS'),
          e(Text, { style: attractionStyles.listItem }, '• Vintage Virginia (June) - state\'s premier wine festival'),
          e(Text, { style: attractionStyles.listItem }, '• Harvest season events (October) - grape stomps and celebrations'),
          e(Text, { style: attractionStyles.listItem }, '• Wine & Oyster Festival (November) - seafood and wine pairings'),
          e(Text, { style: attractionStyles.listItem }, '• Individual winery events - check websites for schedules')
        ),

        e(Text, { style: attractionStyles.h3 }, 'WINE TRAIL RESOURCES'),

        e(Text, { style: attractionStyles.listItem }, '• Virginia Wine website: virginiawine.org'),
        e(Text, { style: attractionStyles.listItem }, '• Fauquier Wine Council: fauquierwine.com'),
        e(Text, { style: attractionStyles.listItem }, '• Wine Trail apps for planning routes'),
        e(Text, { style: attractionStyles.listItem }, '• Local wine shops for bottles and advice'),

        e(View, { style: attractionStyles.infoBox },
          e(Text, { style: attractionStyles.highlightTitle }, 'RESPONSIBLE ENJOYMENT'),
          e(Text, null,
            'Please enjoy our local wineries responsibly. Use designated drivers, ride-sharing services, or wine tour companies. Many residents organize informal carpools for winery visits - check the Facebook groups. Remember, our mountain roads can be challenging even when sober!'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '47')
      )
    ),

    // Hiking Trails Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'HIKING TRAILS')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.paragraph },
          'Blue Mountain\'s location provides access to hundreds of miles of hiking trails, from gentle walks to challenging mountain ascents. Whether you\'re seeking solitude, exercise, or family adventure, the trails of the Northern Blue Ridge offer endless exploration opportunities.'
        ),
        
        // Add mountain overlook image as intro to hiking trails
        assetMap.mountainoverlook && e(
          View,
          { style: { marginVertical: spacing.md } },
          e(
            Image,
            {
              src: assetMap.mountainoverlook,
              style: {
                ...attractionStyles.pageImage,
                height: 200  // Slightly lower so text can appear below
              }
            }
          ),
          e(
            Text,
            { style: attractionStyles.imageCaption },
            'Sunset from the overlook trail — a favorite spot among hikers and photographers.'
          )
        ),

        e(Text, { style: attractionStyles.h3 }, 'THOMPSON WILDLIFE MANAGEMENT AREA'),

        e(Text, { style: attractionStyles.paragraph },
          'Our closest hiking destination, Thompson WMA covers 4,000 acres adjacent to Blue Mountain. Open year-round for hiking (check hunting seasons for safety).'
        ),

        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Lake Thompson Trail'),
          e(Text, { style: attractionStyles.trailInfo }, '🥾 Distance: 1.2 miles loop'),
          e(Text, { style: attractionStyles.trailInfo }, '📊 Difficulty: Easy'),
          e(Text, { style: attractionStyles.trailInfo }, '✨ Features: Scenic lake views, wildlife viewing, wildflowers'),
          e(Text, { style: attractionStyles.trailInfo }, '📍 Access: Parking area on Freezeland Road')
        ),

        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Verlin Smith Trail'),
          e(Text, { style: attractionStyles.trailInfo }, '🥾 Distance: 3.7 miles loop'),
          e(Text, { style: attractionStyles.trailInfo }, '📊 Difficulty: Moderate'),
          e(Text, { style: attractionStyles.trailInfo }, '✨ Features: Mountain views, diverse habitats, seasonal streams'),
          e(Text, { style: attractionStyles.trailInfo }, '📍 Access: Multiple trailheads from parking areas')
        ),

        e(Text, { style: attractionStyles.h3 }, 'SKY MEADOWS STATE PARK'),

        e(Text, { style: attractionStyles.paragraph },
          'Just 15 minutes away, Sky Meadows offers 1,862 acres of rolling meadows and wooded trails with spectacular views of the valley.'
        ),
        
        assetMap.mountainvista && e(
          View,
          { style: { marginTop: spacing.sm } },
          e(Image, { src: assetMap.mountainvista, style: attractionStyles.pageImage }),
          e(Text, { style: attractionStyles.imageCaption }, 'Wildflower-covered slopes open into the Shenandoah Valley below.')
        ),

        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Boston Mill Road Trail'),
          e(Text, { style: attractionStyles.trailInfo }, '🥾 Distance: 1.6 miles one-way'),
          e(Text, { style: attractionStyles.trailInfo }, '📊 Difficulty: Easy'),
          e(Text, { style: attractionStyles.trailInfo }, '✨ Features: Historic structures, meadow views'),
          e(Text, { style: attractionStyles.trailInfo }, '💰 Entry fee: $5-7 per vehicle')
        ),

        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Piedmont Overlook Trail'),
          e(Text, { style: attractionStyles.trailInfo }, '🥾 Distance: 1.2 miles loop'),
          e(Text, { style: attractionStyles.trailInfo }, '📊 Difficulty: Easy'),
          e(Text, { style: attractionStyles.trailInfo }, '✨ Features: Panoramic valley views, interpretive signs'),
          e(Text, { style: attractionStyles.trailInfo }, '🌅 Best at sunset')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '48')
      )
    ),

    // Hiking Trails Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'HIKING TRAILS')
      ),
      e(
        View,
        null,
        e(Text, { style: attractionStyles.h3 }, 'SHENANDOAH NATIONAL PARK'),

        e(Text, { style: attractionStyles.paragraph },
          'About 30 minutes from Blue Mountain, Shenandoah National Park offers world-class hiking along the Appalachian Trail and beyond.'
        ),

        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Compton Gap to Fort Windham Rocks'),
          e(Text, { style: attractionStyles.trailInfo }, '🥾 Distance: 2.4 miles out-and-back'),
          e(Text, { style: attractionStyles.trailInfo }, '📊 Difficulty: Moderate'),
          e(Text, { style: attractionStyles.trailInfo }, '✨ Features: Rock formations, valley views'),
          e(Text, { style: attractionStyles.trailInfo }, '📍 Access: Skyline Drive Mile 10.4')
        ),

        e(View, { style: attractionStyles.trailContainer },
          e(Text, { style: attractionStyles.trailName }, 'Overall Run Falls'),
          e(Text, { style: attractionStyles.trailInfo }, '🥾 Distance: 6.5 miles out-and-back'),
          e(Text, { style: attractionStyles.trailInfo }, '📊 Difficulty: Strenuous'),
          e(Text, { style: attractionStyles.trailInfo }, '✨ Features: Tallest waterfall in park (93 feet)'),
          e(Text, { style: attractionStyles.trailInfo }, '📍 Access: Mathews Arm Campground')
        ),

        e(Text, { style: attractionStyles.h3 }, 'HIKING SAFETY & ETIQUETTE'),

        e(View, { style: attractionStyles.alertBox },
          e(Text, { style: attractionStyles.alertTitle }, 'SAFETY ESSENTIALS'),
          e(Text, { style: attractionStyles.listItem }, '• Tell someone your plans and expected return'),
          e(Text, { style: attractionStyles.listItem }, '• Carry map, compass, and charged phone'),
          e(Text, { style: attractionStyles.listItem }, '• Bring water (1 liter per 2 hours minimum)'),
          e(Text, { style: attractionStyles.listItem }, '• Wear proper footwear and layers'),
          e(Text, { style: attractionStyles.listItem }, '• Check weather and adjust plans accordingly'),
          e(Text, { style: attractionStyles.listItem }, '• Know your limits and turn back if needed')
        ),

        e(Text, { style: attractionStyles.h4 }, 'Trail Etiquette'),
        e(Text, { style: attractionStyles.listItem }, '• Stay on marked trails to prevent erosion'),
        e(Text, { style: attractionStyles.listItem }, '• Pack out all trash (including fruit peels)'),
        e(Text, { style: attractionStyles.listItem }, '• Yield to uphill hikers'),
        e(Text, { style: attractionStyles.listItem }, '• Keep dogs leashed and clean up after them'),
        e(Text, { style: attractionStyles.listItem }, '• Respect wildlife - observe from distance'),
        e(Text, { style: attractionStyles.listItem }, '• Leave no trace - take only pictures'),

        e(View, { style: attractionStyles.highlightBox },
          e(Text, { style: attractionStyles.highlightTitle }, 'HIKING RESOURCES'),
          e(Text, { style: attractionStyles.listItem }, '• AllTrails app - trail maps and reviews'),
          e(Text, { style: attractionStyles.listItem }, '• Potomac Appalachian Trail Club - patc.net'),
          e(Text, { style: attractionStyles.listItem }, '• Shenandoah National Park - nps.gov/shen'),
          e(Text, { style: attractionStyles.listItem }, '• Virginia State Parks - dcr.virginia.gov'),
          e(Text, { style: attractionStyles.listItem }, '• Local hiking groups on Facebook')
        ),

        e(View, { style: attractionStyles.prominentText },
          e(Text, null,
            'The trails around Blue Mountain offer year-round opportunities to experience the natural beauty of the Blue Ridge. From spring wildflowers to fall foliage, each season brings new rewards for those who venture out to explore.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '49')
      )
    )
  ];
}