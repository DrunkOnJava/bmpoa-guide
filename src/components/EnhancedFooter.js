import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { footerStyles } from '../standardizedStyles.js';

const styles = StyleSheet.create({
  ...footerStyles,
  
  // Additional styles for enhanced footer
  floatingFooter: {
    position: 'absolute',
    bottom: 36,
    left: 54,
    right: 54,
    zIndex: 10, // Ensure it's above images
  },
  
  footerStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: callout.radius,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // Dark footer for light backgrounds
  darkFooter: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  // Light footer for dark backgrounds
  lightFooter: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  
  footerLeft: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  
  footerCenter: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.families.heading,
    color: colors.darkGray,
  },
  
  footerRight: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  
  // Minimal footer for section dividers
  minimalFooter: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  
  minimalText: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    textAlign: 'center',
  }
});

// Enhanced Footer Component
export const EnhancedFooter = ({ 
  pageNumber = null, 
  variant = 'standard',
  onImage = false,
  leftText = 'BMPOA Community Guide',
  rightText = 'www.bmpoa.org',
  showPageNumber = true
}) => {
  const e = React.createElement;
  
  // Choose appropriate background based on context
  const footerBg = onImage ? styles.lightFooter : styles.darkFooter;
  
  if (variant === 'minimal') {
    return e(View, { style: styles.floatingFooter },
      e(View, { style: [styles.footerStrip, styles.minimalFooter] },
        e(Text, { style: styles.minimalText }, leftText)
      )
    );
  }
  
  return e(View, { style: styles.floatingFooter },
    e(View, { style: [styles.footerStrip, footerBg] },
      e(Text, { style: styles.footerLeft }, leftText),
      showPageNumber && pageNumber && 
        e(Text, { style: styles.footerCenter }, pageNumber.toString()),
      e(Text, { style: styles.footerRight }, rightText)
    )
  );
};

// Section Footer (for divider pages)
export const SectionFooter = ({ text = 'BMPOA Community Guide' }) => {
  const e = React.createElement;
  
  return e(EnhancedFooter, {
    variant: 'minimal',
    leftText: text,
    onImage: true
  });
};

// Page Footer (for content pages)
export const PageFooter = ({ pageNumber, onImage = false }) => {
  const e = React.createElement;
  
  return e(EnhancedFooter, {
    pageNumber,
    variant: 'standard',
    onImage,
    showPageNumber: true
  });
};

// Create a footer line separator (optional)
export const FooterLine = () => {
  const e = React.createElement;
  
  return e(View, {
    style: {
      position: 'absolute',
      bottom: 60,
      left: 54,
      right: 54,
      height: 1,
      backgroundColor: colors.lightGray,
    }
  });
};

export default {
  EnhancedFooter,
  SectionFooter,
  PageFooter,
  FooterLine
};