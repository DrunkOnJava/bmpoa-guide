import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';

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
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    message: {
      fontSize: 14,
      marginBottom: spacing.xl,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.6,
    },
    section: {
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    sectionHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
    },
    sectionItem: {
      fontSize: 14,
      marginBottom: spacing.xs,
      lineHeight: 1.4,
    },
    footer: {
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.3)',
      paddingTop: spacing.lg,
      marginTop: spacing.xl,
    },
    orgName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    address: {
      fontSize: 13,
      marginBottom: spacing.sm,
    },
    copyright: {
      fontSize: 11,
      marginTop: spacing.md,
      opacity: 0.8,
      lineHeight: 1.4,
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
          e(Text, { style: { fontSize: 48, fontWeight: 'bold', textAlign: 'center' } }, 'BMPOA')
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