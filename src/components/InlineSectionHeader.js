import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { spacing } from '../theme.js';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: callout.radius,
},
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
},
  numberContainer: {
    backgroundColor: colors.white,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
},
  number: {
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
    color: colors.primary,
},
  textContainer: {
    flex: 1,
},
  title: {
    fontSize: typography.sizes.toc,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
},
  description: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    opacity: 0.9,
    lineHeight: typography.lineHeights.relaxed,
}
});

export default function InlineSectionHeader({ number, title, description }) {
  const e = React.createElement;
  
  return e(
    View,
    { style: headerStyles.container },
    e(
      View,
      { style: headerStyles.contentWrapper },
      e(
        View,
        { style: headerStyles.numberContainer },
        e(Text, { style: headerStyles.number }, number)
      ),
      e(
        View,
        { style: headerStyles.textContainer },
        e(Text, { style: headerStyles.title }, title),
        description && e(Text, { style: headerStyles.description }, description)
      )
    )
  );
}