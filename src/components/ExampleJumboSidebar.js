import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  MirroredTwoColumnLayout,
  JumboInfoBox,
  ExtendedSidebarBox,
  TabbedSidebarBox
} from './MirroredLayoutComponents.js';
import { 
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader 
} from './EnhancedLayoutComponents.js';

// Example page demonstrating the largest sidebar components
export default function ExampleJumboSidebar({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // Example sidebar content using the largest components
  const sidebarContent = [
    // Jumbo info box with extensive content
    e(JumboInfoBox, {
      key: 'jumbo-emergency',
      title: '🚨 EMERGENCY PROCEDURES',
      content: [
        'FIRE/MEDICAL EMERGENCY: CALL 911',
        '',
        'EVACUATION CHECKLIST:',
        '1. Grab emergency kit and important documents',
        '2. Ensure all family members and pets are accounted for',
        '3. Follow designated evacuation routes to safety',
        '4. Do NOT return until authorities give all-clear',
        '',
        'SHELTER-IN-PLACE PROCEDURES:',
        '• Close all windows and doors',
        '• Turn off HVAC systems',
        '• Move to interior room on highest floor',
        '• Listen to emergency broadcasts for updates',
        '',
        'MEDICAL EMERGENCIES:',
        '• Call 911 immediately',
        '• Provide first aid if trained',
        '• Meet emergency responders at gate',
        '• Have medical information ready',
        '',
        'CONTACT: Warren Co. Emergency: (540) 635-4128'
      ]
  }),
    
    // Extended sidebar with multiple sections
    e(ExtendedSidebarBox, {
      key: 'extended-contacts',
      title: '📞 IMPORTANT CONTACTS',
      type: 'info',
      sections: [
        {
          title: 'EMERGENCY SERVICES',
          content: '911 - Fire, Medical, Police\n(540) 635-4128 - Non-emergency'
      },
        {
          title: 'UTILITIES',
          content: 'REC: (800) 552-3904\nWater: (540) 636-9790\nPropane: (540) 635-2022'
      },
        {
          title: 'BMPOA BOARD',
          content: 'President: (540) 555-0001\nSecretary: (540) 555-0004\nboard@bmpoa.org'
      },
        {
          title: 'SERVICES',
          content: 'Waste: (540) 635-7515\nSeptic: (540) 877-2190\nRoads: Report to Board'
      }
      ]
  })
  ];
  
  // Example tabbed content
  const exampleTabs = [
    {
      title: 'SPRING',
      content: e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 'SPRING ACTIVITIES'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Wildflower blooming season'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Community cleanup day'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Road grading and maintenance'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.sm } }, '• Wood chipping program starts'),
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 'WEATHER'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 'Mild temperatures, occasional late frost. Perfect for hiking and outdoor activities.')
      )
  },
    {
      title: 'SUMMER', 
      content: e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 'SUMMER ACTIVITIES'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Deer Lake swimming season'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Community BBQ events'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Peak fire danger period'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.sm } }, '• Lodge rental peak season'),
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 'WEATHER'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 'Warm days, cool nights. Excellent for all outdoor activities.')
      )
  },
    {
      title: 'FALL',
      content: e(View, null,
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 'FALL ACTIVITIES'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Peak foliage viewing'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Annual meeting and elections'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.xs } }, '• Hunting season begins'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: layout.spacing.sm } }, '• Winterization preparations'),
        e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 'WEATHER'),
        e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 'Cool, crisp days. Prime time for photography and hiking.')
      )
  }
  ];
  
  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      MirroredTwoColumnLayout,
      { sidebarContent },
      
      // Main content (on the RIGHT side in mirrored layout)
      e(CompactSectionHeader, null, 'JUMBO SIDEBAR COMPONENTS'),
      
      e(DenseText, null,
        'This page demonstrates the largest sidebar components available in the mirrored layout system. These components are designed for complex, detailed information that requires more space than standard sidebar elements.'
      ),
      
      e(CompactSubsectionHeader, null, 'JUMBO INFO BOX'),
      e(DenseText, null,
        'The JumboInfoBox is 75% taller than the standard InfoBox and includes larger fonts, increased padding, and enhanced spacing. It is perfect for:'
      ),
      
      e(View, { style: { marginLeft: spacing.md, marginVertical: spacing.sm } },
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Emergency procedures and checklists'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Detailed safety information'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Complex multi-step processes'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Comprehensive reference information'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Important legal or compliance details')
      ),
      
      e(CompactSubsectionHeader, null, 'EXTENDED SIDEBAR BOX'),
      e(DenseText, null,
        'The ExtendedSidebarBox allows multiple titled sections within a single sidebar component. This is ideal for organizing related information into clear, scannable sections while maintaining visual cohesion.'
      ),
      
      e(CompactSubsectionHeader, null, 'TABBED SIDEBAR BOX'),
      e(DenseText, null,
        'The TabbedSidebarBox provides an advanced interface for presenting seasonal, categorical, or time-based information. Here is an example showing seasonal information:'
      ),
      
      // Example of tabbed component in main content area
      e(View, { style: { marginVertical: spacing.md } },
        e(TabbedSidebarBox, {
          tabs: exampleTabs,
          activeTab: 0 // Show spring tab
      })
      ),
      
      e(CompactSubsectionHeader, null, 'BEST PRACTICES'),
      e(DenseText, null,
        'When using large sidebar components, ensure the main content area has sufficient content to balance the layout. Mix different sidebar component sizes to create visual rhythm and prevent overwhelming the reader with too much sidebar information on a single page.'
      ),
      
      e(DenseText, null,
        'These components work seamlessly with both standard TwoColumnLayout and MirroredTwoColumnLayout, giving you maximum flexibility in document design and information presentation.'
      )
    ),
    
    // Footer
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'Jumbo Sidebar Examples'),
        e(Text, { style: styles.footerPageNumber }, 'DEMO'),
        e(Text, null, 'Advanced Layout Components')
      )
    )
  );
}