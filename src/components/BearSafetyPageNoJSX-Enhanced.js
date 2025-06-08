import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout,
  EmergencyBox,
  QuickFactsBox,
  ForestGreenTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  InlineInfo,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';

export default function BearSafetyPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const bearStyles = StyleSheet.create({
    serviceCard: {
      backgroundColor: '#FAFAFA',
      border: `1px solid ${colors.background}`,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
  },
    serviceName: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.accent,
      marginBottom: 2,
  },
    monthGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
      marginTop: spacing.xs,
  },
    monthTag: {
      backgroundColor: colors.background,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
      fontSize: typography.sizes.sm,
  },
    alertBox: {
      borderRadius: callout.radius,
      padding: layout.spacing.sm,
      marginBottom: layout.spacing.sm,
      backgroundColor: colors.backgroundDanger,
      borderWidth: 1,
      borderColor: '#DC2626',
  },
    alertTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      marginBottom: layout.spacing.xs,
      color: colors.dangerDarker,
  },
    alertContent: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.normal,
  }
});

  // Helper component for alerts
  const AlertBox = ({ title, type = 'critical', content }) => {
    return e(View, { style: bearStyles.alertBox },
      e(Text, { style: bearStyles.alertTitle }, title),
      e(Text, { style: bearStyles.alertContent }, content)
    );
};

  return [
    // Section Divider
    e(SectionDivider, {
      number: '12',
      title: 'BEAR SAFETY &\nWILDLIFE',
      description: 'Living safely with wildlife requires understanding, preparation, and consistent practices. This section provides essential information for coexisting with bears and other wildlife on Blue Mountain.',
      backgroundColor: colors.primary
  }),
    
    // Understanding Bear Behavior Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'UNDERSTANDING BEAR BEHAVIOR')
      ),
      e(
        TwoColumnLayout,
        {
          mainContent: [
            e(EmergencyBox, {
              key: 'bear-presence'
          },
              e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.danger, marginBottom: layout.spacing.xs } }, 
                'BLACK BEARS ARE PRESENT YEAR-ROUND'
              ),
              e(Text, { style: { fontSize: typography.sizes.sm, color: colors.dangerDarkest } },
                'Blue Mountain is bear habitat. Every resident must follow bear safety practices to protect both human and bear populations. Fed bears become dangerous bears and must be destroyed.'
              )
            ),
            
            e(Text, { 
              style: { marginBottom: spacing.sm }, 
              key: 'intro' 
          },
              'Black bears are intelligent, adaptable animals that have lived in these mountains far longer than humans. Understanding their behavior helps us coexist safely.'
            ),
            
            e(Text, { 
              style: styles.h3, 
              key: 'behavior' 
          }, 'BEAR BEHAVIOR PATTERNS'),
            
            e(InfoBox, {
              key: 'seasonal',
              title: 'SEASONAL ACTIVITY',
              content: [
                'Spring (Mar-May): Emerging hungry from dens',
                'Summer (Jun-Aug): Active feeding, raising cubs',
                'Fall (Sep-Nov): Hyperphagia - intense feeding',
                'Winter (Dec-Feb): Denning, but may be active',
                '',
                'Bears need 20,000 calories/day in fall!'
              ]
          }),
            
            e(Text, { 
              style: styles.h3, 
              key: 'attractants' 
          }, 'WHAT ATTRACTS BEARS'),
            
            e(View, {
              key: 'bear-risk-bar',
              style: { marginBottom: spacing.md }
          },
              e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 'BEAR ENCOUNTER RISK LEVEL'),
              e(View, {
                style: {
                  width: 300, // Exactly 300px wide as required
                  height: 24,
                  backgroundColor: colors.backgroundAlt,
                  borderRadius: callout.radius,
                  border: '1px solid #D1D5DB',
                  flexDirection: 'row',
                  overflow: 'hidden'
              }
            },
                e(View, { style: { width: '25%', backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' } },
                  e(Text, { style: { fontSize: typography.sizes.sm, color: 'white', fontWeight: typography.weights.bold } }, 'LOW')
                ),
                e(View, { style: { width: '25%', backgroundColor: '#F59E0B', justifyContent: 'center', alignItems: 'center' } },
                  e(Text, { style: { fontSize: typography.sizes.sm, color: 'white', fontWeight: typography.weights.bold } }, 'MODERATE')
                ),
                e(View, { style: { width: '25%', backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' } },
                  e(Text, { style: { fontSize: typography.sizes.sm, color: 'white', fontWeight: typography.weights.bold } }, 'HIGH')
                ),
                e(View, { style: { width: '25%', backgroundColor: '#991B1B', justifyContent: 'center', alignItems: 'center' } },
                  e(Text, { style: { fontSize: typography.sizes.sm, color: 'white', fontWeight: typography.weights.bold } }, 'EXTREME')
                )
              ),
              e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2, fontStyle: 'italic' } }, 
                'Risk increases from spring emergence through fall hyperphagia'
              )
            ),
            
            e(Text, { 
              style: styles.h4, 
              key: 'attractants-title' 
          }, 'ATTRACTANTS & PREVENTION'),
            
            e(ForestGreenTable, {
              key: 'attractants-table',
              headers: ['Attractant', 'Prevention Methods'],
              columnWidths: [0.4, 0.6], // 40% for Attractant, 60% for Prevention
              rows: [
                ['Garbage & Recycling', 'Store in locked building/bear-resistant container'],
                ['Bird Feeders', 'Remove April 1 - December 1, hang 10ft high'],
                ['Pet Food', 'Feed indoors, remove bowls immediately'],
                ['BBQ Grills', 'Clean after each use, store in locked area'],
                ['Compost', 'Use secure bins, avoid meat/dairy scraps'],
                ['Fruit Trees', 'Pick ripe fruit daily, remove fallen fruit'],
                ['Beehives', 'Install electric fencing around hives'],
                ['Car Storage', 'Remove all scented items, lock doors']
              ]
          }),
            
            e(Text, { 
              style: styles.h3, 
              key: 'encounters' 
          }, 'IF YOU ENCOUNTER A BEAR'),
            
            e(FeatureBox, {
              key: 'encounter-steps',
              title: 'STAY CALM AND FOLLOW THESE STEPS',
              content: '1. Do not run - back away slowly\n2. Make yourself appear large\n3. Make noise - clap, yell firmly\n4. Avoid direct eye contact\n5. Give the bear an escape route\n6. If attacked, do NOT play dead - fight back'
          })
          ],
          sidebarContent: [
            e(QuickFactsBox, {
              key: 'bear-facts',
              title: 'Bear Facts',
              facts: [
                { label: 'Species', value: 'Black Bear' },
                { label: 'Weight', value: '200-500 lbs' },
                { label: 'Speed', value: '35 mph' },
                { label: 'Climb', value: 'Excellent' },
                { label: 'Smell', value: '7x better than dog' },
                { label: 'Range', value: '15-80 sq miles' }
              ]
          }),
            
            e(AlertBox, {
              key: 'cubs',
              title: 'MOTHER WITH CUBS',
              type: 'warning',
              content: 'Never approach cubs! Mother bears are extremely protective. If you see cubs, the mother is nearby. Leave the area immediately.'
          }),
            
            e(EmergencyBox, {
              key: 'report',
              title: 'REPORT BEARS',
              content: 'Aggressive behavior:\n911 immediately\n\nNon-emergency:\nVA Wildlife Helpline\n855-571-9003'
          })
          ]
      }
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.bearSafety || '56')
      )
    ),

    // Bear-Proofing Your Property Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BEAR-PROOFING YOUR PROPERTY')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'Preventing bear encounters starts with eliminating attractants. A fed bear is a dead bear - once habituated to human food sources, bears become dangerous and must be destroyed.'
        ),
        
        e(Text, { style: styles.h3 }, 'MANDATORY BEAR-PROOFING MEASURES'),
        
        e(AlertBox, {
          title: 'GARBAGE & RECYCLING',
          type: 'critical',
          content: 'Store in locked building or bear-resistant container until morning of pickup. Never leave out overnight. Freeze smelly waste until collection day. Clean containers with ammonia regularly.'
      }),
        
        e(AlertBox, {
          title: 'BIRD FEEDERS',
          type: 'critical',
          content: 'Remove April 1 - December 1 (active bear season). When allowed, hang 10 feet high and 4 feet from supports. Bring in nightly. Clean spilled seed daily.'
      }),
        
        e(Text, { style: styles.h3 }, 'COMPREHENSIVE CHECKLIST'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.md } },
          e(ChecklistBox, {
            title: 'Outdoor Areas',
            style: { flex: 1 },
            items: [
              'Clean grills after each use',
              'Store grills in locked area',
              'Remove pet food bowls',
              'Secure compost bins',
              'Pick ripe fruit daily',
              'Install motion lights',
              'Remove scented items'
            ]
        }),
          
          e(ChecklistBox, {
            title: 'Structures',
            style: { flex: 1 },
            items: [
              'Lock storage sheds',
              'Secure crawl spaces',
              'Close garage doors',
              'Lock car doors',
              'Screen porches/decks',
              'Reinforce weak doors',
              'Install sturdy latches'
            ]
        })
        ),
        
        e(Text, { style: styles.h3 }, 'BEAR-RESISTANT PRODUCTS'),
        
        e(InfoBox, {
          title: 'RECOMMENDED SOLUTIONS',
          content: [
            '• Bear-resistant garbage cans (Bearicuda, BearSaver)',
            '• Electric fencing for gardens/compost',
            '• Motion-activated sprinklers',
            '• Ammonia-soaked rags as deterrent',
            '• Hardware cloth for vents/openings',
            '• Heavy-duty locks and latches'
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'SEASONAL REMINDERS'),
        
        e(FeatureBox, {
          title: 'SPRING EMERGENCE',
          content: 'Bears emerge hungry. Remove all attractants before March. Check property for winter damage that could provide access. Be extra vigilant with garbage.'
      }),
        
        e(FeatureBox, {
          title: 'FALL HYPERPHAGIA',
          content: 'Bears feed 20 hours/day preparing for winter. Double-check all security measures. Never leave any food source accessible. Report all sightings.'
      }),
        
        e(View, { 
          style: { 
            backgroundColor: '#FEF2F2',
            border: `1px solid #DC143C`,
            padding: spacing.md,
            marginTop: spacing.md,
            borderRadius: callout.radius
        } 
      },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.danger, marginBottom: layout.spacing.xs } }, 
            '⚠️ COMMUNITY RESPONSIBILITY'
          ),
          e(Text, { style: { fontSize: typography.sizes.base, lineHeight: typography.lineHeights.relaxed } }, 
            'One careless neighbor can attract bears to the entire area. Report violations to BMPOA Board. Persistent violators may face fines or legal action.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.bearSafety || 56) + 1)
      )
    ),

    // Other Wildlife & Resources Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'OTHER WILDLIFE & RESOURCES')
      ),
      e(
        TwoColumnLayout,
        {
          mainContent: [
            e(Text, { 
              style: { marginBottom: spacing.sm }, 
              key: 'intro' 
          },
              'While bears require the most attention, Blue Mountain hosts diverse wildlife. Most species enhance our mountain experience, but some require caution.'
            ),
            
            e(Text, { 
              style: styles.h3, 
              key: 'wildlife' 
          }, 'COMMON WILDLIFE ENCOUNTERS'),
            
            e(InfoBox, {
              key: 'deer',
              title: 'WHITE-TAILED DEER',
              content: [
                '• Abundant year-round',
                '• Major road hazard at dawn/dusk',
                '• Carry ticks (Lyme disease)',
                '• Will eat gardens and landscaping',
                '• Use deer-resistant plants',
                '• Never feed - creates dangerous habits'
              ]
          }),
            
            e(InfoBox, {
              key: 'coyotes',
              title: 'COYOTES & FOXES',
              content: [
                '• Increasingly common',
                '• Usually avoid humans',
                '• Protect small pets',
                '• Secure chicken coops',
                '• Remove food sources',
                '• Haze if too comfortable'
              ]
          }),
            
            e(InfoBox, {
              key: 'snakes',
              title: 'SNAKES',
              content: [
                '• Copperheads present (venomous)',
                '• Black snakes common (beneficial)',
                '• Watch where you step',
                '• Clear brush from homes',
                '• Never kill - call for removal',
                '• Wear boots in tall grass'
              ]
          }),
            
            e(Text, { 
              style: styles.h3, 
              key: 'prevention' 
          }, 'GENERAL WILDLIFE PREVENTION'),
            
            e(ChecklistBox, {
              key: 'prevention-list',
              title: 'Best Practices',
              items: [
                'Never feed any wildlife',
                'Secure all food sources',
                'Maintain clear sight lines',
                'Remove hiding places',
                'Install motion lighting',
                'Keep pets supervised',
                'Vaccinate pets for rabies'
              ]
          })
          ],
          sidebarContent: [
            e(EmergencyBox, {
              key: 'emergency-contacts',
              title: 'WILDLIFE CONTACTS',
              content: 'Emergency: 911\n\nVA Wildlife Helpline:\n855-571-9003\n\nAnimal Control:\n540-635-4734\n\nRabies Concerns:\n540-635-4491'
          }),
            
            e(View, {
              key: 'removal-services',
              style: bearStyles.serviceCard
          },
              e(Text, { style: bearStyles.serviceName }, 'Wildlife Removal'),
              e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 2 } }, 'Professional services:'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• VA Wildlife Mgmt'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Blue Ridge Wildlife'),
              e(Text, { style: { fontSize: typography.sizes.sm } }, '• Animal Control Svc'),
              e(Text, { style: { fontSize: typography.sizes.sm, marginTop: layout.spacing.xs, fontStyle: 'italic' } }, 
                'Get recommendations on Facebook groups'
              )
            ),
            
            e(AlertBox, {
              key: 'rabies',
              title: 'RABIES WARNING',
              type: 'warning',
              content: 'Any mammal acting strangely:\n• Don\'t approach\n• Call 911\n• Warn neighbors\n\nDaytime raccoons/skunks are suspicious'
          })
          ]
      }
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.bearSafety || 56) + 2)
      )
    ),

    // Monthly Calendar & Action Items Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BEAR SAFETY CALENDAR')
      ),
      e(
        View,
        null,
        e(Text, { style: { marginBottom: spacing.sm } },
          'Year-round vigilance is essential for bear safety. This monthly guide helps you maintain proper practices throughout the changing seasons.'
        ),
        
        e(Text, { style: styles.h3 }, 'MONTHLY ACTION ITEMS'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md } },
          e(View, { style: { flex: 1 } },
            e(FeatureBox, {
              title: 'JANUARY-FEBRUARY',
              content: 'Bears mostly denning but may be active\n• Keep garbage secured\n• Plan spring cleanup\n• Order bear-resistant products\n• Repair damaged structures'
          }),
            
            e(FeatureBox, {
              title: 'MARCH-APRIL',
              content: 'Bears emerging very hungry\n• Remove ALL attractants\n• Take down bird feeders\n• Deep clean garbage areas\n• Alert new neighbors'
          }),
            
            e(FeatureBox, {
              title: 'MAY-JUNE',
              content: 'Active feeding, cubs present\n• Extra vigilance required\n• Check security nightly\n• Report all sightings\n• Educate visitors'
          })
          ),
          
          e(View, { style: { flex: 1 } },
            e(FeatureBox, {
              title: 'JULY-AUGUST',
              content: 'Peak activity season\n• Daily attractant checks\n• Harvest gardens promptly\n• Clean grills immediately\n• Monitor for damage'
          }),
            
            e(FeatureBox, {
              title: 'SEPTEMBER-OCTOBER',
              content: 'Hyperphagia - extreme feeding\n• Highest risk period!\n• Double-check everything\n• Remove fallen fruit\n• Coordinate with neighbors'
          }),
            
            e(FeatureBox, {
              title: 'NOVEMBER-DECEMBER',
              content: 'Pre-denning activity\n• Maintain vigilance\n• Plan winter projects\n• Share lessons learned\n• Prepare for next year'
          })
          )
        ),
        
        e(Text, { style: styles.h3 }, 'COMMUNITY BEAR WATCH'),
        
        e(InfoBox, {
          title: 'NEIGHBORHOOD COORDINATION',
          content: [
            '• Report sightings on Facebook groups immediately',
            '• Share what attracted the bear',
            '• Coordinate garbage timing with neighbors',
            '• Help new residents learn practices',
            '• Support elderly neighbors with securing attractants',
            '• Organize spring bear-proofing work parties'
          ]
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
          e(Text, { style: { fontSize: typography.sizes.medium, fontWeight: typography.weights.bold, fontStyle: 'italic', color: colors.primary, textAlign: 'center' } }, 
            '"A bear-aware community is a safe community. Working together, we can protect both human and bear populations for generations to come."'
          )
        ),
        
        e(Text, { style: styles.h3 }, 'QUICK REFERENCE'),
        
        e(View, { style: bearStyles.monthGrid },
          ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, i) =>
            e(View, { 
              key: month,
              style: [
                bearStyles.monthTag,
                { backgroundColor: i >= 2 && i <= 9 ? '#FEE2E2' : colors.background }
              ]
          },
              e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: i >= 2 && i <= 9 ? 'bold' : 'normal' } }, month)
            )
          )
        ),
        e(Text, { style: { fontSize: typography.sizes.sm, marginTop: layout.spacing.xs, fontStyle: 'italic' } }, 
          'Red months = Remove bird feeders, highest bear activity'
        ),
        
        e(View, { 
          style: { 
            backgroundColor: '#FEF2F2',
            borderWidth: 1,
            borderColor: '#B91C1C',
            borderRadius: callout.radius,
            padding: spacing.md,
            marginTop: spacing.md
        } 
      },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.dangerDark, marginBottom: 6 } }, 
            '⚖️ LEGAL REMINDER'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Under Virginia law, feeding bears is illegal and punishable by fines up to $500. Property owners may be held liable for damages caused by bears attracted to unsecured food sources. BMPOA covenants require all residents to follow bear-proof practices. Violations may result in fines and/or legal action.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.bearSafety || 56) + 3)
      )
    )
  ];
}