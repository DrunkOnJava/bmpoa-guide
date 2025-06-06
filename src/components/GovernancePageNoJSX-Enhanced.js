import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing, typography } from '../theme.js';
import { 
  PageFooterNoJSX, 
  SectionBannerNoJSX,
  CalloutBoxNoJSX,
  TwoColumnLayoutNoJSX 
} from './DesignComponents.js';
import SectionDivider from './SectionDivider.js';

export default function GovernancePageNoJSXEnhanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // No need for custom styles - using standardized SectionDivider component

  // Return array of pages
  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '01',
      title: 'GOVERNANCE & STRUCTURE',
      description: 'Understanding how our mountain community is organized and governed'
    }),
    
    // BMPOA Overview Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      // Section Banner
      e(SectionBannerNoJSX, {
        number: 'SECTION 1',
        title: 'GOVERNANCE & STRUCTURE',
        subtitle: 'Understanding how our mountain community is organized and governed'
      }),
      
      // Two-column layout
      e(TwoColumnLayoutNoJSX, {
        gutter: 21.6, // 0.3 inch gutter
        left: e(
          View,
          null,
          e(Text, { style: styles.h1 }, 'BMPOA OVERVIEW'),
          e(Text, { style: styles.paragraph }, 
            'The Blue Mountain Property Owners Association (BMPOA) is your voice in maintaining and improving our mountain community. Established in 1975, the Association serves all property owners within the Blue Mountain Subdivision in Warren County, Virginia.'
          ),
          
          e(Text, { style: styles.h2 }, 'PURPOSE & MISSION'),
          e(
            CalloutBoxNoJSX,
            { type: 'info' },
            e(Text, { style: { fontWeight: 'bold', fontSize: 12, marginBottom: spacing.xs } }, 'BMPOA Mission:'),
            e(View, { style: styles.bulletList },
              ['Promote the health, safety, and general welfare of its members',
               'Preserve the natural beauty of the subdivision',
               'Maintain roads and common areas',
               'Protect property values',
               'Foster a sense of community among residents',
               'Provide information and resources to property owners'
              ].map((item, idx) => 
                e(Text, { key: idx, style: styles.bulletItem }, `• ${item}`)
              )
            )
          ),
          
          e(Text, { style: styles.h2 }, 'LEGAL STATUS'),
          e(Text, { style: styles.paragraph }, 
            'The BMPOA is a Virginia non-stock corporation formed under state law. We operate as the managing agent for the Blue Mountain Sanitary District, which provides funding for our operations through a special tax assessment collected with your property taxes.'
          )
        ),
        right: e(
          View,
          null,
          e(
            CalloutBoxNoJSX,
            { title: 'YOUR RELATIONSHIP WITH BMPOA', type: 'info' },
            e(Text, null, 
              'As a Blue Mountain property owner, you are automatically a member of the Association. There are no additional dues required for membership, as community maintenance and services are funded through the Blue Mountain Sanitary District tax, which is collected with your Warren County property taxes.'
            )
          ),
          
          e(Text, { style: styles.h2 }, 'MANAGEMENT STRUCTURE'),
          e(Text, { style: styles.paragraph }, 
            'The BMPOA is managed by an elected Board of Officers and Directors who volunteer their time to serve the community.'
          ),
          e(Text, { style: { fontWeight: 'bold', marginTop: spacing.sm } }, 'The Board consists of:'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Five Officers:'),
            e(View, { style: { paddingLeft: spacing.md } },
              e(Text, { style: styles.bulletItem }, '- President'),
              e(Text, { style: styles.bulletItem }, '- First Vice President'),
              e(Text, { style: styles.bulletItem }, '- Second Vice President'),
              e(Text, { style: styles.bulletItem }, '- Secretary'),
              e(Text, { style: styles.bulletItem }, '- Treasurer')
            ),
            e(Text, { style: styles.bulletItem }, '• Four Directors-at-Large')
          ),
          e(Text, { style: [styles.paragraph, { marginTop: spacing.sm }] }, 
            'All Board members are Blue Mountain property owners elected at the Annual Meeting for two-year terms.'
          )
        )
      }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 4 })
    ),

    // Sanitary District Page 1
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      e(Text, { style: styles.h1 }, 'SANITARY DISTRICT EXPLAINED'),
      
      e(TwoColumnLayoutNoJSX, {
        gutter: 21.6, // 0.3 inch gutter
        left: e(
          View,
          null,
          e(Text, { style: styles.paragraph },
            'One of the most important aspects of Blue Mountain\'s governance is its designation as a Sanitary District. This special status provides significant benefits to our community and is essential to understand as a property owner.'
          ),
          
          e(Text, { style: styles.h2 }, 'WHAT IS A SANITARY DISTRICT?'),
          e(Text, { style: styles.paragraph },
            'A Sanitary District is a special taxing district allowed by the Code of Virginia. It provides a mechanism for communities like ours to fund necessary infrastructure and services through a dedicated tax assessment on properties within the district.'
          ),
          
          e(
            CalloutBoxNoJSX,
            { title: 'Key Benefit', type: 'tip' },
            e(Text, null, 
              'Our Sanitary District status ensures that all property owners, including developers, contribute fairly to the maintenance of our roads and community assets.'
            )
          ),
          
          e(Text, { style: styles.h2 }, 'BLUE MOUNTAIN SANITARY DISTRICT'),
          e(Text, { style: styles.paragraph },
            'The Blue Mountain Subdivision Sanitary District was created by Order of the Circuit Court of Warren County. By agreement with the Warren County Board of Supervisors, the BMPOA Executive Board serves as the managing agent of the Sanitary District.'
          )
        ),
        right: e(
          View,
          null,
          e(
            CalloutBoxNoJSX,
            { title: 'KEY BENEFITS', type: 'info' },
            e(Text, { style: { marginBottom: spacing.sm } }, 'Our Sanitary District status provides numerous advantages:'),
            e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, 
              '• Uniform Funding: Establishes consistent fees throughout the entire subdivision'
            ),
            e(Text, { style: styles.bulletItem }, 
              '• Reliable Collection: Taxes are collected by the Warren County Treasurer\'s Office, ensuring a high collection rate'
            ),
            e(Text, { style: styles.bulletItem }, 
              '• Tax Deductibility: Sanitary district taxes may be deductible on federal income tax returns (consult your tax advisor)'
            ),
            e(Text, { style: styles.bulletItem }, 
              '• Universal Participation: All lots, including those owned by developers, are subject to the tax'
            ),
            e(Text, { style: styles.bulletItem }, 
              '• Property Value Protection: Unpaid taxes must be satisfied before property sales'
            ),
            e(Text, { style: styles.bulletItem }, 
              '• Disaster Relief Eligibility: Qualifies the community for various state and federal disaster relief funds'
            ),
            e(Text, { style: styles.bulletItem }, 
              '• Private Road Protection: Does not affect the privacy of our roads or other amenities'
            )
            )
          )
        )
      }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 5 })
    ),

    // Sanitary District Page 2
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      e(Text, { style: [styles.h1, { marginBottom: spacing.lg }] }, 
        'SANITARY DISTRICT EXPLAINED (Continued)'
      ),
      
      e(TwoColumnLayoutNoJSX, {
        gutter: 21.6, // 0.3 inch gutter
        left: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'HOW THE SANITARY DISTRICT WORKS'),
          e(Text, { style: styles.paragraph },
            'The BMPOA Board develops an annual budget for maintaining community assets, particularly our extensive road network. This budget and a proposed tax rate are presented to the Warren County Board of Supervisors for approval. Once approved, the tax is collected with your regular property tax bill.'
          ),
          
          e(Text, { style: styles.h2 }, 'WHAT THE TAX FUNDS'),
          e(Text, { style: styles.paragraph },
            'The primary focus of our Sanitary District funding is road maintenance and snow removal for our extensive network of private roads.'
          ),
          e(Text, { style: { fontWeight: 'bold', marginTop: spacing.sm } }, 
            'Additional responsibilities may include:'
          ),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Maintenance of drainage systems'),
            e(Text, { style: styles.bulletItem }, '• Management of community recreation areas'),
            e(Text, { style: styles.bulletItem }, '• Fire safety initiatives like the wood-chipping program'),
            e(Text, { style: styles.bulletItem }, '• Other infrastructure improvements as budgeted')
          )
        ),
        right: e(
          View,
          null,
          e(
            CalloutBoxNoJSX,
            { title: 'IMPORTANT NOTE', type: 'legal' },
            e(Text, null, 
              'The Sanitary District tax is separate from any property taxes assessed by Warren County. The tax appears as a line item on your property tax bill and is collected along with your regular county taxes.'
            )
          ),
          
          e(Text, { style: styles.h2 }, 'BUDGET PROCESS'),
          e(Text, { style: styles.paragraph },
            'Each year, the BMPOA Board:'
          ),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '1. Assesses road conditions and maintenance needs'),
            e(Text, { style: styles.bulletItem }, '2. Develops a comprehensive budget'),
            e(Text, { style: styles.bulletItem }, '3. Presents the budget at the Annual Meeting'),
            e(Text, { style: styles.bulletItem }, '4. Submits to Warren County for approval'),
            e(Text, { style: styles.bulletItem }, '5. Publishes the approved budget to all property owners')
          ),
          
          e(Text, { style: [styles.paragraph, { marginTop: spacing.md }] },
            'This transparent process ensures that all property owners understand how their tax dollars are being used to maintain and improve our community.'
          )
        )
      }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 6 })
    )
  ];
}