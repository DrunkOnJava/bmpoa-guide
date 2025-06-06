import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function CoverPageNoJSXFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const coverStyles = StyleSheet.create({
    page: {
      backgroundColor: '#000000',
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      opacity: 0.4,
    },
    headerBadge: {
      position: 'absolute',
      top: 24,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 8,
      color: '#FFFFFF',
      letterSpacing: 0.3,
    },
    badgeLeft: {
      left: 24,
    },
    badgeRight: {
      right: 24,
    },
    titleBlock: {
      position: 'absolute',
      top: 250, // Use fixed pixel value instead of percentage
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    mainTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      letterSpacing: 0.5,
      lineHeight: 34,
    },
    subtitle: {
      fontSize: 14,
      color: '#F3F4F6',
      textAlign: 'center',
      marginTop: 8,
    },
    description: {
      fontSize: 10,
      color: '#D1D5DB',
      textAlign: 'center',
      marginTop: 4,
    },
    footerBlock: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    footerText: {
      fontSize: 10,
      color: '#F3F4F6',
      textAlign: 'center',
    }
  });
  
  return e(
    Page,
    { size: 'LETTER', style: coverStyles.page }, // Use proper page style
    
    // Full-bleed background image
    assetMap.mountainoverlook && e(
      Image,
      {
        src: assetMap.mountainoverlook,
        style: coverStyles.backgroundImage
      }
    ),
    
    // Semi-transparent overlay
    e(View, { style: coverStyles.overlay }),
    
    // Top-left badge
    e(
      View,
      { style: { ...coverStyles.headerBadge, ...coverStyles.badgeLeft } },
      e(Text, { style: coverStyles.badgeText }, 'EST. 1975')
    ),
    
    // Top-right badge
    e(
      View,
      { style: { ...coverStyles.headerBadge, ...coverStyles.badgeRight } },
      e(Text, { style: coverStyles.badgeText }, 'COMMUNITY GUIDE')
    ),
    
    // Main title block
    e(
      View,
      { style: coverStyles.titleBlock },
      e(
        Text,
        { style: coverStyles.mainTitle },
        'BLUE MOUNTAIN\nPROPERTY OWNERS\nASSOCIATION'
      ),
      e(
        Text,
        { style: coverStyles.subtitle },
        'Your Complete Guide to Mountain Living in Linden, Virginia'
      ),
      e(
        Text,
        { style: coverStyles.description },
        'A comprehensive resource for new and existing residents'
      )
    ),
    
    // Footer contact line
    e(
      View,
      { style: coverStyles.footerBlock },
      e(
        Text,
        { style: coverStyles.footerText },
        'BMPOA • P.O. Box 114 • Linden, VA 22642 • www.bmpoa.org'
      )
    )
  );
}