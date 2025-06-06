import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing } from '../theme.js';

// Advanced layout components inspired by ComponentGarden analysis

const advancedStyles = StyleSheet.create({
  // Mixed Layout Container
  mixedLayoutContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  
  // Card Grid Styles
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  
  card: {
    flex: '1 1 45%',
    backgroundColor: '#F9FAFB',
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    padding: 10,
    minHeight: 80,
  },
  
  cardHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.forestGreen,
    marginBottom: 4,
  },
  
  cardBody: {
    fontSize: 9,
    color: colors.darkGray,
    lineHeight: 1.4,
  },
  
  cardIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  
  // Hierarchical List Styles
  hierarchicalList: {
    marginBottom: 12,
  },
  
  mainItem: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 4,
  },
  
  subItem: {
    fontSize: 10,
    color: colors.mediumGray,
    paddingLeft: 20,
    marginBottom: 2,
  },
  
  subSubItem: {
    fontSize: 9,
    color: colors.mediumGray,
    paddingLeft: 40,
    marginBottom: 1,
  },
  
  // Timeline Layout
  timelineContainer: {
    marginBottom: 16,
  },
  
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
    position: 'relative',
  },
  
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginRight: 12,
    marginTop: 2,
  },
  
  timelineLine: {
    position: 'absolute',
    left: 5.5,
    top: 14,
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  
  timelineContent: {
    flex: 1,
  },
  
  timelineDate: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  
  timelineText: {
    fontSize: 10,
    color: colors.darkGray,
    lineHeight: 1.4,
  },
  
  // Feature Box with Icon
  featureBox: {
    flexDirection: 'row',
    backgroundColor: '#EBF4FF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  
  featureIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  
  featureContent: {
    flex: 1,
  },
  
  featureTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 2,
  },
  
  featureText: {
    fontSize: 9,
    color: colors.darkGray,
    lineHeight: 1.4,
  },
  
  // Sidebar Box Styles
  sidebarBox: {
    backgroundColor: '#FFFAEB',
    borderWidth: 0.5,
    borderColor: '#F59E0B',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D97706',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  
  sidebarContent: {
    fontSize: 9,
    color: colors.darkGray,
    lineHeight: 1.4,
  },
  
  // Professional Quote Box
  quoteBox: {
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginVertical: 12,
  },
  
  quoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: colors.darkGray,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  
  quoteAttribution: {
    fontSize: 9,
    color: colors.mediumGray,
    textAlign: 'right',
  },
  
  // Badge Style Elements
  badge: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  
  cornerBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.forestGreen,
    color: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
  },
});

// Card Grid Component
export const CardGrid = ({ cards = [], columns = 2 }) => {
  const e = React.createElement;
  
  return e(View, { style: advancedStyles.cardGrid },
    cards.map((card, index) => 
      e(View, { key: `card-${index}`, style: advancedStyles.card },
        card.icon && e(View, { style: advancedStyles.cardIcon }, card.icon),
        e(Text, { style: advancedStyles.cardHeader }, card.title),
        e(Text, { style: advancedStyles.cardBody }, card.content)
      )
    )
  );
};

// Hierarchical List Component
export const HierarchicalList = ({ items = [] }) => {
  const e = React.createElement;
  
  return e(View, { style: advancedStyles.hierarchicalList },
    items.map((item, index) => 
      e(View, { key: `item-${index}` },
        e(Text, { style: advancedStyles.mainItem }, item.title),
        item.subItems && item.subItems.map((subItem, subIndex) =>
          e(View, { key: `sub-${index}-${subIndex}` },
            e(Text, { style: advancedStyles.subItem }, subItem.title),
            subItem.subItems && subItem.subItems.map((subSubItem, subSubIndex) =>
              e(Text, { 
                key: `subsub-${index}-${subIndex}-${subSubIndex}`,
                style: advancedStyles.subSubItem 
              }, subSubItem)
            )
          )
        )
      )
    )
  );
};

// Timeline Component
export const Timeline = ({ events = [] }) => {
  const e = React.createElement;
  
  return e(View, { style: advancedStyles.timelineContainer },
    events.map((event, index) => 
      e(View, { key: `event-${index}`, style: advancedStyles.timelineItem },
        e(View, { style: advancedStyles.timelineDot }),
        index < events.length - 1 && e(View, { style: advancedStyles.timelineLine }),
        e(View, { style: advancedStyles.timelineContent },
          e(Text, { style: advancedStyles.timelineDate }, event.date),
          e(Text, { style: advancedStyles.timelineText }, event.description)
        )
      )
    )
  );
};

// Feature Box Component
export const FeatureBox = ({ icon, title, content }) => {
  const e = React.createElement;
  
  return e(View, { style: advancedStyles.featureBox },
    icon && e(View, { style: advancedStyles.featureIcon }, icon),
    e(View, { style: advancedStyles.featureContent },
      e(Text, { style: advancedStyles.featureTitle }, title),
      e(Text, { style: advancedStyles.featureText }, content)
    )
  );
};

// Sidebar Box Component
export const SidebarBox = ({ title, content, type = 'info' }) => {
  const e = React.createElement;
  
  const boxStyles = {
    info: { ...advancedStyles.sidebarBox },
    warning: { 
      ...advancedStyles.sidebarBox, 
      backgroundColor: '#FEF2F2',
      borderColor: '#DC2626' 
    },
    success: { 
      ...advancedStyles.sidebarBox, 
      backgroundColor: '#F0FDF4',
      borderColor: '#10B981' 
    }
  };
  
  const titleStyles = {
    info: { ...advancedStyles.sidebarTitle },
    warning: { ...advancedStyles.sidebarTitle, color: '#B91C1C' },
    success: { ...advancedStyles.sidebarTitle, color: '#059669' }
  };
  
  return e(View, { style: boxStyles[type] },
    e(Text, { style: titleStyles[type] }, title),
    e(Text, { style: advancedStyles.sidebarContent }, content)
  );
};

// Professional Quote Component
export const QuoteBox = ({ quote, attribution }) => {
  const e = React.createElement;
  
  return e(View, { style: advancedStyles.quoteBox },
    e(Text, { style: advancedStyles.quoteText }, `"${quote}"`),
    attribution && e(Text, { style: advancedStyles.quoteAttribution }, `— ${attribution}`)
  );
};

// Badge Component
export const Badge = ({ text, corner = false }) => {
  const e = React.createElement;
  
  return e(Text, { 
    style: corner ? advancedStyles.cornerBadge : advancedStyles.badge 
  }, text);
};

// Mixed Layout Component - Combines different layout patterns
export const MixedLayout = ({ children }) => {
  const e = React.createElement;
  
  return e(View, { style: advancedStyles.mixedLayoutContainer }, children);
};

// Cover Page Header Component
export const CoverHeader = ({ established, type }) => {
  const e = React.createElement;
  
  const headerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  };
  
  const badgeStyle = {
    backgroundColor: colors.white,
    color: colors.darkGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.darkGray,
    fontSize: 10,
    fontWeight: 'bold',
  };
  
  return e(View, { style: headerStyle },
    established && e(Text, { style: badgeStyle }, `EST. ${established}`),
    type && e(Text, { style: badgeStyle }, type.toUpperCase())
  );
};

// Table of Contents Entry Component
export const TOCEntry = ({ number, title, page, level = 1 }) => {
  const e = React.createElement;
  
  const entryStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: level === 1 ? 12 : 8,
    paddingLeft: level > 1 ? (level - 1) * 20 : 0,
  };
  
  const titleStyle = {
    fontSize: level === 1 ? 11 : 10,
    fontWeight: level === 1 ? 'bold' : 'normal',
    color: level === 1 ? colors.darkGray : colors.mediumGray,
  };
  
  const pageStyle = {
    fontSize: level === 1 ? 11 : 10,
    color: colors.mediumGray,
  };
  
  return e(View, { style: entryStyle },
    e(Text, { style: titleStyle }, 
      number ? `${number}. ${title}` : title
    ),
    page && e(Text, { style: pageStyle }, page.toString())
  );
};

export default {
  CardGrid,
  HierarchicalList,
  Timeline,
  FeatureBox,
  SidebarBox,
  QuoteBox,
  Badge,
  MixedLayout,
  CoverHeader,
  TOCEntry
};