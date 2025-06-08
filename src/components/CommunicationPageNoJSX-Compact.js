import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import InlineSectionHeader from './InlineSectionHeader.js';
import {
  TwoColumnLayout,
  QuickFactsBox,
  InfoBox,
  DenseText,
  CompactSubsectionHeader,
  CompactTable
} from './EnhancedLayoutComponents.js';
import { FeatureBox, CardGrid, Badge } from './AdvancedLayoutComponents.js';

export default function CommunicationPageNoJSXCompact({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const commCards = [
    {
      title: '🌐 WEBSITE',
      content: 'www.bmpoa.org\n\nOfficial documents\nMeeting minutes\nForms & applications\nCommunity news'
    },
    {
      title: '📱 FACEBOOK',
      content: 'Blue Mountain POA\n\nReal-time updates\nCommunity discussions\nEvent announcements\nPhoto sharing'
    },
    {
      title: '📧 EMAIL',
      content: 'Monthly newsletters\nBoard announcements\nEmergency alerts\n\nUpdate your email\nwith the Board'
    },
    {
      title: '📋 MEETINGS',
      content: 'Monthly Board meetings\nOpen to all members\nThird Saturday 10 AM\nAt the Lodge'
    }
  ];
  
  const sidebarContent = [
    e(QuickFactsBox, {
      key: 'comm-schedule',
      title: 'STAY CONNECTED',
      facts: [
        { label: 'Newsletter', value: 'Monthly' },
        { label: 'Board Meets', value: '3rd Saturday' },
        { label: 'Annual Mtg', value: 'October' },
        { label: 'Facebook', value: 'Daily activity' },
        { label: 'Website', value: 'Always current' },
        { label: 'Emergency', value: 'Email blast' }
      ]
    }),
    
    e(InfoBox, {
      key: 'get-involved',
      title: '🤝 GET INVOLVED',
      type: 'highlight',
      content: [
        '• Attend board meetings',
        '• Join a committee',
        '• Volunteer for events',
        '• Share your skills',
        '• Run for Board',
        '• Host gatherings'
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
        number: '08',
        title: 'COMMUNICATION',
        description: 'Staying connected with your mountain community'
      }),
      
      e(FeatureBox, {
        title: '📡 KEEPING YOU INFORMED',
        content: 'BMPOA uses multiple channels to keep property owners informed about community news, events, and important updates. Your participation and feedback help strengthen our community bonds.'
      }),
      
      e(View, { style: { marginBottom: spacing.md } },
        e(CardGrid, { cards: commCards, columns: 2 })
      ),
      
      e(CompactSubsectionHeader, null, 'ANNUAL EVENTS'),
      e(CompactTable, {
        headers: ['Event', 'When', 'Details'],
        rows: [
          ['Spring Cleanup', 'April', 'Community work day'],
          ['Summer Social', 'July', 'BBQ at the Lodge'],
          ['Annual Meeting', 'October', 'Elections & budget'],
          ['Holiday Party', 'December', 'Potluck celebration']
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'BOARD MEETINGS'),
      e(DenseText, null,
        'Board meetings are held the third Saturday of each month at 10 AM at the Lodge. All property owners are welcome and encouraged to attend. Agenda items must be submitted one week in advance. Minutes are posted on the website and Facebook.'
      ),
      
      e(InfoBox, {
        title: 'Meeting Participation',
        content: [
          '✓ Owners may speak during open forum',
          '✓ Submit agenda items in advance',
          '✓ Vote on community matters',
          '✓ Review financial reports',
          '✓ Learn about ongoing projects'
        ]
      }),
      
      e(CompactSubsectionHeader, null, 'EMERGENCY COMMUNICATIONS'),
      e(DenseText, null,
        'During emergencies, BMPOA uses email blasts and Facebook for rapid communication. Ensure your contact information is current with the Board. For community-wide emergencies like wildfires or severe weather, multiple notification methods are used.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(View, { style: styles.footerLine }),
      e(View, { style: styles.footerContent },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, { style: styles.footerPageNumber }, pageNumberMap['communication'] || '—'),
        e(Text, null, 'www.bmpoa.org')
      )
    )
  );
}