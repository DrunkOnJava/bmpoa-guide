import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { spacing } from '../theme.js';

// Mirrored layout styles (sidebar on left, main content on right)
const mirroredStyles = StyleSheet.create({
  // Mirrored two-column layout (sidebar LEFT, content RIGHT)
  mirroredContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: layout.spacing.lg,
},
  mirroredSidebarColumn: {
    flex: 1,
    gap: 12,
    paddingRight: 8,
},
  mirroredMainColumn: {
    flex: 2,
    paddingLeft: 8,
},
  
  // Enhanced sidebar components with multiple size options
  
  // TALL - Extended info box (25% taller than standard)
  tallInfoBox: {
    border: '1px solid #E2E8F0',
    borderRadius: 6,
    marginBottom: layout.spacing.lg, // Increased spacing
    backgroundColor: '#FAFBFC',
    minHeight: 120, // Minimum height for tall version
},
  tallInfoBoxHeader: {
    backgroundColor: colors.forestGreen,
    padding: '10px 14px', // Increased padding
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
},
  tallInfoBoxTitle: {
    color: colors.inverse,
    fontSize: typography.sizes.base, // Slightly larger title
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
  tallInfoBoxContent: {
    padding: '14px 14px', // Increased padding
    fontSize: typography.sizes.sm, // Slightly larger content
    lineHeight: typography.lineHeights.relaxed,
    color: colors.warmGray,
    minHeight: 80, // Ensure minimum content height
},
  
  // EXTRA TALL - Extended info box (50% taller than standard)
  extraTallInfoBox: {
    border: '1px solid #E2E8F0',
    borderRadius: 6,
    marginBottom: 20, // Increased spacing
    backgroundColor: '#FAFBFC',
    minHeight: 160, // Minimum height for extra tall version
},
  extraTallInfoBoxHeader: {
    backgroundColor: colors.forestGreen,
    padding: '12px 16px', // Increased padding
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
},
  extraTallInfoBoxTitle: {
    color: colors.inverse,
    fontSize: typography.sizes.base, // Larger title
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
  extraTallInfoBoxContent: {
    padding: '16px 16px', // Increased padding
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.relaxed5,
    color: colors.warmGray,
    minHeight: 120, // Ensure minimum content height
},
  
  // JUMBO - Extended info box (75% taller than standard)
  jumboInfoBox: {
    border: '1px solid #E2E8F0',
    borderRadius: 6,
    marginBottom: layout.spacing.xl, // Increased spacing
    backgroundColor: '#FAFBFC',
    minHeight: 200, // Minimum height for jumbo version
},
  jumboInfoBoxHeader: {
    backgroundColor: colors.forestGreen,
    padding: '14px 18px', // Increased padding
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
},
  jumboInfoBoxTitle: {
    color: colors.inverse,
    fontSize: typography.sizes.medium, // Larger title
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
  jumboInfoBoxContent: {
    padding: '18px 18px', // Increased padding
    fontSize: typography.sizes.base, // Larger content
    lineHeight: typography.lineHeights.relaxed,
    color: colors.warmGray,
    minHeight: 160, // Ensure minimum content height
},
  
  // Tall Quick Facts Box
  tallQuickFactsBox: {
    backgroundColor: '#F8FAFC',
    border: '2px solid #E2E8F0',
    borderLeftColor: colors.forestGreen,
    borderLeftWidth: 4,
    borderRadius: 6,
    padding: layout.spacing.lg, // Increased padding
    marginBottom: layout.spacing.lg,
    minHeight: 140,
},
  tallQuickFactsTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.md,
    color: colors.forestGreen,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
},
  tallQuickFactsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5, // Increased spacing
    borderBottom: '1px solid #E2E8F0',
},
  tallQuickFactsLabel: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
    fontWeight: typography.weights.bold,
    flex: 1,
},
  tallQuickFactsValue: {
    fontSize: typography.sizes.sm,
    color: colors.forestGreen,
    fontWeight: typography.weights.bold,
    textAlign: 'right',
    flex: 1,
}
});

// Mirrored Two-Column Layout (sidebar on LEFT, main content on RIGHT)
export const MirroredTwoColumnLayout = ({ children, sidebarContent }) => {
  const e = React.createElement;
  
  return e(View, { style: mirroredStyles.mirroredContainer },
    e(View, { style: mirroredStyles.mirroredSidebarColumn }, sidebarContent),
    e(View, { style: mirroredStyles.mirroredMainColumn }, children)
  );
};

// Tall Info Box (25% taller than standard)
export const TallInfoBox = ({ title, children, content, type = 'info' }) => {
  const e = React.createElement;
  
  const renderContent = () => {
    if (content) {
      if (Array.isArray(content)) {
        return content.map((item, i) => 
          e(Text, { key: `content-${i}`, style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed, marginBottom: 3 } }, item)
        );
    } else {
        return e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, content);
    }
  }
    return children;
};

  return e(View, { style: mirroredStyles.tallInfoBox },
    e(View, { style: mirroredStyles.tallInfoBoxHeader },
      e(Text, { style: mirroredStyles.tallInfoBoxTitle }, title)
    ),
    e(View, { style: mirroredStyles.tallInfoBoxContent },
      renderContent()
    )
  );
};

// Extra Tall Info Box (50% taller than standard)
export const ExtraTallInfoBox = ({ title, children, content, type = 'info' }) => {
  const e = React.createElement;
  
  const renderContent = () => {
    if (content) {
      if (Array.isArray(content)) {
        return content.map((item, i) => 
          e(Text, { key: `content-${i}`, style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed5, marginBottom: layout.spacing.xs } }, item)
        );
    } else {
        return e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed5 } }, content);
    }
  }
    return children;
};

  return e(View, { style: mirroredStyles.extraTallInfoBox },
    e(View, { style: mirroredStyles.extraTallInfoBoxHeader },
      e(Text, { style: mirroredStyles.extraTallInfoBoxTitle }, title)
    ),
    e(View, { style: mirroredStyles.extraTallInfoBoxContent },
      renderContent()
    )
  );
};

// Jumbo Info Box (75% taller than standard)
export const JumboInfoBox = ({ title, children, content, type = 'info' }) => {
  const e = React.createElement;
  
  const renderContent = () => {
    if (content) {
      if (Array.isArray(content)) {
        return content.map((item, i) => 
          e(Text, { key: `content-${i}`, style: { fontSize: typography.sizes.base, lineHeight: typography.lineHeights.relaxed, marginBottom: 5 } }, item)
        );
    } else {
        return e(Text, { style: { fontSize: typography.sizes.base, lineHeight: typography.lineHeights.relaxed } }, content);
    }
  }
    return children;
};

  return e(View, { style: mirroredStyles.jumboInfoBox },
    e(View, { style: mirroredStyles.jumboInfoBoxHeader },
      e(Text, { style: mirroredStyles.jumboInfoBoxTitle }, title)
    ),
    e(View, { style: mirroredStyles.jumboInfoBoxContent },
      renderContent()
    )
  );
};

// Tall Quick Facts Box (25% taller than standard)
export const TallQuickFactsBox = ({ title, facts }) => {
  const e = React.createElement;
  
  return e(View, { style: mirroredStyles.tallQuickFactsBox },
    e(Text, { key: 'title', style: mirroredStyles.tallQuickFactsTitle }, title || 'QUICK FACTS'),
    ...facts.map((fact, index) =>
      e(View, { key: `fact-${index}`, style: mirroredStyles.tallQuickFactsRow },
        e(Text, { key: `label-${index}`, style: mirroredStyles.tallQuickFactsLabel }, fact.label),
        e(Text, { key: `value-${index}`, style: mirroredStyles.tallQuickFactsValue }, fact.value)
      )
    )
  );
};

// Extended Sidebar Box with multiple content sections
export const ExtendedSidebarBox = ({ title, sections, type = 'info' }) => {
  const e = React.createElement;
  
  const typeColors = {
    info: '#3182CE',
    warning: '#D69E2E', 
    danger: '#E53E3E',
    success: '#38A169'
};
  
  const backgroundColor = typeColors[type] || typeColors.info;
  
  return e(View, { style: mirroredStyles.extraTallInfoBox },
    e(View, { style: [mirroredStyles.extraTallInfoBoxHeader, { backgroundColor }] },
      e(Text, { style: mirroredStyles.extraTallInfoBoxTitle }, title)
    ),
    e(View, { style: mirroredStyles.extraTallInfoBoxContent },
      sections.map((section, index) => [
        e(Text, { 
          key: `section-title-${index}`,
          style: { 
            fontSize: typography.sizes.sm, 
            fontWeight: typography.weights.bold, 
            color: colors.darkGray, 
            marginBottom: layout.spacing.xs,
            marginTop: index > 0 ? 8 : 0
        } 
      }, section.title),
        e(Text, { 
          key: `section-content-${index}`,
          style: { 
            fontSize: typography.sizes.sm, 
            lineHeight: typography.lineHeights.relaxed, 
            marginBottom: 6,
            color: colors.warmGray 
        } 
      }, section.content)
      ]).flat()
    )
  );
};

// Multi-Tab Sidebar Component
export const TabbedSidebarBox = ({ tabs, activeTab = 0 }) => {
  const e = React.createElement;
  
  return e(View, { style: mirroredStyles.jumboInfoBox },
    // Tab headers
    e(View, { style: { flexDirection: 'row', backgroundColor: '#E2E8F0' } },
      tabs.map((tab, index) =>
        e(View, { 
          key: `tab-${index}`,
          style: { 
            flex: 1, 
            padding: '8px 12px',
            backgroundColor: index === activeTab ? colors.forestGreen : 'transparent',
            borderTopLeftRadius: index === 0 ? 6 : 0,
            borderTopRightRadius: index === tabs.length - 1 ? 6 : 0
        }
      },
          e(Text, { 
            style: { 
              fontSize: typography.sizes.sm, 
              fontWeight: typography.weights.bold,
              color: index === activeTab ? '#FFFFFF' : colors.darkGray,
              textAlign: 'center'
          } 
        }, tab.title)
        )
      )
    ),
    // Active tab content
    e(View, { style: mirroredStyles.jumboInfoBoxContent },
      tabs[activeTab] && tabs[activeTab].content
    )
  );
};