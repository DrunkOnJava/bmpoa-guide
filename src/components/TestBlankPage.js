import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';

export default function TestBlankPage() {
  const e = React.createElement;
  
  const testStyles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
    },
    content: {
      padding: 72,
    },
    text: {
      fontSize: typography.sizes.base,
      color: colors.black,
    }
  });
  
  return e(
    Page,
    { size: 'LETTER', style: testStyles.page },
    e(
      View,
      { style: testStyles.content },
      e(Text, { style: testStyles.text }, 'Test Page - This is page 1')
    )
  );
}