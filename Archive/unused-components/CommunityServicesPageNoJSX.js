import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mapStyle, captionStyle } from '../imageStyles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function CommunityServicesPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const servicesStyles = StyleSheet.create({
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
    serviceItem: {
      marginBottom: spacing.sm,
      paddingLeft: spacing.sm,
      borderLeft: `2px solid ${colors.background}`,
    },
    serviceName: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    continuationNotice: {
      fontSize: 10,
      color: colors.lightText,
      marginTop: 2,
    }
  });

  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: servicesStyles.sectionDivider },
        e(Text, { style: servicesStyles.sectionNumber }, '05'),
        e(Text, { style: servicesStyles.sectionTitle }, 'COMMUNITY SERVICES & AMENITIES'),
        e(Text, { style: servicesStyles.sectionDescription }, 
          'Blue Mountain offers various services and amenities that enhance our mountain living experience. This section provides information about road maintenance, waste disposal, utilities, and other essential services.'
        )
      )
    ),
    
    // Roads & Winter Weather Guidelines Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'ROADS & WINTER WEATHER GUIDELINES')
      ),
      e(
        View,
        null,
        e(Text, { style: servicesStyles.paragraph },
          'Blue Mountain\'s road network presents unique challenges, particularly during winter weather. Understanding road maintenance procedures and winter weather guidelines will help you navigate safely throughout the year.'
        ),
        
        e(Text, { style: servicesStyles.h3 }, 'ROAD MAINTENANCE RESPONSIBILITIES'),
        
        e(Text, { style: servicesStyles.paragraph },
          'Blue Mountain\'s roads are privately owned and maintained by the BMPOA through Sanitary District funds, with the exception of:'
        ),
        
        e(Text, { style: servicesStyles.listItem }, '• Fire Trail Road: This road is NOT owned or maintained by BMPOA. For concerns, contact VDGIF Region 4 Board of Directors.'),
        e(Text, { style: servicesStyles.listItem }, '• State-Maintained Roads: Certain connecting roads like portions of Blue Mountain Road and Freezeland Road are maintained by VDOT.'),
        
        e(Text, { style: servicesStyles.paragraph }, 'The BMPOA Roads Committee oversees maintenance, which includes:'),
        e(Text, { style: servicesStyles.listItem }, '• Regular grading of gravel roads'),
        e(Text, { style: servicesStyles.listItem }, '• Pothole filling'),
        e(Text, { style: servicesStyles.listItem }, '• Drainage management'),
        e(Text, { style: servicesStyles.listItem }, '• Winter weather response'),
        e(Text, { style: servicesStyles.listItem }, '• Vegetation control along roadways'),
        
        e(View, { style: servicesStyles.alertBox },
          e(Text, { style: servicesStyles.alertTitle }, 'SALT USE PROHIBITED'),
          e(Text, null, 
            'The use of salt on all gravel roads within BMPOA is strictly prohibited as it damages the roadbed and increases maintenance costs for the community. Use approved alternatives for traction instead.'
          )
        ),
        
        e(Text, { style: servicesStyles.h3 }, 'WINTER TRACTION OPTIONS'),
        
        e(Text, { style: servicesStyles.paragraph },
          'Gravel Chips: Look for blue poly barrels placed on hills for traction assistance. These barrels contain crushed gravel that can be spread on slippery areas to improve traction. After use, please notify the Roads Committee so barrels can be refilled as needed.'
        ),
        
        e(Text, { style: servicesStyles.paragraph },
          'Tire Chains: A great option when road conditions are poor. Ensure they fit your vehicle and practice installation in advance. Modern cable chains are generally easier to install than traditional link chains and usually provide adequate traction for Blue Mountain\'s roads.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '22')
      )
    ),

    // Roads & Winter Weather Guidelines Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'ROADS & WINTER WEATHER GUIDELINES'),
        e(Text, { style: servicesStyles.continuationNotice }, '(Continued from previous page)')
      ),
      e(
        View,
        null,
        e(Text, { style: servicesStyles.h3 }, 'SNOW & ICE REMOVAL'),
        
        e(Text, { style: servicesStyles.listItem }, '• Plowing begins when snow accumulation reaches 4 inches at a designated location on the mountain.'),
        e(Text, { style: servicesStyles.listItem }, '• Plowing priorities focus on main roads first, then secondary roads as conditions permit.'),
        e(Text, { style: servicesStyles.listItem }, '• Steep sections may require additional attention and are sometimes treated differently than flatter areas.'),
        e(Text, { style: servicesStyles.listItem }, '• During heavy snowfalls, multiple plowing passes may be needed as the storm progresses.'),
        e(Text, { style: servicesStyles.listItem }, '• Please be patient during major storms, as some areas may remain unplowed until conditions improve.'),
        
        e(Text, { style: servicesStyles.h3 }, 'FALLEN TREES & DEBRIS'),
        
        e(Text, { style: servicesStyles.listItem }, '• To report a downed tree blocking a roadway, use the contact form on the BMPOA website or email bmpoaroads@gmail.com.'),
        e(Text, { style: servicesStyles.listItem }, '• You may remove a fallen tree from a BMPOA roadway, but please do so safely.'),
        e(Text, { style: servicesStyles.listItem }, '• For safety, never attempt to remove trees entangled with utility lines.'),
        
        e(View, { style: servicesStyles.alertBox },
          e(Text, { style: servicesStyles.alertTitle }, 'UTILITY LINE SAFETY'),
          e(Text, { style: servicesStyles.listItem }, '• If an overhead line falls on your car, stay inside. If you must exit, jump clear without touching the car and ground simultaneously.'),
          e(Text, { style: servicesStyles.listItem }, '• Fallen trees on utility lines? Contact R.E.C. at (800) 552-3904 or visit myrec.coop/outagecenter.'),
          e(Text, { style: servicesStyles.listItem }, '• Always assume downed lines are energized and dangerous.')
        ),
        
        e(Text, { style: servicesStyles.h3 }, 'ROAD CONCERNS? LET US KNOW!'),
        
        e(Text, { style: servicesStyles.paragraph }, 'If you\'re unsatisfied with a road\'s condition, email bmpoaroads@gmail.com with:'),
        e(Text, { style: servicesStyles.listItem }, '• Name'),
        e(Text, { style: servicesStyles.listItem }, '• Email Address'),
        e(Text, { style: servicesStyles.listItem }, '• Location of Concern'),
        e(Text, { style: servicesStyles.listItem }, '• Photos (if applicable)'),
        
        e(View, { style: servicesStyles.infoBox },
          e(Text, { style: servicesStyles.highlightTitle }, 'WINTER DRIVING TIPS'),
          e(Text, { style: servicesStyles.listItem }, '• Maintain a greater following distance on slippery roads'),
          e(Text, { style: servicesStyles.listItem }, '• Brake gently to avoid skidding'),
          e(Text, { style: servicesStyles.listItem }, '• Drive slowly and accelerate and decelerate slowly'),
          e(Text, { style: servicesStyles.listItem }, '• Know your brakes - whether you have anti-lock brakes or not'),
          e(Text, { style: servicesStyles.listItem }, '• Don\'t stop when going up a hill if possible'),
          e(Text, { style: servicesStyles.listItem }, '• Stay home if conditions are dangerous')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '23')
      )
    ),

    // Refuse Collection & Disposal Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'REFUSE COLLECTION & DISPOSAL')
      ),
      e(
        View,
        null,
        e(Text, { style: servicesStyles.paragraph },
          'Proper waste management is especially important in our mountain community to maintain both environmental quality and wildlife safety. Blue Mountain does not have municipal trash collection, so residents have several options for waste disposal.'
        ),
        
        e(View, { style: servicesStyles.alertBox },
          e(Text, { style: servicesStyles.alertTitle }, 'BEAR SAFETY'),
          e(Text, null, 
            'Our community is located in bear habitat, and it is important to take precautions to avoid attracting bears. Improperly stored trash is one of the biggest attractants for bears and can lead to dangerous situations for both residents and wildlife.'
          )
        ),
        
        e(Text, { style: servicesStyles.h3 }, 'WARREN COUNTY CONVENIENCE SITES'),
        
        e(Text, { style: servicesStyles.paragraph },
          'Warren County offers five Citizen Convenience sites throughout the county for household waste disposal and recycling:'
        ),
        
        e(Text, { style: servicesStyles.listItem }, '• Bagged household waste can be disposed of at all locations.'),
        e(Text, { style: servicesStyles.listItem }, '• Large, bulky items (other than scrap metal) must be taken directly to the Bentonville site.'),
        
        e(Text, { style: servicesStyles.paragraph }, 'Locations convenient for BMPOA residents:'),
        
        e(Text, { style: servicesStyles.listItem }, '• Route 522/340 Cooley: 10037 Winchester Road, Front Royal'),
        e(Text, { style: servicesStyles.listItem }, '• Route 340 South Rockledge: 9823 Stonewall Jackson Highway, Front Royal'),
        e(Text, { style: servicesStyles.listItem }, '• Linden: 2664 Dismal Hollow Road, Linden'),
        e(Text, { style: servicesStyles.listItem }, '• Shenandoah Farms: 47 Blue Mountain Road, Front Royal'),
        e(Text, { style: servicesStyles.listItem }, '• Bentonville: 232 Shangri-La Road, Bentonville, Virginia 22610'),
        
        // Add Warren County waste map
        assetMap.warrencountywastemap && e(
          View,
          { style: { marginVertical: spacing.md } },
          e(
            Image,
            {
              src: assetMap.warrencountywastemap,
              style: mapStyle
            }
          ),
          e(
            Text,
            { style: captionStyle },
            'Map of waste disposal sites throughout Warren County. BMPOA residents use the Dismal Hollow Road site near Linden.'
          )
        ),
        
        e(View, { style: servicesStyles.infoBox },
          e(Text, { style: servicesStyles.highlightTitle }, 'CONVENIENCE SITE HOURS'),
          e(Text, null, 
            'Most convenience sites are open Tuesday through Saturday from 7:00 AM to 7:00 PM and Sunday from 9:00 AM to 5:00 PM. Sites are typically closed on Mondays and certain holidays. For the most current information, visit the Warren County Citizen Convenience Sites website.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '24')
      )
    ),

    // Refuse Collection & Disposal Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'REFUSE COLLECTION & DISPOSAL'),
        e(Text, { style: servicesStyles.continuationNotice }, '(Continued from previous page)')
      ),
      e(
        View,
        null,
        e(Text, { style: servicesStyles.h3 }, 'PRIVATE TRASH SERVICES'),
        
        e(Text, { style: servicesStyles.paragraph },
          'You also have the option to hire a private trash collection service for your convenience. To find reliable providers, ask your neighbors for recommendations or look online for local options.'
        ),
        
        e(Text, { style: servicesStyles.paragraph }, 'Common providers serving Blue Mountain include:'),
        e(Text, { style: servicesStyles.listItem }, '• Freedom Disposal Services: (540) 631-3467 (Northern Shenandoah Valley)'),
        e(Text, { style: servicesStyles.listItem }, '• Skyline Trash Service: (540) 974-9418'),
        
        e(Text, { style: servicesStyles.paragraph }, 'When using private trash service:'),
        e(Text, { style: servicesStyles.listItem }, '• Use bear-resistant containers if available'),
        e(Text, { style: servicesStyles.listItem }, '• Store containers in a secure location between pickups'),
        e(Text, { style: servicesStyles.listItem }, '• Put containers out the morning of pickup, not the night before'),
        e(Text, { style: servicesStyles.listItem }, '• Clean containers regularly to reduce odors'),
        
        e(Text, { style: servicesStyles.h3 }, 'RECYCLING OPTIONS'),
        
        e(Text, { style: servicesStyles.paragraph }, 'Warren County operates recycling centers at several convenience sites where you can dispose of:'),
        e(Text, { style: servicesStyles.listItem }, '• Paper products (newspapers, magazines, cardboard)'),
        e(Text, { style: servicesStyles.listItem }, '• Glass containers (clear, brown, green)'),
        e(Text, { style: servicesStyles.listItem }, '• Metal cans (aluminum, steel)'),
        e(Text, { style: servicesStyles.listItem }, '• Plastics (#1 and #2)'),
        e(Text, { style: servicesStyles.listItem }, '• Used motor oil (at designated sites)'),
        
        e(Text, { style: servicesStyles.paragraph }, 'For specific recycling guidelines and accepted materials, visit the Warren County Recycling page.'),
        
        e(Text, { style: servicesStyles.h3 }, 'SPECIAL WASTE DISPOSAL'),
        
        e(Text, { style: servicesStyles.paragraph },
          'Hazardous Waste: Warren County typically holds Household Hazardous Waste Collection events several times per year for items like paints, chemicals, batteries, and electronics. Check the county website for scheduled events.'
        ),
        
        e(Text, { style: servicesStyles.paragraph },
          'Yard Waste: The annual wood-chipping program helps with disposal of branches and brush. Leaves and grass clippings can be composted on your property or taken to the Bentonville Transfer Station when they accept such materials.'
        ),
        
        e(Text, { style: servicesStyles.paragraph },
          'Construction Debris: For renovation or construction waste, rent a temporary dumpster or take materials directly to the Bentonville Transfer Station.'
        ),
        
        e(View, { style: servicesStyles.alertBox },
          e(Text, { style: servicesStyles.alertTitle }, 'ILLEGAL DUMPING'),
          e(Text, null, 
            'Dumping of any materials on roadsides, in forests, or on other properties is strictly prohibited and can result in significant fines. If you observe illegal dumping, please report it to the Warren County Sheriff\'s Office at (540) 635-4128.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '25')
      )
    ),

    // Internet Service Providers Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'INTERNET SERVICE PROVIDERS')
      ),
      e(
        View,
        null,
        e(Text, { style: servicesStyles.paragraph },
          'Access to reliable internet service is increasingly important for both full-time and part-time residents. Due to our mountain location, service options can vary based on your specific location within Blue Mountain.'
        ),
        
        e(Text, { style: servicesStyles.h3 }, 'AVAILABLE PROVIDERS'),
        
        e(View, { style: servicesStyles.serviceItem },
          e(Text, { style: servicesStyles.serviceName }, 'Xfinity/Comcast'),
          e(Text, null, 'Cable internet service is available in many parts of Blue Mountain, offering relatively high-speed options. Contact them at 1-855-399-1542 to check availability at your specific address.')
        ),
        
        e(View, { style: servicesStyles.serviceItem },
          e(Text, { style: servicesStyles.serviceName }, 'Starlink (SpaceX)'),
          e(Text, null, 'Satellite internet service is available throughout the entire community, regardless of terrain or tree coverage. While requiring an initial equipment investment, it offers high speeds and low latency compared to traditional satellite options. Visit Starlink.com for subscription information.')
        ),
        
        e(View, { style: servicesStyles.serviceItem },
          e(Text, { style: servicesStyles.serviceName }, 'HughesNet'),
          e(Text, null, 'Satellite internet service is available throughout the entire community. While speeds are typically slower than cable options, it may be suitable for basic internet needs.')
        ),
        
        e(View, { style: servicesStyles.serviceItem },
          e(Text, { style: servicesStyles.serviceName }, 'Viasat'),
          e(Text, null, 'Another satellite internet provider serving the Blue Mountain area, offering various plans with different speed and data allowances.')
        ),
        
        e(View, { style: servicesStyles.serviceItem },
          e(Text, { style: servicesStyles.serviceName }, 'CenturyLink'),
          e(Text, null, 'DSL service may be available in some areas of Blue Mountain, though availability and speeds vary significantly by location.')
        ),
        
        e(View, { style: servicesStyles.serviceItem },
          e(Text, { style: servicesStyles.serviceName }, 'Mobile Hotspots'),
          e(Text, null, 'Some residents use cellular hotspots from providers like Verizon, AT&T, or T-Mobile, particularly for weekend or occasional use. Coverage quality varies by location on the mountain.')
        ),
        
        e(View, { style: servicesStyles.highlightBox },
          e(Text, { style: servicesStyles.highlightTitle }, 'INTERNET AVAILABILITY TIP'),
          e(Text, null, 
            'Before committing to a service provider, ask neighbors near your property about their experiences. Internet quality can vary dramatically even between properties on the same road due to terrain and tree coverage. Consider testing cellular signal strength at your property before choosing a mobile hotspot solution.'
          )
        ),
        
        e(Text, { style: servicesStyles.h3 }, 'REMOTE WORK CONSIDERATIONS'),
        
        e(Text, { style: servicesStyles.paragraph }, 'If you plan to work remotely from Blue Mountain, consider these factors:'),
        e(Text, { style: servicesStyles.listItem }, '• Request a service test before committing to a long-term contract'),
        e(Text, { style: servicesStyles.listItem }, '• Consider having a backup internet option for critical work (e.g., both cable and mobile hotspot)'),
        e(Text, { style: servicesStyles.listItem }, '• Power outages are more common in mountain areas, so a battery backup or generator may be necessary for consistent connectivity'),
        e(Text, { style: servicesStyles.listItem }, '• Some residents install cell signal boosters to improve mobile hotspot performance'),
        e(Text, { style: servicesStyles.listItem }, '• Check with your employer about minimum bandwidth requirements for remote work tools'),
        
        e(View, { style: servicesStyles.infoBox },
          e(Text, { style: servicesStyles.highlightTitle }, 'COMMUNITY INTERNET RESOURCES'),
          e(Text, null, 
            'The Blue Mountain Lodge offers Wi-Fi internet access when it\'s open for community events. The Front Royal library also provides free Wi-Fi and computer access during regular business hours for those who need occasional high-speed access or a backup option during outages.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '26')
      )
    )
  ];
}