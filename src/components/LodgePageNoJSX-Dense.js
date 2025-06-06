import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  TwoColumnLayout, 
  QuickFactsBox, 
  InfoBox, 
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  TwoColumnList,
  InlineInfo
} from './EnhancedLayoutComponents.js';
import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function LodgePageNoJSXDense({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const lodgeStyles = StyleSheet.create({
    sectionTitle: {
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    sectionDescription: {
      fontSize: 12,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.5,
      fontStyle: 'italic',
    },
    compactImage: {
      width: '100%',
      height: 100,
      marginVertical: 4,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: colors.forestGreen,
    },
    pricingBox: {
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#0EA5E9',
      borderRadius: 4,
      padding: 6,
      marginVertical: 6,
    },
    checklistBox: {
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: colors.forestGreen,
      borderRadius: 4,
      padding: 8,
      marginVertical: 8,
    },
    checklistItem: {
      flexDirection: 'row',
      marginBottom: 3,
      alignItems: 'flex-start',
    },
    checkbox: {
      width: 8,
      height: 8,
      borderWidth: 1,
      borderColor: colors.slateGray,
      marginRight: 6,
      marginTop: 1,
    },
    alertBox: {
      backgroundColor: '#FEF3C7',
      borderWidth: 1,
      borderColor: '#F59E0B',
      padding: 6,
      marginTop: 8,
      borderRadius: 4,
    }
  });

  // Sidebar content for page 1
  const page1Sidebar = [
    e(QuickFactsBox, { 
      facts: [
        { label: 'Capacity', value: '~60 people' },
        { label: 'Kitchen', value: 'Full' },
        { label: 'Restrooms', value: '2' },
        { label: 'Parking', value: 'Ample' }
      ]
    }),
    e(InfoBox, { title: '🏠 Features' },
      e(View, null,
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Hardwood floors'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Stage area'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Tables & chairs'),
        e(Text, { style: { fontSize: 9, marginBottom: 2 } }, '• Outdoor deck'),
        e(Text, { style: { fontSize: 9 } }, '• Mountain views')
      )
    ),
    e(InfoBox, { title: '♿ Accessible' },
      e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
        'ADA compliant with ramp access, wide doorways, and accessible restroom.'
      )
    )
  ];

  // Sidebar content for page 2
  const page2Sidebar = [
    e(CompactTable, {
      headers: ['Rental', 'Price'],
      rows: [
        ['Half Day', '$75'],
        ['Full Day', '$150'],
        ['Deposit', '$100'],
        ['Add\u2019l Hour', '$25']
      ]
    }),
    e(InfoBox, { title: '📅 Booking' },
      e(Text, { style: { fontSize: 9, fontWeight: 'bold', marginBottom: 2 } }, 'To Reserve:'),
      e(Text, { style: { fontSize: 8, marginBottom: 3 } }, 'bluemountainlodgebooking@gmail.com'),
      e(Text, { style: { fontSize: 8, lineHeight: 1.3 } }, 
        'Include: dates, times, event type, expected attendance. First-come, first-served.'
      )
    ),
    e(CompactTable, {
      headers: ['Activity', 'When'],
      rows: [
        ['Potluck', '1st Saturday'],
        ['Cards', 'Thursdays 7pm'],
        ['Meetings', 'As scheduled'],
        ['Private', 'By reservation']
      ]
    })
  ];

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '07',
      title: 'THE LODGE',
      description: 'Community gathering place for meetings, events, and celebrations',
      backgroundColor: colors.primary
    }),
    
    // Page 1: Location & Features (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page1Sidebar },
        e(CompactSectionHeader, null, 'LOCATION & FEATURES'),
        
        // Lodge exterior image
        assetMap.TheLodge && e(
          View,
          { style: { marginBottom: 6 } },
          e(Image, { 
            src: assetMap.TheLodge, 
            style: lodgeStyles.compactImage 
          }),
          e(Text, { style: { fontSize: 9, fontStyle: 'italic', textAlign: 'center' } }, 
            'The Lodge — our community gathering place'
          )
        ),
        
        e(DenseText, null,
          'The Blue Mountain Lodge serves as our community\'s social hub, hosting meetings, events, and private gatherings. This versatile space accommodates approximately 60 people and features a full kitchen, stage area, and outdoor deck with mountain views.'
        ),
        
        e(CompactSubsectionHeader, null, 'LOCATION & ACCESS'),
        e(InlineInfo, {
          items: [
            { label: 'Address', value: 'Blue Mountain Rd' },
            { label: 'Access', value: 'Key required' }
          ]
        }),
        
        // Lodge interior image
        assetMap.lodgeinterior && e(
          View,
          { style: { marginVertical: 6 } },
          e(Image, { 
            src: assetMap.lodgeinterior, 
            style: lodgeStyles.compactImage 
          }),
          e(Text, { style: { fontSize: 9, fontStyle: 'italic', textAlign: 'center' } }, 
            'Spacious interior with hardwood floors and mountain views'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'REGULAR ACTIVITIES'),
        e(TwoColumnList, {
          items: [
            'Monthly potluck dinners (1st Saturday)',
            'Weekly card games (Thursday evenings)',
            'Board meetings (quarterly)',
            'Holiday parties and celebrations',
            'Private events by reservation',
            'Community workshops and classes'
          ]
        })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '30'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    ),

    // Page 2: Rental Information & Guidelines (Dense)
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(TwoColumnLayout, { sidebarContent: page2Sidebar },
        e(CompactSectionHeader, null, 'RENTAL INFORMATION & GUIDELINES'),
        
        e(CompactSubsectionHeader, null, 'RENTAL PROCESS'),
        e(DenseText, null,
          'Property owners in good standing may rent the Lodge for private events. Contact bluemountainlodgebooking@gmail.com with your preferred dates, times, event type, and expected attendance. Bookings are first-come, first-served.'
        ),
        
        e(View, { style: lodgeStyles.pricingBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: '#0369A1', marginBottom: 2 } }, 
            '💵 Pricing Structure'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Half Day (4 hrs): $75 • Full Day (8 hrs): $150\nRefundable deposit: $100 • Additional hours: $25/hr'
          )
        ),
        
        e(CompactSubsectionHeader, null, 'USAGE GUIDELINES'),
        
        e(View, { style: lodgeStyles.checklistBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: colors.forestGreen, marginBottom: 4 } }, 
            'CLEANUP CHECKLIST'
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Sweep/mop all floors')
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Wipe down tables and counters')
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Empty trash and replace bags')
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Return furniture to original layout')
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Clean kitchen if used')
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Turn off all lights and appliances')
          ),
          e(View, { style: lodgeStyles.checklistItem },
            e(View, { style: lodgeStyles.checkbox }),
            e(Text, { style: { fontSize: 9, flex: 1 } }, 'Lock all doors and windows')
          )
        ),
        
        e(View, { style: lodgeStyles.alertBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', color: '#92400E', marginBottom: 2 } }, 
            '⚠️ LIABILITY & INSURANCE'
          ),
          e(Text, { style: { fontSize: 9, lineHeight: 1.3 } }, 
            'Renters are liable for damages beyond normal wear. Security deposit withheld for inadequate cleanup. Proof of homeowner\'s insurance required. BMPOA not responsible for injuries during private events.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, '31'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}