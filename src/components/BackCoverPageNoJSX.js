import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';

export default function BackCoverPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;

  const backCoverStyles = StyleSheet.create({
    backCoverPage: {
      backgroundColor: colors.primary,
      color: '#fff',
      padding: spacing.xl,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100%',
  },
    coverContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
  },
    logo: {
      width: 120,
      height: 120,
      marginBottom: spacing.xl,
  },
    title: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.lg,
      textAlign: 'center',
  },
    message: {
      fontSize: typography.sizes.medium,
      marginBottom: spacing.xl,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: typography.lineHeights.relaxed,
  },
    section: {
      marginBottom: spacing.lg,
      textAlign: 'center',
  },
    sectionHeading: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.sm,
  },
    sectionItem: {
      fontSize: typography.sizes.medium,
      marginBottom: spacing.xs,
      lineHeight: typography.lineHeights.relaxed,
  },
    footer: {
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.3)',
      paddingTop: spacing.lg,
      marginTop: spacing.xl,
  },
    orgName: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.xs,
  },
    address: {
      fontSize: typography.sizes.base,
      marginBottom: spacing.sm,
  },
    copyright: {
      fontSize: typography.sizes.base,
      marginTop: spacing.md,
      opacity: 0.8,
      lineHeight: typography.lineHeights.relaxed,
  }
});
  
  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      View,
      { style: backCoverStyles.backCoverPage },
      e(
        View,
        { style: backCoverStyles.coverContent },
        
        // Logo placeholder - in real implementation, would use Image component
        e(
          View,
          { style: backCoverStyles.logo },
          e(Text, { style: { fontSize: typography.sizes.jumbo, fontWeight: typography.weights.bold, textAlign: 'center' } }, 'BMPOA')
        ),
        
        e(Text, { style: backCoverStyles.title }, 'Thank You for Being Part of Our Community'),
        
        e(Text, { style: backCoverStyles.message },
          'We hope this guide serves as a valuable resource for your life on Blue Mountain. Our community thrives because of residents like you who care about preserving this special place for future generations.'
        ),
        
        e(
          View,
          { style: backCoverStyles.section },
          e(Text, { style: backCoverStyles.sectionHeading }, 'Stay Connected:'),
          e(Text, { style: backCoverStyles.sectionItem }, 'www.bmpoa.org'),
          e(Text, { style: backCoverStyles.sectionItem }, 'Join us on Facebook: Blue Mountain POA')
        ),
        
        e(
          View,
          { style: backCoverStyles.section },
          e(Text, { style: backCoverStyles.sectionHeading }, 'Get Involved:'),
          e(Text, { style: backCoverStyles.sectionItem }, 'Attend monthly Board meetings'),
          e(Text, { style: backCoverStyles.sectionItem }, 'Join a committee'),
          e(Text, { style: backCoverStyles.sectionItem }, 'Participate in community events')
        )
      ),
      
      e(
        View,
        { style: backCoverStyles.footer },
        e(Text, { style: backCoverStyles.orgName }, 'Blue Mountain Property Owners Association'),
        e(Text, { style: backCoverStyles.address }, 'P.O. Box 114 • Linden, VA 22642'),
        e(Text, { style: backCoverStyles.copyright },
          '© 2025 BMPOA. This guide is for informational purposes only. For the most current information, visit www.bmpoa.org'
        )
      )
    )
  );
}