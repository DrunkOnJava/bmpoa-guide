import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, colors, spacing } from '../designTokens.js';

// FIXED: Standardized call-out box with proper styling
const calloutStyles = StyleSheet.create({
  container: {
    borderWidth: 1.5, // FIXED: 1.5pt border
    borderStyle: 'solid',
    borderColor: colors.accent, // #006644
    borderRadius: 4, // FIXED: 4px radius
    marginVertical: spacing.md,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.accent, // FIXED: #006644 background
    height: 24, // FIXED: 24px tall header
    paddingHorizontal: 12, // FIXED: 12px padding
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 12, // FIXED: 12pt headers
    fontFamily: typography.families.heading,
    fontWeight: typography.weights.bold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  body: {
    backgroundColor: colors.background,
    padding: 12, // FIXED: 12px all sides
  },
  bodyText: {
    fontSize: 10, // FIXED: 10pt body
    fontFamily: typography.families.base,
    lineHeight: 1.4,
    color: colors.text,
  },
  // Variants
  danger: {
    container: {
      borderColor: colors.danger,
    },
    header: {
      backgroundColor: colors.danger,
    },
  },
  warning: {
    container: {
      borderColor: '#F59E0B',
    },
    header: {
      backgroundColor: '#F59E0B',
    },
  },
  info: {
    container: {
      borderColor: colors.primary,
    },
    header: {
      backgroundColor: colors.primary,
    },
  },
});

export default function StandardizedCalloutBox({ 
  title, 
  children, 
  type = 'default',
  showHeader = true 
}) {
  const e = React.createElement;
  
  // Get variant styles
  const variantStyles = type !== 'default' ? calloutStyles[type] : {};
  
  return e(
    View,
    { style: [calloutStyles.container, variantStyles?.container] },
    [
      // Header (if shown)
      showHeader && title && e(
        View,
        { key: 'header', style: [calloutStyles.header, variantStyles?.header] },
        e(Text, { style: calloutStyles.headerText }, title)
      ),
      
      // Body content
      e(
        View,
        { key: 'body', style: calloutStyles.body },
        typeof children === 'string' 
          ? e(Text, { style: calloutStyles.bodyText }, children)
          : children
      )
    ]
  );
}

// Export specific callout types for convenience

export function DangerCallout({ title, children }) {
  return StandardizedCalloutBox({ title, children, type: 'danger' });
}

export function WarningCallout({ title, children }) {
  return StandardizedCalloutBox({ title, children, type: 'warning' });
}

export function InfoCallout({ title, children }) {
  return StandardizedCalloutBox({ title, children, type: 'info' });
}

// Fixed InfoBox component (commonly used in sidebars)
export function StandardizedInfoBox({ title, content, type = 'default' }) {
  const e = React.createElement;
  
  const contentArray = Array.isArray(content) ? content : [content];
  
  return e(
    StandardizedCalloutBox,
    { title, type },
    contentArray.map((line, index) => 
      e(Text, { 
        key: index, 
        style: [
          calloutStyles.bodyText,
          { marginBottom: index < contentArray.length - 1 ? 4 : 0 }
        ] 
      }, line)
    )
  );
}