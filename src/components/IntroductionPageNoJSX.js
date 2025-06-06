import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { PageHeaderNoJSX, PageFooterNoJSX, PullQuoteNoJSX, CalloutBoxNoJSX } from './DesignComponents.js';

export default function IntroductionPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const introStyles = StyleSheet.create({
    container: {
      paddingTop: spacing.xl,  // Extra top margin
    },
    welcomeBox: {
      position: 'absolute',
      right: 0,
      top: 100,
      width: 200,
      backgroundColor: colors.lightGray,
      opacity: 0.8,
      padding: spacing.sm, // Changed from spacing.md (16) to spacing.sm (8) for 6pt increase
      borderWidth: 0.5,
      borderColor: colors.slateGray, // Changed to slate gray for consistency
      borderRadius: 4,
    },
    welcomeQuote: {
      fontSize: typography.caption,
      fontStyle: 'italic',
      color: colors.darkCharcoal,
      lineHeight: typography.lineHeightNormal,
    },
    bulletContainer: {
      marginTop: spacing.sm,
      marginBottom: spacing.md,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
      paddingLeft: spacing.md,
    },
    bullet: {
      fontSize: 6,
      marginRight: spacing.sm,
      marginTop: 4,
      color: colors.forestGreen,
    }
  });
  
  return e(
    Page,
    { size: 'LETTER', style: [styles.page, introStyles.container] },
    
    // Header
    e(PageHeaderNoJSX, { 
      sectionName: 'Introduction',
      pageNumber: '3'
    }),
    
    // Welcome box (pull-out quote)
    e(
      View,
      { style: introStyles.welcomeBox },
      e(Text, { style: introStyles.welcomeQuote }, 
        '"Blue Mountain is a special place with stunning views of the Shenandoah Valley, rich wildlife, and a close-knit community."'
      )
    ),
    
    // Main content
    e(
      View,
      { style: { paddingRight: 220 } }, // Make room for welcome box
      e(Text, { style: styles.paragraph }, 
        "Welcome to Blue Mountain Property Owners Association (BMPOA)! We're delighted that you've chosen to make our mountain community your home. This welcome booklet is designed to provide residents with essential information about living in our community, local resources, and important contact information."
      ),
      e(Text, { style: styles.paragraph },
        "Our neighborhood is located in Warren County, Virginia, just outside the town of Linden. Whether you're a full-time resident or weekend visitor, we hope this guide helps you settle in and enjoy all that our mountain has to offer."
      )
    ),
    
    // About This Guide section
    e(Text, { style: styles.h2 }, 'ABOUT THIS GUIDE'),
    e(
      CalloutBoxNoJSX,
      { title: null, type: 'info' },
      e(Text, { style: { marginBottom: spacing.sm } }, 'This guide includes:'),
      e(
        View,
        { style: introStyles.bulletContainer },
        [
          'Community governance and structure',
          'Covenants and rules',
          'Construction guidelines',
          'Fire safety and emergency preparedness',
          'Community services and amenities',
          'Local resources and information',
          'Contacts and communication channels',
          'Seasonal information and maintenance'
        ].map((item, idx) => 
          e(
            View,
            { key: idx, style: introStyles.bulletItem },
            e(Text, { style: introStyles.bullet }, '•'),
            e(Text, { style: styles.bulletItem }, item)
          )
        )
      )
    ),
    
    // How to Use section
    e(Text, { style: [styles.h2, { marginTop: spacing.lg }] }, 'HOW TO USE THIS GUIDE'),
    e(Text, { style: styles.paragraph },
      "This guide is organized into sections that address different aspects of community life. The Table of Contents will help you quickly find specific information."
    ),
    e(
      View,
      { style: introStyles.bulletContainer },
      [
        'Important information is highlighted in colored boxes',
        'Contact details are clearly marked throughout',
        'Emergency information is prominently displayed',
        'Seasonal tips are included where relevant'
      ].map((item, idx) => 
        e(
          View,
          { key: idx, style: introStyles.bulletItem },
          e(Text, { style: introStyles.bullet }, '•'),
          e(Text, { style: styles.bulletItem }, item)
        )
      )
    ),
    
    // Footer
    e(PageFooterNoJSX, { pageNumber: 3 })
  );
}