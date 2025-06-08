import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout,
  QuickFactsBox
} from './EnhancedLayoutComponents.js';
import { ContactCard, ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';
// import SectionDivider from './SectionDivider.js';

export default function CommunicationPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  return [
    // Section Divider Page - Removed to prevent duplicates
    // e(SectionDivider, {
    //   number: '08',
    //   title: 'COMMUNITY\nCOMMUNICATION',
    //   description: 'Staying connected with your neighbors and informed about community matters is essential to mountain living. This section covers our various communication channels, social activities, and ways to get involved.',
    //   backgroundColor: colors.primary
    // }),
    
    // Social Events & Activities Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'SOCIAL EVENTS & ACTIVITIES')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            e(QuickFactsBox, {
              key: 'event-calendar',
              title: 'Event Calendar',
              facts: [
                { label: 'Spring Cleanup', value: 'April (TBD)' },
                { label: 'July 4th Picnic', value: '12-8 PM' },
                { label: 'Harvest Festival', value: '3rd Sat Oct' },
                { label: 'Holiday Party', value: '2nd Sat Dec' },
                { label: 'Board Meetings', value: '2nd Mon 6PM' },
                { label: 'Yoga Classes', value: 'Weekly' }
              ]
          }),
            
            e(InfoBox, {
              key: 'involvement',
              title: 'GET INVOLVED',
              type: 'highlight',
              content: 'The Social Committee welcomes new members and fresh ideas. Contact Mackenzie to join or suggest events!'
          })
          ]
      },
        
        e(Text, { 
          style: { marginBottom: spacing.sm }, 
          key: 'intro' 
      },
          'The BMPOA Social Committee works throughout the year to create opportunities for neighbors to connect, celebrate, and build our mountain community.'
        ),
        
        e(Text, { 
          style: { ...styles.h3, marginTop: spacing.md }, 
          key: 'annual' 
      }, 'ANNUAL COMMUNITY EVENTS'),
        
        e(InfoBox, {
          key: 'spring',
          title: 'Spring Community Cleanup & Potluck',
          content: [
            'Usually held in April after wood chipping',
            'Morning cleanup of common areas',
            'Potluck lunch at the Lodge',
            'Great opportunity to meet new neighbors'
          ]
      }),
        
        e(InfoBox, {
          key: 'summer',
          title: 'Summer Independence Day Picnic',
          content: [
            'July 4th celebration at the Lodge',
            'BBQ, games, and family activities',
            'Evening fireworks viewing from the deck',
            'Bring a dish to share'
          ]
      }),
        
        e(InfoBox, {
          key: 'fall',
          title: 'Fall Harvest Festival',
          content: [
            'October celebration of autumn',
            'Pumpkin carving and decorating',
            'Cider and seasonal treats',
            'Costume parade for kids'
          ]
      }),
        
        e(InfoBox, {
          key: 'winter',
          title: 'Winter Holiday Gathering',
          content: [
            'December holiday party',
            'Cookie exchange',
            'Carol singing and fellowship',
            'Collection for local charities'
          ]
      }),
        
        e(Text, { 
          style: { ...styles.h3, marginTop: spacing.md }, 
          key: 'ongoing' 
      }, 'GETTING INVOLVED'),
        
        e(ContactCard, {
          key: 'social-contact',
          name: 'Mackenzie Williams',
          role: 'Social Committee Chair',
          email: 'mll2294@me.com',
          note: 'Ideas and volunteers always welcome!'
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '34')
      )
    ),

    // Facebook Groups & Online Resources Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'FACEBOOK GROUPS & ONLINE RESOURCES')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            e(InfoBox, {
              key: 'official-website',
              title: 'OFFICIAL BMPOA WEBSITE',
              type: 'highlight',
              content: [
                'www.bmpoa.org',
                '',
                'Official source for:',
                '• Board meeting minutes',
                '• Covenants and bylaws',
                '• ARC forms',
                '• Official announcements',
                '• Committee information',
                '• Contact forms'
              ]
          }),
            
            e(InfoBox, {
              key: 'rescue-brigade',
              title: 'RESCUE BRIGADE',
              content: [
                'Emergency Support Network',
                '',
                'Call 911 FIRST, then:',
                '• Post to Rescue Brigade',
                '• Get neighbor support',
                '• Share safety concerns'
              ]
          }),
            
            e(InfoBox, {
              key: 'social-media-note',
              title: 'IMPORTANT NOTE',
              type: 'warning',
              content: [
                'Social media provides quick community connection, but always verify important information through official BMPOA channels.'
              ]
          })
          ]
        },
        e(Text, { style: { marginBottom: spacing.md } },
          'Blue Mountain residents stay connected through several online platforms. While the official BMPOA website remains the authoritative source for association business, these social media groups provide valuable day-to-day communication among neighbors.'
        ),
        
        e(Text, { style: styles.h3 }, 'BLUE MOUNTAIN POA FACEBOOK GROUP'),
        
        e(InfoBox, {
          title: 'PRIVATE COMMUNITY GROUP',
          type: 'highlight',
          content: [
            'This private Facebook group is exclusively for BMPOA members and provides:',
            '• Informal community updates and discussions',
            '• Event announcements and reminders',
            '• Neighbor-to-neighbor assistance',
            '• Lost and found postings',
            '• Recommendations for local services',
            '',
            'Note: This group is not officially sponsored by BMPOA. For official information, always refer to www.bmpoa.org'
          ]
      }),
        
        e(Text, { style: styles.h3 }, 'BLUE MOUNTAIN INFO EXCHANGE'),
        
        e(FeatureBox, {
          title: 'COMMUNITY INFORMATION FORUM',
          content: '"The purpose of this forum is to foster a sense of community among our neighbors and exchange information that is pertinent to the mountain (Linden, VA)."'
      }),
        
        e(Text, { style: { marginBottom: spacing.sm } }, 'Common topics include:'),
        e(ChecklistBox, {
          title: null,
          items: [
            'Weather alerts and road conditions',
            'Wildlife sightings and safety concerns',
            'Power outages and utility issues',
            'Contractor and service provider referrals'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '35')
      )
    ),

    // Newsletter & Announcements Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'NEWSLETTER & ANNOUNCEMENTS')
      ),
      e(
        TwoColumnLayout,
        {
          sidebarContent: [
            e(InfoBox, {
              key: 'deadlines',
              title: 'NEWSLETTER DEADLINES',
              content: [
                'March 15 - Spring Issue',
                'June 15 - Summer Issue',
                'Sept 15 - Fall Issue',
                'Dec 15 - Winter Issue',
                '',
                'Articles: 200-300 words',
                'Images: JPG ≤ 1MB'
              ]
          }),
            
            e(InfoBox, {
              key: 'urgent',
              title: 'URGENT ANNOUNCEMENTS',
              type: 'highlight',
              content: [
                'Time-sensitive news:',
                '• Email blasts',
                '• Website posts',
                '• Facebook updates',
                '• Posted signs'
              ]
          }),
            
            e(InfoBox, {
              key: 'contact-updates',
              title: 'Contact Updates',
              type: 'highlight',
              content: [
                'Keep your contact info current!',
                '',
                'Email changes to:',
                'secretary@bmpoa.org'
              ]
          })
          ]
      },
        
        e(Text, { 
          style: { marginBottom: spacing.sm }, 
          key: 'intro' 
      },
          'The BMPOA Newsletter serves as our primary written communication to all property owners. Published quarterly, it provides comprehensive updates on community matters, upcoming events, and important announcements.'
        ),
        
        e(Text, { 
          style: styles.h3, 
          key: 'content' 
      }, 'NEWSLETTER CONTENT'),
        
        e(ChecklistBox, {
          key: 'content-list',
          title: 'Each issue typically includes:',
          items: [
            "President's Message",
            'Board Meeting Highlights',
            'Committee Reports',
            'Upcoming Events',
            'Seasonal Reminders',
            'Community Spotlight',
            'Financial Updates'
          ]
      }),
        
        e(Text, { 
          style: styles.h3, 
          key: 'distribution' 
      }, 'DISTRIBUTION'),
        
        e(InfoBox, {
          key: 'delivery',
          title: 'DELIVERY METHODS',
          content: [
            '• Email: Primary distribution method',
            '• Postal Mail: By request or no email',
            '• Website: PDF archives on BMPOA.org',
            '• Facebook: Links posted to groups',
            '',
            'Update preferences: secretary@bmpoa.org'
          ]
      }),
        
        e(Text, { 
          style: styles.h3, 
          key: 'team' 
      }, 'NEWSLETTER TEAM'),
        
        e(ContactCard, {
          key: 'newsletter-contact',
          name: 'Newsletter Committee',
          email: 'newsletter@bmpoa.org',
          note: '✏️ Editor: Harry Davis\n📝 Assistant: Patrick Patton'
      }),
        
        e(Text, { 
          style: styles.h3, 
          key: 'submitting' 
      }, 'SUBMITTING CONTENT'),
        
        e(InfoBox, {
          key: 'submissions',
          title: 'SUBMISSION GUIDELINES',
          content: [
            'Welcome submissions include:',
            '• Event announcements',
            '• Photos of community interest',
            '• Safety tips or alerts',
            '• Local business recommendations',
            '• Historical stories',
            '• Wildlife observations',
            '',
            'Submit to: newsletter@bmpoa.org',
            'Subject: "Newsletter Submission"'
          ]
      })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '36')
      )
    )
  ];
}