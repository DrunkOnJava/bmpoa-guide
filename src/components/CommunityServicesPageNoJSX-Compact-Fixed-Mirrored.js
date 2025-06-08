import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout } from '../designTokens.js';
import { styles } from '../theme.js';
import { 
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { 
  MirroredTwoColumnLayout, 
  TallInfoBox, 
  ExtraTallInfoBox,
  TallQuickFactsBox
} from './MirroredLayoutComponents.js';

export default function CommunityServicesPageNoJSXCompactFixedMirrored({ pageNumberMap = {} }) {
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
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'COMMUNITY SERVICES & AMENITIES')
      ),
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallInfoBox, { title: '📅 EVENT CALENDAR' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Spring Cleanup: April (TBD)'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'July 4th Picnic: 12-8 PM'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Fall Festival: October (TBD)'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Holiday Party: December (TBD)'),
            e(Text, { style: { fontSize: typography.sizes.xs, marginTop: 4 } }, 'Check Facebook for updates')
          ),
          
          e(ExtraTallInfoBox, { title: '🏠 PROPERTY SERVICES' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Road Maintenance:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Snow removal, grading, repairs'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Trash Collection:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Weekly pickup available'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Water System:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Community well maintenance'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Security Patrol:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Regular property monitoring')
          ),
          
          e(TallQuickFactsBox, {
            title: 'CONTACT INFO',
            facts: [
              { label: 'Events', value: 'social@bmpoa.org' },
              { label: 'Volunteers', value: 'volunteers@bmpoa.org' },
              { label: 'Facebook', value: 'BMPOA Community' },
              { label: 'Website', value: 'www.bmpoa.org' }
            ]
          })
        ]
      },
        e(CompactSectionHeader, null, 'COMMUNITY EVENTS & ACTIVITIES'),
        
        e(DenseText, null,
          'Blue Mountain hosts several annual events that bring neighbors together and celebrate our mountain community. These gatherings provide opportunities to meet fellow property owners, share information, and enjoy the natural beauty of our location.'
        ),

        e(CompactSubsectionHeader, null, 'ANNUAL SIGNATURE EVENTS'),
        
        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: colors.forestGreen } }, 
            '🎆 JULY 4TH CELEBRATION'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.4 } },
            'Location: The Lodge grounds • Time: 12:00 PM - 8:00 PM • Features: Community potluck, games, music, and fellowship • Bring: Side dish to share, chairs, and drinks • Fireworks viewing from Lodge deck at dusk'
          )
        ),

        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: colors.forestGreen } }, 
            '🍂 FALL FESTIVAL'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.4 } },
            'Location: Lodge & grounds • Time: 2:00 PM - 6:00 PM • Features: Harvest celebration, seasonal crafts, apple cider • Family-friendly activities • Photography opportunities with fall foliage'
          )
        ),

        e(View, { style: serviceStyles.eventBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: colors.forestGreen } }, 
            '🧹 SPRING CLEANUP DAY'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.4 } },
            'Location: Community areas • Time: 9:00 AM - 3:00 PM • Activities: Trail maintenance, Lodge cleanup, landscaping • Tools provided • Lunch included for volunteers'
          )
        ),

        e(CompactSubsectionHeader, null, 'ONGOING ACTIVITIES'),
        
        e(View, { style: serviceStyles.activityBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            'ONGOING ACTIVITIES'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Yoga at the Lodge: Weekly sessions for all skill levels. Check BMPOA website and Facebook for schedules. Bring your own mat and water bottle.'
          )
        ),

        e(CompactSubsectionHeader, null, 'VOLUNTEER OPPORTUNITIES'),
        
        e(DenseText, null,
          'Community involvement keeps Blue Mountain beautiful and well-maintained. Volunteer opportunities include event planning, trail maintenance, Lodge upkeep, newsletter writing, and Board committee participation. All skill levels welcome.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.communityServices || '20')
      )
    ),

    // Page 2: Infrastructure & Services
    e(
      Page,
      { key: 'community-2', size: 'LETTER', style: styles.page },
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'SERVICE CONTACTS',
            facts: [
              { label: 'Water Issues', value: '(540) 635-0922' },
              { label: 'Road Problems', value: 'Board Meeting' },
              { label: 'Trash Service', value: 'County (540) 635-4734' },
              { label: 'Security', value: 'Sheriff (540) 635-4128' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '💧 WATER SYSTEM' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Community Well:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Shared artesian well system'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Water Quality:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Tested annually per state requirements'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Distribution:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Gravity-fed system to all properties'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Maintenance:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'BMPOA maintains lines and pump house')
          ),
          
          e(TallInfoBox, { title: '🚛 WASTE MANAGEMENT' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Weekly trash pickup available'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Recycling service optional'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Contact Warren County for service'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Burn permits available from county')
          )
        ]
      },
        e(CompactSectionHeader, null, 'INFRASTRUCTURE & UTILITIES'),
        
        e(DenseText, null,
          'Blue Mountain maintains essential infrastructure to support mountain living. Community services include road maintenance, water system management, security monitoring, and coordination with county services for optimal resident support.'
        ),

        e(CompactSubsectionHeader, null, 'ROAD MAINTENANCE PROGRAM'),
        
        e(DenseText, null,
          'BMPOA maintains all private roads within the community. Services include snow removal, grading, pothole repair, drainage maintenance, and seasonal improvements. Road conditions are monitored regularly and maintenance scheduled as needed.'
        ),

        e(View, { style: serviceStyles.compactBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '🛣️ ROAD SERVICES'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Snow Removal: Priority roads cleared first • Grading: Spring and fall maintenance • Repairs: Pothole filling and edge work • Drainage: Culvert cleaning and ditch maintenance • Signage: Road signs and speed limit enforcement'
          )
        ),

        e(CompactSubsectionHeader, null, 'COMMUNITY WATER SYSTEM'),
        
        e(DenseText, null,
          'The community operates a shared artesian well system providing high-quality mountain spring water. The system is gravity-fed from elevated storage tanks and regularly maintained to ensure reliable service to all properties.'
        ),

        e(CompactSubsectionHeader, null, 'SECURITY & SAFETY SERVICES'),
        
        e(DenseText, null,
          'Regular security patrols monitor property conditions and watch for unauthorized access. The Warren County Sheriff provides law enforcement coverage. Emergency services including fire and medical are available through county dispatch.'
        ),

        e(View, { style: serviceStyles.compactBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '🚨 EMERGENCY SERVICES'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Fire: Warren County Vol. Fire (540) 635-3473 • Medical: 911 emergency dispatch • Sheriff: (540) 635-4128 • Poison Control: 1-800-222-1222 • Power Outages: Report to Shenandoah Valley Electric'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.communityServices || 20) + 1)
      )
    )
  ];
}