import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { standardStyles, layoutStyles } from '../standardizedStyles.js';
import { 
  InfoBox, 
  SidebarBox, 
  AlertBox,
  CalloutBox
} from './StandardizedBoxes.js';
import { ContactTable } from './EnhancedTable.js';
import { PageFooter } from './EnhancedFooter.js';
import SectionDividerEnhanced from './SectionDividerEnhanced.js';

// Component-specific styles
const contactStyles = StyleSheet.create({
  page: {
    ...standardStyles.page,
    position: 'relative',
  },
  
  // Contact card grid
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layoutStyles.spacing.md,
    marginVertical: layoutStyles.spacing.lg,
  },
  
  contactCard: {
    width: '48%',
    backgroundColor: colors.lightGray,
    borderRadius: callout.radius,
    padding: layoutStyles.spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  
  contactCardTitle: {
    fontSize: typography.h4,
    fontFamily: typography.families.heading,
    color: colors.primary,
    marginBottom: layoutStyles.spacing.xs,
  },
  
  contactCardSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    marginBottom: layoutStyles.spacing.sm,
  },
  
  contactInfo: {
    fontSize: typography.body,
    lineHeight: typography.listLineHeight,
  },
  
  emergencyHeader: {
    backgroundColor: colors.danger,
    color: colors.white,
    padding: layoutStyles.spacing.md,
    borderRadius: callout.radius,
    marginBottom: layoutStyles.spacing.md,
    textAlign: 'center',
  },
  
  emergencyTitle: {
    fontSize: typography.h2,
    fontFamily: typography.families.heading,
    color: colors.white,
  },
  
  sectionHeader: {
    fontSize: typography.h3,
    fontFamily: typography.families.heading,
    color: colors.darkGray,
    marginTop: layoutStyles.spacing.xl,
    marginBottom: layoutStyles.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: layoutStyles.spacing.xs,
  }
});

export default function ContactsPageNoJSXStandardized({ pageNumberMap = {} }) {
  const e = React.createElement;

  return [
    // Section Divider
    e(SectionDividerEnhanced, {
      key: 'contacts-divider',
      number: '09',
      title: 'CONTACTS & RESOURCES',
      description: 'Important phone numbers, Board contacts, and community resources',
      sectionKey: 'contacts',
      overlayOpacity: 0.4
    }),

    // Page 1: Emergency & Essential Contacts
    e(Page, { key: 'contacts-1', size: 'LETTER', style: contactStyles.page },
      // Emergency header
      e(View, { style: contactStyles.emergencyHeader },
        e(Text, { style: contactStyles.emergencyTitle }, '🚨 EMERGENCY: CALL 911')
      ),

      e(Text, { style: standardStyles.h1 }, 'IMPORTANT CONTACTS'),

      // Emergency Services Section
      e(Text, { style: contactStyles.sectionHeader }, 'EMERGENCY SERVICES'),
      
      e(View, { style: contactStyles.contactGrid },
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Fire & Rescue'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'Linden Volunteer Fire Department'),
          e(Text, { style: contactStyles.contactInfo }, 'Emergency: 911'),
          e(Text, { style: contactStyles.contactInfo }, 'Non-emergency: (540) 635-8733'),
          e(Text, { style: contactStyles.contactInfo }, 'Station: 96 High Knob Rd, Linden')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Sheriff\'s Office'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'Warren County Sheriff'),
          e(Text, { style: contactStyles.contactInfo }, 'Emergency: 911'),
          e(Text, { style: contactStyles.contactInfo }, 'Non-emergency: (540) 635-4128'),
          e(Text, { style: contactStyles.contactInfo }, 'After hours: (540) 635-2111')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Medical Emergency'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'Warren Memorial Hospital'),
          e(Text, { style: contactStyles.contactInfo }, 'Emergency: 911'),
          e(Text, { style: contactStyles.contactInfo }, 'Hospital: (540) 636-0300'),
          e(Text, { style: contactStyles.contactInfo }, '1000 Shenandoah Ave, Front Royal')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Poison Control'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'National Poison Control Center'),
          e(Text, { style: contactStyles.contactInfo }, '1-800-222-1222'),
          e(Text, { style: contactStyles.contactInfo }, 'Available 24/7'),
          e(Text, { style: contactStyles.contactInfo }, 'Free & Confidential')
        )
      ),

      // Utilities Section
      e(Text, { style: contactStyles.sectionHeader }, 'UTILITIES & SERVICES'),
      
      e(ContactTable, {
        data: [
          ['Electric - Rappahannock Electric', '(800) 552-3904', 'rec.coop'],
          ['Water/Sewer - BM Sanitary District', '(540) 635-7900', 'Emergency: Call BMPOA'],
          ['Trash - County Waste', '(540) 635-2180', 'Transfer station info'],
          ['Internet - Comcast', '(800) 934-6489', 'Limited availability'],
          ['Propane - Local vendors', 'Various', 'See website for list']
        ],
        caption: 'Report outages immediately for faster restoration'
      }),

      // BMPOA Contacts
      e(Text, { style: contactStyles.sectionHeader }, 'BMPOA ADMINISTRATION'),
      
      e(View, { style: contactStyles.contactGrid },
        e(View, { style: [contactStyles.contactCard, { width: '100%' }] },
          e(Text, { style: contactStyles.contactCardTitle }, 'BMPOA Office'),
          e(Text, { style: contactStyles.contactInfo }, 'Email: board@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, 'Website: www.bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, 'Mailing: P.O. Box 114, Linden, VA 22642'),
          e(Text, { style: contactStyles.contactInfo }, 'Lodge: 155 Blue Mountain Road')
        )
      ),
      
      e(PageFooter, { pageNumber: pageNumberMap['contacts'] || '—' })
    ),

    // Page 2: Board & Committee Contacts
    e(Page, { key: 'contacts-2', size: 'LETTER', style: contactStyles.page },
      e(Text, { style: standardStyles.h2 }, 'Board of Directors'),
      
      e(Text, { style: standardStyles.body },
        'Board members are elected volunteers who serve 3-year terms. Contact the entire board at board@bmpoa.org or reach specific committees below.'
      ),

      e(CalloutBox, {
        type: 'info',
        icon: '📅',
        title: 'BOARD MEETINGS',
        content: 'Third Saturday of each month at 10:00 AM at the Lodge. All property owners welcome. Check website for agenda and any schedule changes.'
      }),

      // Committee Contacts
      e(Text, { style: contactStyles.sectionHeader }, 'COMMITTEES'),
      
      e(View, { style: contactStyles.contactGrid },
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Architectural Review'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'ARC'),
          e(Text, { style: contactStyles.contactInfo }, 'Email: arc@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, 'Reviews construction plans'),
          e(Text, { style: contactStyles.contactInfo }, 'Submit 30 days in advance')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Roads & Maintenance'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'Infrastructure'),
          e(Text, { style: contactStyles.contactInfo }, 'Email: roads@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, 'Road issues & repairs'),
          e(Text, { style: contactStyles.contactInfo }, 'Snow removal concerns')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Emergency Preparedness'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'Safety Planning'),
          e(Text, { style: contactStyles.contactInfo }, 'Email: emergency@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, 'Evacuation planning'),
          e(Text, { style: contactStyles.contactInfo }, 'Community safety')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactCardTitle }, 'Social & Recreation'),
          e(Text, { style: contactStyles.contactCardSubtitle }, 'Events & Activities'),
          e(Text, { style: contactStyles.contactInfo }, 'Email: social@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, 'Community events'),
          e(Text, { style: contactStyles.contactInfo }, 'Lodge reservations')
        )
      ),

      // County Resources
      e(Text, { style: contactStyles.sectionHeader }, 'WARREN COUNTY RESOURCES'),
      
      e(ContactTable, {
        data: [
          ['Building & Zoning', '(540) 635-2180', '220 N Commerce Ave'],
          ['Fire Marshal', '(540) 635-2180', 'Burn permits & inspections'],
          ['Emergency Services', '(540) 636-1028', 'Emergency management'],
          ['Animal Control', '(540) 635-2111', 'Wildlife concerns'],
          ['Highway Department', '(540) 635-2192', 'State road issues']
        ]
      }),

      e(AlertBox, {
        title: 'STAY INFORMED',
        content: 'Sign up for BMPOA email alerts and emergency text notifications at www.bmpoa.org. Follow us on social media for real-time updates during emergencies.',
        type: 'info'
      }),
      
      e(PageFooter, { pageNumber: (pageNumberMap['contacts'] || 0) + 1 })
    )
  ];
}