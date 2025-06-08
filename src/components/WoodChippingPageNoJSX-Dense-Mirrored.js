import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  TwoColumnList 
} from './EnhancedLayoutComponents.js';
import { 
  MirroredTwoColumnLayout, 
  TallQuickFactsBox, 
  TallInfoBox, 
  ExtraTallInfoBox
} from './MirroredLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

export default function WoodChippingPageNoJSXDenseMirrored({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const woodStyles = StyleSheet.create({
    alertBox: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 1,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: 6,
      marginBottom: layout.spacing.sm,
    },
    alertTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.dangerDark,
      marginBottom: layout.spacing.xs,
    },
    checklistBox: {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 0.5,
      borderColor: colors.slateGray,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
    },
    checklistItem: {
      fontSize: typography.sizes.sm,
      marginBottom: 3,
      paddingLeft: 14,
      position: 'relative',
    },
    checkbox: {
      position: 'absolute',
      left: 0,
      top: 1,
    },
    programBox: {
      backgroundColor: '#E8F5E9',
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.md,
    },
    scheduleGrid: {
      borderWidth: 1,
      borderColor: colors.slateGray,
      borderRadius: callout.radius,
      overflow: 'hidden',
      marginBottom: layout.spacing.md,
    },
    scheduleHeader: {
      backgroundColor: colors.forestGreen,
      color: colors.inverse,
      padding: '6px 10px',
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      textAlign: 'center',
    },
    scheduleRow: {
      flexDirection: 'row',
      borderBottom: '1px solid #E2E8F0',
    },
    scheduleCell: {
      flex: 1,
      padding: '4px 6px',
      fontSize: typography.sizes.sm,
      borderRight: '1px solid #E2E8F0',
    },
    lastCell: {
      borderRight: 'none',
    },
    evenRow: {
      backgroundColor: '#F7FAFC',
    },
  });

  // Page 1 - Program Overview and Guidelines  
  const page1Sidebar = [
    e(TallQuickFactsBox, {
      title: 'PROGRAM FACTS',
      facts: [
        { label: 'Schedule', value: 'Annual (Spring)' },
        { label: 'Cost', value: 'FREE to owners' },
        { label: 'Volume', value: '30+ cubic yards' },
        { label: 'Coordinator', value: 'BMPOA Board' },
        { label: 'Equipment', value: 'Professional grade' },
        { label: 'Coverage', value: 'All properties' }
      ]
    }),
    
    e(TallInfoBox, {
      title: 'ACCEPTED MATERIALS',
      content: [
        '• Tree branches & limbs',
        '• Brush and shrubs', 
        '• Garden debris',
        '• Organic yard waste',
        '',
        'MAXIMUM: 4-inch diameter',
        'MAXIMUM: 8-foot length'
      ]
    }),
    
    e(ExtraTallInfoBox, {
      title: 'NOT ACCEPTED',
      content: [
        '• Lumber or treated wood',
        '• Poison ivy/oak vines',
        '• Root balls or stumps',
        '• Trash or non-organic items',
        '• Materials over size limits',
        '',
        'Violating items will be rejected and owner must remove them before service.'
      ]
    })
  ];

  // Page 2 - Safety and Preparation
  const page2Sidebar = [
    e(TallQuickFactsBox, {
      title: 'SAFETY FIRST',
      facts: [
        { label: 'Equipment', value: 'Industrial chipper' },
        { label: 'Danger Zone', value: '50 feet radius' },
        { label: 'Noise Level', value: '85+ decibels' },
        { label: 'Operation', value: 'Professional only' },
        { label: 'Children', value: 'Must stay indoors' },
        { label: 'Pets', value: 'Secure inside' }
      ]
    }),
    
    e(ExtraTallInfoBox, {
      title: 'PREPARATION STEPS',
      content: [
        '1. Cut branches to 8ft maximum',
        '2. Remove all foreign objects',
        '3. Sort by size (small/large)',
        '4. Clear access path to street',
        '5. Stack neatly at roadside',
        '6. Post preparation notice',
        '',
        'Preparation must be completed 24 hours before scheduled service date.'
      ]
    }),
    
    e(TallInfoBox, {
      title: 'WEATHER POLICY',
      content: [
        'Service may be postponed for:',
        '• Heavy rain or storms',
        '• High winds (15+ mph)',
        '• Icy conditions',
        '',
        'Rescheduling notices posted on Facebook and website.'
      ]
    })
  ];

  // Page 3 - Scheduling and Contact
  const page3Sidebar = [
    e(TallQuickFactsBox, {
      title: 'SCHEDULING',
      facts: [
        { label: 'Sign-up', value: 'March 1-15' },
        { label: 'Service', value: 'April-May' },
        { label: 'Notice', value: '48 hours prior' },
        { label: 'Duration', value: '6-8 weeks total' },
        { label: 'Properties', value: '3-5 per day' },
        { label: 'Backup', value: 'Weather dependent' }
      ]
    }),
    
    e(ExtraTallInfoBox, {
      title: 'CONTACT INFO',
      content: [
        'Program Coordinator:',
        'BMPOA Board of Directors',
        '',
        '📧 Email: info@bmpoa.org',
        '📱 Facebook: BMPOA Community',
        '🌐 Website: www.bmpoa.org',
        '',
        'Emergency contact during service:',
        'Crew supervisor on-site',
        '',
        'Questions about eligibility, scheduling, or preparation should be directed to the Board.'
      ]
    }),
    
    e(TallInfoBox, {
      title: 'SPECIAL REQUESTS',
      content: [
        'Large volume properties may require:',
        '• Multiple service days',
        '• Special equipment',
        '• Additional coordination',
        '',
        'Contact Board in advance for properties with 10+ cubic yards.'
      ]
    })
  ];

  return [
    // Page 1: Program Overview
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'WOOD CHIPPING PROGRAM')
      ),
      e(MirroredTwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'PROGRAM OVERVIEW'),
        
        e(DenseText, null,
          'The annual wood chipping program helps property owners manage organic debris while reducing wildfire risk. Professional equipment and trained operators provide safe, efficient service to all participating properties.'
        ),

        e(View, { style: woodStyles.programBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: 4, color: colors.forestGreen } }, 
            '🌲 ENVIRONMENTAL BENEFITS'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: 1.4 } },
            'Chipped material can be used as mulch for gardens and landscaping • Reduces fire hazard by eliminating brush piles • Keeps organic waste out of landfills • Supports forest health through debris management'
          )
        ),

        e(CompactSubsectionHeader, null, 'ELIGIBILITY & PARTICIPATION'),
        
        e(DenseText, null,
          'All current BMPOA property owners are eligible to participate. The program is funded through association fees and provided at no additional cost. Properties must be accessible by truck and trailer.'
        ),

        e(View, { style: woodStyles.checklistBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 
            'PARTICIPATION REQUIREMENTS:'
          ),
          e(View, { style: { gap: 2 } },
            e(Text, { style: woodStyles.checklistItem }, 
              e(Text, { style: woodStyles.checkbox }, '☑ '),
              'Current on association dues'
            ),
            e(Text, { style: woodStyles.checklistItem }, 
              e(Text, { style: woodStyles.checkbox }, '☑ '),
              'Submit signup form by deadline'
            ),
            e(Text, { style: woodStyles.checklistItem }, 
              e(Text, { style: woodStyles.checkbox }, '☑ '),
              'Prepare materials according to guidelines'
            ),
            e(Text, { style: woodStyles.checklistItem }, 
              e(Text, { style: woodStyles.checkbox }, '☑ '),
              'Provide clear access to collection point'
            ),
            e(Text, { style: woodStyles.checklistItem }, 
              e(Text, { style: woodStyles.checkbox }, '☑ '),
              'Follow all safety requirements'
            )
          )
        ),

        e(CompactSubsectionHeader, null, 'PROGRAM GUIDELINES'),
        
        e(DenseText, null,
          'Materials must be organic yard debris only. Maximum branch diameter is 4 inches, maximum length is 8 feet. All foreign objects must be removed including nails, wire, rocks, and trash. Poison ivy and poison oak are not accepted due to safety concerns.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.woodChipping || '13')
      )
    ),

    // Page 2: Safety and Preparation  
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(MirroredTwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'SAFETY REQUIREMENTS'),
        
        e(View, { style: woodStyles.alertBox },
          e(Text, { style: woodStyles.alertTitle }, '⚠️ DANGER: INDUSTRIAL EQUIPMENT'),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: 1.4 } },
            'Wood chipping equipment is extremely dangerous. All persons must maintain 50-foot minimum distance during operation. Children and pets must be secured indoors.'
          )
        ),

        e(DenseText, null,
          'Professional operators use industrial-grade chipping equipment capable of processing large volumes quickly. The machinery generates significant noise, debris, and safety hazards. Only trained personnel may operate or approach the equipment.'
        ),

        e(CompactSubsectionHeader, null, 'PREPARATION REQUIREMENTS'),
        
        e(DenseText, null,
          'Proper preparation ensures efficient service and operator safety. All materials must be cut to specification, sorted by size, and positioned for easy access. Foreign objects must be completely removed.'
        ),

        e(View, { style: woodStyles.scheduleGrid },
          e(Text, { style: woodStyles.scheduleHeader }, 'PREPARATION TIMELINE'),
          e(View, { style: [woodStyles.scheduleRow, woodStyles.evenRow] },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1 }] }, '1 Week Prior'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2 }] }, 'Cut branches, remove foreign objects, sort materials')
          ),
          e(View, { style: woodStyles.scheduleRow },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1 }] }, '48 Hours Prior'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2 }] }, 'Move materials to collection point, clear access path')
          ),
          e(View, { style: [woodStyles.scheduleRow, woodStyles.evenRow] },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1 }] }, '24 Hours Prior'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2, borderRight: 'none' }] }, 'Final inspection, secure pets, post notice for neighbors')
          )
        ),

        e(CompactSubsectionHeader, null, 'COLLECTION POINT SETUP'),
        
        e(DenseText, null,
          'Materials should be placed at the roadside or other truck-accessible location. Stack small branches separately from large ones. Ensure clear access for equipment and personnel. Remove vehicles from the immediate area.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.woodChipping || 13) + 1)
      )
    ),

    // Page 3: Scheduling and Contact
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(MirroredTwoColumnLayout, { sidebarContent: page3Sidebar },
        e(CompactSectionHeader, null, 'SCHEDULING PROCESS'),
        
        e(DenseText, null,
          'Service scheduling begins in early March with property owner signup. The Board coordinates with the service provider to create an efficient route covering all participating properties. Weather and equipment availability affect the final schedule.'
        ),

        e(View, { style: woodStyles.scheduleGrid },
          e(Text, { style: woodStyles.scheduleHeader }, 'ANNUAL SCHEDULE'),
          e(View, { style: [woodStyles.scheduleRow, woodStyles.evenRow] },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1.5 }] }, 'March 1-15'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2.5 }] }, 'Property owner signup period')
          ),
          e(View, { style: woodStyles.scheduleRow },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1.5 }] }, 'March 16-31'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2.5 }] }, 'Route planning and contractor coordination')
          ),
          e(View, { style: [woodStyles.scheduleRow, woodStyles.evenRow] },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1.5 }] }, 'April 1-30'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2.5 }] }, 'Primary service period (weather permitting)')
          ),
          e(View, { style: woodStyles.scheduleRow },
            e(Text, { style: [woodStyles.scheduleCell, { flex: 1.5 }] }, 'May 1-15'),
            e(Text, { style: [woodStyles.scheduleCell, { flex: 2.5, borderRight: 'none' }] }, 'Makeup dates and completion')
          )
        ),

        e(CompactSubsectionHeader, null, 'SIGNUP PROCESS'),
        
        e(DenseText, null,
          'Property owners must submit signup forms during the March enrollment period. Forms are available on the BMPOA website, Facebook group, and via email. Late registrations cannot be guaranteed service.'
        ),

        e(View, { style: woodStyles.checklistBox },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 6 } }, 
            'SIGNUP INFORMATION REQUIRED:'
          ),
          e(TwoColumnList, {
            items: [
              'Property address',
              'Owner contact information', 
              'Estimated volume',
              'Special access requirements',
              'Preferred service week',
              'Emergency contact number'
            ]
          })
        ),

        e(CompactSubsectionHeader, null, 'SERVICE NOTIFICATIONS'),
        
        e(DenseText, null,
          'The Board provides 48-hour advance notice via email and Facebook posting. Service may be delayed due to weather, equipment issues, or accessibility problems. Updates are posted promptly when schedules change.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.woodChipping || 13) + 2)
      )
    )
  ];
}