import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { TableNoJSX } from './DesignComponents.js';
import SectionDivider from './SectionDivider.js';

export default function CommunicationPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const commStyles = StyleSheet.create({
    sectionDivider: {
      backgroundColor: colors.primary,
      color: '#fff',
      padding: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
    },
    sectionNumber: {
      fontSize: 72,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    sectionDescription: {
      fontSize: 16,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.6,
    },
    alertBox: {
      backgroundColor: '#FFE4E1',
      borderLeft: `4px solid #DC143C`,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    alertTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: '#DC143C',
    },
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    highlightBox: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    highlightTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: colors.primary,
    },
    contactCard: {
      borderWidth: 1,
      borderColor: colors.background,
      backgroundColor: '#FAFAFA',
      padding: spacing.md,
      marginBottom: spacing.md,
      borderRadius: 4,
    },
    contactName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 2,
    },
    contactRole: {
      fontSize: 12,
      color: colors.accent,
      marginBottom: spacing.xs,
    },
    contactInfo: {
      fontSize: 11,
      lineHeight: 1.4,
    },
    paragraph: {
      marginBottom: spacing.sm,
      textAlign: 'justify',
    },
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
    },
    h4: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    nestedList: {
      paddingLeft: spacing.md,
    },
    nestedListItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
      fontSize: 11,
    },
    resourceList: {
      marginTop: spacing.sm,
    },
    prominentText: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderLeft: `4px solid ${colors.primary}`,
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.primary,
    }
  });

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '08',
      title: 'COMMUNITY COMMUNICATION',
      description: 'Staying connected with your neighbors and informed about community matters is essential to mountain living. This section covers our various communication channels, social activities, and ways to get involved.',
      backgroundColor: colors.primary
    }),
    
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
        View,
        null,
        e(Text, { style: commStyles.paragraph },
          'The BMPOA Social Committee works throughout the year to create opportunities for neighbors to connect, celebrate, and build our mountain community. These events foster the friendly atmosphere that makes Blue Mountain such a special place to live.'
        ),
        
        e(Text, { style: commStyles.h3 }, 'ANNUAL COMMUNITY EVENTS'),
        
        e(Text, { style: commStyles.paragraph }, 'The Social Committee sponsors four major community events each year, one per season:'),
        
        e(Text, { style: commStyles.listItem }, '• Spring Community Cleanup & Potluck'),
        e(Text, { style: commStyles.nestedListItem }, '  - Usually held in April after wood chipping'),
        e(Text, { style: commStyles.nestedListItem }, '  - Morning cleanup of common areas'),
        e(Text, { style: commStyles.nestedListItem }, '  - Potluck lunch at the Lodge'),
        e(Text, { style: commStyles.nestedListItem }, '  - Great opportunity to meet new neighbors'),
        
        e(Text, { style: commStyles.listItem }, '• Summer Independence Day Picnic'),
        e(Text, { style: commStyles.nestedListItem }, '  - July 4th celebration at the Lodge'),
        e(Text, { style: commStyles.nestedListItem }, '  - BBQ, games, and family activities'),
        e(Text, { style: commStyles.nestedListItem }, '  - Evening fireworks viewing from the deck'),
        e(Text, { style: commStyles.nestedListItem }, '  - Bring a dish to share'),
        
        e(Text, { style: commStyles.listItem }, '• Fall Harvest Festival'),
        e(Text, { style: commStyles.nestedListItem }, '  - October celebration of autumn'),
        e(Text, { style: commStyles.nestedListItem }, '  - Pumpkin carving and decorating'),
        e(Text, { style: commStyles.nestedListItem }, '  - Cider and seasonal treats'),
        e(Text, { style: commStyles.nestedListItem }, '  - Costume parade for kids'),
        
        e(Text, { style: commStyles.listItem }, '• Winter Holiday Gathering'),
        e(Text, { style: commStyles.nestedListItem }, '  - December holiday party'),
        e(Text, { style: commStyles.nestedListItem }, '  - Cookie exchange'),
        e(Text, { style: commStyles.nestedListItem }, '  - Carol singing and fellowship'),
        e(Text, { style: commStyles.nestedListItem }, '  - Collection for local charities'),
        
        e(Text, { style: commStyles.h3 }, 'EVENT CALENDAR'),
        e(View, { style: { marginTop: spacing.sm, marginBottom: spacing.md } },
          // Custom table with specific column widths to prevent 3-line wraps
          e(View, { style: { borderWidth: 0.5, borderColor: colors.slateGray, borderRadius: 4, overflow: 'hidden' } },
            // Header row
            e(View, { style: { flexDirection: 'row', backgroundColor: colors.lightGray, borderBottomWidth: 1, borderBottomColor: colors.slateGray, paddingVertical: spacing.xs, paddingHorizontal: spacing.xs } },
              e(Text, { style: { width: '30%', fontSize: typography.body, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: colors.forestGreen, paddingVertical: 4, paddingHorizontal: 6 } }, 'Event'),
              e(Text, { style: { width: '25%', fontSize: typography.body, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: colors.forestGreen, paddingVertical: 4, paddingHorizontal: 6 } }, 'When'),
              e(Text, { style: { width: '45%', fontSize: typography.body, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: colors.forestGreen, paddingVertical: 4, paddingHorizontal: 6 } }, 'Where/Notes')
            ),
            // Data rows
            ...[
              ['Spring Cleanup & Potluck', 'April (date TBD)', 'Lodge; bring gloves and tools'],
              ['Independence Day Picnic', 'July 4th, 12-8 PM', 'Lodge Deck; potluck style'],
              ['Harvest Festival', 'October (3rd Saturday)', 'Lodge grounds; family activities'],
              ['Holiday Gathering', 'December (2nd Saturday)', 'Lodge; cookie exchange'],
              ['Board Meetings', '2nd Monday monthly, 6 PM', 'Lodge or virtual (check website)'],
              ['Yoga Classes', 'Weekly (check schedule)', 'Lodge; bring mat and water']
            ].map((row, index) => 
              e(View, { 
                key: index,
                style: { 
                  flexDirection: 'row', 
                  borderBottomWidth: 0.5, 
                  borderBottomColor: colors.lightGray,
                  backgroundColor: index % 2 === 1 ? colors.lightGray : 'transparent',
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.xs
                } 
              },
                e(Text, { style: { width: '30%', fontSize: typography.caption, color: colors.warmGray, paddingVertical: 4, paddingHorizontal: 6 } }, row[0]),
                e(Text, { style: { width: '25%', fontSize: typography.caption, color: colors.warmGray, paddingVertical: 4, paddingHorizontal: 6 } }, row[1]),
                e(Text, { style: { width: '45%', fontSize: typography.caption, color: colors.warmGray, paddingVertical: 4, paddingHorizontal: 6 } }, row[2])
              )
            )
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'ONGOING ACTIVITIES'),
        
        e(View, { style: commStyles.highlightBox },
          e(Text, { style: commStyles.highlightTitle }, 'YOGA AT THE LODGE'),
          e(Text, null, 
            'Join your neighbors for weekly yoga sessions suitable for all skill levels. Classes are held year-round with schedules posted on the BMPOA website and Facebook group. Bring your own mat and water bottle.'
          )
        ),
        
        e(View, { style: commStyles.infoBox },
          e(Text, { style: commStyles.highlightTitle }, 'COMMUNITY CLEAN-UP DAYS'),
          e(Text, null, 
            'Throughout the year, volunteers gather to maintain and beautify our common areas. These work sessions are great opportunities to contribute to the community while getting to know your neighbors. Tools and refreshments provided.'
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'GET INVOLVED'),
        
        e(Text, { style: commStyles.paragraph }, 'The Social Committee welcomes new members and fresh ideas for community activities. To join the committee or suggest an event:'),
        
        e(View, { style: commStyles.contactCard },
          e(Text, { style: commStyles.contactName }, 'Mackenzie Williams'),
          e(Text, { style: commStyles.contactRole }, 'Social Committee Chair'),
          e(Text, { style: commStyles.contactInfo }, '📧 mll2294@me.com'),
          e(Text, { style: commStyles.contactInfo }, '💡 Ideas and volunteers always welcome!')
        ),
        
        e(Text, { style: commStyles.paragraph }, 'Event announcements are posted on BMPOA.org, the Facebook group, and in the quarterly newsletter. Mark your calendars and join us for these community-building activities!')
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
        View,
        null,
        e(Text, { style: commStyles.paragraph },
          'Blue Mountain residents stay connected through several online platforms. While the official BMPOA website remains the authoritative source for association business, these social media groups provide valuable day-to-day communication among neighbors.'
        ),
        
        e(Text, { style: commStyles.h3 }, 'BLUE MOUNTAIN POA FACEBOOK GROUP'),
        
        e(View, { style: commStyles.highlightBox },
          e(Text, { style: commStyles.highlightTitle }, 'PRIVATE COMMUNITY GROUP'),
          e(Text, { style: commStyles.paragraph }, 'This private Facebook group is exclusively for BMPOA members and provides a platform for:'),
          e(Text, { style: commStyles.listItem }, '• Informal community updates and discussions'),
          e(Text, { style: commStyles.listItem }, '• Event announcements and reminders'),
          e(Text, { style: commStyles.listItem }, '• Neighbor-to-neighbor assistance'),
          e(Text, { style: commStyles.listItem }, '• Lost and found postings'),
          e(Text, { style: commStyles.listItem }, '• Recommendations for local services'),
          e(Text, { style: { ...commStyles.paragraph, fontWeight: 'bold', marginTop: spacing.sm } }, 
            'Note: This group is not officially sponsored by BMPOA. For official information, always refer to www.bmpoa.org'
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'BLUE MOUNTAIN INFO EXCHANGE'),
        
        e(View, { style: commStyles.infoBox },
          e(Text, { style: commStyles.highlightTitle }, 'COMMUNITY INFORMATION FORUM'),
          e(Text, { style: { ...commStyles.paragraph, fontStyle: 'italic' } }, 
            '"The purpose of this forum is to foster a sense of community among our neighbors and exchange information that is pertinent to the mountain (Linden, VA). We are all neighbors, regardless of whether or not we\'ve met each other in person. Blue Mountain is a wonderful place to be and let\'s hope that this group makes it a little easier for everyone to keep up to date on what\'s going on."'
          ),
          e(Text, { style: commStyles.paragraph }, 'Common topics include:'),
          e(Text, { style: commStyles.listItem }, '• Weather alerts and road conditions'),
          e(Text, { style: commStyles.listItem }, '• Wildlife sightings and safety concerns'),
          e(Text, { style: commStyles.listItem }, '• Power outages and utility issues'),
          e(Text, { style: commStyles.listItem }, '• Contractor and service provider referrals')
        ),
        
        e(Text, { style: commStyles.h3 }, 'BLUE MOUNTAIN RESCUE BRIGADE'),
        
        e(View, { style: commStyles.alertBox },
          e(Text, { style: commStyles.alertTitle }, 'EMERGENCY SUPPORT NETWORK'),
          e(Text, { style: { ...commStyles.paragraph, fontStyle: 'italic' } }, 
            '"Blue Mountain Rescue Brigade...is a group of us who want to do our best to ensure the wealth, life, property and safety of our mountain friends. Be it the 2-legged kind or the 4-legged type. This is intended to HELP local emergency crews and law enforcement, NOT REPLACE IT. Everyone should still dial 911 first. Then \'light-up\' this site."'
          ),
          e(Text, { style: { ...commStyles.paragraph, fontWeight: 'bold' } }, 
            'Remember: Always call 911 first in emergencies, then post to the Rescue Brigade for additional neighbor support.'
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'OFFICIAL BMPOA WEBSITE'),
        
        e(Text, { style: commStyles.paragraph }, 'The official source for all BMPOA information:'),
        
        e(View, { style: commStyles.resourceList },
          e(Text, { style: commStyles.h4 }, 'www.bmpoa.org'),
          e(Text, { style: commStyles.listItem }, '• Board meeting minutes and agendas'),
          e(Text, { style: commStyles.listItem }, '• Covenants and bylaws'),
          e(Text, { style: commStyles.listItem }, '• Architectural review forms'),
          e(Text, { style: commStyles.listItem }, '• Official announcements'),
          e(Text, { style: commStyles.listItem }, '• Committee information'),
          e(Text, { style: commStyles.listItem }, '• Contact forms')
        ),
        
        e(Text, { style: commStyles.prominentText }, 
          'While social media provides quick community connection, always verify important information through official BMPOA channels.'
        )
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
        View,
        null,
        e(Text, { style: commStyles.paragraph },
          'The BMPOA Newsletter serves as our primary written communication to all property owners. Published quarterly, it provides comprehensive updates on community matters, upcoming events, and important announcements.'
        ),
        
        e(Text, { style: commStyles.h3 }, 'NEWSLETTER CONTENT'),
        
        e(Text, { style: commStyles.paragraph }, 'Each issue typically includes:'),
        
        e(Text, { style: commStyles.listItem }, '• President\'s Message: Updates from the Board President on current initiatives and community matters'),
        e(Text, { style: commStyles.listItem }, '• Board Meeting Highlights: Summary of key decisions and discussions from recent meetings'),
        e(Text, { style: commStyles.listItem }, '• Committee Reports: Updates from Roads, Social, ARC, and other active committees'),
        e(Text, { style: commStyles.listItem }, '• Upcoming Events: Calendar of community activities and important dates'),
        e(Text, { style: commStyles.listItem }, '• Seasonal Reminders: Weather preparations, maintenance tips, and safety information'),
        e(Text, { style: commStyles.listItem }, '• Community Spotlight: Features on neighbors, local businesses, or community achievements'),
        e(Text, { style: commStyles.listItem }, '• Financial Updates: Budget status and Sanitary District information as needed'),
        
        e(Text, { style: commStyles.h3 }, 'DISTRIBUTION'),
        
        e(View, { style: commStyles.highlightBox },
          e(Text, { style: commStyles.highlightTitle }, 'DELIVERY METHODS'),
          e(Text, { style: commStyles.listItem }, '• Email: Primary distribution method for property owners with email addresses on file'),
          e(Text, { style: commStyles.listItem }, '• Postal Mail: Printed copies mailed to those without email or by request'),
          e(Text, { style: commStyles.listItem }, '• Website: PDF versions archived on BMPOA.org'),
          e(Text, { style: commStyles.listItem }, '• Facebook: Links posted to community groups'),
          e(Text, { style: { ...commStyles.paragraph, marginTop: spacing.sm } }, 
            'To update your contact preferences or ensure you\'re receiving the newsletter, email the Secretary at secretary@bmpoa.org'
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'NEWSLETTER TEAM'),
        
        e(View, { style: { flexDirection: 'row', gap: spacing.md } },
          // Main content column
          e(View, { style: { flex: 2 } },
            e(View, { style: commStyles.contactCard },
              e(Text, { style: commStyles.contactName }, 'Newsletter Committee'),
              e(Text, { style: commStyles.contactInfo }, '✏️ Editor: Harry Davis'),
              e(Text, { style: commStyles.contactInfo }, '📝 Assistant: Patrick Patton')
            )
          ),
          // Newsletter sidebar
          e(View, { style: { 
            flex: 1, 
            backgroundColor: '#FFF7ED', 
            borderWidth: 0.5, 
            borderColor: '#EA580C',
            padding: spacing.sm,
            borderRadius: 4
          } },
            e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
              e(Text, { style: { fontSize: 12, marginRight: spacing.xs } }, '📰'),
              e(Text, { style: { fontSize: 11, fontWeight: 'bold', color: colors.darkCharcoal } }, 'NEWSLETTER DEADLINES')
            ),
            e(Text, { style: { fontSize: 9, color: colors.warmGray, marginBottom: 4 } }, '• March 15 - Spring Issue'),
            e(Text, { style: { fontSize: 9, color: colors.warmGray, marginBottom: 4 } }, '• June 15 - Summer Issue'),
            e(Text, { style: { fontSize: 9, color: colors.warmGray, marginBottom: 4 } }, '• Sept 15 - Fall Issue'),
            e(Text, { style: { fontSize: 9, color: colors.warmGray, marginBottom: 4 } }, '• Dec 15 - Winter Issue'),
            e(Text, { style: { fontSize: 9, color: colors.warmGray, marginTop: spacing.xs } }, 
              'Articles: 200-300 words\nImages: JPG ≤ 1MB'
            )
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'SUBMITTING CONTENT'),
        
        e(Text, { style: commStyles.paragraph }, 'The newsletter welcomes submissions from community members:'),
        
        e(Text, { style: commStyles.listItem }, '• Event announcements'),
        e(Text, { style: commStyles.listItem }, '• Photos of community interest'),
        e(Text, { style: commStyles.listItem }, '• Safety tips or alerts'),
        e(Text, { style: commStyles.listItem }, '• Local business recommendations'),
        e(Text, { style: commStyles.listItem }, '• Historical stories about Blue Mountain'),
        e(Text, { style: commStyles.listItem }, '• Wildlife or nature observations'),
        
        e(View, { style: commStyles.infoBox },
          e(Text, { style: commStyles.highlightTitle }, 'SUBMISSION DEADLINES'),
          e(Text, null, 
            'Content is due by the 15th of March, June, September, and December for inclusion in the following month\'s issue. Submit items to newsletter@bmpoa.org with "Newsletter Submission" in the subject line.'
          )
        ),
        
        e(Text, { style: commStyles.h3 }, 'URGENT ANNOUNCEMENTS'),
        
        e(Text, { style: commStyles.paragraph }, 'For time-sensitive communications between newsletter issues, the BMPOA uses:'),
        e(Text, { style: commStyles.listItem }, '• Email blasts to the membership list'),
        e(Text, { style: commStyles.listItem }, '• Posts on the BMPOA website homepage'),
        e(Text, { style: commStyles.listItem }, '• Updates in community Facebook groups'),
        e(Text, { style: commStyles.listItem }, '• Signs posted at key locations (Lodge, mailbox areas)'),
        
        // Contact Updates call-out box
        e(View, { style: { 
          backgroundColor: '#FFFAEB',  // Light amber
          borderWidth: 0.5,
          borderColor: '#92400E',      // Brown border
          padding: spacing.sm,
          marginTop: spacing.md,
          borderRadius: 4
        } },
          e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
            e(Text, { style: { fontSize: 12, marginRight: spacing.xs } }, 'ℹ️'),
            e(Text, { style: { fontSize: 11, fontWeight: 'bold', color: colors.forestGreen } }, 'Contact Updates')
          ),
          e(Text, { style: { fontSize: 10, fontStyle: 'italic', color: colors.darkCharcoal } }, 
            'If any contact information changes (email, phone, or mailing address), please notify the Secretary at secretary@bmpoa.org to ensure you continue receiving important community communications.'
          )
        )
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