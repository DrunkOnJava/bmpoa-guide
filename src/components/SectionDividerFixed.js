import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors } from '../designTokens.js';

const dividerStyles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: colors.black,
  },
  
  // Background layers
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
    opacity: 0.6,
  },
  
  // FIXED: Bottom bar - 40px height at the very bottom
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: colors.primary, // #004235
  },
  
  // Content positioned in center of page
  contentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
  },
  
  sectionNumber: {
    fontSize: typography.sizes.dividerNumber, // 72pt
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.lg,
    color: colors.white,
    textAlign: 'center',
  },
  
  sectionTitle: {
    fontSize: typography.sizes.dividerTitle, // 36pt
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.lg,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.white,
    lineHeight: 1.2,
  },
  
  sectionDescription: {
    fontSize: typography.sizes.base,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: typography.lineHeights.relaxed,
    fontStyle: 'italic',
    color: colors.white,
    opacity: 0.9,
  },
  
  // For solid color pages (no image)
  solidColorPage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 40, // Leave space for bottom bar
  },
});

export default function SectionDividerFixed({ 
  number, 
  title, 
  description, 
  backgroundColor = colors.forestGreen,
  backgroundImage = null 
}) {
  const e = React.createElement;
  
  // Page with background image
  if (backgroundImage) {
    return e(
      Page,
      { size: 'LETTER', style: dividerStyles.page },
      // Background image
      e(Image, { 
        src: backgroundImage, 
        style: dividerStyles.backgroundImage 
      }),
      // Dark overlay
      e(View, { style: dividerStyles.overlayBackground }),
      // Bottom bar
      e(View, { style: dividerStyles.bottomBar }),
      // Content
      e(View, { style: dividerStyles.contentWrapper },
        e(Text, { style: dividerStyles.sectionNumber }, number),
        e(Text, { style: dividerStyles.sectionTitle }, title),
        description && e(Text, { style: dividerStyles.sectionDescription }, description)
      )
    );
  }
  
  // Page with solid color background
  return e(
    Page,
    { size: 'LETTER', style: dividerStyles.page },
    // Solid color background
    e(View, { style: [dividerStyles.solidColorPage, { backgroundColor }] }),
    // Bottom bar
    e(View, { style: dividerStyles.bottomBar }),
    // Content
    e(View, { style: dividerStyles.contentWrapper },
      e(Text, { style: dividerStyles.sectionNumber }, number),
      e(Text, { style: dividerStyles.sectionTitle }, title),
      description && e(Text, { style: dividerStyles.sectionDescription }, description)
    )
  );
}