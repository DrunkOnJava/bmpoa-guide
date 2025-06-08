import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import InlineSectionHeader from './InlineSectionHeader.js';
import {
  TwoColumnLayout,
  QuickFactsBox,
  InfoBox,
  DenseText,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { CardGrid, SidebarBox } from './AdvancedLayoutComponents.js';
import { ContactCard } from './ExtendedLayoutComponents.js';

export default function ContactsPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const contactStyles = StyleSheet.create({
    emergencySection: {
      backgroundColor: colors.backgroundDanger,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderRadius: callout.radius,
      borderLeft: `4px solid #DC2626`,
  },
    emergencyTitle: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
      color: colors.danger,
      marginBottom: spacing.sm,
  }
});
  
  const boardContacts = [
    {
      name: 'John Smith',
      role: 'President',
      phone: '(540) 555-0001',
      email: 'president@bmpoa.org'
  },
    {
      name: 'Jane Davis',
      role: 'Vice President',
      phone: '(540) 555-0002',
      email: 'vicepresident@bmpoa.org'
  },
    {
      name: 'Bob Wilson',
      role: 'Treasurer',
      phone: '(540) 555-0003',
      email: 'treasurer@bmpoa.org'
  },
    {
      name: 'Mary Johnson',
      role: 'Secretary',
      phone: '(540) 555-0004',
      email: 'secretary@bmpoa.org'
  }
  ];
  
  const sidebarContent = [
    e(SidebarBox, {
      key: 'emergency',
      type: 'danger',
      title: '🚨 EMERGENCY',
      content: 'FIRE/MEDICAL: 911\n\nPower Out: REC (800) 552-3904\n\nWater Emergency:\n(540) 635-7819'
  }),
    
    e(InfoBox, {
      key: 'non-emergency',
      title: '📞 NON-EMERGENCY',
      content: [
        'Sheriff: (540) 635-4128',
        'Fire Marshal: (540) 635-2111',
        'Animal Control: (540) 635-4734',
        'Road Dept: (540) 635-2180'
      ]
  }),
    
    e(InfoBox, {
      key: 'website',
      title: '🌐 ONLINE',
      type: 'info',
      content: [
        'www.bmpoa.org',
        'Facebook: Blue Mountain POA',
        '',
        'Email the Board:',
        'board@bmpoa.org'
      ]
  })
  ];

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      TwoColumnLayout,
      { sidebarContent },
      
      e(InlineSectionHeader, {
        number: '09',
        title: 'CONTACTS',
        description: 'Important phone numbers and community contacts'
    }),
      
      e(View, { style: contactStyles.emergencySection },
        e(Text, { style: contactStyles.emergencyTitle }, '🚨 EMERGENCY CONTACTS'),
        e(DenseText, null,
          'FIRE, MEDICAL, POLICE: 911\n' +
          'Warren County Emergency Services: (540) 635-4128\n' +
          'Poison Control: (800) 222-1222\n' +
          'VA State Police: (540) 662-3313'
        )
      ),
      
      e(CompactSubsectionHeader, null, 'BOARD OF DIRECTORS'),
      e(View, { style: { marginBottom: spacing.md } },
        boardContacts.map((contact, index) => 
          e(ContactCard, {
            key: `board-${index}`,
            ...contact
        })
        )
      ),
      
      e(CompactSubsectionHeader, null, 'COMMITTEE CHAIRS'),
      e(CardGrid, {
        cards: [
          {
            title: 'ARC Committee',
            content: 'Tom Brown\n(540) 555-0010\narc@bmpoa.org'
        },
          {
            title: 'Roads Committee',
            content: 'Jim Green\n(540) 555-0011\nroads@bmpoa.org'
        },
          {
            title: 'Lake Committee',
            content: 'Sue White\n(540) 555-0012\nlake@bmpoa.org'
        },
          {
            title: 'Social Committee',
            content: 'Pat Black\n(540) 555-0013\nsocial@bmpoa.org'
        }
        ],
        columns: 2
    }),
      
      e(CompactSubsectionHeader, null, 'SERVICE PROVIDERS'),
      e(InfoBox, {
        title: 'Essential Services',
        content: [
          'Water District: (540) 636-9790',
          'Waste Management: (540) 635-7515',
          'Propane (AmeriGas): (540) 635-2022',
          'Propane (Suburban): (540) 635-2161',
          'Septic (Valley Proteins): (540) 877-2190'
        ]
    }),
      
      e(CompactSubsectionHeader, null, 'LOCAL SERVICES'),
      e(DenseText, null,
        'Front Royal provides most services including medical facilities, shopping, and dining. Winchester (30 minutes) offers additional healthcare and retail options. Keep this contact list handy for quick reference during emergencies or when you need community assistance.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['contacts'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}