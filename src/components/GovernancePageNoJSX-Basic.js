import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../theme.js';

export default function GovernancePageNoJSXBasic({ pageNumberMap = {} }) {
  const e = React.createElement;

  return e(
    Page,
    { size: 'LETTER', style: styles.page },
    e(
      View,
      { style: styles.pageHeader },
      e(Text, { style: styles.pageTitle }, 'GOVERNANCE & STRUCTURE')
    ),
    e(
      View,
      { style: { padding: 20, fontSize: 10 } },
      e(Text, { style: styles.h2 }, 'BMPOA OVERVIEW'),
      e(Text, { style: { marginBottom: 12, textAlign: 'justify', lineHeight: 1.4 } }, 
        'The Blue Mountain Property Owners Association (BMPOA) is your voice in maintaining and improving our mountain community. Established in 1975, the Association serves all property owners within the Blue Mountain Subdivision in Warren County, Virginia.'
      ),
      
      e(Text, { style: { ...styles.h3, marginTop: 16, marginBottom: 8 } }, 'BMPOA MISSION'),
      e(Text, { style: { marginBottom: 12, textAlign: 'justify', lineHeight: 1.4 } },
        '• Promote the health, safety, and general welfare of its members\n' +
        '• Preserve the natural beauty of the subdivision\n' +
        '• Maintain roads and common areas\n' +
        '• Protect property values\n' +
        '• Foster a sense of community among residents\n' +
        '• Provide information and resources to property owners'
      ),

      e(Text, { style: { ...styles.h3, marginTop: 16, marginBottom: 8 } }, 'LEGAL STATUS'),
      e(Text, { style: { marginBottom: 12, textAlign: 'justify', lineHeight: 1.4 } },
        'The BMPOA is a Virginia non-stock corporation formed under state law. We operate as the managing agent for the Blue Mountain Sanitary District, which provides funding for our operations through a special tax assessment collected with your property taxes.'
      ),

      e(Text, { style: { ...styles.h3, marginTop: 16, marginBottom: 8 } }, 'BOARD STRUCTURE'),
      e(Text, { style: { marginBottom: 8, fontWeight: 'bold' } }, 'Board Officers:'),
      e(Text, { style: { marginBottom: 12, lineHeight: 1.4 } },
        '• President • First Vice President • Second Vice President\n' +
        '• Secretary • Treasurer • Plus 4 Directors-at-Large\n\n' +
        'Terms: 2 years | Elections: Annual Meeting | Board Size: 9 members'
      ),

      e(Text, { style: { ...styles.h3, marginTop: 16, marginBottom: 8 } }, 'YOUR MEMBERSHIP'),
      e(Text, { style: { marginBottom: 12, textAlign: 'justify', lineHeight: 1.4 } },
        'As a Blue Mountain property owner, you are automatically a member of the Association. No additional dues required - community services are funded through the Sanitary District tax collected with your property taxes.'
      ),

      e(Text, { style: { ...styles.h3, marginTop: 16, marginBottom: 8 } }, 'SANITARY DISTRICT BENEFITS'),
      e(Text, { style: { textAlign: 'justify', lineHeight: 1.4 } },
        'Our Sanitary District status ensures that all property owners, including developers, contribute fairly to community maintenance. Taxes are collected reliably by Warren County, may be tax-deductible, and qualify us for disaster relief funds.'
      )
    ),
    e(
      View,
      { style: styles.pageFooter },
      e(Text, null, 'BMPOA Community Guide'),
      e(Text, null, pageNumberMap.governance || '4'),
      e(Text, null, 'www.bmpoa.org')
    )
  );
}