import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { spacing } from '../theme.js';

const dividerStyles = StyleSheet.create({
  pageContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '100%',
    height: '100%',
},
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
},
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing.xl,
},
  sectionNumber: {
    fontSize: typography.sizes.dividerNumber,
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.lg,
    color: colors.white,
},
  sectionTitle: {
    fontSize: typography.sizes.dividerTitle,
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.white,
},
  sectionDescription: {
    fontSize: typography.sizes.base,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: typography.lineHeights.relaxed,
    fontStyle: 'italic',
    color: colors.white,
},
  // For solid color backgrounds
  solidBackground: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
},
});

export default function SectionDivider({ number, title, description, backgroundColor = colors.forestGreen, backgroundImage = null }) {
  const e = React.createElement;
  
  // If no background image, use the solid color approach
  if (!backgroundImage) {
    const customStyles = StyleSheet.create({
      solidBackground: {
        backgroundColor: backgroundColor,
    }
  });
    
    return e(
      Page,
      { size: 'LETTER' },
      e(
        View,
        { style: [dividerStyles.solidBackground, customStyles.solidBackground] },
        e(Text, { style: dividerStyles.sectionNumber }, number),
        e(Text, { style: dividerStyles.sectionTitle }, title),
        description && e(Text, { style: dividerStyles.sectionDescription }, description)
      )
    );
}
  
  // With background image - use proper layering
  return e(
    Page,
    { size: 'LETTER' },
    e(
      View,
      { style: dividerStyles.pageContainer },
      [
        // Background image layer (first, so it's behind)
        e(Image, { 
          key: 'bgImage',
          src: backgroundImage, 
          style: dividerStyles.backgroundImage 
      }),
        // Dark overlay for readability
        e(View, { 
          key: 'overlay',
          style: dividerStyles.overlayBackground 
      }),
        // Content layer with text
        e(
          View,
          { 
            key: 'content',
            style: dividerStyles.contentContainer 
        },
          e(Text, { style: dividerStyles.sectionNumber }, number),
          e(Text, { style: dividerStyles.sectionTitle }, title),
          description && e(Text, { style: dividerStyles.sectionDescription }, description)
        )
      ]
    )
  );
}