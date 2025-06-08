import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import { spacing, covers, footers } from '../standardizedStylesV2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

const coverStyles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: colors.black,
    padding: 0,
  },
  
  backgroundImage: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    width: 'calc(100% + 20px)',
    height: 'calc(100% + 20px)',
    objectFit: 'cover',
  },
  
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
    opacity: 0.3,
  },
  
  // Bottom bar with proper height
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40, // FIXED: 40px height
    backgroundColor: colors.primary, // FIXED: #004235
    zIndex: 10,
  },
  
  // Badges with proper contrast and positioning
  establishedBadge: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark background for contrast
  },
  
  badgeText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    letterSpacing: 1.5,
    fontFamily: typography.families.base,
  },
  
  // Title container with proper centering
  titleContainer: {
    position: 'absolute',
    top: '40%', // FIXED: Centered at 40%
    left: 0,
    right: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  
  mainTitle: {
    fontSize: typography.sizes.jumbo,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 1.3,
    marginBottom: 20,
    letterSpacing: 2,
  },
  
  subtitle: {
    fontSize: typography.sizes.toc,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 1.4,
    opacity: 0.9,
  },
  
  // Footer with proper spacing
  footer: {
    position: 'absolute',
    bottom: 34, // FIXED: 12mm safe zone
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  
  footerText: {
    fontSize: 10,
    color: colors.white,
    textDecoration: 'none',
  },
});

export default function FrontCoverPageFixed() {
  const e = React.createElement;
  
  return e(
    Page,
    { size: 'LETTER', style: coverStyles.page },
    
    // Background image
    e(Image, {
      src: assetMap.bluemountainvistacover || assetMap.mountainvista,
      style: coverStyles.backgroundImage,
    }),
    
    // EST. 1975 Badge - with enhanced contrast
    e(View, { style: coverStyles.establishedBadge },
      e(Text, { style: coverStyles.badgeText }, 'EST. 1975')
    ),
    
    // Dark overlay for better text contrast
    e(View, { style: coverStyles.darkOverlay }),
    
    // Title section with proper centering and contrast
    e(View, { style: coverStyles.titleContainer },
      e(Text, { style: coverStyles.mainTitle }, 
        'BLUE MOUNTAIN\nPROPERTY OWNERS\nASSOCIATION'
      ),
      e(Text, { style: coverStyles.subtitle },
        'A comprehensive resource for property owners\nin the Blue Mountain community of\nWarren County, Virginia'
      )
    ),
    
    // Bottom green bar
    e(View, { style: coverStyles.bottomBar }),
    
    // Footer with proper margins
    e(View, { style: coverStyles.footer },
      e(Text, { style: coverStyles.footerText }, 'www.bmpoa.org')
    )
  );
}