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

export default function MountainHomePageNoJSXConsolidatedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const homeStyles = StyleSheet.create({
    maintenanceBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    tipBox: {
      backgroundColor: '#E8F5E9',
      padding: layout.spacing.xs,
      borderRadius: callout.radius,
      marginBottom: layout.spacing.xs,
    }
  });

  return [
    // Page 1: Mountain Living Basics
    e(
      Page,
      { key: 'mountain-home-1', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(QuickFactsBox, { 
            facts: [
              { label: 'Elevation', value: '1,800+ feet' },
              { label: 'Climate', value: 'Temperate' },
              { label: 'Zones', value: 'USDA 6b-7a' },
              { label: 'Water', value: 'Well + municipal' },
              { label: 'Internet', value: 'Fiber available' }
            ]
          }),
          e(InfoBox, { title: '🏔️ ELEVATION BENEFITS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Cooler summer temperatures'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Lower humidity levels'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Clear mountain air'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Spectacular views'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Dark night skies')
          ),
          e(InfoBox, { title: '❄️ WINTER PREP' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Install snow stakes'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Service heating systems'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Insulate outdoor pipes'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Stock emergency supplies'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Check backup power')
          )
        ]
      },
        e(CompactSectionHeader, null, 'A MOUNTAIN HOME'),
        
        e(DenseText, null,
          'Living on Blue Mountain offers a unique combination of natural beauty, privacy, and community. Our elevated location provides cooler summers, spectacular fall foliage, and peaceful mountain living just minutes from urban conveniences.'
        ),

        e(CompactSubsectionHeader, null, 'UNIQUE CONSIDERATIONS'),
        
        e(View, { style: homeStyles.maintenanceBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: 4 } }, 
            'MOUNTAIN LIVING ESSENTIALS'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Steep driveways require winter maintenance • Well water systems need regular testing • ' +
            'Propane delivery for heating and cooking • Wildlife interactions are common • ' +
            'Weather can change rapidly with elevation'
          )
        ),

        e(CompactSubsectionHeader, null, 'SEASONAL ACTIVITIES'),
        
        e(CompactTable, {
          headers: ['Season', 'Activities', 'Maintenance'],
          rows: [
            ['Spring', 'Hiking, wildlife viewing', 'Driveway repair, well testing'],
            ['Summer', 'Outdoor dining, stargazing', 'Landscaping, deck care'],
            ['Fall', 'Foliage tours, hunting', 'Gutter cleaning, winterization'],
            ['Winter', 'Snow activities, holidays', 'Ice removal, heating service']
          ]
        }),

        e(CompactSubsectionHeader, null, 'COMMUNITY ADVANTAGES'),
        
        e(DenseText, null,
          'Blue Mountain residents enjoy the best of both worlds - peaceful mountain living with community amenities including recreational facilities, organized events, road maintenance, and neighbors who share your appreciation for mountain life.'
        ),

        e(View, { style: { flexDirection: 'row', flexWrap: 'wrap', marginTop: layout.spacing.xs } },
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Private mountain community'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Recreational facilities'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Road maintenance'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Community events'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Wildlife protection'),
          e(Text, { style: { fontSize: typography.sizes.xs, width: '50%', marginBottom: 2 } }, '• Property value preservation')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '11'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Maintenance & Care
    e(
      Page,
      { key: 'mountain-home-2', size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { 
        sidebarContent: [
          e(InfoBox, { title: '🔧 CONTRACTORS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Driveway sealing services'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Well system maintenance'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Propane delivery/service'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Snow removal services'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Tree care professionals')
          ),
          e(InfoBox, { title: '📋 ANNUAL TASKS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'HVAC system service'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Chimney cleaning/inspection'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Well water testing'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Driveway maintenance'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Gutter cleaning')
          )
        ]
      },
        e(CompactSectionHeader, null, 'HOME MAINTENANCE SCHEDULE'),
        
        e(DenseText, null,
          'Mountain homes require specific maintenance considerations due to elevation, weather exposure, and unique infrastructure. Following a regular maintenance schedule helps preserve your investment and ensures year-round comfort.'
        ),

        e(CompactSubsectionHeader, null, 'COMPREHENSIVE MAINTENANCE CALENDAR'),
        
        e(CompactTable, {
          headers: ['Task', 'Frequency', 'Best Season', 'Notes'],
          rows: [
            ['Driveway sealing', 'Every 3-5 years', 'Summer', 'Protect from freeze-thaw cycles'],
            ['Chimney cleaning', 'Annually', 'Fall', 'Before heating season begins'],
            ['Well water testing', 'Annually', 'Spring', 'Required by health department'],
            ['HVAC service', 'Annually', 'Fall', 'Clean filters monthly'],
            ['Gutter cleaning', 'Twice yearly', 'Spring/Fall', 'Remove leaves and debris'],
            ['Deck staining', 'Every 2-3 years', 'Late spring', 'UV and moisture protection'],
            ['Tree inspection', 'Annually', 'Late winter', 'Remove dead/dangerous limbs'],
            ['Propane tank check', 'Before each season', 'Fall/Spring', 'Ensure adequate supply'],
            ['Emergency kit review', 'Twice yearly', 'Spring/Fall', 'Update supplies and batteries'],
            ['Outdoor faucet winterization', 'Annually', 'Fall', 'Prevent pipe freezing']
          ]
        }),

        e(CompactSubsectionHeader, null, 'PREVENTIVE CARE TIPS'),
        
        e(View, { style: homeStyles.tipBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            'COST-SAVING MAINTENANCE STRATEGIES'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Bundle services with neighbors for better rates • Schedule annual services in off-peak seasons • ' +
            'Learn basic maintenance tasks • Keep maintenance logs for warranty claims • ' +
            'Address small issues before they become major problems'
          )
        ),

        e(View, { style: { backgroundColor: '#E8F5E9', padding: layout.spacing.xs, borderRadius: callout.radius, marginTop: layout.spacing.sm } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '⚡ EMERGENCY PREPAREDNESS'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Extended power outages can occur. Keep: flashlights, batteries, water, non-perishable food, first aid kit, radio, backup heating. Contact neighbors via BMPOA Facebook for contractor recommendations.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '12'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}