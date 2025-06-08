import React from 'react';
import { Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  CompactTable,
  TwoColumnList
} from './EnhancedLayoutComponents.js';
import { FeatureBox, CardGrid } from './AdvancedLayoutComponents.js';
import { ChecklistBox, ContactCard } from './ExtendedLayoutComponents.js';
import { AlertBox } from './StandardizedBoxes.js';
import SectionDivider from './SectionDivider.js';

export default function CommunicationPageNoJSXConsolidated({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const commStyles = StyleSheet.create({
    newsletterBox: {
      backgroundColor: '#E0F2FE',
      padding: spacing.md,
      borderRadius: callout.radius,
      marginVertical: spacing.md,
      borderWidth: 1,
      borderColor: '#0EA5E9',
  },
    facebookBox: {
      backgroundColor: '#EFF6FF',
      padding: spacing.md,
      borderRadius: callout.radius,
      marginVertical: spacing.md,
      borderWidth: 1,
      borderColor: '#3B82F6',
  },
    linkText: {
      color: colors.blue,
      textDecoration: 'underline',
      fontSize: typography.sizes.sm,
  },
    eventBox: {
      backgroundColor: '#FEF3C7',
      borderWidth: 1,
      borderColor: '#F59E0B',
      padding: spacing.sm,
      marginVertical: spacing.xs,
      borderRadius: callout.radius,
  },
    eventTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      color: colors.darkGray,
      marginBottom: 2,
  },
    eventDate: {
      fontSize: typography.sizes.sm,
      color: colors.mediumGray,
  },
    submissionBox: {
      backgroundColor: colors.lightGray,
      padding: spacing.md,
      borderRadius: callout.radius,
      marginTop: spacing.md,
  }
});

  // Sidebar content for page 1
  const page1Sidebar = [
    e(AlertBox, { 
      key: 'stay-informed',
      title: 'STAY INFORMED',
      content: 'Sign up for email alerts at www.bmpoa.org to receive important community updates, emergency notifications, and event announcements directly to your inbox.'
  }),
    
    e(QuickFactsBox, { 
      key: 'comm-facts',
      title: 'QUICK FACTS',
      facts: [
        { label: 'Newsletter', value: 'Quarterly' },
        { label: 'Email Alerts', value: 'As needed' },
        { label: 'Facebook', value: 'Daily updates' },
        { label: 'Board Meetings', value: 'Monthly' },
        { label: 'Website', value: 'www.bmpoa.org' }
      ]
  })
  ];

  // Sidebar content for page 2 - consolidate submission guidelines here
  const page2Sidebar = [
    e(InfoBox, {
      key: 'submissions',
      title: 'SUBMISSION GUIDELINES',
      content: [
        'Welcome submissions:',
        '• Event announcements',
        '• Community photos',
        '• Safety alerts',
        '• Local recommendations',
        '• Historical stories',
        '• Wildlife observations',
        '',
        'Submit to:',
        'newsletter@bmpoa.org',
        'Subject: Newsletter'
      ]
  }),
    
    e(ContactCard, {
      key: 'social-contact',
      name: 'Mackenzie Williams',
      role: 'Social Committee Chair',
      email: 'mll2294@me.com',
      note: 'Ideas and volunteers always welcome!'
  })
  ];

  // Annual events data
  const annualEvents = [
    { title: 'Spring Cleanup & Potluck', date: 'April (TBD)', description: 'Community cleanup morning followed by lunch at the Lodge' },
    { title: 'July 4th Picnic', date: 'July 4th, 1 PM', description: 'Traditional BBQ celebration at the Lodge with games and activities' },
    { title: 'Fall Harvest Festival', date: '3rd Sat Oct', description: 'Autumn celebration with cider, seasonal treats, and costume parade' },
    { title: 'Holiday Party', date: '2nd Sat Dec', description: 'Annual holiday gathering with cookie exchange and carol singing' }
  ];

  return [
    // Section Divider
    e(SectionDivider, {
      number: '08',
      title: 'COMMUNICATION',
      description: 'Stay connected with community news, events, and resources',
      backgroundColor: colors.primary
  }),
    
    // Page 1: Communication Channels
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'STAYING CONNECTED'),
        
        e(DenseText, null,
          'BMPOA uses multiple channels to keep property owners informed about community news, events, and important updates. From quarterly newsletters to real-time social media, we ensure you never miss important information.'
        ),
        
        // Newsletter Section
        e(CompactSubsectionHeader, null, 'QUARTERLY NEWSLETTER'),
        e(View, { style: commStyles.newsletterBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.xs } }, 
            '📰 The Mountain Voice'
          ),
          e(DenseText, null,
            'Our quarterly newsletter delivers comprehensive community updates directly to your mailbox. Each issue includes Board news, upcoming events, seasonal reminders, neighbor spotlights, and important announcements.'
          ),
          e(View, { style: { marginTop: spacing.sm } },
            e(Text, { style: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold } }, 'Distribution:'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• March, June, September, December'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Mailed to all property owners'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, '• Available online at www.bmpoa.org')
          )
        ),
        
        // Facebook Section
        e(CompactSubsectionHeader, null, 'FACEBOOK GROUP'),
        e(View, { style: commStyles.facebookBox },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.xs } }, 
            '👥 BMPOA Community Group'
          ),
          e(DenseText, null,
            'Join our private Facebook group for real-time updates, discussions, and community connections. Share photos, ask questions, and stay informed about daily happenings in Blue Mountain.'
          ),
          e(View, { style: { marginTop: spacing.sm } },
            e(Text, { style: { fontSize: typography.sizes.sm } }, 'Search Facebook for:'),
            e(Link, { src: 'https://www.facebook.com/groups/bmpoa', style: commStyles.linkText }, 
              'Blue Mountain Property Owners'
            ),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: layout.spacing.xs } }, 
              '• Private group - verification required'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 
              '• 200+ active members'),
            e(Text, { style: { fontSize: typography.sizes.sm } }, 
              '• Daily posts and updates')
          )
        ),
        
        // Email Alerts
        e(CompactSubsectionHeader, null, 'EMAIL ALERTS'),
        e(ChecklistBox, {
          title: 'GET TIMELY UPDATES',
          items: [
            'Emergency notifications (fire, road closures)',
            'Meeting reminders and agendas',
            'Event announcements',
            'Important deadline reminders',
            'Community safety alerts',
            'Weather-related closures'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap.communication || '35'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),
    
    // Page 2: Events and Activities - now includes submission guidelines and yoga
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'SOCIAL EVENTS & ACTIVITIES'),
        
        e(DenseText, null,
          'The BMPOA Social Committee works throughout the year to create opportunities for neighbors to connect, celebrate, and build our mountain community.'
        ),
        
        // Annual Events
        e(CompactSubsectionHeader, null, 'ANNUAL COMMUNITY EVENTS'),
        ...annualEvents.map((event, index) => 
          e(View, { key: index, style: commStyles.eventBox },
            e(Text, { style: commStyles.eventTitle }, event.title.toUpperCase()),
            e(Text, { style: commStyles.eventDate }, event.date),
            e(Text, { style: { fontSize: typography.sizes.sm, marginTop: 2 } }, event.description)
          )
        ),
        
        // Ongoing Activities - includes yoga
        e(CompactSubsectionHeader, null, 'ONGOING ACTIVITIES'),
        
        e(FeatureBox, {
          title: 'YOGA AT THE LODGE',
          content: 'Join your neighbors for weekly yoga sessions suitable for all skill levels. Classes are held year-round with schedules posted on the BMPOA website and Facebook group. Bring your own mat and water bottle.',
          icon: '🧘'
      }),
        
        e(CompactTable, {
          headers: ['Activity', 'When', 'Details'],
          rows: [
            ['Board Meetings', '3rd Sat/month', 'Open to all owners'],
            ['Yoga Classes', 'Weekly', 'Check schedule online'],
            ['Harvest Festival', '3rd Sat Oct', 'Family fun event'],
            ['Holiday Party', '2nd Sat Dec', 'Cookie exchange']
          ]
      }),
        
        // Get Involved
        e(CompactSubsectionHeader, null, 'GET INVOLVED'),
        e(InfoBox, {
          title: 'JOIN THE FUN!',
          content: 'The Social Committee welcomes new members and fresh ideas. Contact Mackenzie to join or suggest events!'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, (pageNumberMap.communication || 35) + 1),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}