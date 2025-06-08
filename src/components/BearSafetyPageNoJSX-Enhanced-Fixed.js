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
// import SectionDivider from './SectionDivider.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox, QuoteBox } from './AdvancedLayoutComponents.js';

export default function BearSafetyPageNoJSXEnhancedFixed({ pageNumberMap = {} }) {
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
  },
    seasonalBox: {
      backgroundColor: colors.background,
      borderRadius: callout.radius,
      padding: spacing.sm,
      marginBottom: spacing.sm,
      borderLeft: `3px solid ${colors.forestGreen}`,
  },
    seasonalTitle: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: spacing.xs,
  },
    seasonalContent: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
  },
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
  },
    calendarMonth: {
      width: '48%',
      backgroundColor: '#F9FAFB',
      borderRadius: callout.radius,
      padding: spacing.xs,
      marginBottom: spacing.xs,
      borderTop: `2px solid ${colors.primary}`,
  },
    monthName: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: 2,
  },
    monthActivity: {
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

  const bearActivityCalendar = [
    { months: 'JANUARY-FEBRUARY', activity: 'Bears mostly denning • Keep garbage secured • Plan spring cleanings • Order bear-resistant products • Repair damaged latches' },
    { months: 'MARCH-APRIL', activity: 'Bears emerging hungry • Remove ALL attractants • Take down bird feeders • Deep clean garbage areas • Alert new neighbors' },
    { months: 'MAY-JUNE', activity: 'Active feeding, cubs present • Extra vigilance required • Check security nightly • Report all sightings • Educate visitors' },
    { months: 'JULY-AUGUST', activity: 'Peak activity season • Daily attractant checks • Use extra garbage security • Clean grills immediately • Monitor for damage' },
    { months: 'SEPTEMBER-OCTOBER', activity: 'Hyperphagia - extreme feeding • Highest risk period! • Double-check everything • Remove fallen fruit • Coordinate with neighbors' },
    { months: 'NOVEMBER-DECEMBER', activity: 'Pre-denning activity • Maintain vigilance • Plan winter projects • Share lessons learned • Prepare for next year' }
  ];

  return [
    // Section Divider - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '12',
    //   title: 'BEAR SAFETY &\nWILDLIFE',
    //   description: 'Living safely with wildlife requires understanding, preparation, and consistent practices. This section provides essential information for coexisting with bears and other wildlife on Blue Mountain.',
    //   backgroundColor: colors.primary
    // }),
    
    // Understanding Bear Behavior Page (CONDENSED)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LIVING WITH WILDLIFE')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            e(EmergencyBox, {
              key: 'bear-emergency',
              title: 'BEAR EMERGENCY',
              content: [
                'Bear inside home:',
                '• Call 911 immediately',
                '• Exit safely',
                '• Do not corner bear',
                '',
                'Bear on property:',
                '• Make noise',
                '• Stay inside',
                '• Remove attractants',
                '',
                'VDGIF Wildlife Helpline:',
                '1-855-571-9003'
              ]
          }),
            
            e(QuickFactsBox, {
              key: 'bear-facts',
              title: 'BEAR FACTS',
              facts: [
                { label: 'Population', value: '18,000+ in VA' },
                { label: 'Weight', value: 'Up to 500 lbs' },
                { label: 'Speed', value: '30+ mph' },
                { label: 'Smell', value: '7x better than dog' },
                { label: 'Active', value: 'Dawn/Dusk' }
              ]
          }),
            
            e(InfoBox, {
              key: 'legal',
              title: 'LEGAL REMINDER',
              type: 'highlight',
              content: [
                'Feeding bears is:',
                '• Illegal in Virginia',
                '• Up to $500 fine',
                '• Creates dangerous bears',
                '• Affects entire area',
                '',
                'Report violations to:',
                'VDGIF or BMPOA Board'
              ]
          })
          ]
      },
        
        e(Text, { style: styles.h2 }, 'UNDERSTANDING BEARS'),
        
        e(DenseText, null,
          'Black bears are intelligent, curious animals that learn quickly. Once they associate humans with food, they lose their natural fear and become problematic. Prevention is the only effective solution.'
        ),
        
        e(FeatureBox, {
          title: 'WHY BEARS VISIT PROPERTIES',
          content: 'Bears seek easy calories: garbage, bird feeders, pet food, grills, compost. One food reward creates a repeat visitor. Bears remember food sources for years and teach cubs these locations.'
      }),
        
        e(Text, { style: styles.h3 }, 'BEAR-PROOFING ESSENTIALS'),
        
        e(ChecklistBox, {
          title: 'Required Actions',
          items: [
            'Store garbage in bear-resistant containers or secured buildings',
            'Remove bird feeders March through November',
            'Clean grills after each use, store indoors if possible',
            'Feed pets indoors, never leave food outside',
            'Harvest gardens promptly, compost properly',
            'Install motion-activated lights and noise makers',
            'Remove or electric fence beehives and chickens'
          ]
      }),
        
        e(View, { style: { backgroundColor: '#FFF3E0', padding: layout.spacing.xs, borderRadius: callout.radius, marginTop: layout.spacing.sm } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '📅 SEASONAL BEAR ACTIVITY'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'Jan-Feb: Denning, keep secured • Mar-Apr: Emerging hungry, remove attractants • May-Jun: Cubs present, extra vigilance • Jul-Aug: Peak activity • Sep-Oct: Hyperphagia, extreme feeding • Nov-Dec: Pre-denning, maintain vigilance'
          )
        ),
        
        e(View, { style: { backgroundColor: '#FFEBEE', padding: layout.spacing.xs, borderRadius: callout.radius, marginTop: layout.spacing.sm, borderLeft: `4px solid #D32F2F` } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4, color: '#D32F2F' } }, 
            '⚠️ COMMUNITY RESPONSIBILITY'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.3 } },
            'One careless neighbor can attract bears to entire area. Report violations to BMPOA Board. Persistent violators face fines or legal action.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.bearSafety || '57')
      )
    )
  ];
}