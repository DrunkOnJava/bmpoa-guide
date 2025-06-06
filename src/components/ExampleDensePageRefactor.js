import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import {
  TwoColumnLayout,
  InfoBox,
  QuickFactsBox,
  InlineInfo,
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  TwoColumnList
} from './EnhancedLayoutComponents';

// Example: Refactoring a sparse Lodge page into a dense layout
export default function LodgePageDenseExample({ pageNumberMap }) {
  const e = React.createElement;
  
  // Page-specific styles
  const styles = StyleSheet.create({
    page: {
      padding: '0.75in',
      fontSize: 10,
    },
    pageHeader: {
      backgroundColor: '#2C5282',
      margin: '-0.75in -0.75in 16px -0.75in',
      padding: '20px 0.75in',
    },
    pageTitle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
    },
    pageSubtitle: {
      color: '#E2E8F0',
      fontSize: 11,
      marginTop: 4,
    },
    calloutBox: {
      backgroundColor: '#E6FFFA',
      border: '1px solid #38A169',
      borderRadius: 4,
      padding: 10,
      marginBottom: 12,
    },
    contactCard: {
      backgroundColor: '#FFFFFF',
      border: '2px solid #2C5282',
      borderRadius: 4,
      padding: 10,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 9,
      color: '#718096',
    },
  });
  
  // Sidebar content
  const sidebarContent = [
    // Quick Facts
    e(QuickFactsBox, {
      facts: [
        { label: 'Capacity', value: '60 people' },
        { label: 'Location', value: 'Deer Lake' },
        { label: 'Parking', value: '20 spaces' },
        { label: 'Accessibility', value: 'ADA compliant' },
        { label: 'Year Built', value: '2010' },
      ]
    }),
    
    // Hours box
    e(InfoBox, { title: 'Rental Hours' },
      e(Text, { style: { fontSize: 9, marginBottom: 4 } }, 'Available 7 days a week'),
      e(Text, { style: { fontSize: 9 } }, '8:00 AM - 10:00 PM')
    ),
    
    // Contact card
    e(View, { style: styles.contactCard },
      e(Text, { style: { fontSize: 11, fontWeight: 'bold', marginBottom: 6 } }, 'Reserve Today'),
      e(Text, { style: { fontSize: 9, marginBottom: 2 } }, 'Email:'),
      e(Text, { style: { fontSize: 8, color: '#2C5282', marginBottom: 4 } }, 
        'bluemountainlodgebooking@gmail.com'
      ),
      e(Text, { style: { fontSize: 9, marginBottom: 2 } }, 'Phone:'),
      e(Text, { style: { fontSize: 8 } }, '(540) 635-0922')
    ),
    
    // What's included box
    e(InfoBox, { title: "What's Included" },
      e(Text, { style: { fontSize: 9 } }, '• Tables and chairs'),
      e(Text, { style: { fontSize: 9 } }, '• Full kitchen'),
      e(Text, { style: { fontSize: 9 } }, '• Restrooms'),
      e(Text, { style: { fontSize: 9 } }, '• Heating/cooling'),
      e(Text, { style: { fontSize: 9 } }, '• Sound system'),
      e(Text, { style: { fontSize: 9 } }, '• Outdoor deck')
    )
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    // Header
    e(View, { style: styles.pageHeader },
      e(Text, { style: styles.pageTitle }, 'THE LODGE'),
      e(Text, { style: styles.pageSubtitle }, 
        'Your community gathering place at Deer Lake'
      )
    ),
    
    // Two-column layout
    e(TwoColumnLayout, { sidebarContent },
      // Main content
      e(View, null,
        // Overview with inline info
        e(CompactSubsectionHeader, null, 'Overview'),
        e(DenseText, null,
          'The Blue Mountain Lodge is our premier community facility, offering a beautiful venue for gatherings, celebrations, and meetings. Located on the shores of Deer Lake with stunning mountain views, the Lodge provides an ideal setting for any event.'
        ),
        
        // Inline property info
        e(InlineInfo, {
          items: [
            { label: 'Size', value: '2,400 sq ft' },
            { label: 'Kitchen', value: 'Commercial grade' },
            { label: 'Deck', value: '800 sq ft' }
          ]
        }),
        
        // Amenities in two columns
        e(CompactSubsectionHeader, null, 'Amenities & Features'),
        e(TwoColumnList, {
          items: [
            'Panoramic lake views',
            'Commercial kitchen with appliances',
            'Tables for 60 guests',
            'Stackable chairs (60)',
            'Handicap accessible',
            'Ample parking',
            'Outdoor deck with seating',
            'Central heat and air',
            'Audio/visual equipment',
            'Free WiFi internet'
          ]
        }),
        
        // Compact pricing table
        e(CompactSubsectionHeader, null, 'Rental Pricing'),
        e(CompactTable, {
          headers: ['Rental Option', 'Duration', 'Member Rate', 'Deposit'],
          rows: [
            ['Half Day', '4 hours', '$150', '$200'],
            ['Full Day', '8 hours', '$250', '$200'],
            ['Evening (after 5pm)', '5 hours', '$175', '$200'],
            ['Weekend Package', '2 days', '$400', '$300'],
            ['Additional Hour', 'Per hour', '$40', 'N/A']
          ]
        }),
        
        // Important callout
        e(View, { style: styles.calloutBox },
          e(Text, { style: { fontSize: 10, fontWeight: 'bold', marginBottom: 4 } }, 
            'Important Rental Information'
          ),
          e(Text, { style: { fontSize: 9 } },
            'All rentals require a signed agreement and are subject to availability. Security deposit is refundable pending inspection. BMPOA members in good standing receive priority booking and member rates.'
          )
        ),
        
        // Rental process
        e(CompactSubsectionHeader, null, 'How to Reserve'),
        e(View, { style: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 } },
          e(Text, { style: { fontSize: 9, marginRight: 8 } }, '1. Check availability'),
          e(Text, { style: { fontSize: 9, marginRight: 8 } }, '→ 2. Submit request'),
          e(Text, { style: { fontSize: 9, marginRight: 8 } }, '→ 3. Sign agreement'),
          e(Text, { style: { fontSize: 9, marginRight: 8 } }, '→ 4. Pay deposit'),
          e(Text, { style: { fontSize: 9 } }, '→ 5. Receive confirmation')
        ),
        
        // Rules summary
        e(CompactSubsectionHeader, null, 'Key Rules'),
        e(InlineInfo, {
          items: [
            { label: 'Quiet hours', value: 'After 10 PM' },
            { label: 'Max capacity', value: '60 people' },
            { label: 'Alcohol', value: 'Permitted' }
          ]
        }),
        e(DenseText, null,
          'Renters are responsible for setup, cleanup, and any damages. No smoking inside. Decorations must not damage walls. All trash must be removed. See full rental agreement for complete terms.'
        )
      )
    ),
    
    // Footer
    e(Text, { style: styles.footer }, 
      'BMPOA Community Guide • The Lodge • Page ' + (pageNumberMap?.lodge || 'X')
    )
  );
}