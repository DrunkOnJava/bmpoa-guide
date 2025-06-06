import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { lodgeImageStyle, captionStyle } from '../imageStyles.js';
import { TableNoJSX } from './DesignComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function LodgePageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lodgeStyles = StyleSheet.create({
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
    pageImage: {
      width: '100%',
      height: 200,
      marginBottom: spacing.sm,
      objectFit: 'cover',
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
      borderRadius: 6,
    },
    imageCaption: {
      fontSize: 10,
      fontStyle: 'italic',
      color: colors.lightText,
      textAlign: 'center',
      marginTop: 6,           // Increased from default to 6pt per enhancement plan
      marginBottom: spacing.md,
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
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
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
      marginBottom: 12,  // 12pt spacing between items
      paddingLeft: 18,   // 0.25 inch = 18pt
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
        { style: lodgeStyles.sectionDivider },
        e(Text, { style: lodgeStyles.sectionNumber }, '07'),
        e(Text, { style: lodgeStyles.sectionTitle }, 'THE LODGE'),
        e(Text, { style: lodgeStyles.sectionDescription }, 
          "The Blue Mountain Lodge serves as our community's central gathering place. This section provides information about the Lodge's facilities, rental procedures, and usage guidelines for all community members."
        )
      )
    ),
    
    // Lodge Location & Features Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LODGE LOCATION & FEATURES')
      ),
      e(
        View,
        null,
        assetMap.TheLodge && e(Image, { src: assetMap.TheLodge, style: lodgeStyles.pageImage }),
        e(Text, { style: lodgeStyles.imageCaption }, 'The Blue Mountain Lodge offers a spacious venue for community gatherings'),
        
        e(View, { style: lodgeStyles.iconText },
          e(Text, { style: lodgeStyles.icon }, '📍'),
          e(Text, null, 'Address: 540 Cliff Road, Linden, VA 22642')
        ),
        
        e(Text, { style: lodgeStyles.paragraph },
          'The Blue Mountain Lodge is a community-owned facility that serves as the heart of our social activities and governance. Beautifully situated on Cliff Road with panoramic views of the valley, the Lodge provides an ideal setting for both formal meetings and casual gatherings.'
        ),
        
        e(Text, { style: lodgeStyles.h3 }, 'FACILITY FEATURES'),
        e(Text, { style: lodgeStyles.listItem }, '• Main Hall: Accommodates up to 100 guests with flexible seating arrangements'),
        e(Text, { style: lodgeStyles.listItem }, '• Commercial Kitchen: Fully equipped with professional appliances'),
        e(Text, { style: lodgeStyles.listItem }, '• Restrooms: ADA-compliant facilities for men and women'),
        e(Text, { style: lodgeStyles.listItem }, '• Lounge Area: Comfortable seating area with stone fireplace'),
        e(Text, { style: lodgeStyles.listItem }, '• Wraparound Deck: Outdoor space with mountain views'),
        e(Text, { style: lodgeStyles.listItem }, '• Parking: Ample parking for approximately 40 vehicles'),
        
        assetMap.lodgeinterior && e(
          View,
          { style: { marginTop: spacing.md } },
          e(Image, { src: assetMap.lodgeinterior, style: lodgeImageStyle }),
          e(Text, { style: captionStyle }, 'Main hall of the Blue Mountain Lodge — available for events and private rentals.')
        ),
        
        e(Text, { style: lodgeStyles.h3 }, 'REGULAR ACTIVITIES'),
        e(Text, { style: lodgeStyles.listItem }, '• Monthly Board Meetings: Second Monday of each month at 6:00 PM EST'),
        e(Text, { style: lodgeStyles.listItem }, '• Social Committee Events: Quarterly gatherings and seasonal celebrations'),
        e(Text, { style: lodgeStyles.listItem }, '• Yoga Classes: Weekly sessions (check schedule on BMPOA website)'),
        e(Text, { style: lodgeStyles.listItem }, '• Private Events: Available for rental by property owners'),
        
        e(View, { style: lodgeStyles.infoBox },
          e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
            e(Text, { style: { fontSize: 16, color: '#1E40AF', marginRight: spacing.xs } }, '♿'),
            e(Text, { style: lodgeStyles.highlightTitle }, 'ACCESSIBILITY')
          ),
          e(Text, null, 
            'The Lodge is wheelchair accessible with ramp access to the main entrance and ADA-compliant restroom facilities. Please contact the Lodge Committee if you have specific accessibility needs for your event.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '31')
      )
    ),

    // Rental Information & Pricing Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'RENTAL INFORMATION & PRICING')
      ),
      e(
        View,
        null,
        e(Text, { style: lodgeStyles.paragraph },
          'The Blue Mountain Lodge is available for rental by property owners in good standing (current on Sanitary District taxes). The Lodge provides an excellent venue for family gatherings, celebrations, meetings, and other events.'
        ),
        
        e(Text, { style: lodgeStyles.h3 }, 'RENTAL PROCESS'),
        e(Text, { style: lodgeStyles.paragraph }, 'To reserve the Lodge for your event:'),
        e(Text, { style: lodgeStyles.listItem }, '1. Check availability by emailing bluemountainlodgebooking@gmail.com'),
        e(Text, { style: lodgeStyles.listItem }, '2. Provide your name, property address, contact info, dates, and event details'),
        e(Text, { style: lodgeStyles.listItem }, '3. Review and sign the rental agreement'),
        e(Text, { style: lodgeStyles.listItem }, '4. Submit rental fee and security deposit'),
        e(Text, { style: lodgeStyles.listItem }, '5. Receive confirmation and access instructions'),
        
        e(View, { style: lodgeStyles.highlightBox },
          e(Text, { style: lodgeStyles.highlightTitle }, 'CURRENT PRICING (Subject to Change)'),
          e(View, { style: { marginTop: spacing.sm } },
            e(TableNoJSX, {
              headers: ['Rental Option', 'Duration', 'Fee'],
              rows: [
                ['Half Day', '4 hours', '$150'],
                ['Full Day', '8 hours', '$250'],
                ['Security Deposit', 'Refundable', '$200'],
                ['Additional Hours', 'Per hour', '$40'],
                ['Multi-day Events', 'Custom', 'Contact for pricing']
              ]
            })
          ),
          e(Text, { style: { fontSize: 10, fontStyle: 'italic', marginTop: spacing.xs } }, 
            'Note: Discounted rates available for BMPOA-sponsored events and non-profit organizations'
          )
        ),
        
        e(Text, { style: lodgeStyles.h3 }, 'CANCELLATION POLICY'),
        e(Text, { style: lodgeStyles.paragraph },
          'Cancellations must be made at least 14 days in advance for a full refund. Cancellations within 7-14 days receive a 50% refund. No refunds for cancellations less than 7 days before the event, except for documented emergencies.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '32')
      )
    ),

    // Lodge Usage Guidelines Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LODGE USAGE GUIDELINES')
      ),
      e(
        View,
        null,
        e(Text, { style: lodgeStyles.paragraph },
          "To ensure the Lodge remains a valuable community asset for all residents, please follow these usage guidelines. Your cooperation helps maintain this facility in excellent condition for everyone's enjoyment."
        ),
        
        e(Text, { style: lodgeStyles.h3 }, 'GENERAL RULES'),
        e(Text, { style: lodgeStyles.listItem }, '• Maximum occupancy: 100 persons'),
        e(Text, { style: lodgeStyles.listItem }, '• No smoking inside the Lodge'),
        e(Text, { style: lodgeStyles.listItem }, '• All events must end by 10:00 PM (cleanup by 11:00 PM)'),
        e(Text, { style: lodgeStyles.listItem }, '• Music and noise must be kept at reasonable levels'),
        e(Text, { style: lodgeStyles.listItem }, '• Children must be supervised at all times'),
        e(Text, { style: lodgeStyles.listItem }, '• Pets are not permitted inside the Lodge'),
        
        e(View, { style: lodgeStyles.checklistContainer },
          e(Text, { style: lodgeStyles.checklistTitle }, 'BEFORE LEAVING CHECKLIST'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Remove all decorations and personal items'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Clean all surfaces including tables, counters, and appliances'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Sweep and mop floors (cleaning supplies provided)'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Empty all trash and replace bags'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Return furniture to original configuration'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Clean kitchen thoroughly if used'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Turn off all lights and appliances'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Lock all doors and windows'),
          e(Text, { style: lodgeStyles.checklistItem }, '□ Return keys as instructed')
        ),
        
        e(View, { style: lodgeStyles.alertBox },
          e(Text, { style: lodgeStyles.alertTitle }, 'IMPORTANT LIABILITY INFORMATION'),
          e(Text, { style: lodgeStyles.listItem }, '• Renters are liable for any damage beyond normal wear and tear'),
          e(Text, { style: lodgeStyles.listItem }, '• Security deposit will be withheld for damages or inadequate cleanup'),
          e(Text, { style: lodgeStyles.listItem }, '• Renters must provide proof of homeowner\'s insurance'),
          e(Text, { style: lodgeStyles.listItem }, '• BMPOA is not responsible for personal property or injuries during private events')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '33')
      )
    )
  ];
}