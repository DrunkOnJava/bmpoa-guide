import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, typography } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function CoverPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const coverStyles = StyleSheet.create({
    coverPageContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    // Full-page background image
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    // Gradient overlay for text contrast
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% black overlay
    },
    // Header badges - positioned at top left and right
    headerContainer: {
      position: 'absolute',
      top: 36,
      left: 54,
      right: 54,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    badge: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.white,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle transparent white background
    },
    badgeText: {
      fontSize: 10,
      color: colors.white,
      letterSpacing: 1.5,
      fontFamily: 'Helvetica',
      textTransform: 'uppercase',
      fontWeight: '500',
    },
    // Title block - centered on page
    titleBlock: {
      position: 'absolute',
      top: '40%', // Centered vertically
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: 54,
      transform: 'translateY(-50%)', // True vertical center
    },
    titleLine1: {
      fontSize: 42,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      letterSpacing: 3,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    titleLine2: {
      fontSize: 42,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      letterSpacing: 3,
      lineHeight: 48,
      textTransform: 'uppercase',
    },
    subtitle: {
      fontSize: 16,
      color: colors.white,
      textAlign: 'center',
      marginTop: 32,
      lineHeight: 22,
      fontFamily: 'Helvetica',
      fontWeight: 'normal',
    },
    description: {
      fontSize: 13,
      color: 'rgba(255, 255, 255, 0.9)',
      textAlign: 'center',
      marginTop: 16,
      fontFamily: 'Helvetica',
      lineHeight: 18,
    },
    // Footer
    footerBlock: {
      position: 'absolute',
      bottom: 54,  // Align with interior page footer position
      left: 54,
      right: 54,
      flexDirection: 'column',
      alignItems: 'center',
    },
    footerRule: {
      width: '100%',
      height: 0.5,
      backgroundColor: colors.white,
      marginBottom: 4,
      opacity: 0.8,
    },
    footerText: {
      fontSize: 8,  // Match interior footer size
      color: colors.white,
      textAlign: 'center',
      letterSpacing: 0.5,
      fontFamily: 'Helvetica',
    },
    // Page number
    pageNumber: {
      position: 'absolute',
      bottom: 36,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    pageNumberText: {
      fontSize: typography.tiny,
      color: colors.warmGray,
    },
    // Removed emblem styles
  });
  
  return e(
    Page,
    { size: 'LETTER' },
    e(
      View,
      { style: coverStyles.coverPageContainer },
      
      // Full-bleed background image
      assetMap.bluemountainvistacover && e(
        Image,
        {
          src: assetMap.bluemountainvistacover,
          style: coverStyles.backgroundImage
        }
      ),
      
      // Gradient overlay for text contrast
      e(View, { style: coverStyles.overlay }),
      
      // Header badges - left and right aligned
      e(
        View,
        { style: coverStyles.headerContainer },
        // Left badge - EST. 1975
        e(
          View,
          { style: coverStyles.badge },
          e(Text, { style: coverStyles.badgeText }, 'EST. 1975')
        ),
        // Right badge - COMMUNITY GUIDE
        e(
          View,
          { style: coverStyles.badge },
          e(Text, { style: coverStyles.badgeText }, 'COMMUNITY GUIDE')
        )
      ),
      
      // Main title block with two-tone palette
      e(
        View,
        { style: coverStyles.titleBlock },
        e(
          Text,
          { style: coverStyles.titleLine1 },
          'BLUE MOUNTAIN'
        ),
        e(
          Text,
          { style: coverStyles.titleLine2 },
          'PROPERTY OWNERS\nASSOCIATION'
        ),
        e(
          Text,
          { style: coverStyles.subtitle },
          'Your Complete Guide to\nMountain Living in Linden, Virginia'
        ),
        e(
          Text,
          { style: coverStyles.description },
          'A comprehensive resource for new and existing residents'
        )
      ),
      
      // Emblem removed per request
      
      // Footer with rule
      e(
        View,
        { style: coverStyles.footerBlock },
        e(View, { style: coverStyles.footerRule }),
        e(
          Text,
          { style: coverStyles.footerText },
          'BMPOA • P.O. Box 114 • Linden, VA 22642 • www.bmpoa.org'
        )
      ),
      
      // Page number removed - cover page is unnumbered
    )
  );
}