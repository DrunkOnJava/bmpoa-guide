import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  InfoBox, 
  TwoColumnLayout,
  QuickFactsBox,
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  InlineInfo,
  TwoColumnList,
  EmergencyBox
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';
import { mediumProportionalImage } from '../imageStyles.js';
import { ChecklistBox, ContactCard } from './ExtendedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function ConstructionPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;

  const constructionStyles = StyleSheet.create({
    resourceBox: {
      backgroundColor: colors.background,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
  },
    resourceTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: layout.spacing.xs,
  },
    alertBox: {
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
  },
    alertBoxWarning: {
      backgroundColor: '#FEF3C7',
      borderWidth: 1,
      borderColor: '#F59E0B',
  },
    alertBoxInfo: {
      backgroundColor: '#DBEAFE',
      borderWidth: 1,
      borderColor: '#3B82F6',
  },
    alertBoxCritical: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 1,
      borderColor: '#DC2626',
  },
    complianceBox: {
      backgroundColor: '#FEF2F2',
      borderWidth: 1,
      borderColor: '#B91C1C',
      borderRadius: callout.radius,
      padding: 10,
      marginBottom: 10,
  },
    complianceTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.dangerDark,
      marginBottom: 6,
  },
    complianceContent: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
  },
    arcNoteBox: {
      backgroundColor: '#F9FAFB',
      borderWidth: 0.5,
      borderColor: '#9CA3AF',
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
  },
    alertTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      marginBottom: layout.spacing.xs,
  },
    alertContent: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.normal,
  },
    importantDatesBox: {
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#0EA5E9',
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
  },
    dateItem: {
      flexDirection: 'row',
      marginBottom: 3,
  },
    dateLabel: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      width: '40%',
  },
    dateValue: {
      fontSize: typography.sizes.sm,
      flex: 1,
  }
});

  // Helper components
  const AlertBox = ({ title, type = 'info', content, key }) => {
    const boxStyle = type === 'warning' ? constructionStyles.alertBoxWarning :
                     type === 'critical' ? constructionStyles.alertBoxCritical :
                     constructionStyles.alertBoxInfo;
    const titleColor = type === 'warning' ? '#92400E' :
                       type === 'critical' ? '#991B1B' :
                       '#1E40AF';
    
    return e(View, { key, style: [constructionStyles.alertBox, boxStyle] },
      e(Text, { style: [constructionStyles.alertTitle, { color: titleColor }] }, title),
      e(Text, { style: constructionStyles.alertContent }, content)
    );
};

  const ImportantDatesBox = ({ title, dates, note, key }) => {
    return e(View, { key, style: constructionStyles.importantDatesBox },
      e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, title),
      dates.map((item, i) => 
        e(View, { key: i, style: constructionStyles.dateItem },
          e(Text, { style: constructionStyles.dateLabel }, item.date),
          e(Text, { style: constructionStyles.dateValue }, item.event)
        )
      ),
      note && e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', marginTop: layout.spacing.xs } }, note)
    );
};

  return [
    // Section Divider
    e(SectionDivider, {
      number: '11',
      title: 'CONSTRUCTION &\nIMPROVEMENTS',
      description: 'Guidelines for building, renovating, and improving properties while maintaining the character and natural beauty of Blue Mountain.',
      backgroundColor: colors.primary
  }),
    
    // ARC Overview & Process Page
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
          mainContent: [
            e(AlertBox, {
              key: 'arc-requirement',
              title: 'ALL EXTERIOR WORK REQUIRES ARC APPROVAL',
              type: 'critical',
              content: 'Any exterior construction, modification, or improvement visible from outside your home must be reviewed and approved by the Architectural Review Committee (ARC) BEFORE work begins.'
          }),
            
            e(Text, { 
              style: { marginBottom: spacing.sm }, 
              key: 'intro' 
          },
              'The ARC ensures all construction and improvements maintain community standards, protect property values, and preserve our natural environment. This collaborative process helps homeowners achieve their goals while respecting community guidelines.'
            ),
            
            e(Text, { 
              style: styles.h3, 
              key: 'review-process' 
          }, 'REVIEW PROCESS'),
            
            e(View, {
              key: 'process-steps',
              style: {
                borderWidth: 1,
                borderColor: colors.accent,
                padding: spacing.md,
                marginVertical: spacing.md,
                borderRadius: callout.radius,
            }
          },
              e(Text, { style: { fontSize: typography.sizes.medium, fontWeight: typography.weights.bold, marginBottom: spacing.sm, color: colors.primary } }, 
                'Steps for ARC Approval'
              ),
              ...[
                'Download application from BMPOA.org',
                'Complete all sections with detailed plans',
                'Include site plan, elevations, materials list',
                'Submit to ARC@bmpoa.org',
                'Receive confirmation within 3 days',
                'ARC review at monthly meeting',
                'Decision provided within 30 days',
                'Begin work only after written approval'
              ].map((item, i) => 
                e(View, { 
                  key: i, 
                  style: { 
                    flexDirection: 'row', 
                    marginBottom: layout.spacing.md,  // 12pt spacing
                    paddingLeft: 18    // 0.25 inch indent
                } 
              },
                  e(Text, { style: { fontSize: typography.sizes.sm, color: colors.forestGreen, marginRight: 6 } }, '✓'),
                  e(Text, { style: { fontSize: typography.sizes.sm, flex: 1 } }, item)
                )
              )
            ),
            
            e(Text, { 
              style: styles.h3, 
              key: 'required-docs' 
          }, 'REQUIRED DOCUMENTATION'),
            
            e(InfoBox, {
              key: 'new-construction',
              title: 'NEW CONSTRUCTION',
              content: [
                '• Professional architectural drawings',
                '• Site plan showing setbacks',
                '• Grading and drainage plan',
                '• Materials and color samples',
                '• Landscape plan',
                '• Construction timeline'
              ]
          }),
            
            e(InfoBox, {
              key: 'modifications',
              title: 'MODIFICATIONS & ADDITIONS',
              content: [
                '• Detailed description of work',
                '• Drawings or sketches',
                '• Photos of existing conditions',
                '• Materials specifications',
                '• Color selections',
                '• Contractor information'
              ]
          })
          ],
          sidebarContent: [
            e(ImportantDatesBox, {
              key: 'arc-meetings',
              title: 'ARC MEETINGS',
              dates: [
                { date: '1st Tuesday', event: 'Monthly meeting' },
                { date: '15th', event: 'Submission deadline' }
              ],
              note: 'Submit 2 weeks before meeting for review'
          }),
            
            e(ContactCard, {
              key: 'arc-contact',
              name: 'ARC Committee',
              email: 'ARC@bmpoa.org',
              note: 'Questions? Contact us before submitting'
          }),
            
            e(AlertBox, {
              key: 'common-projects',
              title: 'PROJECTS NEEDING APPROVAL',
              type: 'info',
              content: '• Decks & patios\n• Driveways\n• Fences & walls\n• Sheds & outbuildings\n• Solar panels\n• Tree removal\n• Exterior colors\n• Landscaping'
          })
          ]
      }
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.construction || '51')
      )
    ),

    // Building Guidelines Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BUILDING GUIDELINES & STANDARDS')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'These guidelines help maintain Blue Mountain\'s character while allowing homeowners flexibility in design. All construction must comply with Warren County codes and BMPOA covenants.'
        ),
        
        e(Text, { style: styles.h3 }, 'DESIGN STANDARDS'),
        
        e(FeatureBox, {
          title: 'ARCHITECTURAL HARMONY',
          content: 'Buildings should complement the natural environment with materials and colors that blend with the wooded setting. Earth tones, natural wood, and stone are preferred.'
      }),
        
        e(Text, { style: styles.h3 }, 'KEY REQUIREMENTS'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md } },
          e(InfoBox, {
            title: 'SETBACKS',
            style: { flex: 1 },
            content: [
              'Front: 50 feet min',
              'Side: 25 feet min',
              'Rear: 35 feet min',
              'From roads: 50 feet',
              'Check deed restrictions'
            ]
        }),
          
          e(InfoBox, {
            title: 'HEIGHT LIMITS',
            style: { flex: 1 },
            content: [
              'Primary: 35 feet max',
              'Measured from grade',
              'Accessory: 20 feet',
              'No structure above',
              'tree canopy preferred'
            ]
        })
        ),
        
        e(Text, { style: styles.h3 }, 'EXTERIOR MATERIALS & COLORS'),
        
        e(ChecklistBox, {
          title: 'Approved Materials',
          items: [
            'Natural wood siding (cedar, redwood)',
            'Fiber cement siding (wood grain texture)',
            'Natural stone or cultured stone',
            'Standing seam metal roofing',
            'Architectural shingle roofing',
            'Earth-tone stucco (limited use)'
          ]
      }),
        
        e(ChecklistBox, {
          title: 'Color Guidelines',
          items: [
            'Earth tones: browns, grays, greens',
            'Muted colors that blend with forest',
            'Natural wood stains preferred',
            'Avoid bright or reflective colors',
            'Submit color samples with application'
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'SITE DEVELOPMENT'),
        
        e(AlertBox, {
          title: 'TREE PRESERVATION',
          type: 'warning',
          content: 'Minimize tree removal. Any tree over 6" diameter requires ARC approval. Replacement plantings may be required. Protect trees during construction with barriers.'
      }),
        
        e(View, {
          style: constructionStyles.arcNoteBox
      },
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic' } }, 
            'Note: The ARC may conduct site visits during construction to ensure compliance with approved plans. Please maintain safe access and keep approved plans on-site.'
          )
        ),
        
        e(FeatureBox, {
          title: 'GRADING & DRAINAGE',
          content: 'Maintain natural drainage patterns. Control erosion during and after construction. No redirecting water onto adjacent properties. Silt fencing required during construction.'
      }),
        
        assetMap.Building1 && e(
          View,
          { style: { marginTop: spacing.md } },
          e(Image, { src: assetMap.Building1, style: mediumProportionalImage }),
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', textAlign: 'center', marginTop: layout.spacing.xs } },
            'Example of architecture that complements our mountain setting'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 1)
      )
    ),

    // Contractors & Resources Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'CONTRACTORS & RESOURCES')
      ),
      e(
        TwoColumnLayout,
        {
          mainContent: [
            e(Text, { 
              style: { marginBottom: spacing.sm }, 
              key: 'intro' 
          },
              'Working with contractors familiar with Blue Mountain\'s requirements can streamline your project. While BMPOA doesn\'t endorse specific contractors, these guidelines help ensure successful projects.'
            ),
            
            e(Text, { 
              style: styles.h3, 
              key: 'contractor-requirements' 
          }, 'CONTRACTOR REQUIREMENTS'),
            
            e(ChecklistBox, {
              key: 'requirements',
              title: 'All contractors must:',
              items: [
                'Be licensed and insured in Virginia',
                'Obtain Warren County permits',
                'Follow BMPOA construction hours',
                'Maintain clean work sites',
                'Protect roads from damage',
                'Remove debris promptly',
                'Respect neighboring properties'
              ]
          }),
            
            e(Text, { 
              style: styles.h3, 
              key: 'hours' 
          }, 'CONSTRUCTION HOURS'),
            
            e(AlertBox, {
              key: 'work-hours',
              title: 'PERMITTED WORK HOURS',
              content: 'Monday-Friday: 7:00 AM - 6:00 PM\nSaturday: 8:00 AM - 5:00 PM\nSunday & Holidays: No construction\nEmergency repairs exempted'
          }),
            
            e(View, {
              key: 'compliance-box',
              style: constructionStyles.complianceBox
          },
              e(Text, { style: constructionStyles.complianceTitle }, 'COMPLIANCE REMINDER'),
              e(Text, { style: constructionStyles.complianceContent }, 
                'All construction work must comply with both BMPOA covenants and Warren County building codes. Failure to obtain proper approvals can result in stop-work orders, daily fines, and required removal of non-compliant structures. The homeowner is ultimately responsible for contractor compliance.'
              )
            ),
            
            e(Text, { 
              style: styles.h3, 
              key: 'finding' 
          }, 'FINDING CONTRACTORS'),
            
            e(InfoBox, {
              key: 'resources',
              title: 'RESOURCES',
              content: [
                '• Ask neighbors for recommendations',
                '• Check BMPOA Facebook groups',
                '• Contact ARC for contractor list',
                '• Warren County Building Dept',
                '• Better Business Bureau',
                '• Virginia DPOR license lookup'
              ]
          }),
            
            e(Text, { 
              style: styles.h3, 
              key: 'homeowner' 
          }, 'HOMEOWNER RESPONSIBILITIES'),
            
            e(FeatureBox, {
              key: 'responsibilities',
              title: 'YOU ARE RESPONSIBLE FOR:',
              content: 'Ensuring contractors follow all rules, obtaining proper permits, preventing property damage, addressing neighbor concerns, and completing projects timely. Work without permits may require removal.'
          })
          ],
          sidebarContent: [
            e(View, {
              key: 'permits',
              style: constructionStyles.resourceBox
          },
              e(Text, { style: constructionStyles.resourceTitle }, '🏛️ WARREN COUNTY'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, 'Building & Zoning'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '220 N Commerce Ave'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, 'Front Royal, VA'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '(540) 636-4600')
            ),
            
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
          })
          ]
      }
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 2)
      )
    ),

    // Maintenance & Improvements Page
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
        
        e(Text, { style: styles.h3 }, 'SEASONAL CONSIDERATIONS'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.md } },
          e(FeatureBox, {
            title: 'SPRING/SUMMER',
            style: { flex: 1 },
            content: 'Ideal for major projects. Check for winter damage. Plan tree work before full foliage. Schedule exterior painting. Address drainage issues.'
        }),
          
          e(FeatureBox, {
            title: 'FALL/WINTER',
            style: { flex: 1 },
            content: 'Complete projects before cold. Winterize water features. Trim trees when dormant. Indoor renovations ideal. Plan spring projects.'
        })
        ),
        
        e(Text, { style: styles.h3 }, 'COMMON IMPROVEMENTS'),
        
        e(AlertBox, {
          title: 'DECK & PATIO ADDITIONS',
          type: 'info',
          content: 'Popular improvement requiring ARC approval. Consider views, privacy, and drainage. Match existing architecture. Include lighting plan. Natural materials preferred.'
      }),
        
        e(AlertBox, {
          title: 'DRIVEWAY IMPROVEMENTS',
          type: 'info',
          content: 'Address erosion and maintenance issues. Permeable surfaces encouraged. Proper drainage essential. Consider turn-around space. Respect setbacks.'
      }),
        
        e(View, { 
          style: { 
            backgroundColor: colors.background,
            padding: spacing.md,
            marginTop: spacing.md,
            borderLeft: `4px solid ${colors.primary}`,
            borderRadius: callout.radius
        } 
      },
          e(Text, { style: { fontSize: typography.sizes.base, fontStyle: 'italic', color: colors.primary } }, 
            'Remember: When in doubt, contact the ARC before beginning work. It\'s easier to get approval beforehand than to correct violations after completion.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.construction || 51) + 3)
      )
    )
  ];
}