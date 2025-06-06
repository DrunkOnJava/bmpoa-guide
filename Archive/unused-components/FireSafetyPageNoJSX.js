import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { baseImageStyle, captionStyle } from '../imageStyles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function FireSafetyPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const fireStyles = StyleSheet.create({
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
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
    },
    paragraph: {
      marginBottom: spacing.sm,
      textAlign: 'justify',
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
    },
    zoneTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    checklistContainer: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    checklistTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: colors.primary,
    },
    checklistItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.md,
    },
    pageImage: {
      width: '100%',
      height: 200,
      marginBottom: spacing.sm,
      objectFit: 'cover',
    },
    imageCaption: {
      fontSize: 10,
      fontStyle: 'italic',
      color: colors.lightText,
      textAlign: 'center',
      marginBottom: spacing.md,
    }
  });

  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: fireStyles.sectionDivider },
        e(Text, { style: fireStyles.sectionNumber }, '04'),
        e(Text, { style: fireStyles.sectionTitle }, 'FIRE SAFETY &'),
        e(Text, { style: fireStyles.sectionTitle }, 'EMERGENCY PREPAREDNESS'),
        e(Text, { style: fireStyles.sectionDescription }, 
          'Living in our mountain community comes with unique safety considerations. This section provides critical information about wildfire risk, evacuation planning, and emergency preparation to keep your family and property safe.'
        )
      )
    ),
    
    // Wildfire Risk Understanding Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'WILDFIRE RISK UNDERSTANDING')
      ),
      e(
        View,
        null,
        e(Text, { style: fireStyles.paragraph },
          "Blue Mountain's wooded environment, while beautiful, presents significant wildfire risks that all community members should be aware of. Our location in a Wildland-Urban Interface (WUI) area means homes are interspersed with forests, increasing vulnerability to wildfires."
        ),
        
        assetMap.debrisfire && e(
          View,
          { style: { marginTop: spacing.md } },
          e(Image, { src: assetMap.debrisfire, style: fireStyles.pageImage }),
          e(Text, { style: fireStyles.imageCaption }, 'Debris fires can quickly spread in dry conditions, threatening homes and forest')
        ),
        
        e(Text, { style: fireStyles.h3 }, 'FIRE SEASON'),
        e(Text, { style: fireStyles.listItem }, '• Spring Fire Season: February 15 - April 30'),
        e(Text, { style: fireStyles.listItem }, '• Fall Fire Season: October 15 - November 30'),
        e(Text, { style: fireStyles.listItem }, '• Summer drought conditions can extend risk periods'),
        
        e(Text, { style: fireStyles.h3 }, 'UNDERSTANDING RISK LEVELS'),
        e(Text, { style: fireStyles.zoneTitle }, 'High Risk Areas'),
        e(Text, { style: fireStyles.paragraph },
          'Steep slopes, areas with dense vegetation, properties with unmaintained defensible space, and homes with wooden decks/roofs are at highest risk.'
        ),
        
        e(Text, { style: fireStyles.zoneTitle }, 'Moderate Risk Areas'),
        e(Text, { style: fireStyles.paragraph },
          'Properties with partial defensible space, some vegetation management, and homes with some fire-resistant features but remaining vulnerabilities.'
        ),
        
        e(Text, { style: fireStyles.zoneTitle }, 'Lower Risk Areas'),
        e(Text, { style: fireStyles.paragraph },
          'Properties with well-maintained defensible space (at least 30ft), fire-resistant landscaping, and homes with fire-resistant roofing and construction.'
        ),
        
        // Add debris fire image before the burning law box
        assetMap.debrisfire && e(
          View,
          { style: { marginVertical: spacing.md } },
          e(
            Image,
            {
              src: assetMap.debrisfire,
              style: {
                ...baseImageStyle,
                height: 220  // Taller to emphasize threat
              }
            }
          ),
          e(
            Text,
            { style: captionStyle },
            'Debris fires like this are strictly prohibited — even brief burns can lead to disaster.'
          )
        ),
        
        e(View, { style: fireStyles.alertBox },
          e(Text, { style: fireStyles.alertTitle }, '4 PM BURNING LAW'),
          e(Text, null, 
            'Open burning is forbidden at all times within BMPOA boundaries, even if Warren County lifts a burn ban. Warren County Code § 974.3575 prohibits burning within 300 ft of woods/dry grass before 4 PM. BMPOA prohibits open burning entirely. Violations are a Class 3 misdemeanor with fines up to $500 plus suppression costs.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '15')
      )
    ),

    // Evacuation Zones Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'EVACUATION ZONES & ROUTES')
      ),
      e(
        View,
        null,
        e(Text, { style: fireStyles.paragraph },
          'Blue Mountain has developed a comprehensive evacuation plan divided into zones to ensure an orderly and safe evacuation if needed. Familiarize yourself with these zones and routes before an emergency occurs.'
        ),
        
        e(Text, { style: fireStyles.h3 }, 'EVACUATION ZONES & PRIMARY ROUTES'),
        
        e(Text, { style: fireStyles.zoneTitle }, 'ZONE 1:'),
        e(Text, { style: fireStyles.listItem }, '• FAR VIEW, SHADY TREE, BLACK WALNUT: To Blue Mt Rd, then as directed'),
        e(Text, { style: fireStyles.listItem }, '• BLUE MOUNTAIN RD, DOGWOOD BLOSSOM: To Blue Mt Rd, then as directed'),
        e(Text, { style: fireStyles.listItem }, '• LITTLE INDIAN, LONESOME PINE, WOODCHUCK: To Blue Mt Rd, then as directed'),
        e(Text, { style: fireStyles.listItem }, '• HAWK HILL, LOST CREEK: Old Sawmill to Blue Mt Rd, then as directed'),
        e(Text, { style: fireStyles.listItem }, '• MOONSHINER, OLD SAWMILL: Old Sawmill to Blue Mt Rd, then as directed'),
        
        e(Text, { style: fireStyles.zoneTitle }, 'ZONE 2:'),
        e(Text, { style: fireStyles.listItem }, '• BLOOD ROOT, FERN TRAIL, JASPER: Old Sawmill to Blue Mt Rd, then as directed'),
        e(Text, { style: fireStyles.listItem }, '• MOCKINGBIRD, SPRING HILL, MOSSY ROCK: Spring Hill to Blue Mt Rd to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• PEE WEE: Uphill to Blue Mt Rd, L to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• ROCKY BOULDER, ROCK SPRING: Uphill to Firetrail, R to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• INDIAN PIPES, PARADISE, WOODHAVEN: Fire Trail, R to Freezeland'),
        
        e(Text, { style: fireStyles.zoneTitle }, 'ZONE 3:'),
        e(Text, { style: fireStyles.listItem }, '• BLUE MOUNTAIN RD: Uphill on Blue Mt Rd to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• CHIPMUNK TRAIL: Cliff to Blue Mt Rd, R to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• CLIFF: Down to Blue Mt Rd, R to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• HENRY, OLD DOMINION: Down to cliff, R to Blue Mt Rd, R to Freezeland'),
        e(Text, { style: fireStyles.listItem }, '• TRILLIUM TRAIL: Up to Blue Mt Rd, R to Freezeland')
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '16')
      )
    ),

    // Home Fire Protection Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'HOME FIRE PROTECTION STRATEGIES')
      ),
      e(
        View,
        null,
        e(Text, { style: fireStyles.paragraph },
          "Creating a defensible space around your home is essential to reducing wildfire risk. These strategies can significantly increase your home's chances of surviving a wildfire."
        ),
        
        e(Text, { style: fireStyles.h3 }, 'DEFENSIBLE SPACE ZONES'),
        
        e(Text, { style: fireStyles.zoneTitle }, 'Zone 1: 0-30 feet from structures'),
        e(Text, { style: fireStyles.listItem }, '• Remove all flammable materials including dead vegetation, woodpiles, and propane tanks'),
        e(Text, { style: fireStyles.listItem }, '• Keep grass mowed and irrigated if possible'),
        e(Text, { style: fireStyles.listItem }, '• Prune tree branches up 6-10 feet from the ground'),
        e(Text, { style: fireStyles.listItem }, '• Space trees so crowns are at least 10 feet apart'),
        e(Text, { style: fireStyles.listItem }, '• Choose fire-resistant plants for landscaping'),
        e(Text, { style: fireStyles.listItem }, '• Keep gutters and roof clear of leaves and debris'),
        
        e(Text, { style: fireStyles.zoneTitle }, 'Zone 2: 30-100 feet from structures'),
        e(Text, { style: fireStyles.listItem }, '• Reduce and space vegetation'),
        e(Text, { style: fireStyles.listItem }, '• Remove ladder fuels (vegetation that allows fire to climb from ground into tree canopy)'),
        e(Text, { style: fireStyles.listItem }, '• Create fuel breaks with driveways, walkways, and lawns'),
        e(Text, { style: fireStyles.listItem }, '• Keep firewood stacks at least 30 feet from structures'),
        
        e(Text, { style: fireStyles.h3 }, 'HOME HARDENING MEASURES'),
        e(Text, { style: fireStyles.listItem }, '• Install Class A fire-rated roofing materials (metal recommended)'),
        e(Text, { style: fireStyles.listItem }, '• Cover all vents with 1/8-inch metal mesh'),
        e(Text, { style: fireStyles.listItem }, '• Install dual-paned windows with tempered glass'),
        e(Text, { style: fireStyles.listItem }, '• Build decks with fire-resistant or non-combustible materials'),
        e(Text, { style: fireStyles.listItem }, '• Use non-combustible gutter covers')
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '18')
      )
    ),

    // Family Emergency Planning Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'FAMILY EMERGENCY PLANNING')
      ),
      e(
        View,
        null,
        e(Text, { style: fireStyles.paragraph },
          'Creating a family emergency plan specifically for wildfire events is essential for all Blue Mountain residents. This preparation can make all the difference during an evacuation situation.'
        ),
        
        e(View, { style: fireStyles.checklistContainer },
          e(Text, { style: fireStyles.checklistTitle }, 'FAMILY EVACUATION PLAN CHECKLIST'),
          e(Text, { style: fireStyles.checklistItem }, '□ Identify two escape routes from each room'),
          e(Text, { style: fireStyles.checklistItem }, '□ Choose multiple evacuation routes from your neighborhood'),
          e(Text, { style: fireStyles.checklistItem }, '□ Establish meeting places: near your home and outside the area'),
          e(Text, { style: fireStyles.checklistItem }, '□ Designate an out-of-area contact person'),
          e(Text, { style: fireStyles.checklistItem }, '□ Plan for pets and livestock evacuation'),
          e(Text, { style: fireStyles.checklistItem }, '□ Prepare an emergency supply kit'),
          e(Text, { style: fireStyles.checklistItem }, '□ Create a home inventory with photos for insurance'),
          e(Text, { style: fireStyles.checklistItem }, '□ Identify special needs (elderly, disabled, children)')
        ),
        
        e(Text, { style: fireStyles.h3 }, 'EMERGENCY SUPPLY KIT'),
        e(Text, { style: fireStyles.paragraph }, 'Pack an emergency kit that\'s easy to grab in case of evacuation:'),
        e(Text, { style: fireStyles.listItem }, '• Water (one gallon per person per day for at least three days)'),
        e(Text, { style: fireStyles.listItem }, '• Non-perishable food for at least three days'),
        e(Text, { style: fireStyles.listItem }, '• Battery-powered or hand-crank radio'),
        e(Text, { style: fireStyles.listItem }, '• Flashlight and extra batteries'),
        e(Text, { style: fireStyles.listItem }, '• First aid kit'),
        e(Text, { style: fireStyles.listItem }, '• Prescription medications and glasses'),
        e(Text, { style: fireStyles.listItem }, '• Important documents file'),
        e(Text, { style: fireStyles.listItem }, '• Cell phone with chargers'),
        
        e(View, { style: fireStyles.infoBox },
          e(Text, { style: fireStyles.alertTitle }, 'STAY INFORMED'),
          e(Text, null, 'Sign up for multiple notification systems:'),
          e(Text, { style: fireStyles.listItem }, '• Smart911: www.smart911.com'),
          e(Text, { style: fireStyles.listItem }, '• Warren County Emergency Notifications'),
          e(Text, { style: fireStyles.listItem }, '• NOAA Weather Radio'),
          e(Text, { style: fireStyles.listItem }, '• BMPOA Facebook groups')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '20')
      )
    )
  ];
}