import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox,
  TwoColumnLayout,
  QuickFactsBox,
  DenseText
} from './EnhancedLayoutComponents.js';
import { 
  FeatureBox, 
  Timeline,
  MixedLayout,
  QuoteBox 
} from './AdvancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';

export default function IntroductionPageNoJSXWithWelcome({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const introStyles = StyleSheet.create({
    welcomeBox: {
      backgroundColor: colors.secondary + '15',
      borderRadius: callout.radius,
      padding: spacing.lg,
      marginBottom: spacing.xl,
      borderWidth: 1,
      borderColor: colors.secondary,
  },
    welcomeTitle: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
      color: colors.secondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
  },
    welcomeText: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkGray,
  },
    timelineContainer: {
      marginBottom: spacing.lg,
  },
    highlightBox: {
      backgroundColor: '#F0F9FF',
      border: `1px solid ${colors.primary}`,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginTop: spacing.md,
  },
    mountainStats: {
      backgroundColor: '#F8FAFC',
      border: `1px solid ${colors.lightGray}`,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
  }
});
  
  // BMPOA Historical Timeline
  const bmpoaHistory = [
    {
      year: '1975',
      title: 'BMPOA Founded',
      description: 'Blue Mountain Property Owners Association established to serve the growing mountain community'
  },
    {
      year: '1982',
      title: 'Sanitary District Created',
      description: 'Blue Mountain Sanitary District formed to manage water and sewer infrastructure'
  },
    {
      year: '1996',
      title: 'Lodge Completed',
      description: 'Community lodge opens providing gathering space for residents and events'
  },
    {
      year: '2003',
      title: 'Deer Lake Enhanced',
      description: 'Major improvements to recreational facilities including new dock and pavilion'
  },
    {
      year: '2015',
      title: 'Fiber Internet',
      description: 'High-speed internet infrastructure brings modern connectivity to the mountain'
  },
    {
      year: 'Today',
      title: '450+ Properties',
      description: 'Thriving community with active board, committees, and year-round residents'
  }
  ];
  
  // Sidebar content
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'mountain-facts',
      facts: [
        { label: 'Elevation', value: '1,100-1,500 ft' },
        { label: 'Total Acres', value: '~2,000' },
        { label: 'Properties', value: '450+' },
        { label: 'Private Roads', value: '15+ miles' },
        { label: 'Nature Trails', value: '5 miles' }
      ]
  }),
    
    e(InfoBox, {
      key: 'what-is-bmpoa',
      title: 'WHAT IS BMPOA?',
      content: [
        'Private community association',
        'Maintains roads & amenities',
        'Enforces covenants',
        'Coordinates services',
        'Builds community spirit'
      ]
  }),
    
    e(ChecklistBox, {
      key: 'new-owner-checklist',
      title: 'NEW OWNER CHECKLIST',
      items: [
        'Register with BMPOA office',
        'Get gate access code',
        'Review covenants',
        'Meet your neighbors',
        'Join committees',
        'Attend board meetings'
      ]
  })
  ];
  
  return [
    e(Page, { key: 'intro-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent },
        e(Text, { style: styles.h1 }, 'WELCOME TO BLUE MOUNTAIN'),
        
        // Welcome message from TOC
        e(View, { style: introStyles.welcomeBox },
          e(Text, { style: introStyles.welcomeTitle }, 'About This Guide'),
          e(Text, { style: introStyles.welcomeText },
            'This guide contains essential information for Blue Mountain property owners. Sections are organized by topic to help you quickly find what you need. Keep this guide handy for reference throughout the year.'
          )
        ),
        
        e(Text, { style: styles.h2 }, 'Our Mountain Community'),
        
        e(DenseText, null,
          'Nestled in the Blue Ridge Mountains of Warren County, Virginia, our community offers a unique blend of natural beauty, privacy, and neighborly spirit. Whether you\'re a full-time resident or weekend visitor, this guide will help you make the most of mountain living.'
        ),
        
        e(Text, { style: styles.h3 }, 'Natural Setting'),
        
        e(DenseText, null,
          'Blue Mountain is home to diverse wildlife including deer, turkey, black bear, and over 100 bird species. Our forests feature oak, hickory, and pine, with spectacular displays of wildflowers in spring and brilliant foliage in fall.'
        ),
        
        e(FeatureBox, {
          title: 'LOCATION & ACCESS',
          icon: '📍',
          color: colors.primary,
          items: [
            '8 miles from Front Royal',
            '75 miles from Washington, DC',
            'Private roads maintained year-round',
            'Emergency services agreements in place'
          ]
      }),
        
        e(QuoteBox, {
          quote: 'Blue Mountain isn\'t just a place to live—it\'s a community that cares for its land, wildlife, and neighbors.',
          author: 'BMPOA Board President'
      })
      ),
      e(View, { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap['introduction'] || '3'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),
    
    // Page 2: Timeline
    e(Page, { key: 'intro-2', size: 'LETTER', style: styles.page },
      e(Text, { style: styles.h2 }, 'Our History'),
      
      e(View, { style: introStyles.timelineContainer },
        e(Timeline, { events: bmpoaHistory })
      ),
      
      e(Text, { style: styles.h2 }, 'Living in Harmony'),
      
      e(MixedLayout, {},
        e(View, { style: { width: '48%' } },
          e(FeatureBox, {
            title: 'RESPECT NATURE',
            icon: '🌲',
            color: colors.secondary,
            items: [
              'Preserve natural habitats',
              'Follow fire safety rules',
              'Manage vegetation responsibly',
              'Protect water resources'
            ]
        })
        ),
        
        e(View, { style: { width: '48%' } },
          e(FeatureBox, {
            title: 'BUILD COMMUNITY',
            icon: '🤝',
            color: colors.primary,
            items: [
              'Participate in events',
              'Volunteer for committees',
              'Help neighbors in need',
              'Share local knowledge'
            ]
        })
        )
      ),
      
      e(View, { style: introStyles.highlightBox },
        e(Text, { style: styles.h3 }, 'Your Role in Our Community'),
        e(DenseText, null,
          'Every property owner plays a vital role in maintaining the character and quality of Blue Mountain. By following community guidelines, participating in activities, and being a good neighbor, you help preserve this special place for current and future generations.'
        )
      ),
      
      e(View, { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap['introduction'] || 3) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}