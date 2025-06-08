import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles } from '../theme.js';
import SectionDivider from './SectionDivider.js';
import {
  CardGrid,
  HierarchicalList,
  FeatureBox,
  SidebarBox,
  QuoteBox,
  MixedLayout
} from './AdvancedLayoutComponents.js';
import {
  TwoColumnLayout,
  QuickFactsBox,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';

export default function CommunityServicesPageNoJSXAdvanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // Service cards for grid layout
  const essentialServices = [
    {
      title: 'Roads & Maintenance',
      content: 'Year-round road maintenance including snow removal, grading, and pothole repair.'
  },
    {
      title: 'Refuse Collection',
      content: 'Weekly trash pickup and access to the county convenience site for bulk disposal.'
  },
    {
      title: 'Internet Services',
      content: 'Multiple high-speed options including fiber optic and satellite providers.'
  },
    {
      title: 'Emergency Response',
      content: '24/7 fire and EMS services with average response time under 10 minutes.'
  }
  ];
  
  // Timeline for service schedule
  const maintenanceSchedule = [
    { date: 'January-March', description: 'Winter road maintenance and snow removal priority' },
    { date: 'April-May', description: 'Spring grading and pothole repair season' },
    { date: 'June-August', description: 'Brush cutting and drainage maintenance' },
    { date: 'September-November', description: 'Fall leaf removal and storm preparation' },
    { date: 'December', description: 'Winter preparation and equipment maintenance' }
  ];
  
  // Hierarchical structure for utility providers
  const utilityProviders = [
    {
      title: 'Internet Providers',
      subItems: [
        {
          title: 'Comcast/Xfinity',
          subItems: ['Cable internet up to 1200 Mbps', 'Bundle packages available', '1-800-XFINITY']
      },
        {
          title: 'Hughes Network Systems',
          subItems: ['Satellite internet service', 'Available mountain-wide', '1-866-347-3292']
      },
        {
          title: 'Shentel',
          subItems: ['Fiber optic service (select areas)', 'Speeds up to 1 Gbps', '1-800-SHENTEL']
      }
      ]
  },
    {
      title: 'Electric Service',
      subItems: [
        {
          title: 'Rappahannock Electric Cooperative',
          subItems: ['Primary provider for Blue Mountain', '24/7 outage reporting', '1-800-552-3904']
      }
      ]
  }
  ];
  
  // Sidebar content for page 2
  const page2Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Trash Day', value: 'Wednesday' },
        { label: 'Bulk Pickup', value: 'First Monday' },
        { label: 'Recycling', value: 'At convenience site' },
        { label: 'Hours', value: '7am - 4pm' }
      ]
  }),
    e(SidebarBox, {
      title: 'Reminder',
      content: 'Place trash cans at road by 6:30 AM on collection day. Secure lids to prevent wildlife access.',
      type: 'warning'
  })
  ];
  
  return [
    // Section Divider
    e(SectionDivider, {
      number: '05',
      title: 'COMMUNITY SERVICES',
      description: 'Essential services, utilities, and infrastructure that support mountain living',
      backgroundColor: colors.forestGreen
  }),
    
    // Page 1: Service Overview with Card Grid
    e(Page, { size: 'LETTER', style: styles.page },
      e(MixedLayout, null,
        e(CompactSectionHeader, null, 'ESSENTIAL SERVICES OVERVIEW'),
        
        e(QuoteBox, {
          quote: 'Our community services are designed to provide urban conveniences while preserving our rural mountain character.',
          attribution: 'BMPOA Board of Directors'
      }),
        
        e(DenseText, null,
          'Blue Mountain residents enjoy a comprehensive range of services that make mountain living comfortable and convenient. From reliable road maintenance to modern internet connectivity, our community infrastructure supports both full-time residents and weekend property owners.'
        ),
        
        e(CompactSubsectionHeader, null, 'Core Services'),
        e(CardGrid, { cards: essentialServices, columns: 2 }),
        
        e(FeatureBox, {
          title: 'Sanitary District Funding',
          content: 'All community services are funded through the Blue Mountain Sanitary District tax, included in your Warren County property tax bill. No additional HOA fees required.'
      })
      )
    ),
    
    // Page 2: Refuse & Recycling with Timeline
    e(Page, { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'REFUSE COLLECTION & RECYCLING'),
        
        e(CompactSubsectionHeader, null, 'Weekly Collection Service'),
        e(DenseText, null,
          'Advanced Disposal Services provides weekly curbside trash collection every Wednesday. Service includes standard household waste in approved containers. Place cans at the road edge by 6:30 AM on collection day.'
        ),
        
        e(CompactSubsectionHeader, null, 'Warren County Convenience Site'),
        e(DenseText, null,
          'Located at 123 Landfill Road, the convenience site accepts bulk items, recyclables, and household hazardous waste. Open Tuesday through Saturday, 7:00 AM to 4:00 PM. Closed Sundays, Mondays, and major holidays.'
        ),
        
        e(SidebarBox, {
          title: 'Bear-Proof Your Trash',
          content: 'Use bear-resistant containers or store trash indoors until collection morning. Never leave bags outside overnight.',
          type: 'warning'
      })
      )
    ),
    
    // Page 3: Utilities with Hierarchical List
    e(Page, { size: 'LETTER', style: styles.page },
      e(MixedLayout, null,
        e(CompactSectionHeader, null, 'UTILITIES & INTERNET SERVICE'),
        
        e(DenseText, null,
          'Blue Mountain is served by multiple utility providers offering reliable service despite our mountain location. Most areas have access to high-speed internet, with ongoing infrastructure improvements expanding coverage.'
        ),
        
        e(HierarchicalList, { items: utilityProviders }),
        
        e(View, { style: { marginTop: layout.spacing.lg } },
          e(CompactSubsectionHeader, null, 'Service Recommendations'),
          e(View, { style: { flexDirection: 'row', gap: 8 } },
            e(View, { style: { flex: 1 } },
              e(SidebarBox, {
                title: 'Best for Streaming',
                content: 'Comcast cable or Shentel fiber offer the fastest speeds for HD/4K streaming.',
                type: 'info'
            })
            ),
            e(View, { style: { flex: 1 } },
              e(SidebarBox, {
                title: 'Best Coverage',
                content: 'Hughes satellite works everywhere on the mountain, though with higher latency.',
                type: 'success'
            })
            )
          )
        )
      )
    )
  ];
}