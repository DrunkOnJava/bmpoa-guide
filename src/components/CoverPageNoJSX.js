import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function CoverPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const coverStyles = StyleSheet.create({
    page: {
      padding: 0,
  },
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: colors.black,
  },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
  },
    darkOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: colors.black,
      opacity: 0.5,
  },
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: layout.margins.content,
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
    badgeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 140,
  },
    badge: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.white,
      borderRadius: 20,
  },
    badgeText: {
      fontSize: typography.sizes.sm,
      color: colors.white,
      letterSpacing: 1.5,
      fontFamily: typography.families.base,
  },
    titleSection: {
      marginTop: 60,
      alignItems: 'flex-start',
  },
    mainTitle: {
      fontSize: typography.sizes.jumbo,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.white,
      textAlign: 'left',
      lineHeight: 1.2,
      marginBottom: 20,
  },
    subtitle: {
      fontSize: typography.sizes.toc,
      fontFamily: typography.families.base,
      color: colors.white,
      textAlign: 'left',
      marginTop: 32,
      lineHeight: 1.4,
  },
    description: {
      fontSize: typography.sizes.base,
      fontFamily: typography.families.base,
      color: colors.white,
      textAlign: 'left',
      marginTop: layout.spacing.lg,
  },
    footer: {
      alignItems: 'center',
      marginTop: 'auto',
  },
    footerText: {
      fontSize: typography.sizes.sm,
      color: colors.white,
      textAlign: 'center',
      fontFamily: typography.families.base,
      lineHeight: typography.lineHeights.relaxed,
  },
});
  
  return e(
    Page,
    { size: 'LETTER', style: coverStyles.page },
    e(
      View,
      { style: coverStyles.container },
      
      // Background Image
      assetMap.bluemountainvistacover && e(
        Image,
        { src: assetMap.bluemountainvistacover, style: coverStyles.backgroundImage }
      ),
      
      // Dark overlay to ensure text readability
      e(View, { style: coverStyles.darkOverlay }),
      
      // Content layer
      e(
        View,
        { style: coverStyles.content },
        
        // Top Badges
        e(
          View,
          { style: coverStyles.badgeRow },
          e(
            View,
            { style: coverStyles.badge },
            e(Text, { style: coverStyles.badgeText }, 'EST. 1975')
          ),
          e(
            View,
            { style: coverStyles.badge },
            e(Text, { style: coverStyles.badgeText }, 'COMMUNITY GUIDE')
          )
        ),
        
        // Title Section
        e(
          View,
          { style: coverStyles.titleSection },
          e(
            View,
            null,
            e(Text, { style: coverStyles.mainTitle }, 'BLUE MOUNTAIN'),
            e(Text, { style: coverStyles.mainTitle }, 'PROPERTY OWNERS'),
            e(Text, { style: coverStyles.mainTitle }, 'ASSOCIATION')
          ),
          e(
            Text,
            { style: coverStyles.subtitle },
            'Your Complete Guide to Mountain Living in\nLinden, Virginia'
          ),
          e(
            Text,
            { style: coverStyles.description },
            'A comprehensive resource for new and existing residents.'
          )
        ),
        
        // Footer
        e(
          View,
          { style: coverStyles.footer },
          e(
            Text,
            { style: coverStyles.footerText },
            'BMPOA • P.O. Box 114 • Linden, VA 22642\nwww.bmpoa.org'
          )
        )
      )
    )
  );
}