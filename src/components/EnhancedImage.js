import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { imageStyles } from '../standardizedStyles.js';
import assetMap from '../assetMap.json' with { type: 'json' };

const styles = StyleSheet.create({
  ...imageStyles,
  
  // Image container
  imageContainer: {
    marginVertical: 12,
  },
  
  // Figure container (with caption)
  figure: {
    marginVertical: 16,
  },
  
  // Figure number
  figureNumber: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.families.heading,
    color: colors.mediumGray,
    marginRight: 4,
  },
  
  // Alt text for accessibility (rendered as hidden text)
  altText: {
    position: 'absolute',
    left: -9999,
    width: 1,
    height: 1,
    overflow: 'hidden',
  },
  
  // Image credit
  credit: {
    fontSize: typography.sizes.sm,
    fontFamily: 'Helvetica-Oblique',
    color: colors.lightGray,
    textAlign: 'right',
    marginTop: 2,
  }
});

// Enhanced Image Component
export const EnhancedImage = ({ 
  src,
  alt = '',
  caption = null,
  figureNumber = null,
  credit = null,
  width = '100%',
  maxHeight = 300,
  objectFit = 'contain',
  style = {}
}) => {
  const e = React.createElement;
  
  // Get image source from asset map if string provided
  const imageSrc = typeof src === 'string' ? (assetMap[src] || src) : src;
  
  // Container style
  const containerStyle = caption || figureNumber ? styles.figure : styles.imageContainer;
  
  return e(View, { style: containerStyle },
    // Hidden alt text for accessibility
    alt && e(Text, { style: styles.altText }, alt),
    
    // Image
    e(Image, {
      src: imageSrc,
      style: [{
        width,
        maxHeight,
        objectFit,
      }, style]
    }),
    
    // Caption
    (caption || figureNumber) && e(View, { style: { marginTop: 6 } },
      e(Text, { style: styles.caption },
        figureNumber && e(Text, { style: styles.figureNumber }, `Figure ${figureNumber}:`),
        caption && ` ${caption}`
      )
    ),
    
    // Credit
    credit && e(Text, { style: styles.credit }, credit)
  );
};

// Full-bleed image with overlay (for section dividers)
export const FullBleedImage = ({ 
  src, 
  alt = '',
  overlayOpacity = 0.4,
  overlayColor = 'black'
}) => {
  const e = React.createElement;
  
  const imageSrc = typeof src === 'string' ? (assetMap[src] || src) : src;
  
  const overlayStyle = {
    ...styles.overlay,
    backgroundColor: overlayColor === 'white' 
      ? `rgba(255, 255, 255, ${overlayOpacity})`
      : `rgba(0, 0, 0, ${overlayOpacity})`
  };
  
  return e(View, { style: styles.imageWithOverlay },
    // Hidden alt text
    alt && e(Text, { style: styles.altText }, alt),
    
    // Full-bleed image
    e(Image, {
      src: imageSrc,
      style: styles.fullBleed
    }),
    
    // Overlay
    e(View, { style: overlayStyle })
  );
};

// Content image with automatic caption
export const ContentImage = ({ 
  src, 
  title,
  description = null,
  credit = null,
  figureNumber = null,
  width = '100%',
  maxHeight = 250
}) => {
  const e = React.createElement;
  
  const caption = description || title;
  
  return e(EnhancedImage, {
    src,
    alt: title,
    caption,
    figureNumber,
    credit,
    width,
    maxHeight,
    objectFit: 'contain'
  });
};

// Inline image (smaller, for within text)
export const InlineImage = ({ 
  src, 
  alt = '',
  height = 100,
  align = 'center'
}) => {
  const e = React.createElement;
  
  const alignmentStyle = {
    left: { alignSelf: 'flex-start' },
    center: { alignSelf: 'center' },
    right: { alignSelf: 'flex-end' }
  };
  
  return e(View, { style: [styles.imageContainer, alignmentStyle[align]] },
    alt && e(Text, { style: styles.altText }, alt),
    
    e(Image, {
      src: typeof src === 'string' ? (assetMap[src] || src) : src,
      style: {
        height,
        objectFit: 'contain'
      }
    })
  );
};

// Gallery image (for multiple images in a row)
export const GalleryImage = ({ images = [], captions = [], figureStart = 1 }) => {
  const e = React.createElement;
  
  const imageWidth = `${Math.floor(100 / images.length) - 2}%`;
  
  return e(View, { style: { flexDirection: 'row', gap: 8, marginVertical: 12 } },
    images.map((src, index) => 
      e(View, { key: `gallery-${index}`, style: { width: imageWidth } },
        e(EnhancedImage, {
          src,
          caption: captions[index] || null,
          figureNumber: figureStart ? `${figureStart}.${index + 1}` : null,
          width: '100%',
          maxHeight: 150
        })
      )
    )
  );
};

export default {
  EnhancedImage,
  FullBleedImage,
  ContentImage,
  InlineImage,
  GalleryImage
};