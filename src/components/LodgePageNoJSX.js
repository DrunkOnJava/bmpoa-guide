import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { lodgeImageStyle, captionStyle } from '../imageStyles.js';
import { TableNoJSX } from './DesignComponents.js';
import { TwoColumnLayout, QuickFactsBox, InfoBox, CompactTable, EmergencyBox } from './EnhancedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';
import { ContactCard, ChecklistBox } from './ExtendedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

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
      fontSize: typography.sizes.dividerNumber,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.lg,
      opacity: 0.9,
  },
    sectionTitle: {
      fontSize: typography.sizes.dividerTitle,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.lg,
      textAlign: 'center',
  },
    sectionDescription: {
      fontSize: typography.sizes.h3,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: typography.lineHeights.relaxed,
  },
    pageImage: {
      width: '100%',
      height: 400,  // Doubled from 200
      marginBottom: spacing.sm,
      objectFit: 'contain',  // Changed from 'cover' to preserve native proportions
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
      borderRadius: 6,
  },
    imageCaption: {
      fontSize: typography.sizes.sm,
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
      borderRadius: callout.radius,
  },
    alertBox: {
      backgroundColor: '#FFE4E1',
      borderLeft: `4px solid #DC143C`,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    highlightTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.xs,
      color: colors.primary,
  },
    alertTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.xs,
      color: colors.danger,
  },
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    checklistContainer: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    checklistTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.sm,
      color: colors.primary,
  },
    checklistItem: {
      marginBottom: layout.spacing.md,  // 12pt spacing between items
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
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
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
      fontSize: typography.sizes.h3,
      marginRight: spacing.xs,
  }
});

  return [
    // Section Divider Page with custom background
    e(
      Page,
      { size: 'LETTER' },
      e(
        View,
        { style: { position: 'relative', width: '100%', height: '100%' } },
        [
          // Background image layer - zoomed out more
          e(Image, { 
            key: 'bgImage',
            src: assetMap.Building1, 
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Changed from 'cover' to show more of the image
              backgroundColor: colors.primary // Fill background where image doesn't cover
          }
        }),
          // Dark overlay for readability
          e(View, { 
            key: 'overlay',
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: colors.black,
              opacity: 0.4 // Reduced opacity to show more of the image
          }
        }),
          // Content layer with text
          e(
            View,
            { 
              key: 'content',
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
          },
            e(Text, { style: { fontSize: typography.sizes.dividerNumber, fontWeight: typography.weights.bold, marginBottom: spacing.lg, color: colors.white } }, '07'),
            e(Text, { style: { fontSize: typography.sizes.dividerTitle, fontWeight: typography.weights.bold, marginBottom: spacing.lg, textAlign: 'center', color: colors.white } }, 'THE LODGE'),
            e(Text, { style: { fontSize: typography.sizes.base, textAlign: 'center', maxWidth: '80%', lineHeight: typography.lineHeights.relaxed, fontStyle: 'italic', color: colors.white } }, 
              "The Blue Mountain Lodge serves as our community's central gathering place. This section provides information about the Lodge's facilities, rental procedures, and usage guidelines for all community members."
            )
          )
        ]
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
        TwoColumnLayout,
        { 
          sidebarContent: [
            e(QuickFactsBox, {
              key: 'lodge-facts',
              facts: [
                { label: 'Address', value: '540 Cliff Road' },
                { label: 'Capacity', value: '100 guests' },
                { label: 'Kitchen', value: 'Commercial' },
                { label: 'Parking', value: '40 vehicles' },
                { label: 'Accessibility', value: 'ADA Compliant' }
              ]
          }),
            e(InfoBox, { key: 'regular-activities', title: 'REGULAR ACTIVITIES' },
              e(Text, { style: lodgeStyles.listItem }, '• Board Meetings: 2nd Monday'),
              e(Text, { style: lodgeStyles.listItem }, '• Social Events: Quarterly'),
              e(Text, { style: lodgeStyles.listItem }, '• Yoga Classes: Weekly'),
              e(Text, { style: lodgeStyles.listItem }, '• Private Rentals: Available')
            )
          ]
      },
        // Main content
        assetMap.TheLodge && e(Image, { src: assetMap.TheLodge, style: lodgeStyles.pageImage }),
        e(Text, { style: lodgeStyles.imageCaption }, 'The Blue Mountain Lodge offers a spacious venue for community gatherings'),
        
        e(Text, { style: lodgeStyles.paragraph },
          'The Blue Mountain Lodge is a community-owned facility that serves as the heart of our social activities and governance. Beautifully situated on Cliff Road with panoramic views of the valley, the Lodge provides an ideal setting for both formal meetings and casual gatherings.'
        ),
        
        e(FeatureBox, {
          icon: e(Text, { style: { fontSize: typography.sizes.h2 } }, '🏛️'),
          title: 'MAIN HALL FEATURES',
          content: 'Accommodates up to 100 guests with flexible seating arrangements. Perfect for weddings, reunions, and community events.'
      }),
        
        e(FeatureBox, {
          icon: e(Text, { style: { fontSize: typography.sizes.h2 } }, '👨‍🍳'),
          title: 'COMMERCIAL KITCHEN',
          content: 'Fully equipped with professional appliances including range, refrigerator, dishwasher, and ample prep space.'
      }),
        
        e(FeatureBox, {
          icon: e(Text, { style: { fontSize: typography.sizes.h2 } }, '🌄'),
          title: 'OUTDOOR AMENITIES',
          content: 'Wraparound deck with stunning mountain views. Perfect for outdoor receptions and gatherings.'
      }),
        
        e(InfoBox, { title: 'ACCESSIBILITY FEATURES' },
          e(Text, null, 
            'The Lodge is fully wheelchair accessible with ramp access to the main entrance and ADA-compliant restroom facilities. Please contact the Lodge Committee if you have specific accessibility needs for your event.'
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
        TwoColumnLayout,
        {
          sidebarContent: [
            e(ContactCard, {
              key: 'lodge-booking',
              icon: '📧',
              label: 'Lodge Booking',
              value: 'bluemountainlodgebooking@gmail.com'
          }),
            e(InfoBox, { key: 'rental-process', title: 'RENTAL PROCESS' },
              e(Text, { style: lodgeStyles.listItem }, '1. Check availability'),
              e(Text, { style: lodgeStyles.listItem }, '2. Provide event details'),
              e(Text, { style: lodgeStyles.listItem }, '3. Sign rental agreement'),
              e(Text, { style: lodgeStyles.listItem }, '4. Submit payment'),
              e(Text, { style: lodgeStyles.listItem }, '5. Receive confirmation')
            ),
            e(InfoBox, { key: 'cancellation', title: 'CANCELLATION POLICY' },
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• 14+ days: Full refund'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• 7-14 days: 50% refund'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• <7 days: No refund'),
              e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', marginTop: layout.spacing.xs } }, 
                'Exceptions for emergencies'
              )
            )
          ]
      },
        // Main content
        e(Text, { style: lodgeStyles.paragraph },
          'The Blue Mountain Lodge is available for rental by property owners in good standing (current on Sanitary District taxes). The Lodge provides an excellent venue for family gatherings, celebrations, meetings, and other events.'
        ),
        
        assetMap.lodgeinterior && e(
          View,
          { style: { marginTop: spacing.md, marginBottom: spacing.md } },
          e(Image, { src: assetMap.lodgeinterior, style: lodgeImageStyle }),
          e(Text, { style: captionStyle }, 'Main hall of the Blue Mountain Lodge — available for events and private rentals.')
        ),
        
        e(InfoBox, { title: 'CURRENT PRICING (Subject to Change)' },
          e(CompactTable, {
            headers: ['Rental Option', 'Duration', 'Fee'],
            rows: [
              ['Half Day', '4 hours', '$150'],
              ['Full Day', '8 hours', '$250'],
              ['Security Deposit', 'Refundable', '$200'],
              ['Additional Hours', 'Per hour', '$40'],
              ['Multi-day Events', 'Custom', 'Contact']
            ],
            columnWidths: [40, 30, 30]
        }),
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', marginTop: spacing.xs } }, 
            'Note: Discounted rates available for BMPOA-sponsored events and non-profit organizations'
          )
        ),
        
        e(FeatureBox, {
          icon: e(Text, { style: { fontSize: typography.sizes.h2 } }, '💰'),
          title: 'PAYMENT OPTIONS',
          content: 'Accepts check or money order made payable to BMPOA. Security deposit refunded within 7 days after event, pending inspection.'
      }),
        
        e(FeatureBox, {
          icon: e(Text, { style: { fontSize: typography.sizes.h2 } }, '📅'),
          title: 'BOOKING TIPS',
          content: 'Popular dates book quickly! Reserve 2-3 months in advance for weekend events during peak season (May-October).'
      })
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
        TwoColumnLayout,
        {
          sidebarContent: [
            e(InfoBox, { key: 'general-rules', title: 'GENERAL RULES' },
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Maximum occupancy: 100'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• No smoking inside'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Events end by 10:00 PM'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Cleanup by 11:00 PM'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Reasonable noise levels'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Supervise children'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• No pets allowed')
            ),
            e(ContactCard, {
              key: 'emergency-contact',
              icon: '🚨',
              label: 'Emergency',
              value: '911'
          }),
            e(ContactCard, {
              key: 'lodge-committee',
              icon: '📞',
              label: 'Lodge Committee',
              value: 'secretary@bmpoa.org'
          })
          ]
      },
        // Main content
        e(Text, { style: lodgeStyles.paragraph },
          "To ensure the Lodge remains a valuable community asset for all residents, please follow these usage guidelines. Your cooperation helps maintain this facility in excellent condition for everyone's enjoyment."
        ),
        
        e(ChecklistBox, {
          title: 'BEFORE LEAVING CHECKLIST',
          items: [
            'Remove all decorations and personal items',
            'Clean all surfaces including tables, counters, and appliances',
            'Sweep and mop floors (cleaning supplies provided)',
            'Empty all trash and replace bags',
            'Return furniture to original configuration',
            'Clean kitchen thoroughly if used',
            'Turn off all lights and appliances',
            'Lock all doors and windows',
            'Return keys as instructed'
          ]
      }),
        
        e(EmergencyBox, { title: 'IMPORTANT LIABILITY INFORMATION' },
          e(Text, { style: lodgeStyles.listItem }, '• Renters are liable for any damage beyond normal wear and tear'),
          e(Text, { style: lodgeStyles.listItem }, '• Security deposit will be withheld for damages or inadequate cleanup'),
          e(Text, { style: lodgeStyles.listItem }, '• Renters must provide proof of homeowner\'s insurance'),
          e(Text, { style: lodgeStyles.listItem }, '• BMPOA is not responsible for personal property or injuries during private events')
        ),
        
        e(FeatureBox, {
          icon: e(Text, { style: { fontSize: typography.sizes.h2 } }, '🧹'),
          title: 'CLEANING SUPPLIES PROVIDED',
          content: 'All necessary cleaning supplies are provided in the utility closet. Please use them to leave the Lodge as you found it.'
      }),
        
        e(InfoBox, { title: 'LODGE COMMITTEE' },
          e(Text, null, 
            'Questions about the Lodge? Contact the Lodge Committee at secretary@bmpoa.org. Committee members conduct regular inspections and handle maintenance requests.'
          )
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