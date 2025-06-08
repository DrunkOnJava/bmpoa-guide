// Sample page demonstrating the new design token system
// This shows how to build a complete page using the centralized style tokens

import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { 
  typography, 
  layout, 
  colors, 
  callout, 
  footer,
  compositeStyles,
  getColumnWidth,
  getGridPosition 
} from '../designTokens.js';
import assetMap from '../assetMap.json';

// Create page-specific styles using design tokens
const styles = StyleSheet.create({
  // Extend the base page style
  page: {
    ...compositeStyles.page,
  },
  
  // Header section with image
  headerSection: {
    marginBottom: layout.spacing.xl,
    marginTop: -layout.margins.content, // Full bleed
    marginHorizontal: -layout.margins.content,
  },
  
  headerImage: {
    width: layout.page.width,
    height: 200,
    objectFit: 'cover',
  },
  
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerTitle: {
    ...typography.styles.h1,
    color: colors.inverse,
    textAlign: 'center',
  },
  
  // Content section using grid
  contentGrid: {
    ...compositeStyles.gridContainer,
    gap: layout.grid.gutter,
  },
  
  // Main content column (8 columns)
  mainColumn: {
    width: getColumnWidth(8),
  },
  
  // Sidebar column (4 columns)
  sidebarColumn: {
    width: getColumnWidth(4),
  },
  
  // Typography examples
  sectionTitle: {
    ...typography.styles.h2,
    color: colors.primary,
    marginBottom: layout.spacing.md,
  },
  
  subsectionTitle: {
    ...typography.styles.h3,
    color: colors.secondary,
    marginBottom: layout.spacing.sm,
  },
  
  bodyText: {
    ...typography.styles.base,
    marginBottom: layout.spacing.md,
    textAlign: 'justify',
  },
  
  // List with proper spacing
  list: {
    marginBottom: layout.spacing.lg,
  },
  
  listItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.sm,
  },
  
  listBullet: {
    width: 20,
    fontSize: typography.sizes.base,
    color: colors.accent,
  },
  
  listText: {
    flex: 1,
    ...typography.styles.base,
  },
  
  // Quick facts sidebar box
  quickFactsBox: {
    ...callout.styles.container,
    marginBottom: layout.spacing.lg,
  },
  
  quickFactsHeader: {
    ...callout.styles.header,
  },
  
  quickFactsBody: {
    ...callout.styles.body,
  },
  
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xs,
  },
  
  factLabel: {
    ...typography.styles.sm,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  
  factValue: {
    ...typography.styles.sm,
    color: colors.muted,
  },
  
  // Alert box
  alertBox: {
    borderWidth: callout.border.width,
    borderColor: colors.danger,
    borderRadius: callout.radius,
    backgroundColor: colors.backgroundDanger,
    padding: callout.padding,
    marginBottom: layout.spacing.lg,
  },
  
  alertTitle: {
    ...typography.styles.h3,
    color: colors.danger,
    marginBottom: layout.spacing.xs,
  },
  
  alertText: {
    ...typography.styles.sm,
    color: colors.text,
  },
  
  // Footer
  pageFooter: {
    ...footer.styles.container,
  },
  
  footerContent: {
    ...footer.styles.content,
  },
  
  footerLeft: {
    ...footer.styles.left,
  },
  
  footerCenter: {
    ...footer.styles.center,
  },
  
  footerRight: {
    ...footer.styles.right,
  },
});

export default function SampleDesignTokenPage({ pageNumber = 1 }) {
  const e = React.createElement;
  
  return e(Page, { size: "LETTER", style: styles.page },
    // Header with image
    e(View, { style: styles.headerSection },
      e(Image, { 
        src: assetMap['mountain-vista.jpeg'] || '/images/optimized/mountain-vista.jpeg',
        style: styles.headerImage 
      }),
      e(View, { style: styles.headerOverlay },
        e(Text, { style: styles.headerTitle }, 'Design Token Example')
      )
    ),
    
    // Content grid
    e(View, { style: styles.contentGrid },
      // Main content column
      e(View, { style: styles.mainColumn },
        e(Text, { style: styles.sectionTitle }, 'Typography Scale'),
        e(Text, { style: styles.bodyText }, 
          'This page demonstrates the new design token system with consistent typography, spacing, and color values. All styles reference centralized tokens for easy maintenance and batch updates.'
        ),
        
        e(Text, { style: styles.subsectionTitle }, 'Key Benefits'),
        e(View, { style: styles.list },
          e(View, { style: styles.listItem },
            e(Text, { style: styles.listBullet }, '• '),
            e(Text, { style: styles.listText }, 'Consistent font sizes across all pages (10pt minimum)')
          ),
          e(View, { style: styles.listItem },
            e(Text, { style: styles.listBullet }, '• '),
            e(Text, { style: styles.listText }, 'Unified color palette with semantic naming')
          ),
          e(View, { style: styles.listItem },
            e(Text, { style: styles.listBullet }, '• '),
            e(Text, { style: styles.listText }, '12-column grid system for precise layouts')
          ),
          e(View, { style: styles.listItem },
            e(Text, { style: styles.listBullet }, '• '),
            e(Text, { style: styles.listText }, 'Standardized spacing based on 4pt baseline')
          )
        ),
        
        e(Text, { style: styles.subsectionTitle }, 'Implementation'),
        e(Text, { style: styles.bodyText }, 
          'Import the design tokens at the top of your component file and use them throughout your styles. This ensures consistency and makes global updates simple.'
        )
      ),
      
      // Sidebar column
      e(View, { style: styles.sidebarColumn },
        // Quick facts box
        e(View, { style: styles.quickFactsBox },
          e(View, { style: styles.quickFactsHeader },
            e(Text, { style: callout.styles.header }, 'QUICK FACTS')
          ),
          e(View, { style: styles.quickFactsBody },
            e(View, { style: styles.factRow },
              e(Text, { style: styles.factLabel }, 'Base Font:'),
              e(Text, { style: styles.factValue }, '12pt')
            ),
            e(View, { style: styles.factRow },
              e(Text, { style: styles.factLabel }, 'Min Font:'),
              e(Text, { style: styles.factValue }, '10pt')
            ),
            e(View, { style: styles.factRow },
              e(Text, { style: styles.factLabel }, 'Grid:'),
              e(Text, { style: styles.factValue }, '12 columns')
            ),
            e(View, { style: styles.factRow },
              e(Text, { style: styles.factLabel }, 'Margins:'),
              e(Text, { style: styles.factValue }, '0.5"')
            )
          )
        ),
        
        // Alert box
        e(View, { style: styles.alertBox },
          e(Text, { style: styles.alertTitle }, '⚠️ Important'),
          e(Text, { style: styles.alertText }, 
            'Always validate styles using npm run style:validate before generating PDFs.'
          )
        )
      )
    ),
    
    // Footer
    e(View, { style: styles.pageFooter },
      e(View, { style: styles.footerContent },
        e(Text, { style: styles.footerLeft }, footer.content.title),
        e(Text, { style: styles.footerCenter }, pageNumber.toString()),
        e(Text, { style: styles.footerRight }, footer.content.url)
      )
    )
  );
}