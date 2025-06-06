import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { 
  PageHeaderNoJSX, 
  PageFooterNoJSX, 
  SectionBannerNoJSX,
  CalloutBoxNoJSX,
  TwoColumnLayoutNoJSX 
} from './DesignComponents.js';

export default function GovernancePageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const govStyles = StyleSheet.create({
    sectionDivider: {
      backgroundColor: colors.forestGreen,
      color: colors.white,
      padding: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
      marginTop: -54,
      marginHorizontal: -54,
      marginBottom: -54,
    },
    sectionNumber: {
      fontSize: 72,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: 36,
      fontFamily: 'Helvetica-Bold',
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    sectionDescription: {
      fontSize: typography.subtitle,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: typography.lineHeightRelaxed,
      fontStyle: 'italic',
      color: colors.white,
      opacity: 0.9,
    }
  });

  // Return array of pages
  return [
    // Section Divider Page
    e(
      Page,
      { size: 'LETTER' },
      e(
        View,
        { style: govStyles.sectionDivider },
        e(Text, { style: govStyles.sectionNumber }, '01'),
        e(Text, { style: govStyles.sectionTitle }, 'GOVERNANCE & STRUCTURE'),
        e(Text, { style: govStyles.sectionDescription }, 
          'Understanding how our mountain community is organized and governed is essential for all residents. This section explains the BMPOA\'s purpose, the Sanitary District, and how our association functions to serve all property owners.'
        )
      )
    ),
    
    // BMPOA Overview Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BMPOA OVERVIEW')
      ),
      e(
        View,
        null,
        e(Text, { style: govStyles.paragraph },
          'The Blue Mountain Property Owners Association (BMPOA) serves as the governing body for our mountain community. As a homeowner in Blue Mountain, you are automatically a member of this association, which is dedicated to preserving and enhancing our unique mountain lifestyle.'
        ),
        e(Text, { style: govStyles.h3 }, 'PURPOSE & MISSION'),
        e(Text, { style: govStyles.paragraph }, 'As outlined in our bylaws, the purpose of the BMPOA is:'),
        e(Text, { style: govStyles.listItem }, '• To promote the health, safety, and general welfare of its members'),
        e(Text, { style: govStyles.listItem }, '• To preserve the natural beauty of the subdivision and its environment'),
        e(Text, { style: govStyles.listItem }, '• To assist members with matters relating to both internal roads and public roads'),
        e(Text, { style: govStyles.listItem }, '• To oversee community recreation facilities'),
        e(Text, { style: govStyles.listItem }, '• To enforce the Covenants'),
        e(Text, { style: govStyles.listItem }, '• To assist members with federal, state, and local matters affecting their property'),
        
        e(Text, { style: govStyles.h3 }, 'LEGAL STATUS'),
        e(View, { style: { flexDirection: 'row', marginBottom: spacing.sm } },
          e(View, { style: { flex: 1, paddingRight: spacing.md } },
            e(Text, { style: govStyles.paragraph },
              'The BMPOA is a legally established non-profit organization incorporated under Virginia law. The Association operates according to its bylaws and the Blue Mountain Subdivision Declaration of Protective Covenants, Conditions & Restrictions, which run with the land and are binding on all property owners.'
            )
          ),
          e(Image, { 
            src: assetMap.VAFlag,
            style: { width: 100, height: 67, alignSelf: 'center' }
          })
        ),
        
        e(View, { style: govStyles.highlightBox },
          e(Text, { style: govStyles.highlightTitle }, 'YOUR RELATIONSHIP WITH BMPOA'),
          e(Text, null, 
            'As a Blue Mountain property owner, you are automatically a member of the Association. There are no additional dues required for membership, as community maintenance and services are funded through the Blue Mountain Sanitary District tax, which is collected with your Warren County property taxes.'
          )
        ),
        
        e(Text, { style: govStyles.h3 }, 'MANAGEMENT STRUCTURE'),
        e(Text, { style: govStyles.paragraph }, 
          'The BMPOA is managed by an elected Board of Officers and Directors who volunteer their time to serve the community. The Board consists of:'
        ),
        e(Text, { style: govStyles.listItem }, '• Five Officers (President, First Vice President, Second Vice President, Secretary, and Treasurer)'),
        e(Text, { style: govStyles.listItem }, '• Four Directors-at-Large'),
        e(Text, { style: govStyles.paragraph }, 
          'All Board members are Blue Mountain property owners elected at the Annual Meeting for two-year terms.'
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '4')
      )
    ),

    // Sanitary District Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'SANITARY DISTRICT EXPLAINED')
      ),
      e(
        View,
        null,
        e(Text, { style: govStyles.paragraph },
          'One of the most important aspects of Blue Mountain\'s governance is its designation as a Sanitary District. This special status provides significant benefits to our community and is essential to understand as a property owner.'
        ),
        
        e(Text, { style: govStyles.h3 }, 'WHAT IS A SANITARY DISTRICT?'),
        e(Text, { style: govStyles.paragraph },
          'A Sanitary District is a special taxing district allowed by the Code of Virginia. It provides a mechanism for communities like ours to fund necessary infrastructure and services through a dedicated tax assessment on properties within the district.'
        ),
        
        e(View, { style: govStyles.highlightBox },
          e(Text, { style: govStyles.highlightTitle }, 'Key Benefit'),
          e(Text, null, 
            'Our Sanitary District status ensures that all property owners, including developers, contribute fairly to the maintenance of our roads and community assets.'
          )
        ),
        
        e(Text, { style: govStyles.h3 }, 'BLUE MOUNTAIN SANITARY DISTRICT'),
        e(Text, { style: govStyles.paragraph },
          'The Blue Mountain Subdivision Sanitary District was created by Order of the Circuit Court of Warren County. By agreement with the Warren County Board of Supervisors, the BMPOA Executive Board serves as the managing agent of the Sanitary District.'
        ),
        
        e(Text, { style: govStyles.h3 }, 'KEY BENEFITS OF SANITARY DISTRICT STATUS'),
        e(Text, { style: govStyles.paragraph }, 'Our Sanitary District status provides numerous advantages:'),
        e(Text, { style: govStyles.listItem }, '• Uniform Funding: Establishes consistent fees throughout the entire subdivision'),
        e(Text, { style: govStyles.listItem }, '• Reliable Collection: Taxes are collected by the Warren County Treasurer\'s Office, ensuring a high collection rate'),
        e(Text, { style: govStyles.listItem }, '• Tax Deductibility: Sanitary district taxes may be deductible on federal income tax returns (consult your tax advisor)'),
        e(Text, { style: govStyles.listItem }, '• Universal Participation: All lots, including those owned by developers, are subject to the tax')
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '5')
      )
    ),

    // Sanitary District Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'SANITARY DISTRICT EXPLAINED'),
        e(Text, { style: { fontSize: 10, color: colors.lightText } }, '(Continued from previous page)')
      ),
      e(
        View,
        null,
        e(Text, { style: govStyles.paragraph }, 'Additional benefits of our Sanitary District status include:'),
        e(Text, { style: govStyles.listItem }, '• Property Value Protection: Unpaid taxes must be satisfied before property sales, protecting community resources'),
        e(Text, { style: govStyles.listItem }, '• Disaster Relief Eligibility: Qualifies the community for various state and federal disaster relief funds'),
        e(Text, { style: govStyles.listItem }, '• Private Road Protection: Sanitary district status does not affect the privacy of our roads or other amenities'),
        
        e(Text, { style: govStyles.h3 }, 'HOW THE SANITARY DISTRICT WORKS'),
        e(Text, { style: govStyles.paragraph },
          'The BMPOA Board develops an annual budget for maintaining community assets, particularly our extensive road network. This budget and a proposed tax rate are presented to the Warren County Board of Supervisors for approval. Once approved, the tax is collected with your regular property tax bill.'
        ),
        
        e(Text, { style: govStyles.h3 }, 'WHAT THE SANITARY DISTRICT TAX FUNDS'),
        e(Text, { style: govStyles.paragraph },
          'The primary focus of our Sanitary District funding is road maintenance and snow removal for our extensive network of private roads. Additional responsibilities may include:'
        ),
        e(Text, { style: govStyles.listItem }, '• Maintenance of drainage systems'),
        e(Text, { style: govStyles.listItem }, '• Management of community recreation areas'),
        e(Text, { style: govStyles.listItem }, '• Fire safety initiatives like the wood-chipping program'),
        e(Text, { style: govStyles.listItem }, '• Other infrastructure improvements as budgeted'),
        
        e(View, { style: govStyles.infoBox },
          e(Text, { style: govStyles.highlightTitle }, 'IMPORTANT NOTE'),
          e(Text, null, 
            'The Sanitary District tax is separate from any property taxes assessed by Warren County. The tax appears as a line item on your property tax bill and is collected along with your regular county taxes.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '6')
      )
    )
  ];
}