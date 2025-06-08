import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { boxStyles, createBoxStyle } from '../standardizedStyles.js';

const styles = StyleSheet.create({
  // Base box styles
  baseBox: {
    ...boxStyles.standard,
    marginBottom: layout.spacing.md,
  },
  
  // Sidebar box (always on right)
  sidebarBox: {
    ...boxStyles.sidebar,
    width: '100%',
  },
  
  // Call-out box
  calloutBox: {
    ...boxStyles.callout,
  },
  
  // Box titles
  boxTitle: {
    fontSize: typography.h4,
    fontFamily: typography.families.heading,
    marginBottom: layout.spacing.sm,
    textTransform: 'uppercase',
  },
  
  // Box content
  boxContent: {
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
  },
  
  // Icon styles
  icon: {
    fontSize: typography.sizes.h3,
    marginRight: 8,
  },
  
  // List styles within boxes
  boxList: {
    marginTop: layout.spacing.xs,
  },
  
  boxListItem: {
    fontSize: typography.body,
    lineHeight: typography.listLineHeight,
    marginBottom: layout.spacing.xs,
    paddingLeft: 16,
  },
  
  // Quick facts specific
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xs,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  
  factLabel: {
    fontSize: typography.body,
    color: colors.mediumGray,
  },
  
  factValue: {
    fontSize: typography.body,
    fontFamily: typography.families.heading,
    color: colors.darkGray,
  },
});

// Standardized Info Box
export const InfoBox = ({ title, content, type = 'info', icon = null }) => {
  const e = React.createElement;
  
  const boxColors = {
    info: colors.info,
    warning: colors.warning,
    danger: colors.danger,
    success: colors.success,
    neutral: colors.mediumGray,
  };
  
  const color = boxColors[type] || colors.primary;
  const customStyle = createBoxStyle('standard', color);
  
  return e(View, { style: [styles.baseBox, customStyle] },
    title && e(View, { style: { flexDirection: 'row', alignItems: 'center' } },
      icon && e(Text, { style: [styles.icon, { color }] }, icon),
      e(Text, { style: [styles.boxTitle, { color }] }, title)
    ),
    
    // Handle content as string or array
    Array.isArray(content) 
      ? e(View, { style: styles.boxList },
          content.map((item, index) => 
            e(Text, { key: `item-${index}`, style: styles.boxListItem }, `• ${item}`)
          )
        )
      : e(Text, { style: styles.boxContent }, content)
  );
};

// Standardized Sidebar Box (for right column)
export const SidebarBox = ({ title, content, type = 'info', icon = null }) => {
  const e = React.createElement;
  
  const boxColors = {
    info: colors.info,
    warning: colors.warning,
    danger: colors.danger,
    success: colors.success,
    neutral: colors.mediumGray,
  };
  
  const color = boxColors[type] || colors.primary;
  const customStyle = createBoxStyle('sidebar', color);
  
  return e(View, { style: [styles.sidebarBox, customStyle] },
    title && e(View, { style: { flexDirection: 'row', alignItems: 'center' } },
      icon && e(Text, { style: [styles.icon, { color }] }, icon),
      e(Text, { style: [styles.boxTitle, { color, fontSize: typography.sizes.base }] }, title)
    ),
    
    Array.isArray(content) 
      ? e(View, { style: styles.boxList },
          content.map((item, index) => 
            e(Text, { key: `item-${index}`, style: [styles.boxListItem, { fontSize: typography.sizes.sm }] }, `• ${item}`)
          )
        )
      : e(Text, { style: [styles.boxContent, { fontSize: typography.sizes.sm }] }, content)
  );
};

// Standardized Call-out Box (for important information)
export const CalloutBox = ({ title, content, type = 'warning', icon = null, fullWidth = true }) => {
  const e = React.createElement;
  
  const boxColors = {
    info: colors.info,
    warning: colors.warning,
    danger: colors.danger,
    success: colors.success,
    neutral: colors.mediumGray,
  };
  
  const color = boxColors[type] || colors.warning;
  const customStyle = createBoxStyle('callout', color);
  
  return e(View, { style: [styles.calloutBox, customStyle, !fullWidth && { width: '85%', alignSelf: 'center' }] },
    title && e(View, { style: { flexDirection: 'row', alignItems: 'center' } },
      icon && e(Text, { style: [styles.icon, { color, fontSize: typography.sizes.large }] }, icon),
      e(Text, { style: [styles.boxTitle, { color, fontSize: typography.sizes.medium }] }, title)
    ),
    
    Array.isArray(content) 
      ? e(View, { style: styles.boxList },
          content.map((item, index) => 
            e(Text, { key: `item-${index}`, style: [styles.boxListItem, { fontSize: typography.sizes.base }] }, `• ${item}`)
          )
        )
      : e(Text, { style: [styles.boxContent, { fontSize: typography.sizes.base }] }, content)
  );
};

// Quick Facts Box (for sidebar)
export const QuickFactsBox = ({ title = 'QUICK FACTS', facts = [] }) => {
  const e = React.createElement;
  
  const customStyle = createBoxStyle('sidebar', colors.primary);
  
  return e(View, { style: [styles.sidebarBox, customStyle] },
    e(Text, { style: [styles.boxTitle, { color: colors.primary, fontSize: typography.sizes.base }] }, title),
    
    facts.map((fact, index) => 
      e(View, { key: `fact-${index}`, style: styles.factRow },
        e(Text, { style: styles.factLabel }, fact.label),
        e(Text, { style: styles.factValue }, fact.value)
      )
    )
  );
};

// Checklist Box (standardized)
export const ChecklistBox = ({ title, items = [], type = 'success' }) => {
  const e = React.createElement;
  
  const color = type === 'warning' ? colors.warning : colors.success;
  const customStyle = createBoxStyle('standard', color);
  
  return e(View, { style: [styles.baseBox, customStyle] },
    title && e(Text, { style: [styles.boxTitle, { color }] }, title),
    
    e(View, { style: styles.boxList },
      items.map((item, index) => 
        e(View, { 
          key: `check-${index}`, 
          style: { flexDirection: 'row', marginBottom: 6 }
        },
          e(Text, { style: { color, fontSize: typography.sizes.base, marginRight: 8 } }, '✓'),
          e(Text, { style: [styles.boxListItem, { paddingLeft: 0, marginBottom: 0 }] }, item)
        )
      )
    )
  );
};

// Alert Box (for warnings/dangers)
export const AlertBox = ({ title, content, type = 'danger' }) => {
  const e = React.createElement;
  
  const icons = {
    danger: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
    success: '✅'
  };
  
  return e(CalloutBox, {
    title,
    content,
    type,
    icon: icons[type] || icons.danger,
    fullWidth: true
  });
};

// Requirements Box
export const RequirementsBox = ({ title = 'REQUIREMENTS', items = [], numbered = true }) => {
  const e = React.createElement;
  
  const customStyle = createBoxStyle('standard', colors.info);
  
  return e(View, { style: [styles.baseBox, customStyle] },
    e(Text, { style: [styles.boxTitle, { color: colors.info }] }, title),
    
    e(View, { style: styles.boxList },
      items.map((item, index) => 
        e(View, { 
          key: `req-${index}`, 
          style: { flexDirection: 'row', marginBottom: 6 }
        },
          e(Text, { style: { color: colors.info, fontSize: typography.body, marginRight: 8, fontFamily: typography.families.heading } }, 
            numbered ? `${index + 1}.` : '•'
          ),
          e(Text, { style: [styles.boxListItem, { paddingLeft: 0, marginBottom: 0 }] }, item)
        )
      )
    )
  );
};

// Export all box types
export default {
  InfoBox,
  SidebarBox,
  CalloutBox,
  QuickFactsBox,
  ChecklistBox,
  AlertBox,
  RequirementsBox
};