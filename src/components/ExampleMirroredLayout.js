import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  MirroredTwoColumnLayout,
  TallInfoBox,
  ExtraTallInfoBox, 
  JumboInfoBox,
  TallQuickFactsBox,
  ExtendedSidebarBox,
  TabbedSidebarBox
} from './MirroredLayoutComponents.js';
import { 
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader 
} from './EnhancedLayoutComponents.js';

// Example page demonstrating mirrored layout with enhanced sidebar components
export default function ExampleMirroredLayout({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // Example sidebar content using the new larger components
  const sidebarContent = [
    // Standard size for comparison
    e(TallInfoBox, {
      key: 'tall-info',
      title: '📋 TALL INFO BOX',
      content: [
        'This is a TALL info box that is 25% taller than the standard version.',
        '',
        '• More space for content',
        '• Better for detailed information',
        '• Improved readability with larger padding',
        '• Perfect for important notices'
      ]
  }),
    
    // Extended quick facts
    e(TallQuickFactsBox, {
      key: 'tall-facts',
      title: 'EXTENDED QUICK FACTS',
      facts: [
        { label: 'Height', value: '+25% taller' },
        { label: 'Padding', value: 'Increased' },
        { label: 'Font Size', value: '10pt vs 9pt' },
        { label: 'Spacing', value: 'Enhanced' },
        { label: 'Use Case', value: 'Detailed info' }
      ]
  }),
    
    // Extra tall box
    e(ExtraTallInfoBox, {
      key: 'extra-tall',
      title: '📈 EXTRA TALL BOX',
      content: [
        'This EXTRA TALL info box is 50% taller than the standard version.',
        '',
        'Key Features:',
        '• Significantly more content space',
        '• Larger fonts and spacing',
        '• Perfect for complex information',
        '• Ideal for step-by-step processes',
        '• Enhanced visual hierarchy',
        '',
        'Use this when you need to display substantial amounts of related information in the sidebar.'
      ]
  })
  ];
  
  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      MirroredTwoColumnLayout,
      { sidebarContent },
      
      // Main content (now on the RIGHT side)
      e(CompactSectionHeader, null, 'MIRRORED LAYOUT DEMONSTRATION'),
      
      e(DenseText, null,
        'This page demonstrates the new MIRRORED layout template where the sidebar content appears on the LEFT side and the main content is on the RIGHT side. This provides layout variety and can be used to create visual interest throughout the document.'
      ),
      
      e(CompactSubsectionHeader, null, 'SIDEBAR SIZE OPTIONS'),
      e(DenseText, null,
        'The mirrored layout includes three new sidebar component sizes:'
      ),
      
      // Table showing size comparisons
      e(View, { style: { 
        border: '1px solid #E2E8F0',
        borderRadius: callout.radius,
        marginVertical: spacing.md
    }},
        // Header
        e(View, { style: { 
          backgroundColor: colors.forestGreen,
          padding: spacing.sm,
          flexDirection: 'row'
      }},
          e(Text, { style: { color: 'white', fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, flex: 1 } }, 'Component'),
          e(Text, { style: { color: 'white', fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, flex: 1 } }, 'Height Increase'),
          e(Text, { style: { color: 'white', fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, flex: 1 } }, 'Best Use Case')
        ),
        // Rows
        e(View, { style: { 
          padding: spacing.sm,
          flexDirection: 'row',
          backgroundColor: '#F7FAFC'
      }},
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'TallInfoBox'),
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, '+25%'),
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Enhanced details')
        ),
        e(View, { style: { 
          padding: spacing.sm,
          flexDirection: 'row'
      }},
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'ExtraTallInfoBox'),
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, '+50%'),
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Complex information')
        ),
        e(View, { style: { 
          padding: spacing.sm,
          flexDirection: 'row',
          backgroundColor: '#F7FAFC'
      }},
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'JumboInfoBox'),
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, '+75%'),
          e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, 'Extensive content')
        )
      ),
      
      e(CompactSubsectionHeader, null, 'USAGE GUIDELINES'),
      e(DenseText, null,
        'Use the mirrored layout to create visual variety in your document. Alternate between standard TwoColumnLayout (sidebar right) and MirroredTwoColumnLayout (sidebar left) to keep readers engaged. The larger sidebar components are perfect for:'
      ),
      
      e(View, { style: { marginLeft: spacing.md, marginVertical: spacing.sm } },
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Detailed contact information'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Multi-step procedures'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Important safety information'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Complex quick reference data'),
        e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, '• Multiple related topics in one box')
      ),
      
      e(CompactSubsectionHeader, null, 'IMPLEMENTATION'),
      e(DenseText, null,
        'Import the MirroredLayoutComponents and use them exactly like the standard enhanced components, but with the MirroredTwoColumnLayout as your container. The component API is identical, just with enhanced sizing and spacing for improved content presentation.'
      )
    ),
    
    // Footer
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'Mirrored Layout Example'),
        e(Text, { style: styles.footerPageNumber }, 'DEMO'),
        e(Text, null, 'Enhanced Sidebar Components')
      )
    )
  );
}