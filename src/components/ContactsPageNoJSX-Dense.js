import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  EmergencyBox
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

export default function ContactsPageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const contactStyles = StyleSheet.create({
    sectionDescription: {
      fontStyle: 'italic',
    },
    // Card grid layout
    cardGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 8,
    },
    contactCard: {
      borderWidth: 1,
      borderColor: colors.lightGray,
      backgroundColor: '#FAFAFA',
      padding: 6,
      borderRadius: 3,
      width: '48%', // Two columns with gap
    },
    fullWidthCard: {
      borderWidth: 1,
      borderColor: colors.lightGray,
      backgroundColor: '#FAFAFA',
      padding: 6,
      borderRadius: 3,
      width: '100%',
      marginBottom: 6,
    },
    contactName: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 1,
    },
    contactRole: {
      fontSize: 9,
      color: colors.accent,
      marginBottom: 2,
    },
    contactInfo: {
      fontSize: 9,
      lineHeight: 1.3,
    },
    // Emergency number styling
    emergencyCard: {
      backgroundColor: '#FEF3C7',
      borderWidth: 2,
      borderColor: '#F59E0B',
      padding: 8,
      borderRadius: 4,
      marginBottom: 8,
    },
    emergencyTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#92400E',
      marginBottom: 2,
    },
    emergencyNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#DC2626',
    },
    // Service listing
    serviceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    serviceItem: {
      width: '48%',
      marginBottom: 4,
    },
    serviceName: {
      fontSize: 9,
      fontWeight: 'bold',
      color: colors.forestGreen,
    },
    serviceInfo: {
      fontSize: 8,
      color: colors.darkCharcoal,
    },
    // Compact list
    compactList: {
      backgroundColor: colors.lightGray,
      padding: 6,
      borderRadius: 3,
      marginVertical: 6,
    },
    listTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.forestGreen,
      marginBottom: 3,
    },
    listItem: {
      fontSize: 9,
      marginBottom: 1,
      paddingLeft: 8,
    }
  });

  // Sidebar content for page 1
  const page1Sidebar = [
    e(EmergencyBox, null,
      e(Text, { style: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 } }, 
        'QUICK DIAL'
      ),
      e(Text, { style: { fontSize: 16, fontWeight: 'bold', color: '#DC2626', textAlign: 'center', marginBottom: 3 } }, '911'),
      e(Text, { style: { fontSize: 8, textAlign: 'center', marginBottom: 6 } }, 'All Emergencies'),
      e(View, { style: { borderTopWidth: 1, borderTopColor: '#DC2626', paddingTop: 6 } },
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, 'BMPOA: 540-635-0922'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, 'Sheriff: 540-635-4128'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, 'Fire: 540-635-4625'),
        e(Text, { style: { fontSize: 9 } }, 'Power: 800-552-3904')
      )
    ),
    e(InfoBox, { title: '📧 Email Format' },
      e(Text, { style: { fontSize: 8, marginBottom: 2 } }, 'Board Officers:'),
      e(Text, { style: { fontSize: 8, fontFamily: 'Courier', marginBottom: 3 } }, 'role@bmpoa.org'),
      e(Text, { style: { fontSize: 8, marginBottom: 2 } }, 'Committees:'),
      e(Text, { style: { fontSize: 8, fontFamily: 'Courier' } }, 'committee@bmpoa.org')
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(CompactTable, {
      headers: ['Service', 'Contact'],
      rows: [
        ['Lodge', 'booking@...'],
        ['Lake', 'deerlake@...'],
        ['Roads', 'roads@...'],
        ['ARC', 'arc@...'],
        ['News', 'newsletter@...']
      ]
    }),
    e(InfoBox, { title: '📍 Address' },
      e(Text, { style: { fontSize: 9, fontWeight: 'bold', marginBottom: 2 } }, 'BMPOA'),
      e(Text, { style: { fontSize: 8, marginBottom: 1 } }, 'P.O. Box 114'),
      e(Text, { style: { fontSize: 8, marginBottom: 3 } }, 'Linden, VA 22642'),
      e(Text, { style: { fontSize: 8, fontWeight: 'bold' } }, 'www.bmpoa.org')
    )
  ];

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '09',
      title: 'CONTACTS &\nCOMMUNICATION',
      description: 'Essential contact information for board members, committees, emergency services, and community resources',
      backgroundColor: colors.primary
    }),
    
    // Page 1: Board & Committees (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'BMPOA CONTACT DIRECTORY'),
        
        e(CompactSubsectionHeader, null, 'BOARD OFFICERS (2023-2025)'),
        
        // Officer cards in grid
        e(View, { style: contactStyles.cardGrid },
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Jim Critcher'),
            e(Text, { style: contactStyles.contactRole }, 'President & ARC Chair'),
            e(Text, { style: contactStyles.contactInfo }, '📧 president@bmpoa.org')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Harry Davis'),
            e(Text, { style: contactStyles.contactRole }, '1st VP & Newsletter'),
            e(Text, { style: contactStyles.contactInfo }, '📧 vicepresident@bmpoa.org')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Jonathan Morrison'),
            e(Text, { style: contactStyles.contactRole }, '2nd VP & Recreation'),
            e(Text, { style: contactStyles.contactInfo }, '📧 vicepresident2@bmpoa.org')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Mike Veasey'),
            e(Text, { style: contactStyles.contactRole }, 'Financial Secretary'),
            e(Text, { style: contactStyles.contactInfo }, '📧 treasurer@bmpoa.org')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Patrick Patton'),
            e(Text, { style: contactStyles.contactRole }, 'Secretary'),
            e(Text, { style: contactStyles.contactInfo }, '📧 secretary@bmpoa.org')
          )
        ),
        
        e(CompactSubsectionHeader, null, 'BOARD DIRECTORS'),
        
        e(View, { style: contactStyles.serviceGrid },
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'David Cook'),
            e(Text, { style: contactStyles.serviceInfo }, 'Roads, Lodge Access')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Carl Herz'),
            e(Text, { style: contactStyles.serviceInfo }, 'Roads Committee Chair')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Garrett McNamara'),
            e(Text, { style: contactStyles.serviceInfo }, 'Deer Lake Recreation')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Erica Santana'),
            e(Text, { style: contactStyles.serviceInfo }, 'Covenant Review')
          )
        ),
        
        e(CompactSubsectionHeader, null, 'COMMITTEE CONTACTS'),
        
        e(View, { style: contactStyles.fullWidthCard },
          e(Text, { style: contactStyles.contactName }, 'Architectural Review (ARC)'),
          e(Text, { style: contactStyles.contactInfo }, '📧 arc@bmpoa.org • Submit via website "Contact Us"')
        ),
        e(View, { style: contactStyles.fullWidthCard },
          e(Text, { style: contactStyles.contactName }, 'Roads Committee'),
          e(Text, { style: contactStyles.contactInfo }, '📧 bmpoaroads@gmail.com • Report issues with photos')
        ),
        
        e(CompactSubsectionHeader, null, 'SERVICES & FACILITIES'),
        
        e(View, { style: contactStyles.cardGrid },
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Lodge Rentals'),
            e(Text, { style: contactStyles.contactInfo }, 'bluemountainlodgebooking@gmail.com')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Deer Lake Passes'),
            e(Text, { style: contactStyles.contactInfo }, 'bmpoadeerlake@gmail.com')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Wood Chip Delivery'),
            e(Text, { style: contactStyles.contactInfo }, 'jcook0313@gmail.com')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Newsletter'),
            e(Text, { style: contactStyles.contactInfo }, 'newsletter@bmpoa.org')
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '37'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Emergency Contacts (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'EMERGENCY & SERVICE NUMBERS'),
        
        // 911 Emergency Box
        e(View, { style: contactStyles.emergencyCard },
          e(Text, { style: contactStyles.emergencyTitle }, '🔴 EMERGENCY'),
          e(Text, { style: contactStyles.emergencyNumber }, '911'),
          e(Text, { style: { fontSize: 9, marginTop: 2 } }, 
            'Medical • Fire • Police • All Emergencies'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'FIRE & RESCUE'),
        
        e(View, { style: contactStyles.cardGrid },
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Warren County Fire'),
            e(Text, { style: contactStyles.contactInfo }, '📞 540-635-4625'),
            e(Text, { style: contactStyles.contactInfo }, 'Station #5: 540-635-0053')
          ),
          e(View, { style: contactStyles.contactCard },
            e(Text, { style: contactStyles.contactName }, 'Shenandoah Farms VFD'),
            e(Text, { style: contactStyles.contactInfo }, '📞 540-635-9811'),
            e(Text, { style: contactStyles.contactInfo }, 'Closest to BMPOA')
          )
        ),
        
        e(CompactSubsectionHeader, null, 'LAW ENFORCEMENT'),
        
        e(View, { style: contactStyles.fullWidthCard },
          e(Text, { style: contactStyles.contactName }, 'Warren County Sheriff'),
          e(Text, { style: contactStyles.contactInfo }, '📞 540-635-4128 (non-emergency) • Animal Control: 540-636-7834')
        ),
        
        e(CompactSubsectionHeader, null, 'UTILITIES & SERVICES'),
        
        e(View, { style: contactStyles.fullWidthCard },
          e(Text, { style: contactStyles.contactName }, 'Rappahannock Electric (REC)'),
          e(Text, { style: contactStyles.contactInfo }, '📞 800-552-3904 • Report outages: myrec.coop/outagecenter'),
          e(Text, { style: { fontSize: 8, color: '#DC2626', marginTop: 2 } }, 
            '⚡ Downed lines: Stay back 50 feet!'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'MEDICAL FACILITIES'),
        
        e(View, { style: contactStyles.serviceGrid },
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Warren Memorial Hospital'),
            e(Text, { style: contactStyles.serviceInfo }, '540-636-0300')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Valley Health Urgent Care'),
            e(Text, { style: contactStyles.serviceInfo }, '540-536-4121')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Poison Control'),
            e(Text, { style: contactStyles.serviceInfo }, '800-222-1222')
          ),
          e(View, { style: contactStyles.serviceItem },
            e(Text, { style: contactStyles.serviceName }, 'Wildlife Conflicts'),
            e(Text, { style: contactStyles.serviceInfo }, '855-571-9003')
          )
        ),
        
        e(View, { style: contactStyles.compactList },
          e(Text, { style: contactStyles.listTitle }, 'WHEN CALLING FOR HELP'),
          e(Text, { style: contactStyles.listItem }, '• Your exact address & road name'),
          e(Text, { style: contactStyles.listItem }, '• Nearest cross street or landmark'),
          e(Text, { style: contactStyles.listItem }, '• Nature of emergency'),
          e(Text, { style: contactStyles.listItem }, '• Your callback number')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '38'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}