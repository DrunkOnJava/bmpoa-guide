import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { spacing } from '../theme.js';

export default function GreenBarHeader({ title }) {
  const e = React.createElement;
  
  const headerStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.forestGreen,
      paddingVertical: 12,
      paddingHorizontal: 18,
      marginBottom: spacing.md,
      marginTop: -spacing.lg, // Pull up to top of page
      marginLeft: -spacing.lg,
      marginRight: -spacing.lg,
  },
    text: {
      color: colors.white,
      fontSize: typography.sizes.h3,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      letterSpacing: 0.5,
  }
});
  
  return e(
    View,
    { style: headerStyles.container },
    e(Text, { style: headerStyles.text }, title.toUpperCase())
  );
}