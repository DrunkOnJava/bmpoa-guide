import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { baseImageStyle, captionStyle } from '../imageStyles.js';
import { TableNoJSX } from './DesignComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function DeerLakePageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lakeStyles = StyleSheet.create({
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
    imageFloat: {
      width: 180,
      height: 120,
      marginRight: spacing.md,
      marginBottom: spacing.sm,
      objectFit: 'cover',
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
      fontSize: 10,
      color: colors.warmGray,
    },
    checklistItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
      fontSize: 10,
      color: colors.warmGray,
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
    },
    iconText: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing.sm,
    },
    icon: {
      fontSize: 16,
      marginRight: spacing.xs,
    }
  });

  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: lakeStyles.sectionDivider },
        e(Text, { style: lakeStyles.sectionNumber }, '06'),
        e(Text, { style: lakeStyles.sectionTitle }, 'DEER LAKE RECREATION AREA'),
        e(Text, { style: lakeStyles.sectionDescription }, 
          'Deer Lake is a private recreational area exclusively for Blue Mountain property owners and their guests. This section outlines access requirements, rules, and amenities available at this beautiful community resource.'
        )
      )
    ),
    
    // Location & Access Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LOCATION & ACCESS')
      ),
      e(
        View,
        null,
        // Add Deer Lake dock image at the top
        assetMap.deerlakedock && e(
          View,
          { style: { marginBottom: spacing.md } },
          e(
            Image,
            {
              src: assetMap.deerlakedock,
              style: {
                ...baseImageStyle,
                height: 180
              }
            }
          ),
          e(
            Text,
            { style: captionStyle },
            'The Deer Lake dock — open seasonally for swimming, sunbathing, and relaxation.'
          )
        ),
        
        e(Text, { style: lakeStyles.h3 }, 'DEER LAKE LOCATION'),
        
        e(View, { style: lakeStyles.iconText },
          e(Text, { style: lakeStyles.icon }, '📍'),
          e(Text, null, 'Address: 3367 Blue Mountain Road, Linden, Virginia 22630')
        ),
        e(Text, { style: lakeStyles.paragraph },
          'Deer Lake is nestled in a peaceful setting on Blue Mountain Road. The lake features a beach area, swimming area with a dock, picnic facilities, and fishing opportunities. It serves as a central gathering place for community events and a recreational retreat for residents.'
        ),
        
        e(Text, { style: lakeStyles.h3 }, 'EXCLUSIVE ACCESS'),
        e(Text, { style: lakeStyles.paragraph },
          'Deer Lake is for Blue Mountain property owners, their renters, and guests. Access is restricted to ensure the area remains a private amenity for our community members.'
        ),
        
        e(Text, { style: { fontWeight: 'bold', marginTop: spacing.sm } }, 'Access Requirements:'),
        e(View, { style: lakeStyles.iconText },
          e(Text, { style: { fontSize: 10, color: colors.forestGreen, marginRight: spacing.xs } }, '✓'),
          e(Text, { style: { fontSize: 10, color: colors.warmGray } }, 'A Blue Mountain Recreational Area Pass is required when using common areas')
        ),
        e(View, { style: lakeStyles.iconText },
          e(Text, { style: { fontSize: 10, color: colors.forestGreen, marginRight: spacing.xs } }, '✓'),
          e(Text, { style: { fontSize: 10, color: colors.warmGray } }, 'Guests under 18 must be accompanied by the property owner')
        ),
        e(View, { style: lakeStyles.iconText },
          e(Text, { style: { fontSize: 10, color: colors.forestGreen, marginRight: spacing.xs } }, '✓'),
          e(Text, { style: { fontSize: 10, color: colors.warmGray } }, 'Renters must obtain passes from their property owner')
        ),
        e(View, { style: lakeStyles.iconText },
          e(Text, { style: { fontSize: 10, color: colors.forestGreen, marginRight: spacing.xs } }, '✓'),
          e(Text, { style: { fontSize: 10, color: colors.warmGray } }, 'Those without a pass may be asked to leave or reported for trespassing')
        ),
        
        e(View, { style: lakeStyles.highlightBox },
          e(Text, { style: lakeStyles.highlightTitle }, 'OBTAINING YOUR PASSES'),
          e(Text, null, 
            'To receive your recreational area passes, email bmpoadeerlake@gmail.com with documentation verifying property ownership. Passes are typically mailed annually in May before the summer season begins.'
          )
        ),
        
        e(Text, { style: lakeStyles.h3 }, 'HOURS OF OPERATION'),
        e(View, { style: { marginTop: spacing.sm, marginBottom: spacing.md } },
          e(TableNoJSX, {
            headers: ['Season', 'Hours'],
            rows: [
              ['Summer (Memorial Day - Labor Day)', 'Dawn to Dusk'],
              ['Spring & Fall', 'Dawn to Dusk (weather permitting)'],
              ['Winter', 'Closed for season'],
              ['Special Events', 'As posted at entrance']
            ]
          })
        ),
        e(Text, { style: { fontSize: 10, fontStyle: 'italic', color: colors.warmGray } },
          'Swimming is permitted when conditions are safe. Beach area hours may be more restricted during summer and will be posted at the entrance.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '27')
      )
    ),

    // Recreational Area Passes Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'RECREATIONAL AREA PASSES')
      ),
      e(
        View,
        null,
        e(Text, { style: lakeStyles.h3 }, 'PASS DISTRIBUTION'),
        e(Text, { style: lakeStyles.paragraph }, 'Each property owner is issued a set number of recreational area passes, typically:'),
        
        e(Text, { style: lakeStyles.listItem }, '• Two permanent passes for property owners'),
        e(Text, { style: lakeStyles.listItem }, '• Additional guest passes as determined by the Board'),
        e(Text, { style: lakeStyles.listItem }, '• Special passes may be issued for events with advance notice'),
        
        e(Text, { style: lakeStyles.paragraph },
          "Passes are usually mailed to property owners in good standing (current on Sanitary District taxes) each spring before the summer season begins. If you haven't received your passes by June 1, or if you're a new property owner, contact bmpoadeerlake@gmail.com."
        ),
        
        e(View, { style: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.sm } },
          e(Text, { style: { fontSize: 16, color: colors.forestGreen, marginRight: 6 } }, '📜'),
          e(Text, { style: { fontSize: 16, fontWeight: 'bold', color: colors.accent } }, 'RULES & REGULATIONS')
        ),
        e(Text, { style: lakeStyles.paragraph }, 'To ensure everyone can enjoy Deer Lake safely and responsibly:'),
        
        e(Text, { style: { fontWeight: 'bold', marginTop: spacing.sm } }, 'General Rules:'),
        e(Text, { style: lakeStyles.listItem }, '• Swimming is at your own risk - no lifeguard on duty'),
        e(Text, { style: lakeStyles.listItem }, '• Children under 12 must be supervised by an adult at all times'),
        e(Text, { style: lakeStyles.listItem }, '• No glass containers in the beach or swimming areas'),
        e(Text, { style: lakeStyles.listItem }, '• Pets must be on leash and owners must clean up after them'),
        e(Text, { style: lakeStyles.listItem }, '• No motorized boats or watercraft'),
        e(Text, { style: lakeStyles.listItem }, '• Fishing is catch and release only'),
        e(Text, { style: lakeStyles.listItem }, '• No camping or overnight parking'),
        e(Text, { style: lakeStyles.listItem }, '• Quiet hours after 10 PM'),
        
        e(Text, { style: { fontWeight: 'bold', marginTop: spacing.sm, marginBottom: spacing.sm } }, 'Facilities & Amenities:'),
        
        // Amenities icons row
        e(View, { style: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.md } },
          e(View, { style: { alignItems: 'center' } },
            e(Text, { style: { fontSize: 36, color: colors.forestGreen } }, '🏖️'),
            e(Text, { style: { fontSize: 10, color: colors.warmGray, marginTop: 4 } }, 'Beach')
          ),
          e(View, { style: { alignItems: 'center' } },
            e(Text, { style: { fontSize: 36, color: colors.forestGreen } }, '🏊'),
            e(Text, { style: { fontSize: 10, color: colors.warmGray, marginTop: 4 } }, 'Swimming')
          ),
          e(View, { style: { alignItems: 'center' } },
            e(Text, { style: { fontSize: 36, color: colors.forestGreen } }, '🧺'),
            e(Text, { style: { fontSize: 10, color: colors.warmGray, marginTop: 4 } }, 'Picnic Area')
          ),
          e(View, { style: { alignItems: 'center' } },
            e(Text, { style: { fontSize: 36, color: colors.forestGreen } }, '🎣'),
            e(Text, { style: { fontSize: 10, color: colors.warmGray, marginTop: 4 } }, 'Fishing')
          )
        ),
        
        e(Text, { style: lakeStyles.listItem }, '• Beach area with sand'),
        e(Text, { style: lakeStyles.listItem }, '• Swimming dock'),
        e(Text, { style: lakeStyles.listItem }, '• Picnic tables and grills'),
        e(Text, { style: lakeStyles.listItem }, '• Portable restroom facilities (seasonal)'),
        e(Text, { style: lakeStyles.listItem }, '• Parking area'),
        e(Text, { style: lakeStyles.listItem }, '• Trash receptacles')
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '28')
      )
    )
  ];
}