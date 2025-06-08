import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox,
  TwoColumnLayout,
  QuickFactsBox
} from './EnhancedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';

export default function IntroductionPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const introStyles = StyleSheet.create({
    pullQuote: {
      backgroundColor: colors.background,
      borderLeft: `4px solid ${colors.primary}`,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginBottom: spacing.md,
  },
    quoteText: {
      fontSize: typography.sizes.medium,
      fontStyle: 'italic',
      color: colors.primary,
      lineHeight: typography.lineHeights.relaxed,
      textAlign: 'center',
  },
    welcomeSection: {
      marginBottom: spacing.lg,
  },
    highlightBox: {
      backgroundColor: '#F0F9FF',
      border: `1px solid ${colors.primary}`,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginTop: spacing.md,
  }
});
  
  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    
    // Header
    e(
      View,
      { style: styles.pageHeader },
      e(Text, { style: styles.pageTitle }, 'INTRODUCTION')
    ),
    
    // Two column layout
    e(
      TwoColumnLayout,
      {
        mainContent: [
          // Welcome section
          e(View, { 
            key: 'welcome',
            style: introStyles.welcomeSection 
        },
            e(Text, { style: { ...styles.h2, marginBottom: spacing.sm } }, 
              'WELCOME TO BLUE MOUNTAIN'
            ),
            e(Text, { style: styles.paragraph }, 
              "Welcome to Blue Mountain Property Owners Association (BMPOA)! We're delighted that you've chosen to make our mountain community your home. This guide provides essential information about living in our community, local resources, and important contacts."
            ),
            e(Text, { style: styles.paragraph },
              "Located in Warren County, Virginia, just outside Linden, our neighborhood offers stunning natural beauty and a close-knit community. Whether you're a full-time resident or weekend visitor, we hope this guide helps you settle in and enjoy all that Blue Mountain has to offer."
            )
          ),
          
          // Pull quote
          e(View, { 
            key: 'quote',
            style: introStyles.pullQuote 
        },
            e(Text, { style: introStyles.quoteText }, 
              '"Blue Mountain is a special place with stunning views of the Shenandoah Valley, rich wildlife, and a close-knit community that values both privacy and neighborly support."'
            )
          ),
          
          // About this guide
          e(Text, { 
            key: 'about-title',
            style: styles.h3 
        }, 'ABOUT THIS GUIDE'),
          
          e(Text, { 
            key: 'about-text',
            style: { ...styles.paragraph, marginBottom: spacing.sm } 
        }, 
            'This comprehensive guide is organized into sections addressing different aspects of community life. Use the Table of Contents to quickly find specific information.'
          ),
          
          e(ChecklistBox, {
            key: 'guide-contents',
            title: 'This guide includes:',
            items: [
              'Community governance and structure',
              'Covenants and architectural guidelines',
              'Fire safety and emergency preparedness',
              'Community services and amenities',
              'Wildlife safety and bear protocols',
              'Local resources and attractions',
              'Communication channels and contacts',
              'Seasonal maintenance tips'
            ]
        }),
          
          // How to use
          e(Text, { 
            key: 'how-title',
            style: { ...styles.h3, marginTop: spacing.md } 
        }, 'HOW TO USE THIS GUIDE'),
          
          e(InfoBox, {
            key: 'navigation',
            title: 'NAVIGATION TIPS',
            content: [
              '• Important information highlighted in colored boxes',
              '• Emergency contacts in red boxes',
              '• Quick reference sections in sidebars',
              '• Contact details clearly marked throughout',
              '• Seasonal tips included where relevant',
              '• Page numbers for easy reference'
            ]
        })
        ],
        sidebarContent: [
          e(QuickFactsBox, {
            key: 'community-facts',
            title: 'Community Overview',
            facts: [
              { label: 'Established', value: '1975' },
              { label: 'Total Lots', value: '350+' },
              { label: 'Elevation', value: '1,800 ft' },
              { label: 'County', value: 'Warren' },
              { label: 'Nearest Town', value: 'Linden' },
              { label: 'To DC', value: '70 miles' }
            ]
        }),
          
          e(FeatureBox, {
            key: 'quick-start',
            title: 'QUICK START',
            content: 'New residents should:\n\n1. Read Section 1 on Governance\n2. Review Covenants summary\n3. Note emergency contacts\n4. Join Facebook groups\n5. Introduce yourself to neighbors!'
        }),
          
          e(View, {
            key: 'important-note',
            style: introStyles.highlightBox
        },
            e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
              '📌 KEEP THIS GUIDE HANDY'
            ),
            e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
              'Store this guide where you can easily access it. Digital version available at www.bmpoa.org'
            )
          )
        ]
    }
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