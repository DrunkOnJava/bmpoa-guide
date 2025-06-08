import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  ForestGreenTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  EmergencyBox
} from './EnhancedLayoutComponents.js';
import { FeatureBox, CardGrid } from './AdvancedLayoutComponents.js';
import { ContactCard } from './ExtendedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js';

export default function ContactsPageNoJSXEnhanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const contactStyles = StyleSheet.create({
    sectionDescription: {
      fontStyle: 'italic',
  },
    contactSection: {
      marginBottom: spacing.lg,
  },
    categoryTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
  },
    contactGrid: {
      flexDirection: 'column',
      gap: spacing.sm,
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
      color: colors.accent,
      fontStyle: 'italic',
      marginBottom: layout.spacing.xs,
  },
    boardMemberContact: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
  },
    emergencySection: {
      backgroundColor: colors.backgroundDanger,
      borderWidth: 2,
      borderColor: '#DC2626',
      borderRadius: callout.radius,
      padding: spacing.md,
      marginBottom: spacing.lg,
  },
    emergencyTitle: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
      color: colors.dangerDarker,
      marginBottom: spacing.sm,
      textAlign: 'center',
  },
    emergencyNumber: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.weights.bold,
      color: colors.danger,
      textAlign: 'center',
      marginBottom: spacing.xs,
  },
    emergencySubtext: {
      fontSize: typography.sizes.sm,
      textAlign: 'center',
      color: colors.dangerDarkest,
  },
    serviceCard: {
      backgroundColor: '#F9FAFB',
      borderLeft: `3px solid ${colors.forestGreen}`,
      padding: spacing.sm,
      marginBottom: spacing.sm,
      borderRadius: 2,
  },
    serviceName: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: 2,
  },
    serviceDetails: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkGray,
  }
});

  // Board member data
  const boardMembers = [
    {
      name: 'President',
      contact: 'Contact via www.bmpoa.org',
      responsibilities: 'Overall operations, Board meetings, community relations'
  },
    {
      name: 'Vice President',
      contact: 'Contact via Board',
      responsibilities: 'Assists President, special projects'
  },
    {
      name: 'Secretary',
      contact: 'secretary@bmpoa.org',
      responsibilities: 'Meeting minutes, official correspondence'
  },
    {
      name: 'Treasurer',
      contact: 'treasurer@bmpoa.org',
      responsibilities: 'Financial management, tax collection'
  },
    {
      name: 'ARC Chair',
      contact: 'arc@bmpoa.org',
      responsibilities: 'Construction approvals, architectural standards'
  }
  ];

  // Community services
  const communityServices = [
    {
      category: 'UTILITIES',
      services: [
        { name: 'Electric - Rappahannock Electric', phone: '(800) 552-3904' },
        { name: 'Warren County Water/Sewer', phone: '(540) 636-1046' },
        { name: 'Comcast Cable/Internet', phone: '(800) 934-6489' },
        { name: 'Trash Collection - County Waste', phone: '(540) 635-7107' }
      ]
  },
    {
      category: 'LOCAL SERVICES',
      services: [
        { name: 'US Post Office (Linden)', phone: '(540) 636-4623' },
        { name: 'Warren County Office', phone: '(540) 636-4600' },
        { name: 'DMV Select (Front Royal)', phone: '(540) 636-3639' },
        { name: 'Warren Memorial Hospital', phone: '(540) 636-0300' }
      ]
  }
  ];

  // Sidebar content
  const sidebarContent = [
    e(EmergencyBox, { 
      title: 'LIFE THREATENING',
      content: [
        'CALL 911',
        '',
        'Fire • Medical',
        'Police • Rescue',
        '',
        'Give address:',
        'Blue Mountain Road',
        'Linden, VA 22642'
      ]
  }),
    e(InfoBox, { 
      title: '📱 Non-Emergency',
      type: 'highlight'
  },
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, 
        'Warren County Sheriff:'
      ),
      e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: 6 } }, 
        '(540) 635-4128'
      ),
      e(Text, { style: { fontSize: typography.sizes.sm, marginBottom: 3 } }, 
        'State Police:'
      ),
      e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold } }, 
        '(540) 662-3313'
      )
    ),
    e(QuickFactsBox, {
      title: 'QUICK CONTACTS',
      facts: [
        { label: 'BMPOA', value: 'bmpoa.org' },
        { label: 'ARC', value: 'arc@bmpoa.org' },
        { label: 'Deer Lake', value: 'Via Board' },
        { label: 'Lodge', value: 'Via Board' }
      ]
  })
  ];

  return [
    // Section Divider - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '09',
    //   title: 'CONTACTS &\nRESOURCES',
    //   description: 'Important phone numbers, Board contacts, and community resources',
    //   backgroundColor: colors.primary
    // }),
    
    // Main Contacts Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent },
        e(CompactSectionHeader, null, 'IMPORTANT CONTACTS'),
        
        // Emergency Section - Full Width
        e(View, { style: contactStyles.emergencySection },
          e(Text, { style: contactStyles.emergencyTitle }, 'EMERGENCY'),
          e(Text, { style: contactStyles.emergencyNumber }, '911'),
          e(Text, { style: contactStyles.emergencySubtext }, 
            'Fire • Police • Medical • Rescue'
          )
        ),
        
        // Board Members Section
        e(View, { style: contactStyles.contactSection },
          e(Text, { style: contactStyles.categoryTitle }, 'BOARD OF DIRECTORS'),
          e(View, { style: contactStyles.contactGrid },
            ...boardMembers.map((member, index) => 
              e(View, { key: index, style: contactStyles.boardCard },
                e(Text, { style: contactStyles.boardMemberName }, member.name),
                e(Text, { style: contactStyles.boardMemberContact }, member.contact),
                e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', marginTop: 2 } }, 
                  member.responsibilities
                )
              )
            )
          )
        ),
        
        // Community Services
        e(Text, { style: contactStyles.categoryTitle }, 'COMMUNITY SERVICES'),
        
        ...communityServices.map((category, index) => 
          e(View, { key: index, style: { marginBottom: spacing.md } },
            e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.forestGreen, marginBottom: spacing.xs } }, 
              category.category
            ),
            ...category.services.map((service, serviceIndex) => 
              e(View, { key: serviceIndex, style: contactStyles.serviceCard },
                e(Text, { style: contactStyles.serviceName }, service.name),
                e(Text, { style: contactStyles.serviceDetails }, service.phone)
              )
            )
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap.contacts || '37'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Additional Resources Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        null,
        e(CompactSectionHeader, null, 'ADDITIONAL RESOURCES'),
        
        e(FeatureBox, {
          title: '🌐 ONLINE RESOURCES',
          content: 'Visit www.bmpoa.org for the latest community news, downloadable forms, meeting minutes, and contact information. Join our Facebook group "Blue Mountain POA" for real-time updates and neighbor communication.'
      }),
        
        e(CompactSubsectionHeader, null, 'PROFESSIONAL SERVICES'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.md } },
          e(View, { style: { flex: 1 } },
            e(ContactCard, {
              icon: '🔧',
              label: 'Maintenance',
              value: 'See Facebook group'
          }),
            e(ContactCard, {
              icon: '🏗️',
              label: 'Contractors',
              value: 'ARC approved list'
          }),
            e(ContactCard, {
              icon: '🌲',
              label: 'Tree Service',
              value: 'Licensed & insured'
          })
          ),
          e(View, { style: { flex: 1 } },
            e(ContactCard, {
              icon: '⚡',
              label: 'Electricians',
              value: 'Local recommendations'
          }),
            e(ContactCard, {
              icon: '🚰',
              label: 'Plumbers',
              value: 'Emergency available'
          }),
            e(ContactCard, {
              icon: '🏠',
              label: 'Home Services',
              value: 'Vetted providers'
          })
          )
        ),
        
        e(CompactSubsectionHeader, null, 'GOVERNMENT OFFICES'),
        
        e(ForestGreenTable, {
          headers: ['Office', 'Phone', 'Location'],
          rows: [
            ['Warren County Admin', '(540) 636-4600', 'Front Royal'],
            ['Building & Zoning', '(540) 636-4600', 'Front Royal'],
            ['Tax Office', '(540) 635-2651', 'Front Royal'],
            ['Circuit Court', '(540) 635-2435', 'Front Royal'],
            ['Sheriff Dept', '(540) 635-4128', 'Front Royal'],
            ['Fire & Rescue', '(540) 636-3830', 'County-wide']
          ]
      }),
        
        e(View, { style: { marginTop: spacing.lg, padding: spacing.md, backgroundColor: '#F0FDF4', borderRadius: callout.radius } },
          e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs } }, 
            '💡 Community Tip'
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, lineHeight: typography.lineHeights.relaxed } }, 
            'Save this guide on your phone for quick reference. Take photos of the emergency contacts page and your property pass numbers. Many residents keep a copy in their car for easy access when needed.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap.contacts || 37) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}