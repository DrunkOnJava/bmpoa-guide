import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout } from '../designTokens.js';
import { styles } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';

export default function CommunityServicesPageNoJSXCompactFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const serviceStyles = StyleSheet.create({
    eventBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    compactBox: {
      backgroundColor: '#E8F5E9',
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.xs,
    },
    activityBox: {
      backgroundColor: '#FFF9C4',
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.xs,
    }
  });

  return [
    // Page 1: Social Events & Activities  
    e(
      Page,
      { key: 'community-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(InfoBox, { title: '📅 EVENT CALENDAR' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Spring Cleanup: April (TBD)'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'July 4th Picnic: 12-8 PM'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Harvest Festival: 3rd Sat Oct'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Holiday Party: 2nd Sat Dec'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Board Meetings: 2nd Mon 6PM'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Yoga Classes: Weekly')
          ),
          e(InfoBox, { title: '🎯 GET INVOLVED' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'The Social Committee welcomes new members and fresh ideas.'),
            e(Text, { style: { fontSize: typography.sizes.xs, marginTop: 4 } }, 'Contact Mackenzie to join or suggest events!')
          )
        ]
      },
        e(CompactSectionHeader, null, 'SOCIAL EVENTS & ACTIVITIES'),
        
        e(DenseText, null,
          'The BMPOA Social Committee works throughout the year to create opportunities for neighbors to connect, celebrate, and build our mountain community.'
        ),

        e(CompactSubsectionHeader, null, 'ANNUAL COMMUNITY EVENTS'),
        
        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'SPRING COMMUNITY CLEANUP & POTLUCK'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Usually held in April after wood chipping • Morning cleanup of common areas • ' +
            'Potluck lunch at the Lodge • Great opportunity to meet new neighbors'
          )
        ),

        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'SUMMER INDEPENDENCE DAY PICNIC'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'July 4th celebration at the Lodge • BBQ, games, and family activities • ' +
            'Evening fireworks viewing from the deck • Bring a dish to share'
          )
        ),

        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'FALL HARVEST FESTIVAL'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'October celebration of autumn • Pumpkin carving and decorating • ' +
            'Cider and seasonal treats • Costume parade for kids'
          )
        ),

        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 
            'WINTER HOLIDAY GATHERING'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'December holiday party • Cookie exchange • Carol singing and fellowship • ' +
            'Collection for local charities'
          )
        ),

        e(View, { style: serviceStyles.activityBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            'ONGOING ACTIVITIES'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Yoga at the Lodge: Weekly sessions for all skill levels. Check BMPOA website and Facebook for schedules. Bring your own mat and water bottle.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '19'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Essential Services
    e(
      Page,
      { key: 'community-2', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, { 
            facts: [
              { label: 'Trash', value: 'Weekly pickup' },
              { label: 'Recycling', value: 'Bi-weekly' },
              { label: 'Internet', value: 'Fiber available' },
              { label: 'Propane', value: 'Delivery service' },
              { label: 'Snow', value: 'Road maintenance' }
            ]
          }),
          e(InfoBox, { title: '🚚 WASTE COLLECTION' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Trash: Mondays'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Recycling: Every other Monday'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Bulk items: By appointment'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Provider: Warren County')
          )
        ]
      },
        e(CompactSectionHeader, null, 'ESSENTIAL SERVICES'),
        
        e(CompactSubsectionHeader, null, 'UTILITIES & INFRASTRUCTURE'),
        
        e(CompactTable, {
          headers: ['Service', 'Provider', 'Notes'],
          rows: [
            ['Electricity', 'Northern VA Electric Coop', '24/7 outage reporting'],
            ['Water/Sewer', 'Front Royal Water Works', 'Backup wells available'],
            ['Natural Gas', 'Not available', 'Propane delivery only'],
            ['Internet', 'Multiple providers', 'Fiber optic available'],
            ['Phone', 'Multiple providers', 'Cell towers nearby'],
            ['Cable TV', 'Multiple providers', 'Satellite options']
          ]
        }),
        
        e(CompactSubsectionHeader, null, 'WASTE MANAGEMENT'),
        
        e(DenseText, null,
          'Warren County provides weekly trash collection and bi-weekly recycling pickup. Collection day is Monday with pickup starting early morning. Place containers at roadside by 7 AM.'
        ),
        
        e(CompactSubsectionHeader, null, 'ROAD MAINTENANCE'),
        
        e(DenseText, null,
          'Blue Mountain Road is maintained by Warren County. Snow removal priority is given to main thoroughfares first, then secondary roads. Residents should be prepared for winter weather delays.'
        ),
        
        e(CompactSubsectionHeader, null, 'EMERGENCY SERVICES'),
        
        e(View, { style: { flexDirection: 'row', flexWrap: 'wrap' } },
          e(Text, { style: { fontSize: typography.sizes.sm, width: '50%', marginBottom: 2 } }, '• Fire: Linden VFD'),
          e(Text, { style: { fontSize: typography.sizes.sm, width: '50%', marginBottom: 2 } }, '• EMS: Warren County'),
          e(Text, { style: { fontSize: typography.sizes.sm, width: '50%', marginBottom: 2 } }, '• Police: Sheriff Dept'),
          e(Text, { style: { fontSize: typography.sizes.sm, width: '50%', marginBottom: 2 } }, '• Emergency: 911')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '20'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}