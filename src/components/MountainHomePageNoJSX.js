import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { baseImageStyle, captionStyle } from '../imageStyles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function MountainHomePageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const mountainStyles = StyleSheet.create({
    sectionDivider: {
      backgroundColor: colors.forestGreen,
      color: colors.white,
      padding: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
      marginTop: -54,
      marginHorizontal: -54,
      marginBottom: -54,
    },
    sectionNumber: {
      fontSize: 72,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: 36,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    sectionDescription: {
      fontSize: 12,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.5,
      fontStyle: 'italic',
      color: colors.white,
      opacity: 0.9,
    },
    highlightBox: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    alertBox: {
      backgroundColor: '#FFE4E1',
      borderLeft: `4px solid #DC143C`,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
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
    alertTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: '#DC143C',
    },
    prominentText: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderLeft: `12px solid ${colors.primary}`, // Widened to 12pt
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.primary,
    },
    paragraph: {
      marginBottom: spacing.sm,
      textAlign: 'left', // Changed from 'justify' to avoid gaps
    },
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
    },
    secondaryListItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.lg, // Secondary indentation
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
    },
    tipBox: {
      backgroundColor: '#F5F5F5', // Light gray background
      borderWidth: 0.5,
      borderColor: colors.slateGray,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    tipTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.forestGreen,
    }
  });

  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER' },
      e(
        View,
        { style: mountainStyles.sectionDivider },
        e(Text, { style: mountainStyles.sectionNumber }, '02'),
        e(Text, { style: mountainStyles.sectionTitle }, 'A MOUNTAIN HOME'),
        e(Text, { style: mountainStyles.sectionDescription }, 
          'Living on Blue Mountain offers a unique combination of natural beauty, privacy, and community'
        )
      )
    ),
    
    // Community Origins Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'COMMUNITY ORIGINS')
      ),
      e(
        View,
        null,
        e(Text, { style: mountainStyles.paragraph },
          'The Blue Mountain community was established in 1975 when developers recognized the unique appeal of this beautiful mountain setting. The development was designed to preserve much of the natural landscape while creating parcels for mountain homes with spectacular views.'
        ),
        
        e(Text, { style: mountainStyles.h3 }, 'HISTORICAL DEVELOPMENT'),
        e(Text, { style: mountainStyles.paragraph },
          'Blue Mountain was developed in phases, with the initial roads and infrastructure laid out to maximize the natural beauty of the terrain. The Sanitary District was established to ensure ongoing maintenance of these private roads and community amenities.'
        ),
        e(Text, { style: mountainStyles.paragraph },
          'Over the decades, the community has grown steadily, with a mix of year-round residents and weekend/vacation homeowners. Many of the original homes have been renovated and expanded, while new construction continues as remaining lots are developed.'
        ),
        
        e(Text, { style: mountainStyles.h3 }, 'COMMUNITY CHARACTER'),
        e(Text, { style: mountainStyles.paragraph },
          "Since its inception, Blue Mountain has maintained a commitment to preserving its natural environment and fostering a strong sense of community. Unlike many modern subdivisions, Blue Mountain has retained much of its original wooded character, with homes nestled among mature trees on spacious lots."
        ),
        
        e(Text, { style: mountainStyles.paragraph }, "The community's founding principles continue to guide its development, with an emphasis on:"),
        e(Text, { style: mountainStyles.listItem }, '• Respecting the natural landscape'),
        e(Text, { style: mountainStyles.listItem }, '• Maintaining privacy between homes'),
        e(Text, { style: mountainStyles.listItem }, '• Preserving wildlife habitat'),
        e(Text, { style: mountainStyles.listItem }, '• Creating a close-knit community through shared spaces and activities'),
        
        e(View, { style: mountainStyles.highlightBox },
          e(Text, { style: mountainStyles.highlightTitle }, 'BLUE MOUNTAIN NAME ORIGIN'),
          e(Text, null, 
            'The name "Blue Mountain" reflects the distinctive blue haze that often appears to envelope the mountain ranges in this region. This phenomenon is caused by natural isoprene emissions from trees that scatter blue light from the sun, creating the characteristic blue appearance that\'s especially noticeable from a distance.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '9')
      )
    ),

    // Seasonal and Permanent Residents Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'SEASONAL AND PERMANENT RESIDENTS')
      ),
      e(
        View,
        null,
        e(View, { style: [mountainStyles.tipBox, { marginBottom: spacing.sm }] },
          e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
            e(Text, { style: { fontSize: 16, marginRight: spacing.xs } }, '💡'),
            e(Text, { style: mountainStyles.tipTitle }, 'Tip:')
          ),
          e(Text, { style: { fontSize: typography.body } }, 
            'To fully appreciate the "Blue Mountain" effect, observe the mountain range from the valley on a clear day, especially in the morning when atmospheric conditions are most favorable.'
          )
        ),
        
        e(Text, { style: mountainStyles.paragraph },
          'Blue Mountain has a diverse community of both permanent year-round residents and seasonal/weekend homeowners. This mix creates a vibrant community with varying needs and perspectives, all of which contribute to our mountain\'s unique character.'
        ),
        
        e(Text, { style: mountainStyles.h3 }, 'YEAR-ROUND RESIDENTS'),
        e(Text, { style: mountainStyles.paragraph }, 'Many Blue Mountain homeowners live here permanently, including:'),
        e(Text, { style: mountainStyles.listItem }, '• Retirees enjoying mountain living full-time'),
        e(Text, { style: mountainStyles.listItem }, '• Professionals who commute to work in nearby areas'),
        e(Text, { style: mountainStyles.listItem }, '• Remote workers who can perform their jobs from home'),
        e(Text, { style: mountainStyles.listItem }, '• Families drawn to the natural setting and community atmosphere'),
        
        e(Text, { style: mountainStyles.h3 }, 'WEEKEND AND SEASONAL RESIDENTS'),
        e(Text, { style: mountainStyles.paragraph }, 'A significant portion of Blue Mountain homeowners use their properties as:'),
        e(Text, { style: mountainStyles.listItem }, '• Weekend retreats from urban areas like Washington D.C.'),
        e(Text, { style: mountainStyles.listItem }, '• Seasonal homes for different times of the year'),
        e(Text, { style: mountainStyles.listItem }, '• Vacation properties for family gatherings'),
        e(Text, { style: mountainStyles.listItem }, '• Future retirement homes'),
        
        e(View, { style: [mountainStyles.infoBox, { marginBottom: spacing.sm }] },
          e(Text, { style: mountainStyles.highlightTitle }, 'RENTAL PROPERTIES'),
          e(Text, { style: { fontSize: typography.body } }, 
            'Some Blue Mountain properties serve as short-term or long-term rentals. Property owners who rent their homes are responsible for ensuring that their tenants understand and follow community rules and guidelines. The BMPOA requests that property owners provide copies of key community documents to their renters and notify the Board when properties are being rented.'
          )
        ),
        
        e(Text, { style: [mountainStyles.paragraph, { marginBottom: 0 }] },
          "Whether you're a full-time resident or occasional visitor, we encourage you to participate in community activities and get to know your neighbors. The blend of perspectives and experiences among our residents enriches life on Blue Mountain."
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '10')
      )
    ),

    // Natural Beauty & Wildlife Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'NATURAL BEAUTY & WILDLIFE')
      ),
      e(
        View,
        null,
        e(Text, { style: mountainStyles.paragraph },
          "One of Blue Mountain's most treasured aspects is its abundant natural beauty and diverse wildlife. Living here means being immersed in the natural world, with opportunities to observe and appreciate the changing seasons and the many species that call our mountain home."
        ),
        
        // Add mountain vista image showcasing natural beauty
        assetMap.mountainvista && e(
          View,
          { style: { marginVertical: spacing.md } },
          e(
            Image,
            {
              src: assetMap.mountainvista,
              style: {
                ...baseImageStyle,
                height: 180  // Slightly reduced to fit with surrounding text blocks
              }
            }
          ),
          e(
            Text,
            { style: {...captionStyle, marginTop: 6} }, // 6pt spacing
            'Springtime views from the Blue Ridge showcase nature\'s renewal.'
          )
        ),
        
        e(Text, { style: mountainStyles.h3 }, 'SCENIC VIEWS'),
        e(Text, { style: mountainStyles.paragraph }, 'Blue Mountain is known for its spectacular vistas, particularly:'),
        e(Text, { style: mountainStyles.listItem }, '• Sweeping views of the Shenandoah Valley'),
        e(Text, { style: mountainStyles.listItem }, '• Distant mountain ranges visible on clear days'),
        e(Text, { style: mountainStyles.listItem }, '• Dramatic sunrises and sunsets'),
        e(Text, { style: mountainStyles.listItem }, '• Star-filled night skies with minimal light pollution'),
        
        e(Text, { style: mountainStyles.h3 }, 'SEASONAL BEAUTY'),
        e(Text, { style: mountainStyles.paragraph }, 'Each season brings its own distinctive charm to Blue Mountain:'),
        e(Text, { style: mountainStyles.listItem }, '• Spring: Wildflowers carpet the forest floor, dogwoods and redbuds bloom'),
        e(Text, { style: mountainStyles.listItem }, '• Summer: Dense, green canopies provide shade, butterflies visit flowering plants'),
        e(Text, { style: mountainStyles.listItem }, '• Fall: Spectacular foliage transforms the mountain with vivid reds, oranges, and golds'),
        e(Text, { style: mountainStyles.listItem }, '• Winter: Snow-covered landscapes create a serene atmosphere'),
        
        e(Text, { style: mountainStyles.h3 }, 'WILDLIFE ENCOUNTERS'),
        e(Text, { style: mountainStyles.listItem }, '• White-tailed deer, often seen in small groups'),
        e(Text, { style: mountainStyles.listItem }, '• Wild turkeys strutting through the forest'),
        e(Text, { style: mountainStyles.listItem }, '• Black bears, particularly in spring and fall'),
        e(Text, { style: mountainStyles.listItem }, '• Red and gray foxes'),
        e(Text, { style: mountainStyles.listItem }, '• A wide variety of songbirds, woodpeckers, and raptors'),
        
        e(View, { style: mountainStyles.alertBox },
          e(Text, { style: mountainStyles.alertTitle }, 'LIVING WITH BEARS'),
          e(Text, null, 
            'Black bears are part of our mountain ecosystem. To prevent unwanted encounters: secure trash in bear-resistant containers, remove bird feeders when bears are active, clean grills thoroughly, and never intentionally feed bears.'
          )
        ),
        
        e(View, { style: mountainStyles.prominentText },
          e(Text, null, 'The natural beauty and wildlife of Blue Mountain are precious resources that all residents help protect through mindful living practices.')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '11')
      )
    )
  ];
}