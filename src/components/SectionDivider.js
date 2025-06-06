import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing } from '../theme.js';

const dividerStyles = StyleSheet.create({
  sectionDivider: {
    backgroundColor: colors.forestGreen,
    color: colors.white,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    // Negative margins to break out of page padding for full-bleed effect
    marginTop: -54,
    marginHorizontal: -54,
    marginBottom: -54,
  },
  sectionNumber: {
    fontSize: 72,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionDescription: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 1.5,
    fontStyle: 'italic',
    color: colors.white,
    opacity: 0.9,
  },
});

export default function SectionDivider({ number, title, description, backgroundColor = colors.forestGreen }) {
  const e = React.createElement;
  
  const customStyles = StyleSheet.create({
    customDivider: {
      ...dividerStyles.sectionDivider,
      backgroundColor: backgroundColor,
    }
  });
  
  return e(
    Page,
    { size: 'LETTER' },
    e(
      View,
      { style: customStyles.customDivider },
      e(Text, { style: dividerStyles.sectionNumber }, number),
      e(Text, { style: dividerStyles.sectionTitle }, title),
      description && e(Text, { style: dividerStyles.sectionDescription }, description)
    )
  );
}