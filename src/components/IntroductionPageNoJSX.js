import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { PageHeaderNoJSX, PageFooterNoJSX, PullQuoteNoJSX, CalloutBoxNoJSX } from './DesignComponents.js';

export default function IntroductionPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const introStyles = StyleSheet.create({
    container: {
      paddingTop: spacing.md,
  },
    welcomeBox: {
      position: 'absolute',
      right: 0,
      top: 80,
      width: 240,
      backgroundColor: '#F0F7F0',
      padding: spacing.lg,
      borderWidth: 2,
      borderColor: colors.forestGreen,
      borderRadius: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
  },
    welcomeQuote: {
      fontSize: typography.sizes.base,
      fontStyle: 'italic',
      color: colors.forestGreen,
      lineHeight: typography.lineHeights.relaxed,
      textAlign: 'center',
      fontWeight: '500',
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
      fontSize: typography.sizes.sm,
      marginRight: spacing.sm,
      marginTop: 2,
      color: colors.forestGreen,
  },
    mainContent: {
      paddingRight: 260, // Make room for pull quote
      marginBottom: spacing.lg,
  },
    sectionTitle: {
      fontSize: typography.sizes.toc,
      fontWeight: typography.weights.bold,
      marginTop: spacing.xl,
      marginBottom: spacing.md,
      color: colors.forestGreen,
      letterSpacing: 0.5,
  },
    infoBox: {
      backgroundColor: '#FAFAFA',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 6,
      padding: spacing.lg,
      marginVertical: spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: colors.forestGreen,
  },
    listText: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkCharcoal,
  }
});
  
  return e(
    Page,
    { size: 'LETTER', style: [styles.page, introStyles.container] },
    
    // Header
    e(
      View,
      { style: styles.pageHeader },
      e(Text, { style: styles.pageTitle }, 'INTRODUCTION')
    ),
    
    // Pull quote box (positioned absolute)
    e(
      View,
      { style: introStyles.welcomeBox },
      e(Text, { style: introStyles.welcomeQuote }, 
        '"Blue Mountain is a special place with stunning views of the Shenandoah Valley, rich wildlife, and a close-knit community."'
      )
    ),
    
    // Main content with padding for quote
    e(
      View,
      { style: introStyles.mainContent },
      e(Text, { style: styles.paragraph }, 
        "Welcome to Blue Mountain Property Owners Association (BMPOA)! We're delighted that you've chosen to make our mountain community your home. This guide provides essential information about living in our community, local resources, and important contact information."
      ),
      e(Text, { style: styles.paragraph },
        "Our neighborhood is located in Warren County, Virginia, just outside the town of Linden. Whether you're a full-time resident or weekend visitor, we hope this guide helps you settle in and enjoy all that our mountain has to offer."
      )
    ),
    
    // About This Guide section
    e(Text, { style: introStyles.sectionTitle }, 'ABOUT THIS GUIDE'),
    e(
      View,
      { style: introStyles.infoBox },
      e(Text, { style: { marginBottom: spacing.sm, fontWeight: typography.weights.bold } }, 'This guide includes:'),
      e(
        View,
        { style: introStyles.bulletContainer },
        [
          'Community governance and structure',
          'Covenants and architectural guidelines',
          'Fire safety and emergency preparedness',
          'Community services and amenities',
          'Local resources and information',
          'Contacts and communication channels',
          'Seasonal information and maintenance',
          'Wildlife safety and bear protocols'
        ].map((item, idx) => 
          e(
            View,
            { key: idx, style: introStyles.bulletItem },
            e(Text, { style: introStyles.bullet }, '•'),
            e(Text, { style: introStyles.listText }, item)
          )
        )
      )
    ),
    
    // How to Use section
    e(Text, { style: introStyles.sectionTitle }, 'HOW TO USE THIS GUIDE'),
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
          e(Text, { style: introStyles.listText }, item)
        )
      )
    ),
    
    // Keep Handy note
    e(
      View,
      { style: { 
        backgroundColor: '#FFF7ED',
        borderWidth: 1,
        borderColor: '#EA580C',
        borderRadius: callout.radius,
        padding: spacing.md,
        marginTop: spacing.lg
    } },
      e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
        '📌 KEEP THIS GUIDE HANDY'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
        'Store this guide where you can easily access it. A digital version is also available at www.bmpoa.org for your convenience.'
      )
    ),
    
    // Footer
    e(
      View,
      { style: styles.pageFooter },
      e(Text, null, 'BMPOA Community Guide'),
      e(Text, null, pageNumberMap.introduction || '3')
    )
  );
}