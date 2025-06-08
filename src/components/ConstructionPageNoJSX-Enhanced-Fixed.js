import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout,
  QuickFactsBox,
  CompactTable,
  DenseText,
  CompactSectionHeader
} from './EnhancedLayoutComponents.js';
import { 
  FeatureBox,
  Timeline,
  SidebarBox,
  Badge
} from './AdvancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js';

export default function ConstructionPageNoJSXEnhancedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // Helper component for alerts
  const AlertBox = ({ title, type = 'warning', content, key }) => {
    const backgroundColor = type === 'warning' ? '#FEF3C7' : 
                           type === 'info' ? '#DBEAFE' : '#FEE2E2';
    const borderColor = type === 'warning' ? '#F59E0B' : 
                       type === 'info' ? '#3B82F6' : '#DC2626';
    const titleColor = type === 'warning' ? '#92400E' : 
                      type === 'info' ? '#1E40AF' : '#991B1B';
    
    return e(View, { 
      key, 
      style: { 
        borderRadius: callout.radius,
        padding: spacing.sm,
        marginBottom: spacing.sm,
        backgroundColor,
        borderWidth: 1,
        borderColor
    }
  },
      e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs, color: titleColor } }, title),
      e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, content)
    );
};

  const constructionStyles = StyleSheet.create({
    flowchartContainer: {
      marginVertical: spacing.md,
  },
    flowchartBox: {
      backgroundColor: '#F8FAFC',
      border: `1px solid ${colors.mediumGray}`,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
      alignItems: 'center',
  },
    flowchartArrow: {
      fontSize: typography.sizes.large,
      color: colors.forestGreen,
      textAlign: 'center',
      marginVertical: spacing.xs,
  },
    flowchartText: {
      fontSize: typography.sizes.sm,
      textAlign: 'center',
      fontWeight: typography.weights.bold,
  },
    approvalBox: {
      backgroundColor: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
  },
    resourceBox: {
      backgroundColor: colors.backgroundAlt,
      padding: spacing.sm,
      borderRadius: callout.radius,
      marginBottom: spacing.sm,
      borderLeft: `3px solid ${colors.primary}`,
  },
    resourceTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.xs,
  },
    seasonalGrid: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
  },
    seasonalBox: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      borderRadius: callout.radius,
      padding: spacing.sm,
      borderTop: `3px solid ${colors.forestGreen}`,
  },
    seasonalTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: spacing.xs,
  },
    complianceBox: {
      backgroundColor: '#EFF6FF',
      border: `1px solid ${colors.primary}`,
      borderRadius: callout.radius,
      padding: spacing.md,
      marginTop: spacing.md,
  }
});

  const projectTimeline = [
    { phase: 'Pre-Construction', description: 'ARC approval & permits', duration: '2-4 weeks' },
    { phase: 'Site Preparation', description: 'Clear access & protection', duration: '1 week' },
    { phase: 'Construction', description: 'Active building phase', duration: 'Varies' },
    { phase: 'Final Inspection', description: 'County & ARC review', duration: '1 week' },
    { phase: 'Project Closeout', description: 'Site cleanup & restoration', duration: '1 week' }
  ];

  return [
    // Section Divider - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '11',
    //   title: 'CONSTRUCTION &\nIMPROVEMENTS',
    //   description: 'Guidelines for building, renovating, and improving properties while maintaining the character and natural beauty of Blue Mountain',
    //   backgroundColor: colors.primary
    // }),

    // Architectural Review Process Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'ARCHITECTURAL REVIEW PROCESS')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            e(QuickFactsBox, {
              key: 'arc-facts',
              title: 'ARC QUICK FACTS',
              facts: [
                { label: 'Review Time', value: '30 days' },
                { label: 'App Fee', value: 'None' },
                { label: 'Meetings', value: 'Monthly' },
                { label: 'Approval', value: '2 years' },
                { label: 'Extensions', value: 'Available' }
              ]
          }),
            
            e(InfoBox, {
              key: 'contact',
              title: 'ARC CONTACT',
              content: [
                'arc@bmpoa.org',
                '',
                'Submit applications via:',
                '• Email (preferred)',
                '• Mail to PO Box',
                '• Hand deliver'
              ]
          }),
            
            e(ChecklistBox, {
              key: 'required-docs',
              title: 'REQUIRED DOCUMENTS',
              items: [
                'Completed application',
                'Site plan/survey',
                'Building plans',
                'Elevations',
                'Materials list',
                'Colors/samples',
                'Contractor info'
              ]
          })
          ]
      },
        
        e(Text, { style: styles.h2 }, 'GETTING APPROVAL'),
        
        e(DenseText, null,
          'The Architectural Review Committee (ARC) ensures all construction maintains community standards and protects property values. Most projects require approval before starting work.'
        ),
        
        // ARC Approval Flowchart
        e(Text, { style: styles.h3 }, 'APPROVAL PROCESS'),
        
        e(View, { style: constructionStyles.flowchartContainer },
          e(View, { style: constructionStyles.flowchartBox },
            e(Text, { style: constructionStyles.flowchartText }, '1. SUBMIT APPLICATION')
          ),
          e(Text, { style: constructionStyles.flowchartArrow }, '↓'),
          
          e(View, { style: constructionStyles.flowchartBox },
            e(Text, { style: constructionStyles.flowchartText }, '2. ARC REVIEW (30 days)')
          ),
          e(Text, { style: constructionStyles.flowchartArrow }, '↓'),
          
          e(View, { style: constructionStyles.flowchartBox },
            e(Text, { style: constructionStyles.flowchartText }, '3. DECISION ISSUED')
          ),
          e(Text, { style: constructionStyles.flowchartArrow }, '↓'),
          
          e(View, { style: constructionStyles.flowchartBox },
            e(Text, { style: constructionStyles.flowchartText }, '4. OBTAIN PERMITS')
          ),
          e(Text, { style: constructionStyles.flowchartArrow }, '↓'),
          
          e(View, { style: constructionStyles.flowchartBox },
            e(Text, { style: constructionStyles.flowchartText }, '5. BEGIN CONSTRUCTION')
          )
        ),
        
        e(Text, { style: styles.h3 }, 'PROJECTS REQUIRING APPROVAL'),
        
        e(CompactTable, {
          headers: ['Project Type', 'Examples'],
          rows: [
            ['New Construction', 'Homes, garages, sheds, decks'],
            ['Additions', 'Room additions, porches, dormers'],
            ['Exterior Changes', 'Siding, roofing, windows, doors'],
            ['Site Work', 'Driveways, retaining walls, grading'],
            ['Landscaping', 'Tree removal, major plantings']
          ]
      }),
        
        e(AlertBox, {
          title: 'START WORK WITHOUT APPROVAL?',
          type: 'warning',
          content: 'Stop work order • Daily fines • Forced removal • Legal action • Denial of future requests'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.construction || '51')
      )
    ),

    // Design Standards Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'DESIGN STANDARDS & GUIDELINES')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'Blue Mountain values architectural harmony while allowing individual expression. These standards preserve our mountain character and protect property values.'
        ),
        
        e(Text, { style: styles.h3 }, 'ARCHITECTURAL STYLE'),
        
        e(FeatureBox, {
          title: 'MOUNTAIN CONTEMPORARY',
          content: 'Designs should complement the natural landscape using earth tones, natural materials, and forms that blend with the topography. Avoid urban or beach styles.'
      }),
        
        e(Text, { style: styles.h3 }, 'BUILDING REQUIREMENTS'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.sm } },
          e(View, { style: { flex: 1 } },
            e(InfoBox, {
              title: 'MINIMUM SIZES',
              content: [
                'Main floor: 1,200 sq ft',
                'Total living: 1,500 sq ft',
                'Garage: 2-car minimum',
                'Setbacks per county'
              ]
          })
          ),
          e(View, { style: { flex: 1 } },
            e(InfoBox, {
              title: 'HEIGHT LIMITS',
              content: [
                'Maximum: 35 feet',
                'Stories: 2.5 max',
                'Measure from grade',
                'Chimney exception'
              ]
          })
          )
        ),
        
        e(Text, { style: styles.h3 }, 'EXTERIOR MATERIALS & COLORS'),
        
        e(CompactTable, {
          headers: ['Element', 'Acceptable Options'],
          rows: [
            ['Siding', 'Wood, cement fiber, stone, stucco'],
            ['Roofing', 'Architectural shingles, metal, slate'],
            ['Colors', 'Earth tones, muted colors, natural stains'],
            ['Trim', 'Complement or contrast main color'],
            ['Foundation', 'Stone, stucco, or painted concrete'],
            ['Fencing', 'No chain link visible from road'],
            ['Landscaping', 'Native plants preferred'],
            ['Lighting', 'Dark sky compliant'],
            ['Utilities', 'Screen HVAC and utility units']
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'SITE PLANNING'),
        
        e(ChecklistBox, {
          title: 'Site Considerations',
          items: [
            'Minimize tree removal and grading',
            'Preserve natural drainage patterns'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 1)
      )
    ),

    // Construction Process Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'CONSTRUCTION PROCESS & COMPLIANCE')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            e(InfoBox, {
              key: 'county-permits',
              title: 'COUNTY PERMITS',
              content: [
                'Warren County Building',
                '220 N Commerce Ave',
                'Front Royal, VA 22630',
                '(540) 636-4600',
                '',
                'Required for:',
                '• Building',
                '• Electrical',
                '• Plumbing',
                '• Mechanical'
              ]
          }),
            
            e(ChecklistBox, {
              key: 'project-checklist',
              title: 'PROJECT CHECKLIST',
              items: [
                '□ ARC approval',
                '□ County permits',
                '□ Contractor insurance',
                '□ Neighbor notification',
                '□ Tree protection',
                '□ Silt fencing',
                '□ Porta-potty',
                '□ Debris plan'
              ]
          }),
            
            e(AlertBox, {
              key: 'violations',
              title: 'VIOLATIONS',
              type: 'warning',
              content: 'Work without approval:\n• Stop work order\n• Daily fines\n• Removal required\n• Legal action'
          }),
            
            e(InfoBox, {
              key: 'builder-requirements',
              title: 'BUILDER REQUIREMENTS',
              type: 'highlight',
              content: [
                'All contractors must provide:',
                '• Proof of liability insurance',
                '• Required county permits',
                '• Follow BMPOA hours:',
                '  - Mon-Fri: 7AM-6PM',
                '  - Saturday: 8AM-5PM',
                '  - No Sunday work',
                '• Maintain clean, safe job site'
              ]
          })
          ]
      },
        
        e(Text, { style: styles.h2 }, 'CONSTRUCTION REQUIREMENTS'),
        
        e(DenseText, null,
          'Successful projects follow both BMPOA and Warren County requirements. Planning ahead ensures smooth approval and construction.'
        ),
        
        e(Text, { style: styles.h3 }, 'PROJECT TIMELINE'),
        
        e(View, { style: { marginBottom: spacing.md } },
          ...projectTimeline.map((phase, index) => 
            e(View, { 
              key: `timeline-${index}`,
              style: { 
                flexDirection: 'row', 
                marginBottom: spacing.xs,
                paddingLeft: spacing.sm 
            }
          },
              e(Text, { style: { width: 120, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 
                phase.phase + ':'
              ),
              e(Text, { style: { flex: 1, fontSize: typography.sizes.sm } }, 
                phase.description
              ),
              e(Text, { style: { fontSize: typography.sizes.sm, color: colors.mediumGray } }, 
                phase.duration
              )
            )
          )
        ),
        
        e(Text, { style: styles.h3 }, 'SITE REQUIREMENTS'),
        
        e(FeatureBox, {
          title: 'DURING CONSTRUCTION',
          content: 'Display permits visibly • Install silt fencing • Protect trees with barriers • Provide portable toilet • Maintain debris container • Control dust and mud • Respect quiet hours'
      }),
        
        e(Text, { style: styles.h3 }, 'INSPECTIONS'),
        
        e(CompactTable, {
          headers: ['Stage', 'Inspector', 'Purpose'],
          rows: [
            ['Foundation', 'County', 'Verify setbacks & elevation'],
            ['Framing', 'County + ARC', 'Structural compliance'],
            ['Final', 'County + ARC', 'Certificate of occupancy'],
            ['Landscaping', 'ARC', 'Restoration complete']
          ]
      }),
        
        e(InfoBox, {
          title: 'COMPLETION REQUIREMENTS',
          type: 'highlight',
          content: [
            '• Remove all construction debris',
            '• Complete landscaping/restoration',
            '• Obtain final inspections',
            '• Submit photos to ARC',
            '• Address any punch list items'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 2)
      )
    ),

    // Maintenance & Improvements Page - FIXED to prevent cut-off
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'MAINTENANCE & IMPROVEMENTS')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'Regular maintenance protects your investment and maintains community standards. Some maintenance work may require ARC approval if it changes the exterior appearance.'
        ),
        
        e(Text, { style: styles.h3 }, 'ROUTINE MAINTENANCE'),
        
        e(InfoBox, {
          title: 'NO APPROVAL NEEDED',
          content: [
            '• Repainting same color',
            '• Roof repair (same material)',
            '• Deck staining (same color)',
            '• Gutter cleaning/repair',
            '• Window replacement (same style)',
            '• Landscaping maintenance',
            '• Driveway sealing'
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'IMPROVEMENTS REQUIRING APPROVAL'),
        
        e(ChecklistBox, {
          title: 'Submit ARC Application For:',
          items: [
            'Exterior color changes',
            'New roofing materials',
            'Deck additions or expansions',
            'Driveway modifications',
            'Solar panel installation',
            'Exterior lighting changes',
            'Significant landscaping changes',
            'Tree removal (>6" diameter)'
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'MAINTENANCE SCHEDULE'),
        
        e(CompactTable, {
          headers: ['Task', 'Frequency', 'Season'],
          rows: [
            ['Gutter cleaning', 'Twice yearly', 'Spring/Fall'],
            ['HVAC service', 'Annually', 'Spring'],
            ['Deck treatment', 'Every 2-3 years', 'Spring'],
            ['Driveway sealing', 'Every 3-5 years', 'Summer'],
            ['Chimney cleaning', 'Annually', 'Fall']
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 3)
      )
    ),

    // NEW PAGE: Seasonal Considerations - Moved to prevent cut-off
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'SEASONAL CONSIDERATIONS')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.md } },
          'Plan your projects according to seasonal conditions to ensure successful completion and minimize weather-related delays.'
        ),
        
        // Spring/Summer section
        e(View, { style: constructionStyles.seasonalBox },
          e(Text, { style: constructionStyles.seasonalTitle }, '🌸 SPRING/SUMMER'),
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: spacing.xs } }, 
            'Ideal for major construction projects'
          ),
          e(ChecklistBox, {
            title: null,
            items: [
              'Check for winter damage',
              'Plan tree work before full foliage',
              'Schedule exterior painting',
              'Address drainage issues',
              'Install decks and outdoor features',
              'Complete roofing projects'
            ]
        })
        ),
        
        // Fall/Winter section
        e(View, { style: { ...constructionStyles.seasonalBox, marginTop: spacing.md } },
          e(Text, { style: constructionStyles.seasonalTitle }, '🍂 FALL/WINTER'),
          e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: spacing.xs } }, 
            'Focus on preparation and protection'
          ),
          e(ChecklistBox, {
            title: null,
            items: [
              'Complete projects before freeze',
              'Winterize outdoor plumbing',
              'Service heating systems',
              'Clear gutters and downspouts',
              'Trim trees away from structures',
              'Stock winter supplies'
            ]
        })
        ),
        
        e(Text, { style: { ...styles.h3, marginTop: spacing.md } }, 'WEATHER CONSIDERATIONS'),
        
        e(FeatureBox, {
          title: 'MOUNTAIN WEATHER IMPACTS',
          content: 'Higher elevation means cooler temperatures, more snow, stronger winds, and rapid weather changes. Factor in weather delays for all projects. Materials may need special handling in extreme temperatures.'
      }),
        
        e(Text, { style: styles.h3 }, 'CONTRACTOR AVAILABILITY'),
        
        e(InfoBox, {
          title: 'SCHEDULING TIPS',
          content: [
            '• Book early for spring/summer work',
            '• Expect 2-3 month lead times',
            '• Have backup dates for weather',
            '• Consider off-season discounts',
            '• Verify mountain experience',
            '• Check local references'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 4)
      )
    )
  ];
}