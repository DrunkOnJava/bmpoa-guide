import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  EmergencyBox
} from './EnhancedLayoutComponents.js';
import { 
  MirroredTwoColumnLayout, 
  TallQuickFactsBox, 
  TallInfoBox, 
  ExtraTallInfoBox
} from './MirroredLayoutComponents.js';

export default function ContactsPageNoJSXEnhancedMirrored({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const contactStyles = StyleSheet.create({
    emergencyAlert: {
      backgroundColor: '#FEF2F2',
      borderWidth: 2,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: layout.spacing.md,
      marginBottom: layout.spacing.lg,
    },
    emergencyTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: '#DC2626',
      textAlign: 'center',
      marginBottom: layout.spacing.sm,
    },
    emergencyNumber: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: '#DC2626',
      textAlign: 'center',
      marginBottom: layout.spacing.xs,
    },
    boardCard: {
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#0EA5E9',
      borderRadius: callout.radius,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    boardMemberName: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: 2,
    },
    boardMemberRole: {
      fontSize: typography.sizes.sm,
      color: colors.darkGray,
      fontStyle: 'italic',
      marginBottom: 4,
    },
    boardMemberContact: {
      fontSize: typography.sizes.sm,
      color: colors.warmGray,
    }
  });

  return [
    // Page 1: Emergency & Essential Contacts
    e(
      Page,
      { key: 'contacts-1', size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'IMPORTANT CONTACTS')
      ),
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'EMERGENCY NUMBERS',
            facts: [
              { label: 'Fire/Medical', value: '911' },
              { label: 'Sheriff', value: '(540) 635-4128' },
              { label: 'Poison Control', value: '1-800-222-1222' },
              { label: 'Hospital', value: '(540) 636-1000' },
              { label: 'Power Outage', value: '1-888-667-3833' },
              { label: 'Gas Emergency', value: '1-800-544-5606' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '🏢 WARREN COUNTY' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Administration:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 635-2435'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Building Permits:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 635-2441'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Tax Assessment:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 635-2448'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Waste Management:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 635-4734'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Water Authority:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '(540) 635-9322')
          ),
          
          e(TallInfoBox, { title: '🔧 UTILITIES' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'Electric (SVEC):'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '1-888-667-3833'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Propane (Ferrellgas):'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, '1-800-544-5606'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Internet/Phone:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Multiple providers available')
          )
        ]
      },
        e(View, { style: contactStyles.emergencyAlert },
          e(Text, { style: contactStyles.emergencyTitle }, '🚨 EMERGENCY'),
          e(Text, { style: contactStyles.emergencyNumber }, '911'),
          e(Text, { style: { fontSize: typography.sizes.sm, textAlign: 'center', color: '#DC2626' } },
            'Fire • Medical • Police Emergency'
          )
        ),

        e(CompactSectionHeader, null, 'ESSENTIAL SERVICES'),
        
        e(DenseText, null,
          'Keep these important contact numbers readily available. Emergency services are provided by Warren County with response times typically 10-15 minutes to Blue Mountain. For non-emergency situations, use the direct numbers listed below.'
        ),

        e(CompactTable, {
          headers: ['Service', 'Primary Contact', 'Emergency', 'Notes'],
          rows: [
            ['Fire Department', '(540) 635-3473', '911', 'Warren County Volunteer'],
            ['Sheriff/Police', '(540) 635-4128', '911', '24-hour dispatch'],
            ['Medical/Ambulance', '(540) 636-1000', '911', 'Warren Memorial Hospital'],
            ['Animal Control', '(540) 635-4734', 'Non-emergency', 'Wildlife issues'],
            ['Road Emergency', '(540) 635-2435', 'County', 'After severe weather'],
            ['Power Outage', '1-888-667-3833', 'SVEC', '24-hour automated']
          ]
        }),

        e(CompactSubsectionHeader, null, 'WARREN COUNTY SERVICES'),
        
        e(DenseText, null,
          'Warren County provides essential government services including building permits, tax assessment, waste management, and road maintenance for public roads. Contact the appropriate department directly for faster service.'
        ),

        e(CompactSubsectionHeader, null, 'UTILITY PROVIDERS'),
        
        e(DenseText, null,
          'Shenandoah Valley Electric Cooperative (SVEC) provides electricity to all Blue Mountain properties. Propane service is available from multiple providers. Internet and phone services vary by location and provider availability.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, pageNumberMap.contacts || '32')
      )
    ),

    // Page 2: BMPOA Board & Community Contacts
    e(
      Page,
      { key: 'contacts-2', size: 'LETTER', style: styles.page },
      e(MirroredTwoColumnLayout, { 
        sidebarContent: [
          e(TallQuickFactsBox, {
            title: 'BMPOA CONTACT',
            facts: [
              { label: 'Main Email', value: 'info@bmpoa.org' },
              { label: 'Website', value: 'www.bmpoa.org' },
              { label: 'Facebook', value: 'BMPOA Community' },
              { label: 'Meetings', value: '3rd Saturday' },
              { label: 'Location', value: 'The Lodge' },
              { label: 'Time', value: '10:00 AM' }
            ]
          }),
          
          e(ExtraTallInfoBox, { title: '📧 DEPARTMENT EMAILS' },
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold } }, 'General Inquiries:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'info@bmpoa.org'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Board Members:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'board@bmpoa.org'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Architectural Review:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'architecture@bmpoa.org'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Lodge Rentals:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'rentals@bmpoa.org'),
            e(Text, { style: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, marginTop: 4 } }, 'Newsletter:'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'newsletter@bmpoa.org')
          ),
          
          e(TallInfoBox, { title: '🏛️ BOARD MEETINGS' },
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Third Saturday of each month'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Location: The Lodge'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Time: 10:00 AM'),
            e(Text, { style: { fontSize: typography.sizes.xs } }, 'Open to all property owners'),
            e(Text, { style: { fontSize: typography.sizes.xs, marginTop: 4 } }, 'Check Facebook for updates')
          )
        ]
      },
        e(CompactSectionHeader, null, 'BMPOA BOARD OF DIRECTORS'),
        
        e(DenseText, null,
          'The BMPOA Board of Directors consists of nine elected volunteers who manage community affairs, oversee facilities, and coordinate services. Board members serve two-year terms and meet monthly to address community needs and concerns.'
        ),

        e(View, { style: contactStyles.boardCard },
          e(Text, { style: contactStyles.boardMemberName }, 'Board of Directors'),
          e(Text, { style: contactStyles.boardMemberRole }, 'Elected Representatives'),
          e(Text, { style: contactStyles.boardMemberContact }, 
            'Email: board@bmpoa.org • Website: www.bmpoa.org'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, marginTop: 4, fontStyle: 'italic' } },
            'Current board roster and contact information available on website and Facebook'
          )
        ),

        e(CompactSubsectionHeader, null, 'BOARD COMMITTEES'),
        
        e(DenseText, null,
          'Specialized committees handle specific community functions including architectural review, financial oversight, roads and maintenance, social events, and communications. Committee participation is open to all property owners.'
        ),

        e(CompactTable, {
          headers: ['Committee', 'Responsibility', 'Contact'],
          rows: [
            ['Architectural Review', 'Building plans and permits', 'architecture@bmpoa.org'],
            ['Finance', 'Budget and financial oversight', 'treasurer@bmpoa.org'],
            ['Roads & Maintenance', 'Infrastructure upkeep', 'maintenance@bmpoa.org'],
            ['Social Events', 'Community activities', 'social@bmpoa.org'],
            ['Communications', 'Newsletter and website', 'newsletter@bmpoa.org'],
            ['Lodge Management', 'Facility rentals', 'rentals@bmpoa.org']
          ]
        }),

        e(CompactSubsectionHeader, null, 'GETTING INVOLVED'),
        
        e(DenseText, null,
          'Property owners are encouraged to participate in community governance and volunteer for committees. Board meetings are held monthly and all owners are welcome to attend. Elections are held annually at the Annual Meeting in October.'
        ),

        e(EmergencyBox,
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: 4 } }, 
            '📢 COMMUNITY COMMUNICATION'
          ),
          e(Text, { style: { fontSize: typography.sizes.xs, lineHeight: 1.4 } },
            'Stay informed via BMPOA Facebook group for daily updates • Website for official announcements • Email newsletter for monthly summaries • Board meetings for direct participation'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, (pageNumberMap.contacts || 32) + 1)
      )
    )
  ];
}