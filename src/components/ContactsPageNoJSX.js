import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';

export default function ContactsPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const contactStyles = StyleSheet.create({
    sectionDivider: {
      backgroundColor: colors.primary,
      color: '#fff',
      padding: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
  },
    sectionNumber: {
      fontSize: typography.sizes.dividerNumber,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.lg,
      opacity: 0.9,
  },
    sectionTitle: {
      fontSize: typography.sizes.dividerTitle,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.lg,
      textAlign: 'center',
  },
    sectionDescription: {
      fontSize: typography.sizes.h3,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: typography.lineHeights.relaxed,
  },
    contactCard: {
      borderWidth: 1,
      borderColor: colors.background,
      backgroundColor: '#FAFAFA',
      padding: spacing.md,
      marginBottom: 6,  // Standardized 6pt spacing between entries
      borderRadius: callout.radius,
  },
    contactName: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.primary,
      marginBottom: 2,
  },
    contactRole: {
      fontSize: typography.sizes.base,
      color: colors.accent,
      marginBottom: spacing.xs,
  },
    contactInfo: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
  },
    contactIcon: {
      fontSize: typography.sizes.sm,
      marginRight: 4,
  },
    servicesGrid: {
      marginTop: spacing.sm,
      marginBottom: spacing.md,
  },
    serviceItem: {
      marginBottom: spacing.sm,
      paddingLeft: spacing.sm,
      borderLeft: `2px solid ${colors.background}`,
  },
    serviceName: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      marginBottom: 2,
  },
    highlightBox: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    alertBox: {
      backgroundColor: '#FFE4E1',
      borderLeft: `4px solid #DC143C`,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    checklistContainer: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    highlightTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.xs,
      color: colors.primary,
  },
    alertTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.xs,
      color: colors.danger,
  },
    checklistTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.sm,
      color: colors.primary,
  },
    checklistItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.md,
  },
    h3: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.bold,
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
  },
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
  }
});

  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: contactStyles.sectionDivider },
        e(Text, { style: contactStyles.sectionNumber }, '09'),
        e(Text, { style: contactStyles.sectionTitle }, 'CONTACTS & COMMUNICATION'),
        e(Text, { style: contactStyles.sectionDescription }, 
          'Having the right contact information at your fingertips is essential for both routine matters and emergencies. This section provides a comprehensive directory of BMPOA contacts, emergency services, and important community resources.'
        )
      )
    ),
    
    // BMPOA Contact Directory Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BMPOA CONTACT DIRECTORY')
      ),
      e(
        View,
        null,
        e(Text, { style: contactStyles.h3 }, 'BOARD OFFICERS (2023-2025)'),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Jim Critcher'),
          e(Text, { style: contactStyles.contactRole }, 'President & ARC Chair'),
          e(Text, { style: contactStyles.contactInfo }, '📧 president@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, '📋 Oversees all Association operations')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Harry Davis'),
          e(Text, { style: contactStyles.contactRole }, '1st Vice President & Newsletter Editor'),
          e(Text, { style: contactStyles.contactInfo }, '📧 vicepresident@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, '📰 newsletter@bmpoa.org')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Jonathan Morrison'),
          e(Text, { style: contactStyles.contactRole }, '2nd Vice President & Recreation Committee Chair'),
          e(Text, { style: contactStyles.contactInfo }, '📧 vicepresident2@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, '🏞️ recreation@bmpoa.org')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Mike Veasey'),
          e(Text, { style: contactStyles.contactRole }, 'Financial Secretary'),
          e(Text, { style: contactStyles.contactInfo }, '📧 treasurer@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, '💰 Manages finances and dues')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Patrick Patton'),
          e(Text, { style: contactStyles.contactRole }, 'Secretary'),
          e(Text, { style: contactStyles.contactInfo }, '📧 secretary@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, '📝 Meeting minutes and records')
        ),
        
        e(Text, { style: contactStyles.h3 }, 'BOARD DIRECTORS'),
        
        e(View, { style: contactStyles.servicesGrid },
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'David Cook'),
            e(Text, null, 'Roads Committee, Lodge Access Chair')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Carl Herz'),
            e(Text, null, 'Roads Committee Chair')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Garrett McNamara'),
            e(Text, null, 'Deer Lake Recreation Chair')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Erica Santana'),
            e(Text, null, 'Covenant Review Chair')
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '37')
      )
    ),

    // BMPOA Contact Directory Page 2 - Committees
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BMPOA CONTACT DIRECTORY'),
        e(Text, { style: { fontSize: typography.sizes.sm, color: colors.lightText } }, '(Continued from previous page)')
      ),
      e(
        View,
        null,
        e(Text, { style: contactStyles.h3 }, 'GENERAL CONTACT'),
        
        e(View, { style: contactStyles.highlightBox },
          e(Text, { style: contactStyles.highlightTitle }, 'BMPOA MAILING ADDRESS'),
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 'Blue Mountain Property Owners Association'),
          e(Text, null, 'P.O. Box 114'),
          e(Text, null, 'Linden, VA 22642'),
          e(Text, { style: { marginTop: spacing.xs } }, 'Website: www.bmpoa.org'),
          e(Text, null, 'General Inquiries: Use "Contact Us" form on website')
        ),
        
        // Contact Updates call-out box
        e(View, { style: { 
          backgroundColor: '#FFFAEB',  // Light amber
          borderWidth: 0.5,
          borderColor: '#92400E',      // Brown border
          padding: spacing.sm,
          marginTop: spacing.md,
          marginBottom: spacing.md,
          borderRadius: callout.radius
      } },
          e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
            e(Text, { style: { fontSize: typography.sizes.base, marginRight: spacing.xs } }, 'ℹ️'),
            e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.forestGreen } }, 'Contact Updates')
          ),
          e(Text, { style: { fontSize: typography.sizes.sm, fontStyle: 'italic', color: colors.darkCharcoal } }, 
            'If any contact information changes, please notify the Secretary at secretary@bmpoa.org to ensure you continue receiving important community communications.'
          )
        ),
        
        e(Text, { style: contactStyles.h3 }, 'COMMITTEE CONTACTS'),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Architectural Review Committee (ARC)'),
          e(Text, { style: contactStyles.contactRole }, 'Pre-construction approvals'),
          e(Text, { style: contactStyles.contactInfo }, '📧 arc@bmpoa.org'),
          e(Text, { style: contactStyles.contactInfo }, '👤 Chair: Jim Critcher'),
          e(Text, { style: contactStyles.contactInfo }, '📋 Submit via "Contact Us" on BMPOA.org')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Roads Committee'),
          e(Text, { style: contactStyles.contactRole }, 'Road maintenance and issues'),
          e(Text, { style: contactStyles.contactInfo }, '📧 bmpoaroads@gmail.com'),
          e(Text, { style: contactStyles.contactInfo }, '👤 Chair: Carl Herz'),
          e(Text, { style: contactStyles.contactInfo }, '🚧 Report potholes, trees, drainage issues')
        ),
        
        e(Text, { style: contactStyles.h3 }, 'FACILITY & SERVICE CONTACTS'),
        
        e(View, { style: contactStyles.servicesGrid },
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Lodge Rentals'),
            e(Text, null, '📧 bluemountainlodgebooking@gmail.com')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Deer Lake Passes'),
            e(Text, null, '📧 bmpoadeerlake@gmail.com')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Wood Chip Delivery'),
            e(Text, null, '📧 jcook0313@gmail.com')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Newsletter Submissions'),
            e(Text, null, '📧 newsletter@bmpoa.org')
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '38')
      )
    ),

    // Emergency Numbers Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'EMERGENCY NUMBERS')
      ),
      e(
        View,
        null,
        e(View, { style: { ...contactStyles.alertBox, borderWidth: 1, borderColor: '#DC143C' } },
          e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
            e(Text, { style: { fontSize: typography.sizes.base, color: colors.danger, marginRight: spacing.xs } }, '🔔'),
            e(Text, { style: contactStyles.alertTitle }, 'DIAL 911 FOR ALL EMERGENCIES')
          ),
          e(Text, null, 
            'For medical, fire, or police emergencies, always dial 911 first. Provide your exact address and nearest cross street. Blue Mountain addresses can be confusing for first responders, so be prepared with clear directions.'
          )
        ),
        
        e(Text, { style: contactStyles.h3 }, 'FIRE & RESCUE'),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Warren County Fire & Rescue'),
          e(Text, { style: contactStyles.contactRole }, 'Emergency: 911 | Non-emergency dispatch'),
          e(Text, { style: contactStyles.contactInfo }, '📞 (540) 635-4625'),
          e(Text, { style: contactStyles.contactInfo }, '🚒 Station #1 (Front Royal): (540) 635-1435'),
          e(Text, { style: contactStyles.contactInfo }, '🚒 Station #5 (Linden): (540) 635-0053')
        ),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Shenandoah Farms Volunteer Fire Department'),
          e(Text, { style: contactStyles.contactRole }, 'Closest station to many Blue Mountain properties'),
          e(Text, { style: contactStyles.contactInfo }, '📞 (540) 635-9811'),
          e(Text, { style: contactStyles.contactInfo }, '📍 6363 Howellsville Road, Front Royal')
        ),
        
        e(Text, { style: contactStyles.h3 }, 'LAW ENFORCEMENT'),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Warren County Sheriff\'s Office'),
          e(Text, { style: contactStyles.contactRole }, 'Emergency: 911 | Non-emergency'),
          e(Text, { style: contactStyles.contactInfo }, '📞 (540) 635-4128'),
          e(Text, { style: contactStyles.contactInfo }, '📍 1 W. Criser Road, Front Royal'),
          e(Text, { style: contactStyles.contactInfo }, '🚔 Animal Control: (540) 636-7834')
        ),
        
        e(Text, { style: contactStyles.h3 }, 'UTILITIES'),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Rappahannock Electric Cooperative (REC)'),
          e(Text, { style: contactStyles.contactRole }, 'Power outages and electrical emergencies'),
          e(Text, { style: contactStyles.contactInfo }, '📞 (800) 552-3904'),
          e(Text, { style: contactStyles.contactInfo }, '💻 Report outages: myrec.coop/outagecenter'),
          e(Text, { style: contactStyles.contactInfo }, '⚡ Downed power lines: Stay back 50 feet!')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '39')
      )
    ),

    // Emergency Numbers Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'EMERGENCY NUMBERS'),
        e(Text, { style: { fontSize: typography.sizes.sm, color: colors.lightText } }, '(Continued from previous page)')
      ),
      e(
        View,
        null,
        e(Text, { style: contactStyles.h3 }, 'MEDICAL FACILITIES'),
        
        e(View, { style: contactStyles.servicesGrid },
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Warren Memorial Hospital'),
            e(Text, null, '📞 (540) 636-0300'),
            e(Text, null, '📍 1000 N. Shenandoah Ave, Front Royal')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Valley Health Urgent Care'),
            e(Text, null, '📞 (540) 536-4121'),
            e(Text, null, '📍 120 N. Commerce Ave, Front Royal')
          )
        ),
        
        e(View, { style: contactStyles.alertBox },
          e(Text, { style: contactStyles.alertTitle }, 'POISON CONTROL CENTER'),
          e(Text, { style: { fontSize: typography.sizes.h3, fontWeight: typography.weights.bold } }, '📞 1-800-222-1222'),
          e(Text, null, 'Available 24/7 for poison emergencies and questions. Keep this number posted near phones and add to cell phone contacts.')
        ),
        
        e(Text, { style: contactStyles.h3 }, 'WILDLIFE & ENVIRONMENTAL'),
        
        e(View, { style: contactStyles.contactCard },
          e(Text, { style: contactStyles.contactName }, 'Virginia Department of Wildlife Resources'),
          e(Text, { style: contactStyles.contactRole }, 'Wildlife conflicts and emergencies'),
          e(Text, { style: contactStyles.contactInfo }, '📞 Wildlife Conflict Helpline: (855) 571-9003'),
          e(Text, { style: contactStyles.contactInfo }, '📞 Poaching Hotline: (800) 237-5712'),
          e(Text, { style: contactStyles.contactInfo }, '🐻 Bear issues: Remove attractants first')
        ),
        
        e(View, { style: contactStyles.checklistContainer },
          e(Text, { style: contactStyles.checklistTitle }, 'KEEP THIS INFORMATION HANDY'),
          e(Text, { style: contactStyles.checklistItem }, '□ Post emergency numbers near all phones'),
          e(Text, { style: contactStyles.checklistItem }, '□ Program important numbers into cell phones'),
          e(Text, { style: contactStyles.checklistItem }, '□ Keep a printed copy in vehicles'),
          e(Text, { style: contactStyles.checklistItem }, '□ Share with family members and guests'),
          e(Text, { style: contactStyles.checklistItem }, '□ Update contact information annually')
        ),
        
        e(View, { style: contactStyles.infoBox },
          e(Text, { style: contactStyles.highlightTitle }, 'WHEN CALLING FOR HELP'),
          e(Text, { style: contactStyles.listItem }, '• Your exact address: House number and road name'),
          e(Text, { style: contactStyles.listItem }, '• Nearest cross street: Helps responders navigate'),
          e(Text, { style: contactStyles.listItem }, '• Landmarks: "Third house past the sharp curve"'),
          e(Text, { style: contactStyles.listItem }, '• Nature of emergency: Be specific about needs'),
          e(Text, { style: contactStyles.listItem }, '• Your phone number: In case of disconnection')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '40')
      )
    )
  ];
}