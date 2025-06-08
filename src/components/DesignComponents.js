import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';

// Page Header Component
export function PageHeaderNoJSX({ sectionName, pageNumber }) {
  const e = React.createElement;
  
  return e(
    View,
    { style: styles.pageHeader },
    e(Text, { style: { fontStyle: 'italic' } }, sectionName),
    e(Text, null, pageNumber)
  );
}

// Page Footer Component
export function PageFooterNoJSX({ pageNumber }) {
  const e = React.createElement;
  
  const footerStyles = StyleSheet.create({
    footerLine: {
      position: 'absolute',
      bottom: 43.2, // 36 + 7.2 (0.1 inch)
      left: 54,
      right: 54,
      height: 1,
      backgroundColor: colors.slateGray,
  }
});
  
  return [
    e(View, { style: footerStyles.footerLine }),
    e(
      View,
      { style: styles.pageFooter },
      e(Text, null, `BMPOA Community Guide ${pageNumber}`),
      e(Text, null, 'www.bmpoa.org')
    )
  ];
}

// Section Banner Component
export function SectionBannerNoJSX({ number, title, subtitle }) {
  const e = React.createElement;
  
  const bannerStyles = StyleSheet.create({
    container: {
      marginTop: -54, // Negative margin to span full width
      marginHorizontal: -54,
      marginBottom: spacing.lg,
  },
    banner: {
      ...styles.sectionBanner,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
  },
    number: {
      fontSize: typography.sectionBanner,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      opacity: 0.8,
  },
    divider: {
      fontSize: typography.sectionBanner,
      opacity: 0.6,
  },
    subtitle: {
      ...styles.sectionSubBanner,
      marginTop: 0,
  }
});
  
  return e(
    View,
    { style: bannerStyles.container },
    e(
      View,
      { style: bannerStyles.banner },
      number && e(Text, { style: bannerStyles.number }, number),
      number && e(Text, { style: bannerStyles.divider }, ':'),
      e(Text, null, title)
    ),
    subtitle && e(
      View,
      { style: bannerStyles.subtitle },
      e(Text, null, subtitle)
    )
  );
}

// Callout Box Component
export function CalloutBoxNoJSX({ title, children, type = 'info' }) {
  const e = React.createElement;
  
  const typeStyles = {
    info: {
      backgroundColor: colors.lightGray,
      borderColor: colors.slateGray,
      titleColor: colors.darkCharcoal,
  },
    tip: {
      backgroundColor: colors.lightGreen,
      borderColor: colors.forestGreen,
      titleColor: colors.forestGreen,
  },
    warning: {
      backgroundColor: colors.lightPink,
      borderColor: colors.alertRed,
      titleColor: colors.alertRed,
  },
    legal: {
      backgroundColor: '#FFFBEB', // Light yellow
      borderColor: colors.slateGray,
      titleColor: colors.darkCharcoal,
  },
    bear: {
      backgroundColor: colors.lightOrange,
      borderColor: '#92400E', // Dark orange
      titleColor: '#92400E',
  }
};
  
  const style = typeStyles[type] || typeStyles.info;
  
  const boxStyles = StyleSheet.create({
    container: {
      backgroundColor: style.backgroundColor,
      borderWidth: 0.5,
      borderColor: style.borderColor,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginVertical: spacing.sm,
  },
    title: {
      fontSize: typography.body,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: style.titleColor,
      marginBottom: spacing.xs,
  },
    content: {
      fontSize: typography.body,
      color: colors.warmGray,
      lineHeight: typography.lineHeightNormal,
  }
});
  
  return e(
    View,
    { style: boxStyles.container },
    title && e(Text, { style: boxStyles.title }, title),
    e(View, { style: boxStyles.content }, children)
  );
}

// Table Component
export function TableNoJSX({ headers, rows, compact = false }) {
  const e = React.createElement;
  
  const tableStyles = StyleSheet.create({
    table: {
      ...styles.table,
      borderWidth: 0.5,
      borderColor: colors.slateGray,
      borderRadius: callout.radius,
      overflow: 'hidden',
  },
    headerRow: {
      ...styles.tableHeaderRow,
      flexDirection: 'row',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xs,
  },
    headerCell: {
      ...styles.tableHeaderCell,
      flex: 1,
      fontSize: compact ? typography.caption : typography.body,
  },
    row: {
      ...styles.tableRow,
      flexDirection: 'row',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xs,
  },
    rowEven: {
      backgroundColor: colors.lightGray,
  },
    cell: {
      ...styles.tableCell,
      flex: 1,
      fontSize: compact ? typography.small : typography.caption,
  }
});
  
  return e(
    View,
    { style: tableStyles.table },
    // Header row
    e(
      View,
      { style: tableStyles.headerRow },
      headers.map((header, i) => 
        e(Text, { key: i, style: tableStyles.headerCell }, header)
      )
    ),
    // Data rows
    rows.map((row, rowIndex) => 
      e(
        View,
        { 
          key: rowIndex, 
          style: [
            tableStyles.row,
            rowIndex % 2 === 1 ? tableStyles.rowEven : null
          ] 
      },
        row.map((cell, cellIndex) => 
          e(Text, { key: cellIndex, style: tableStyles.cell }, cell)
        )
      )
    )
  );
}

// Two Column Layout Component
export function TwoColumnLayoutNoJSX({ left, right, gutter = 22 }) {
  const e = React.createElement;
  
  const layoutStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: gutter,
      marginVertical: spacing.sm,
  },
    column: {
      flex: 1,
  }
});
  
  return e(
    View,
    { style: layoutStyles.container },
    e(View, { style: layoutStyles.column }, left),
    e(View, { style: layoutStyles.column }, right)
  );
}

// Sidebar Component
export function SidebarNoJSX({ children, color = colors.forestGreen, width = 10 }) {
  const e = React.createElement;
  
  const sidebarStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: spacing.sm,
  },
    bar: {
      width: width,
      backgroundColor: color,
      borderRadius: 2,
  },
    content: {
      flex: 1,
  }
});
  
  return e(
    View,
    { style: sidebarStyles.container },
    e(View, { style: sidebarStyles.bar }),
    e(View, { style: sidebarStyles.content }, children)
  );
}

// Icon with Text Component
export function IconTextNoJSX({ icon, text, size = 16 }) {
  const e = React.createElement;
  
  const iconStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.xs,
  },
    icon: {
      fontSize: size,
  },
    text: {
      fontSize: typography.body,
      color: colors.warmGray,
      flex: 1,
  }
});
  
  return e(
    View,
    { style: iconStyles.container },
    e(Text, { style: iconStyles.icon }, icon),
    e(Text, { style: iconStyles.text }, text)
  );
}

// Checklist Item Component
export function ChecklistItemNoJSX({ text, checked = false }) {
  const e = React.createElement;
  
  const checklistStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.xs,
      marginBottom: spacing.xs,
  },
    checkbox: {
      fontSize: typography.body,
      marginTop: -2,
  },
    text: {
      fontSize: typography.body,
      color: colors.warmGray,
      flex: 1,
      lineHeight: typography.lineHeightNormal,
  }
});
  
  return e(
    View,
    { style: checklistStyles.container },
    e(Text, { style: checklistStyles.checkbox }, checked ? '☑' : '□'),
    e(Text, { style: checklistStyles.text }, text)
  );
}

// Pull Quote Component
export function PullQuoteNoJSX({ text, attribution }) {
  const e = React.createElement;
  
  const quoteStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.lightGray,
      borderLeftWidth: 4,
      borderLeftColor: colors.forestGreen,
      padding: spacing.md,
      marginVertical: spacing.md,
      marginLeft: spacing.lg,
      marginRight: spacing.lg,
  },
    text: {
      fontSize: typography.body,
      fontStyle: 'italic',
      color: colors.darkCharcoal,
      lineHeight: typography.lineHeightRelaxed,
      marginBottom: spacing.xs,
  },
    attribution: {
      fontSize: typography.caption,
      color: colors.warmGray,
      textAlign: 'right',
  }
});
  
  return e(
    View,
    { style: quoteStyles.container },
    e(Text, { style: quoteStyles.text }, `"${text}"`),
    attribution && e(Text, { style: quoteStyles.attribution }, `— ${attribution}`)
  );
}