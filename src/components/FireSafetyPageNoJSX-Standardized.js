import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { standardStyles, layoutStyles } from '../standardizedStyles.js';
import { 
  InfoBox, 
  SidebarBox, 
  QuickFactsBox, 
  ChecklistBox,
  AlertBox,
  CalloutBox
} from './StandardizedBoxes.js';
import { EnhancedTable } from './EnhancedTable.js';
import { PageFooter } from './EnhancedFooter.js';
import { ContentImage } from './EnhancedImage.js';
import SectionDividerEnhanced from './SectionDividerEnhanced.js';

// Component-specific styles
const fireSafetyStyles = StyleSheet.create({
  page: {
    ...standardStyles.page,
    position: 'relative',
  },
  
  twoColumn: {
    ...layoutStyles.twoColumn,
    minHeight: '100%',
  },
  
  mainColumn: {
    ...layoutStyles.mainColumn,
  },
  
  sidebarColumn: {
    ...layoutStyles.sidebarColumn,
  },
  
  burnBanBox: {
    backgroundColor: colors.backgroundDanger,
    borderWidth: 2,
    borderColor: colors.danger,
    borderRadius: callout.radius,
    padding: layoutStyles.spacing.lg,
    marginVertical: layoutStyles.spacing.lg,
  },
  
  burnBanTitle: {
    fontSize: typography.h3,
    fontFamily: typography.families.heading,
    color: colors.dangerDark,
    marginBottom: layoutStyles.spacing.sm,
    textTransform: 'uppercase',
  },
  
  burnBanText: {
    fontSize: typography.body,
    color: colors.dangerDarkest,
    lineHeight: typography.bodyLineHeight,
  },
  
  evacuationStep: {
    flexDirection: 'row',
    marginBottom: layoutStyles.spacing.sm,
    paddingLeft: layoutStyles.spacing.md,
  },
  
  evacuationNumber: {
    width: 30,
    fontSize: typography.h4,
    fontFamily: typography.families.heading,
    color: colors.danger,
  },
  
  evacuationText: {
    flex: 1,
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
  },
});

export default function FireSafetyPageNoJSXStandardized({ pageNumberMap = {} }) {
  const e = React.createElement;

  // Sidebar content for prevention page
  const preventionSidebar = [
    e(AlertBox, {
      key: 'burn-ban',
      title: 'BURN BAN STATUS',
      content: 'Check current burn ban status at www.dof.virginia.gov or call (540) 635-8733 before any outdoor burning.',
      type: 'danger'
    }),
    
    e(QuickFactsBox, {
      key: 'fire-facts',
      title: 'FIRE FACTS',
      facts: [
        { label: 'Response', value: '15-20 min' },
        { label: 'Nearest FD', value: 'Linden VFD' },
        { label: 'Burn Permit', value: 'Required' },
        { label: 'Fine', value: 'Up to $500' },
        { label: 'Season', value: 'Oct-May high risk' }
      ]
    }),
    
    e(SidebarBox, {
      key: 'emergency',
      type: 'danger',
      icon: '🚨',
      title: 'EMERGENCY',
      content: [
        'FIRE/RESCUE: 911',
        '',
        'Linden VFD (non-emerg)',
        '(540) 635-8733',
        '',
        'Warren Co. Fire Marshal',
        '(540) 635-2180'
      ]
    })
  ];

  // Sidebar content for preparedness page
  const preparednessSidebar = [
    e(ChecklistBox, {
      key: 'home-prep',
      title: 'HOME PREPARATION',
      items: [
        'Clear 30ft defensible space',
        'Clean gutters regularly',
        'Trim trees near house',
        'Remove dead vegetation',
        'Store firewood away',
        'Install spark arrestors',
        'Maintain access roads'
      ],
      type: 'warning'
    }),
    
    e(InfoBox, {
      key: 'evacuation-kit',
      type: 'info',
      icon: '🎒',
      title: 'GO-BAG ESSENTIALS',
      content: [
        'Important documents',
        'Medications',
        'Emergency contacts',
        'Cash and cards',
        'Phone chargers',
        'Water and snacks',
        'First aid kit'
      ]
    })
  ];

  return [
    // Section Divider
    e(SectionDividerEnhanced, {
      key: 'fire-divider',
      number: '04',
      title: 'FIRE SAFETY',
      description: 'Prevention, preparedness, and emergency procedures',
      sectionKey: 'fire-safety',
      overlayOpacity: 0.5
    }),

    // Page 1: Fire Prevention
    e(Page, { key: 'fire-1', size: 'LETTER', style: fireSafetyStyles.page },
      e(View, { style: fireSafetyStyles.twoColumn },
        // Main content
        e(View, { style: fireSafetyStyles.mainColumn },
          e(Text, { style: standardStyles.h1 }, 'FIRE SAFETY & PREVENTION'),
          
          e(Text, { style: standardStyles.body },
            'Living in a wooded mountain community requires vigilance about fire safety. Our remote location means longer response times, making prevention and preparedness critical for protecting lives and property.'
          ),

          e(View, { style: fireSafetyStyles.burnBanBox },
            e(Text, { style: fireSafetyStyles.burnBanTitle }, '⚠️ BURN BAN ALERT'),
            e(Text, { style: fireSafetyStyles.burnBanText },
              'Burn bans are frequently in effect during dry conditions. Violations result in fines up to $500 and liability for suppression costs. Always check current status before any outdoor fire.'
            )
          ),

          e(Text, { style: standardStyles.h2 }, 'Burning Regulations'),
          
          e(EnhancedTable, {
            headers: ['Type of Burning', 'Permit Required', 'Restrictions'],
            rows: [
              ['Debris (leaves, brush)', 'Yes', '4PM - Midnight only'],
              ['Campfires', 'No*', 'Attended at all times'],
              ['Burn barrels', 'Prohibited', 'Not allowed in BMPOA'],
              ['Charcoal grills', 'No', '10ft from structures'],
              ['Fire pits', 'No*', 'Covered, attended always']
            ],
            caption: '*Still prohibited during burn bans',
            columnWidths: [{ width: '35%' }, { width: '25%' }, { width: '40%' }]
          }),

          e(Text, { style: standardStyles.h2 }, 'Defensible Space Requirements'),
          
          e(Text, { style: standardStyles.body },
            'Create defensible space around your home to slow fire spread and provide safer conditions for firefighters. Virginia law requires 30 feet of defensible space.'
          ),
          
          e(ContentImage, {
            src: 'debrisfire',
            title: 'Defensible space zones',
            figureNumber: '4.1',
            description: 'Proper vegetation management creates defensible space'
          }),

          e(ChecklistBox, {
            title: 'ZONE 1: 0-30 FEET FROM HOME',
            items: [
              'Remove dead vegetation and debris',
              'Keep grass mowed to 4 inches or less',
              'Space trees at least 10 feet apart',
              'Prune branches 6 feet from ground',
              'Clear roof and gutters regularly',
              'Move firewood at least 30 feet away'
            ]
          })
        ),
        
        // Sidebar
        e(View, { style: fireSafetyStyles.sidebarColumn }, ...preventionSidebar)
      ),
      
      e(PageFooter, { pageNumber: pageNumberMap['fire-safety'] || '—' })
    ),

    // Page 2: Emergency Preparedness
    e(Page, { key: 'fire-2', size: 'LETTER', style: fireSafetyStyles.page },
      e(View, { style: fireSafetyStyles.twoColumn },
        // Main content
        e(View, { style: fireSafetyStyles.mainColumn },
          e(Text, { style: standardStyles.h2 }, 'Wildfire Preparedness'),
          
          e(CalloutBox, {
            type: 'warning',
            icon: '🔥',
            title: 'READY, SET, GO!',
            content: 'Familiarize yourself with Virginia\'s wildfire action plan. Being prepared can save precious minutes when evacuation orders come.'
          }),

          e(Text, { style: standardStyles.h3 }, 'Evacuation Procedures'),
          
          e(View, { style: { marginBottom: layoutStyles.spacing.lg } },
            e(View, { style: fireSafetyStyles.evacuationStep },
              e(Text, { style: fireSafetyStyles.evacuationNumber }, '1.'),
              e(Text, { style: fireSafetyStyles.evacuationText }, 
                'READY: Monitor conditions, prepare go-bags, know routes')
            ),
            e(View, { style: fireSafetyStyles.evacuationStep },
              e(Text, { style: fireSafetyStyles.evacuationNumber }, '2.'),
              e(Text, { style: fireSafetyStyles.evacuationText }, 
                'SET: Load vehicles, dress in protective clothing, stay informed')
            ),
            e(View, { style: fireSafetyStyles.evacuationStep },
              e(Text, { style: fireSafetyStyles.evacuationNumber }, '3.'),
              e(Text, { style: fireSafetyStyles.evacuationText }, 
                'GO!: Leave immediately when ordered, follow designated routes')
            )
          ),

          e(Text, { style: standardStyles.h3 }, 'Evacuation Routes'),
          
          e(InfoBox, {
            type: 'warning',
            icon: '🛣️',
            title: 'PRIMARY ROUTES',
            content: [
              'Main Exit: Blue Mountain Rd to Route 638',
              'North: Continue on 638 to Route 55',
              'South: 638 to Freezeland Rd to I-66',
              '',
              'Know multiple routes - roads may be blocked'
            ]
          }),

          e(Text, { style: standardStyles.h3 }, 'Communication During Emergencies'),
          
          e(EnhancedTable, {
            headers: ['Method', 'Use For', 'Details'],
            rows: [
              ['Call 911', 'Report fires/emergencies', 'Give exact location'],
              ['BMPOA Email', 'Community updates', 'Check frequently'],
              ['Text Alerts', 'Urgent notifications', 'Sign up on website'],
              ['AM 1610', 'Emergency broadcasts', 'Local info station'],
              ['Neighbors', 'Check on elderly/disabled', 'Have contact list']
            ],
            compact: true,
            columnWidths: [{ width: '30%' }, { width: '35%' }, { width: '35%' }]
          }),

          e(CalloutBox, {
            type: 'info',
            icon: 'ℹ️',
            title: 'SHELTER LOCATIONS',
            content: 'Warren County High School (primary) and Skyline Middle School (secondary) serve as emergency shelters. Follow official guidance for current shelter status.'
          })
        ),
        
        // Sidebar
        e(View, { style: fireSafetyStyles.sidebarColumn }, ...preparednessSidebar)
      ),
      
      e(PageFooter, { pageNumber: (pageNumberMap['fire-safety'] || 0) + 1 })
    )
  ];
}