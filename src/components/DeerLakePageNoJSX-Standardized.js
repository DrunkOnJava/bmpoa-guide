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
import { EnhancedTable, ScheduleTable, RequirementsTable } from './EnhancedTable.js';
import { PageFooter } from './EnhancedFooter.js';
import { ContentImage } from './EnhancedImage.js';
import SectionDividerEnhanced from './SectionDividerEnhanced.js';

// Component-specific styles
const deerLakeStyles = StyleSheet.create({
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
  
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layoutStyles.spacing.sm,
    marginVertical: layoutStyles.spacing.md,
  },
  
  amenityItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layoutStyles.spacing.xs,
  },
  
  amenityIcon: {
    fontSize: typography.sizes.medium,
    marginRight: layoutStyles.spacing.xs,
  },
  
  amenityText: {
    fontSize: typography.body,
    flex: 1,
  },
  
  seasonBox: {
    backgroundColor: '#E0F2FE',
    borderRadius: callout.radius,
    padding: layoutStyles.spacing.md,
    marginVertical: layoutStyles.spacing.md,
    borderWidth: 1,
    borderColor: colors.blueLight,
  },
  
  seasonTitle: {
    fontSize: typography.h4,
    fontFamily: typography.families.heading,
    color: colors.blueAlt,
    marginBottom: layoutStyles.spacing.xs,
  }
});

export default function DeerLakePageNoJSXStandardized({ pageNumberMap = {} }) {
  const e = React.createElement;

  // Sidebar content for rules page
  const rulesSidebar = [
    e(QuickFactsBox, {
      key: 'lake-facts',
      title: 'DEER LAKE FACTS',
      facts: [
        { label: 'Size', value: '5 acres' },
        { label: 'Depth', value: '12 ft max' },
        { label: 'Season', value: 'Apr-Oct' },
        { label: 'Hours', value: 'Dawn-Dusk' },
        { label: 'Capacity', value: '50 people' }
      ]
    }),
    
    e(AlertBox, {
      key: 'no-swimming',
      title: 'NO SWIMMING',
      content: 'Swimming is strictly prohibited in Deer Lake for safety and water quality. Violators may lose lake privileges.',
      type: 'danger'
    }),
    
    e(SidebarBox, {
      key: 'contact-lake',
      type: 'info',
      icon: '📞',
      title: 'LAKE COMMITTEE',
      content: [
        'Chair: Lake Committee',
        'Email: lake@bmpoa.org',
        '',
        'Report issues:',
        '• Maintenance needs',
        '• Rule violations',
        '• Wildlife concerns'
      ]
    })
  ];

  // Sidebar content for activities page
  const activitiesSidebar = [
    e(ChecklistBox, {
      key: 'what-to-bring',
      title: 'WHAT TO BRING',
      items: [
        'Valid fishing license',
        'Life jackets for boats',
        'Trash bags (carry out)',
        'Sun protection',
        'First aid supplies',
        'Emergency contacts'
      ],
      type: 'success'
    }),
    
    e(InfoBox, {
      key: 'fishing-tips',
      type: 'info',
      icon: '🎣',
      title: 'FISHING TIPS',
      content: [
        'Best times: Early AM/PM',
        'Stocked with bass & bluegill',
        'Catch & release encouraged',
        'No live bait allowed',
        'Barbless hooks preferred'
      ]
    }),
    
    e(SidebarBox, {
      key: 'wildlife',
      type: 'warning',
      icon: '🦌',
      title: 'WILDLIFE',
      content: 'Deer, turkey, and occasionally bear visit the lake. Keep distance, never feed, and secure all food items.'
    })
  ];

  return [
    // Section Divider
    e(SectionDividerEnhanced, {
      key: 'deerlake-divider',
      number: '06',
      title: 'DEER LAKE',
      description: 'Recreation area, boating, fishing, and community gatherings',
      sectionKey: 'deer-lake',
      overlayOpacity: 0.35
    }),

    // Page 1: Overview & Rules
    e(Page, { key: 'deerlake-1', size: 'LETTER', style: deerLakeStyles.page },
      e(View, { style: deerLakeStyles.twoColumn },
        // Main content
        e(View, { style: deerLakeStyles.mainColumn },
          e(Text, { style: standardStyles.h1 }, 'DEER LAKE RECREATION AREA'),
          
          e(Text, { style: standardStyles.body },
            'Deer Lake is BMPOA\'s crown jewel—a pristine 5-acre lake surrounded by natural beauty. This members-only facility offers fishing, boating, picnicking, and a peaceful retreat for property owners and their guests.'
          ),

          e(ContentImage, {
            src: 'deerlakedock',
            title: 'Deer Lake dock and boat launch',
            figureNumber: '6.1',
            description: 'The main dock provides easy access for fishing and boat launching'
          }),

          e(Text, { style: standardStyles.h2 }, 'Facilities & Amenities'),
          
          e(View, { style: deerLakeStyles.amenityGrid },
            e(View, { style: deerLakeStyles.amenityItem },
              e(Text, { style: deerLakeStyles.amenityIcon }, '🚤'),
              e(Text, { style: deerLakeStyles.amenityText }, 'Boat ramp & dock')
            ),
            e(View, { style: deerLakeStyles.amenityItem },
              e(Text, { style: deerLakeStyles.amenityIcon }, '🪑'),
              e(Text, { style: deerLakeStyles.amenityText }, 'Picnic tables & grills')
            ),
            e(View, { style: deerLakeStyles.amenityItem },
              e(Text, { style: deerLakeStyles.amenityIcon }, '🚻'),
              e(Text, { style: deerLakeStyles.amenityText }, 'Portable restrooms')
            ),
            e(View, { style: deerLakeStyles.amenityItem },
              e(Text, { style: deerLakeStyles.amenityIcon }, '🅿️'),
              e(Text, { style: deerLakeStyles.amenityText }, 'Gravel parking area')
            ),
            e(View, { style: deerLakeStyles.amenityItem },
              e(Text, { style: deerLakeStyles.amenityIcon }, '🗑️'),
              e(Text, { style: deerLakeStyles.amenityText }, 'Trash receptacles')
            ),
            e(View, { style: deerLakeStyles.amenityItem },
              e(Text, { style: deerLakeStyles.amenityIcon }, '🏞️'),
              e(Text, { style: deerLakeStyles.amenityText }, 'Nature trails')
            )
          ),

          e(Text, { style: standardStyles.h2 }, 'Lake Rules & Regulations'),
          
          e(CalloutBox, {
            type: 'danger',
            icon: '⚠️',
            title: 'STRICTLY ENFORCED',
            content: 'NO SWIMMING - NO WADING - NO PETS IN WATER'
          }),

          e(ChecklistBox, {
            title: 'GENERAL RULES',
            items: [
              'Members and accompanied guests only',
              'Dawn to dusk access (no overnight)',
              'Carry out all trash - leave no trace',
              'No glass containers',
              'No loud music or disturbances',
              'Children must be supervised',
              'No camping or overnight parking'
            ]
          })
        ),
        
        // Sidebar
        e(View, { style: deerLakeStyles.sidebarColumn }, ...rulesSidebar)
      ),
      
      e(PageFooter, { pageNumber: pageNumberMap['deer-lake'] || '—' })
    ),

    // Page 2: Activities & Guidelines
    e(Page, { key: 'deerlake-2', size: 'LETTER', style: deerLakeStyles.page },
      e(View, { style: deerLakeStyles.twoColumn },
        // Main content
        e(View, { style: deerLakeStyles.mainColumn },
          e(Text, { style: standardStyles.h2 }, 'Boating Guidelines'),
          
          e(EnhancedTable, {
            headers: ['Boat Type', 'Allowed', 'Restrictions'],
            rows: [
              ['Electric motors', 'Yes', 'Trolling motors only'],
              ['Kayaks/Canoes', 'Yes', 'Must have PFD'],
              ['Paddleboards', 'Yes', 'PFD required'],
              ['Gas motors', 'No', 'Prohibited'],
              ['Sailboats', 'Yes', 'Under 14 feet'],
              ['Inflatables', 'Yes', 'Coast Guard approved']
            ],
            caption: 'All boats must be removed daily - no permanent storage',
            columnWidths: [{ width: '35%' }, { width: '20%' }, { width: '45%' }]
          }),

          e(InfoBox, {
            type: 'warning',
            icon: '🦺',
            title: 'SAFETY REQUIREMENTS',
            content: [
              'Life jackets required for all boaters',
              'Children under 13 must wear PFD at all times',
              'No boat operation after dark',
              'Stay 50 feet from swimmers/anglers'
            ]
          }),

          e(Text, { style: standardStyles.h2 }, 'Fishing Regulations'),
          
          e(Text, { style: standardStyles.body },
            'Deer Lake is stocked annually with largemouth bass, bluegill, and catfish. Virginia fishing license required for ages 16 and up.'
          ),

          e(View, { style: deerLakeStyles.seasonBox },
            e(Text, { style: deerLakeStyles.seasonTitle }, '🎣 FISHING SEASONS'),
            e(Text, { style: standardStyles.body }, 
              'Spring (Apr-May): Best for bass'),
            e(Text, { style: standardStyles.body }, 
              'Summer (Jun-Aug): Early morning/evening best'),
            e(Text, { style: standardStyles.body }, 
              'Fall (Sep-Oct): Excellent all species')
          ),

          e(Text, { style: standardStyles.h2 }, 'Group Events'),
          
          e(Text, { style: standardStyles.body },
            'The lake area can be reserved for private events. Contact the Social Committee at least 30 days in advance. Maximum 50 people.'
          ),

          e(RequirementsTable, {
            data: [
              ['Event Reservation', 'Email social@bmpoa.org 30 days ahead'],
              ['Set-up/Clean-up', 'Organizer responsibility'],
              ['Parking', 'Overflow parks at Lodge, walk to lake'],
              ['Alcohol', 'Permitted with responsible service'],
              ['Music', 'Acoustic only, ends by 8 PM']
            ],
            caption: 'Special event guidelines'
          })
        ),
        
        // Sidebar
        e(View, { style: deerLakeStyles.sidebarColumn }, ...activitiesSidebar)
      ),
      
      e(PageFooter, { pageNumber: (pageNumberMap['deer-lake'] || 0) + 1 })
    )
  ];
}