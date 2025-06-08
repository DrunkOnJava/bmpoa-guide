import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function FrontCoverPage({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const frontStyles = StyleSheet.create({
    wholePage: {
      padding: 0,
      backgroundColor: colors.black,
    },
    pageContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    bgImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    darkLayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: colors.black,
      opacity: 0.5,
    },
    contentWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 100, // Leave space for footer
      padding: layout.margins.content,
      justifyContent: 'center',
    },
    topBadges: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 150,
    },
    badgeStyle: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      borderRadius: 20,
    },
    badgeTextStyle: {
      fontSize: typography.sizes.sm,
      color: colors.inverse,
      letterSpacing: 1.5,
      fontFamily: typography.families.base,
    },
    centerContent: {
      alignItems: 'center',
    },
    titleLine1: {
      fontSize: typography.sizes.jumbo,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.inverse,
      textAlign: 'center',
      marginBottom: 5,
    },
    titleLine2: {
      fontSize: typography.sizes.jumbo,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.inverse,
      textAlign: 'center',
      marginBottom: 5,
    },
    titleLine3: {
      fontSize: typography.sizes.jumbo,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.inverse,
      textAlign: 'center',
      marginBottom: layout.spacing.xs,
    },
    subtitleStyle: {
      fontSize: typography.sizes.toc,
      fontFamily: typography.families.base,
      color: colors.inverse,
      textAlign: 'center',
      marginBottom: 10,
    },
    descStyle: {
      fontSize: typography.sizes.base,
      fontFamily: typography.families.base,
      color: colors.inverse,
      textAlign: 'center',
      opacity: 0.9,
    },
    bottomSection: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    footerTextStyle: {
      fontSize: typography.sizes.sm,
      color: colors.inverse,
      textAlign: 'center',
      fontFamily: typography.families.base,
      lineHeight: typography.lineHeights.relaxed,
    },
  });
  
  return e(
    Page,
    { size: 'LETTER', style: frontStyles.wholePage },
    e(
      View,
      { style: frontStyles.pageContainer },
      
      // Background Image Layer
      assetMap.bluemountainvistacover && e(
        Image,
        { src: assetMap.bluemountainvistacover, style: frontStyles.bgImage }
      ),
      
      // Dark Overlay Layer
      e(View, { style: frontStyles.darkLayer }),
      
      // Content Wrapper
      e(
        View,
        { style: frontStyles.contentWrapper },
        
        // Top Badge Row
        e(
          View,
          { style: frontStyles.topBadges },
          e(
            View,
            { style: frontStyles.badgeStyle },
            e(Text, { style: frontStyles.badgeTextStyle }, 'EST. 1975')
          ),
          e(
            View,
            { style: frontStyles.badgeStyle },
            e(Text, { style: frontStyles.badgeTextStyle }, 'COMMUNITY GUIDE')
          )
        ),
        
        // Main Content
        e(
          View,
          { style: frontStyles.centerContent },
          e(Text, { style: frontStyles.titleLine1 }, 'BLUE MOUNTAIN'),
          e(Text, { style: frontStyles.titleLine2 }, 'PROPERTY OWNERS'),
          e(Text, { style: frontStyles.titleLine3 }, 'ASSOCIATION'),
          e(Text, { style: frontStyles.subtitleStyle }, 'Your Complete Guide to Mountain Living in'),
          e(Text, { style: frontStyles.subtitleStyle }, 'Linden, Virginia'),
          e(Text, { style: frontStyles.descStyle }, 'A comprehensive resource for new and existing residents.')
        )
      ),
      
      // Bottom Footer
      e(
        View,
        { style: frontStyles.bottomSection },
        e(
          Text,
          { style: frontStyles.footerTextStyle },
          'BMPOA • P.O. Box 114 • Linden, VA 22642\nhttp://www.bmpoa.org'
        )
      )
    )
  );
}