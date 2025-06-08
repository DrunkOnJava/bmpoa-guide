import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { standardStyles, layoutStyles } from '../standardizedStyles.js';
import { 
  InfoBox, 
  SidebarBox, 
  QuickFactsBox, 
  ChecklistBox,
  RequirementsBox,
  CalloutBox,
  AlertBox
} from './StandardizedBoxes.js';
import { EnhancedTable, RequirementsTable } from './EnhancedTable.js';
import { PageFooter } from './EnhancedFooter.js';
import { ContentImage } from './EnhancedImage.js';
import SectionDividerEnhanced from './SectionDividerEnhanced.js';

// Component-specific styles
const constructionStyles = StyleSheet.create({
  page: {
    ...standardStyles.page,
    position: 'relative',
  },
  
  twoColumn: {
    ...layoutStyles.twoColumn,
    minHeight: '100%',
  },
  
  mainColumn: {
    ...layoutStyles.mainColumn,
  },
  
  sidebarColumn: {
    ...layoutStyles.sidebarColumn,
  },
  
  processBox: {
    backgroundColor: colors.lightGray,
    borderRadius: callout.radius,
    padding: layoutStyles.spacing.md,
    marginVertical: layoutStyles.spacing.md,
  },
  
  processStep: {
    flexDirection: 'row',
    marginBottom: layoutStyles.spacing.sm,
    wrap: false,
  },
  
  stepNumber: {
    width: 30,
    fontSize: typography.body,
    fontFamily: typography.families.heading,
    color: colors.primary,
  },
  
  stepText: {
    flex: 1,
    fontSize: typography.body,
    lineHeight: typography.bodyLineHeight,
  },
  
  riskItem: {
    flexDirection: 'row',
    marginBottom: layoutStyles.spacing.sm,
    paddingLeft: layoutStyles.spacing.md,
  },
  
  riskLevel: {
    width: 60,
    fontSize: typography.sizes.sm,
    fontFamily: typography.families.heading,
    marginRight: 8,
  },
  
  riskHigh: { color: colors.danger },
  riskMedium: { color: colors.warning },
  riskLow: { color: colors.success },
});

export default function ConstructionPageNoJSXStandardized({ pageNumberMap = {} }) {
  const e = React.createElement;

  // Sidebar content for approval page
  const approvalSidebar = [
    e(AlertBox, {
      key: 'arc-required',
      title: 'ARC APPROVAL REQUIRED',
      content: 'All exterior work requires ARC approval BEFORE beginning. Failure to obtain approval may result in fines and required removal of non-compliant work.',
      type: 'danger'
    }),
    
    e(QuickFactsBox, {
      key: 'arc-facts',
      title: 'ARC PROCESS',
      facts: [
        { label: 'Submit', value: '30 days before' },
        { label: 'Review', value: '30 days max' },
        { label: 'Approval', value: '1 year valid' },
        { label: 'Extensions', value: 'Available' },
        { label: 'Fee', value: 'None' }
      ]
    }),
    
    e(InfoBox, {
      key: 'arc-contact',
      type: 'info',
      icon: '📋',
      title: 'SUBMIT TO ARC',
      content: [
        'Email: arc@bmpoa.org',
        'Mail: BMPOA ARC',
        'P.O. Box 114',
        'Linden, VA 22642',
        '',
        'Include all required documents'
      ]
    })
  ];

  // Sidebar content for compliance page
  const complianceSidebar = [
    e(SidebarBox, {
      key: 'county-permits',
      type: 'warning',
      icon: '⚠️',
      title: 'COUNTY PERMITS',
      content: 'Warren County building permits required for most construction. Apply AFTER ARC approval. Call (540) 635-2180 for requirements.'
    }),
    
    e(InfoBox, {
      key: 'inspections',
      type: 'info',
      icon: '🔍',
      title: 'INSPECTIONS',
      content: [
        'Foundation',
        'Framing',
        'Electrical',
        'Plumbing',
        'Insulation',
        'Final',
        '',
        'Schedule: (540) 635-2180'
      ]
    }),
    
    e(InfoBox, {
      key: 'contractors',
      type: 'info',
      icon: '🔨',
      title: 'CONTRACTORS',
      content: [
        'Must be licensed',
        'Insurance required',
        'Follow ARC approval',
        'Respect neighbors',
        'Clean job sites daily'
      ]
    })
  ];

  return [
    // Section Divider
    e(SectionDividerEnhanced, {
      key: 'construction-divider',
      number: '11',
      title: 'CONSTRUCTION',
      description: 'Building guidelines, approval process, and compliance requirements',
      sectionKey: 'construction',
      overlayOpacity: 0.45
    }),

    // Page 1: Approval Process
    e(Page, { key: 'construction-1', size: 'LETTER', style: constructionStyles.page },
      e(View, { style: constructionStyles.twoColumn },
        // Main content
        e(View, { style: constructionStyles.mainColumn },
          e(Text, { style: standardStyles.h1 }, 'CONSTRUCTION GUIDELINES'),
          
          e(Text, { style: standardStyles.h2 }, 'Building in Blue Mountain'),
          
          e(Text, { style: standardStyles.body },
            'All construction projects require Architectural Review Committee (ARC) approval BEFORE any work begins. This ensures projects maintain community standards, protect property values, and comply with covenants.'
          ),

          e(Text, { style: standardStyles.h3 }, 'What Requires Approval'),
          
          e(ChecklistBox, {
            title: 'PROJECTS REQUIRING ARC REVIEW',
            items: [
              'New home construction',
              'Additions to existing homes',
              'Outbuildings (sheds, garages)',
              'Decks, patios, porches',
              'Fencing and walls',
              'Driveways and parking areas',
              'Major landscaping changes',
              'Exterior color changes',
              'Solar panel installations',
              'Pool/hot tub installations'
            ],
            type: 'warning'
          }),

          e(Text, { style: standardStyles.h3 }, 'Submission Requirements'),
          
          e(RequirementsBox, {
            title: 'REQUIRED DOCUMENTS',
            items: [
              'Completed ARC application form',
              'Site plan showing all structures and setbacks',
              'Building plans and elevations',
              'Material specifications and colors',
              'Contractor information and timeline',
              'Neighbor notification (if required)'
            ]
          }),

          e(Text, { style: standardStyles.h3 }, 'Design Standards'),
          
          e(EnhancedTable, {
            headers: ['Element', 'Requirement'],
            rows: [
              ['Setbacks', '25ft sides/rear, varies front'],
              ['Height', '35 feet maximum'],
              ['Colors', 'Earth tones preferred'],
              ['Roofing', 'Architectural shingles min'],
              ['Siding', 'Natural materials encouraged']
            ],
            columnWidths: [{ width: '40%' }, { width: '60%' }],
            compact: true
          })
        ),
        
        // Sidebar
        e(View, { style: constructionStyles.sidebarColumn }, ...approvalSidebar)
      ),
      
      e(PageFooter, { pageNumber: pageNumberMap['construction'] || '—' })
    ),

    // Page 2: Process & Timeline
    e(Page, { key: 'construction-2', size: 'LETTER', style: constructionStyles.page },
      e(View, { style: constructionStyles.twoColumn },
        // Main content
        e(View, { style: constructionStyles.mainColumn },
          e(Text, { style: standardStyles.h2 }, 'Approval Timeline'),
          
          e(View, { style: constructionStyles.processBox },
            e(View, { style: constructionStyles.processStep },
              e(Text, { style: constructionStyles.stepNumber }, '1.'),
              e(Text, { style: constructionStyles.stepText }, 
                'Submit complete application 30+ days before planned start')
            ),
            e(View, { style: constructionStyles.processStep },
              e(Text, { style: constructionStyles.stepNumber }, '2.'),
              e(Text, { style: constructionStyles.stepText }, 
                'ARC reviews within 30 days (may request additional info)')
            ),
            e(View, { style: constructionStyles.processStep },
              e(Text, { style: constructionStyles.stepNumber }, '3.'),
              e(Text, { style: constructionStyles.stepText }, 
                'Receive written approval with any conditions')
            ),
            e(View, { style: constructionStyles.processStep },
              e(Text, { style: constructionStyles.stepNumber }, '4.'),
              e(Text, { style: constructionStyles.stepText }, 
                'Approval valid for 1 year (extensions available)')
            )
          ),

          e(Text, { style: standardStyles.h2 }, 'Construction Process'),
          
          e(ChecklistBox, {
            title: 'STEP-BY-STEP GUIDE',
            items: [
              'Submit ARC application with all documents',
              'Receive ARC approval letter',
              'Apply for Warren County permits',
              'Schedule pre-construction meeting if required',
              'Begin construction per approved plans',
              'Schedule required county inspections',
              'Complete project within approval timeframe',
              'Obtain final county inspections',
              'Notify ARC of project completion'
            ],
            type: 'success'
          }),

          e(Text, { style: standardStyles.h3 }, 'During Construction'),
          
          e(Text, { style: standardStyles.body },
            'Maintain a clean, safe job site. Control erosion and runoff. Limit work hours to minimize neighbor disruption. Ensure all workers follow community rules including speed limits.'
          ),

          e(EnhancedTable, {
            headers: ['Requirement', 'Details'],
            rows: [
              ['Work Hours', '7 AM - 6 PM Monday-Friday, 8 AM - 5 PM Saturday'],
              ['Sunday Work', 'Prohibited except emergencies'],
              ['Noise Limits', 'Follow county ordinances'],
              ['Debris', 'Remove regularly, no burning'],
              ['Parking', 'On-site only, not on roads']
            ],
            caption: 'Construction site requirements',
            compact: true
          })
        ),
        
        // Sidebar
        e(View, { style: constructionStyles.sidebarColumn }, ...complianceSidebar)
      ),
      
      e(PageFooter, { pageNumber: (pageNumberMap['construction'] || 0) + 1 })
    ),

    // Page 3: Compliance & Enforcement
    e(Page, { key: 'construction-3', size: 'LETTER', style: constructionStyles.page },
      e(View, { style: constructionStyles.twoColumn },
        // Main content
        e(View, { style: constructionStyles.mainColumn },
          e(Text, { style: standardStyles.h2 }, 'Common Violations to Avoid'),
          
          e(View, { style: { marginBottom: layoutStyles.spacing.lg } },
            e(View, { style: constructionStyles.riskItem },
              e(Text, { style: [constructionStyles.riskLevel, constructionStyles.riskHigh] }, 'HIGH'),
              e(Text, { style: constructionStyles.stepText }, 'Starting work without ARC approval')
            ),
            e(View, { style: constructionStyles.riskItem },
              e(Text, { style: [constructionStyles.riskLevel, constructionStyles.riskHigh] }, 'HIGH'),
              e(Text, { style: constructionStyles.stepText }, 'Deviating from approved plans without permission')
            ),
            e(View, { style: constructionStyles.riskItem },
              e(Text, { style: [constructionStyles.riskLevel, constructionStyles.riskMedium] }, 'MEDIUM'),
              e(Text, { style: constructionStyles.stepText }, 'Missing required county inspections')
            ),
            e(View, { style: constructionStyles.riskItem },
              e(Text, { style: [constructionStyles.riskLevel, constructionStyles.riskMedium] }, 'MEDIUM'),
              e(Text, { style: constructionStyles.stepText }, 'Exceeding height or setback limits')
            ),
            e(View, { style: constructionStyles.riskItem },
              e(Text, { style: [constructionStyles.riskLevel, constructionStyles.riskLow] }, 'LOW'),
              e(Text, { style: constructionStyles.stepText }, 'Minor color variations from approved samples')
            )
          ),

          e(CalloutBox, {
            type: 'danger',
            icon: '🚨',
            title: 'ENFORCEMENT ACTIONS',
            content: 'The ARC conducts periodic inspections. Non-compliance may result in stop-work orders, fines up to $50/day, and required corrections at owner expense. Serious violations may lead to legal action.'
          }),

          e(Text, { style: standardStyles.h2 }, 'Getting Help'),
          
          e(Text, { style: standardStyles.body },
            'The ARC is here to help you navigate the approval process. Contact us early in your planning for guidance on requirements and design standards.'
          ),
          
          e(InfoBox, {
            type: 'success',
            icon: '💡',
            title: 'TIPS FOR SUCCESS',
            content: [
              'Review covenants before planning',
              'Look at recently approved projects',
              'Submit complete applications',
              'Communicate with neighbors early',
              'Ask questions before starting'
            ]
          }),

          e(ContentImage, {
            src: 'Building1',
            title: 'Example of approved construction',
            figureNumber: '11.1',
            description: 'New home construction following BMPOA architectural guidelines'
          })
        ),
        
        // Sidebar
        e(View, { style: constructionStyles.sidebarColumn },
          e(RequirementsBox, {
            key: 'resources',
            title: 'RESOURCES',
            items: [
              'ARC Application Form',
              'Design Guidelines',
              'Approved Colors/Materials',
              'Site Plan Requirements',
              'Covenant Summary'
            ],
            numbered: false
          }),
          
          e(SidebarBox, {
            key: 'warren-county',
            type: 'info',
            icon: '🏛️',
            title: 'WARREN COUNTY',
            content: [
              'Building & Zoning',
              '220 N. Commerce Ave',
              'Front Royal, VA 22630',
              '',
              'Phone: (540) 635-2180',
              'Fax: (540) 635-1853'
            ]
          })
        )
      ),
      
      e(PageFooter, { pageNumber: (pageNumberMap['construction'] || 0) + 2 })
    )
  ];
}