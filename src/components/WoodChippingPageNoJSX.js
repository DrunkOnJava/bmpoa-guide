import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';

export default function WoodChippingPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const woodStyles = StyleSheet.create({
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
      paddingLeft: 18, // 0.25 inch = 18pt
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
    },
    mapPlaceholder: {
      borderWidth: 2,
      borderColor: colors.forestGreen,
      borderStyle: 'dashed',
      backgroundColor: colors.lightGray,
      padding: spacing.xl,
      marginVertical: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      borderRadius: 4,
    },
    mapPlaceholderText: {
      fontSize: 14,
      color: colors.slateGray,
      fontStyle: 'italic',
      textAlign: 'center',
    }
  });

  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER' },
      e(
        View,
        { style: woodStyles.sectionDivider },
        e(Text, { style: woodStyles.sectionNumber }, '03'),
        e(Text, { style: woodStyles.sectionTitle }, 'WOOD-CHIPPING PROGRAM'),
        e(Text, { style: woodStyles.sectionDescription }, 
          'Our annual wood-chipping program helps reduce wildfire risk while keeping our mountain beautiful'
        )
      )
    ),
    
    // Annual Chipping & Fire Mitigation Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'ANNUAL CHIPPING & FIRE MITIGATION')
      ),
      e(
        View,
        null,
        e(Text, { style: woodStyles.h3 }, 'FREE ANNUAL WOOD CHIPPING'),
        e(Text, { style: woodStyles.paragraph },
          'All property owners within the BMPOA Sanitary District are eligible for free wood chipping annually. This valuable service helps reduce fire hazards around homes while providing a convenient way to dispose of woody debris.'
        ),
        
        e(View, { style: woodStyles.highlightBox },
          e(Text, { style: woodStyles.highlightTitle }, 'FIRE PREVENTION BENEFIT'),
          e(Text, null, 
            'Property owners are highly encouraged to participate in the cleanup as it helps reduce the risk and impact of fire events on our mountain. Removing dead branches, brush, and small trees creates defensible space around your home—one of the most effective wildfire protection strategies.'
          )
        ),
        
        e(Text, { style: woodStyles.h3 }, 'PARTNERSHIP WITH VIRGINIA FORESTRY'),
        e(Text, { style: woodStyles.paragraph },
          'The wood-chipping program is conducted in partnership with the Virginia Department of Forestry as part of their wildfire prevention efforts. This collaboration reflects the recognition of Blue Mountain as a Wildland-Urban Interface (WUI) area where homes are interspersed with natural vegetation that can fuel wildfires.'
        ),
        
        e(Text, { style: woodStyles.paragraph }, 'Benefits of this partnership include:'),
        e(Text, { style: woodStyles.listItem }, '✅ Access to professional equipment and expertise'),
        e(Text, { style: woodStyles.listItem }, '✅ Cost-sharing that makes the program financially sustainable'),
        e(Text, { style: woodStyles.listItem }, '✅ Educational resources on creating defensible space'),
        e(Text, { style: woodStyles.listItem }, '✅ Follow-up assessments and recommendations'),
        
        e(Text, { style: woodStyles.h3 }, 'CHIPPING SCHEDULE'),
        e(Text, { style: woodStyles.paragraph },
          'Wood chipping typically occurs in early spring to ensure that severe weather known to cause deadfall has passed. The process spans over a week and will be announced several weeks in advance on the website and community Facebook groups.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '12')
      )
    ),

    // Brush Pile Guidelines Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BRUSH PILE GUIDELINES')
      ),
      e(
        View,
        null,
        e(Text, { style: woodStyles.h3 }, 'PREPARING YOUR BRUSH PILE'),
        e(Text, { style: [woodStyles.paragraph, { marginBottom: spacing.xs }] },
          'Proper preparation of your brush pile is essential for efficient chipping. Follow these guidelines to ensure your debris can be processed:'
        ),
        
        e(View, { style: [woodStyles.checklistContainer, { marginVertical: spacing.xs, padding: spacing.sm }] },
          e(Text, { style: [woodStyles.checklistTitle, { marginBottom: spacing.xs }] }, 'BRUSH PILE CHECKLIST'),
          e(View, { style: { paddingLeft: 0 } },
            e(Text, { style: [woodStyles.checklistItem, { marginBottom: 2, paddingLeft: 0 }] }, '□  Establish a brush pile within 5 feet of the roadside for easy access'),
            e(Text, { style: [woodStyles.checklistItem, { marginBottom: 2, paddingLeft: 0 }] }, '□  Place all cut ends facing the same direction, toward the road'),
            e(Text, { style: [woodStyles.checklistItem, { marginBottom: 2, paddingLeft: 0 }] }, '□  Keep pile height under 4 feet for stability and safety'),
            e(Text, { style: [woodStyles.checklistItem, { marginBottom: 2, paddingLeft: 0 }] }, '□  Do not include anything larger than 8 inches in diameter'),
            e(Text, { style: [woodStyles.checklistItem, { marginBottom: 2, paddingLeft: 0 }] }, '□  Limit branch lengths to 12 feet maximum'),
            e(Text, { style: [woodStyles.checklistItem, { marginBottom: 2, paddingLeft: 0 }] }, '□  Ensure piles are free of wire, nails, rope, and other non-wood materials'),
            e(Text, { style: [woodStyles.checklistItem, { paddingLeft: 0 }] }, '□  Separate vines and thorny vegetation into a separate pile')
          )
        ),
        
        e(View, { style: { backgroundColor: '#FDF7ED', borderWidth: 0.5, borderColor: '#5D4037', padding: 6, marginVertical: spacing.xs, borderRadius: 4 } },
          e(Text, { style: { fontSize: 12, fontWeight: 'bold', color: '#5D4037', marginBottom: 2 } }, '🛠 Preparation Reminders:'),
          e(Text, { style: { fontSize: 10, fontStyle: 'italic', color: '#5D4037', marginBottom: 4 } }, 
            'Start collecting brush throughout the year for easier management. Focus on dead branches and fire hazards first. Mark your pile location with a reflective marker if away from the main road.'
          ),
          e(Text, { style: { fontSize: 10, fontStyle: 'italic', color: '#5D4037' } }, 
            'Starting early and consistently collecting brush year-round spreads the workload, allows prompt removal of dead branches, creates ongoing improvement to your property\'s defensible space, and reduces winter storm damage.'
          )
        ),
        
        e(View, { style: [woodStyles.alertBox, { marginTop: spacing.xs }] },
          e(Text, { style: { fontSize: 12, fontWeight: 'bold', color: '#B91C1C', marginBottom: 4 } }, '🚫 MATERIALS NOT ACCEPTED'),
          e(Text, { style: [woodStyles.listItem, { marginBottom: 2 }] }, '• Lumber, treated wood, or construction debris'),
          e(Text, { style: [woodStyles.listItem, { marginBottom: 2 }] }, '• Root balls with dirt and rocks'),
          e(Text, { style: [woodStyles.listItem, { marginBottom: 2 }] }, '• Stumps and chunks of wood'),
          e(Text, { style: [woodStyles.listItem, { marginBottom: 2 }] }, '• Grass clippings, leaves, or garden waste'),
          e(Text, { style: woodStyles.listItem }, '• Household trash or non-vegetation items')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '13')
      )
    ),

    // Wood Chip Access & Delivery Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'WOOD CHIP ACCESS & DELIVERY')
      ),
      e(
        View,
        null,
        e(Text, { style: woodStyles.h3 }, 'WOOD CHIP AVAILABILITY'),
        e(Text, { style: woodStyles.paragraph },
          'The wood-chipping program generates large quantities of wood chips that are available to Blue Mountain residents at no charge. These chips can be valuable resources for:'
        ),
        e(Text, { style: woodStyles.listItem }, '✅ Landscaping and garden mulch'),
        e(Text, { style: woodStyles.listItem }, '✅ Erosion control on steep slopes'),
        e(Text, { style: woodStyles.listItem }, '✅ Path creation through wooded areas'),
        e(Text, { style: woodStyles.listItem }, '✅ Suppressing weeds around ornamental plants'),
        e(Text, { style: woodStyles.listItem }, '✅ Composting (when mixed with nitrogen-rich materials)'),
        
        e(Text, { style: woodStyles.h3 }, 'DIRECT DELIVERY OPTIONS'),
        e(Text, { style: woodStyles.paragraph },
          'Surplus wood chips are typically available for delivery to your property during the chipping process, free of charge. When the chipping crew comes to process your brush pile, you can request that they leave the resulting chips rather than hauling them away.'
        ),
        
        e(View, { style: woodStyles.iconText },
          e(Text, { style: woodStyles.icon }, '📞'),
          e(Text, null, 'For more information or to arrange a wood chip delivery, please contact jcook0313@gmail.com')
        ),
        
        e(Text, { style: woodStyles.h3 }, 'COMMUNITY ACCESS POINTS'),
        e(Text, { style: woodStyles.paragraph },
          'Wood chips are also available at communal stockpile locations for any homeowners in need:'
        ),
        
        e(View, { style: woodStyles.mapPlaceholder },
          e(Text, { style: woodStyles.mapPlaceholderText }, 'MAP: WOOD CHIP PICKUP LOCATIONS'),
          e(Text, { style: [woodStyles.mapPlaceholderText, { fontSize: 10, marginTop: spacing.xs }] }, 
            'Shows Lodge and Dam parking areas'
          )
        ),
        
        e(Text, { style: woodStyles.listItem }, '✅ Lodge Parking Area: A pile is maintained near the Blue Mountain Lodge at 540 Cliff Road'),
        e(Text, { style: woodStyles.listItem }, '✅ Dam Parking Area at Deer Lake: Chips are available at the parking area near the dam'),
        
        e(View, { style: woodStyles.infoBox },
          e(Text, { style: woodStyles.highlightTitle }, 'LANDSCAPING TIP'),
          e(Text, null, 
            'Fresh wood chips will temporarily tie up nitrogen in the soil as they decompose. If using chips around plants, consider adding a nitrogen-rich fertilizer or keeping the chips a few inches away from plant stems. For vegetable gardens, it\'s best to use well-aged chips that have already begun to decompose.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '14')
      )
    )
  ];
}