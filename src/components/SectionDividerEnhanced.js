import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { layoutStyles } from '../standardizedStyles.js';
import assetMap from '../assetMap.json' with { type: 'json' };

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    size: 'LETTER',
  },
  
  // Background image container
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  // Semi-opaque overlay for contrast
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% black overlay
  },
  
  // Content container
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
  },
  
  // Section number
  sectionNumber: {
    fontSize: typography.sizes.dividerNumber,
    fontFamily: typography.families.heading,
    color: colors.white,
    marginBottom: layout.spacing.xl,
    letterSpacing: -2,
  },
  
  // Section title
  sectionTitle: {
    fontSize: typography.sizes.dividerTitle,
    fontFamily: typography.families.heading,
    color: colors.white,
    textAlign: 'center',
    marginBottom: layout.spacing.lg,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  
  // Section description
  sectionDescription: {
    fontSize: typography.sizes.h3,
    fontFamily: typography.families.base,
    color: colors.white,
    textAlign: 'center',
    maxWidth: 450,
    lineHeight: typography.lineHeights.relaxed,
    opacity: 0.9,
  },
  
  // Footer with translucent background
  footer: {
    position: 'absolute',
    bottom: 36,
    left: 54,
    right: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: callout.radius,
  },
  
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
  },
});

// Image mapping for sections
const sectionImages = {
  governance: 'mountainvistabackup',
  'mountain-home': 'mountainoverlookbackup',
  'wood-chipping': 'mountainvistabackup',
  'fire-safety': 'debrisfire',
  'community-services': 'VineyardGreen',
  'deer-lake': 'deerlakedock',
  lodge: 'TheLodge',
  communication: 'mountainvistabackup',
  contacts: 'OverlookatVineyard',
  'natural-attractions': 'virginiabluebells',
  construction: 'Building1',
  'bear-safety': 'mountainvistabackup',
};

export default function SectionDividerEnhanced({
  number,
  title,
  description,
  sectionKey,
  backgroundColor = colors.primary,
  customImage = null,
  overlayOpacity = 0.4,
  pageNumberMap = {}
}) {
  const e = React.createElement;
  
  // Get the appropriate image
  const imageFile = customImage || sectionImages[sectionKey] || 'mountainvistabackup';
  const imageSrc = assetMap[imageFile];
  
  // Custom overlay style with configurable opacity
  const customOverlay = {
    ...styles.overlay,
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
  };
  
  return e(Page, { size: 'LETTER', style: styles.page },
    // Background image
    imageSrc && e(View, { style: styles.imageContainer },
      e(Image, { src: imageSrc, style: styles.backgroundImage })
    ),
    
    // Overlay for contrast
    e(View, { style: customOverlay }),
    
    // Content
    e(View, { style: styles.content },
      e(Text, { style: styles.sectionNumber }, number.padStart(2, '0')),
      e(Text, { style: styles.sectionTitle }, title),
      description && e(Text, { style: styles.sectionDescription }, description)
    ),
    
    // Footer with background
    e(View, { style: styles.footer },
      e(Text, { style: styles.footerText }, 'BMPOA Community Guide')
    )
  );
}