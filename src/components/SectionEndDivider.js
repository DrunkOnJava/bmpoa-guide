import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { spacing } from '../theme.js';
import { DecorativeStars } from './ExtendedLayoutComponents.js';

const endDividerStyles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
},
  decorativeLine: {
    width: 100,
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: spacing.md,
},
  endText: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.sm,
}
});

export default function SectionEndDivider({ text = null }) {
  const e = React.createElement;
  
  return e(
    View,
    { style: endDividerStyles.container },
    e(View, { style: endDividerStyles.decorativeLine }),
    e(DecorativeStars, { count: 3 }),
    e(View, { style: endDividerStyles.decorativeLine }),
    text && e(Text, { style: endDividerStyles.endText }, text)
  );
}