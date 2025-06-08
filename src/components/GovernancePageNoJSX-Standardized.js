import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { standardStyles, colors, typography, layoutStyles } from '../standardizedStyles.js';
import { 
  InfoBox, 
  SidebarBox, 
  QuickFactsBox, 
  ChecklistBox,
  RequirementsBox,
  CalloutBox
} from './StandardizedBoxes.js';
import { EnhancedTable, ContactTable } from './EnhancedTable.js';
import { PageFooter } from './EnhancedFooter.js';
import { ContentImage } from './EnhancedImage.js';
import SectionDividerEnhanced from './SectionDividerEnhanced.js';

// Component-specific styles
const governanceStyles = StyleSheet.create({
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
  
  missionBox: {
    ...standardStyles.standard,
    backgroundColor: colors.lightGray,
    borderLeft: `4px solid ${colors.secondary}`,
    borderRadius: 0,
    marginVertical: layoutStyles.spacing.lg,
    paddingLeft: 16,
  },
});

export default function GovernancePageNoJSXStandardized({ pageNumberMap = {} }) {
  const e = React.createElement;

  // Sidebar content for page 1
  const governanceSidebar = [
    e(QuickFactsBox, {
      key: 'gov-facts',
      facts: [
        { label: 'Founded', value: '1998' },
        { label: 'Properties', value: '450+' },
        { label: 'Board Size', value: '9 members' },
        { label: 'Terms', value: '3 years' },
        { label: 'Meetings', value: 'Monthly' }
      ]
    }),
    
    e(SidebarBox, {
      key: 'contact-board',
      type: 'info',
      icon: '📧',
      title: 'CONTACT BOARD',
      content: [
        'Email: board@bmpoa.org',
        'Mail: P.O. Box 114',
        'Linden, VA 22642',
        '',
        'Meeting Schedule:',
        '3rd Saturday monthly',
        '10:00 AM at Lodge'
      ]
    }),
    
    e(SidebarBox, {
      key: 'get-involved',
      type: 'success',
      icon: '🤝',
      title: 'GET INVOLVED',
      content: [
        'Attend board meetings',
        'Join a committee',
        'Volunteer for events',
        'Run for board position',
        'Share your expertise'
      ]
    })
  ];

  // Sidebar content for page 2
  const structureSidebar = [
    e(RequirementsBox, {
      key: 'voting-req',
      title: 'VOTING ELIGIBILITY',
      items: [
        'Property owner in good standing',
        'Current on all assessments',
        'One vote per property',
        'Proxy voting allowed'
      ],
      numbered: false
    }),
    
    e(SidebarBox, {
      key: 'committees',
      type: 'info',
      icon: '👥',
      title: 'COMMITTEES',
      content: [
        'Architectural Review',
        'Roads & Maintenance',
        'Emergency Preparedness',
        'Social & Recreation',
        'Finance & Budget',
        'Communications'
      ]
    })
  ];

  return [
    // Section Divider
    e(SectionDividerEnhanced, {
      key: 'gov-divider',
      number: '01',
      title: 'GOVERNANCE',
      description: 'Board structure, voting rights, and community leadership',
      sectionKey: 'governance',
      overlayOpacity: 0.35
    }),

    // Page 1: Overview
    e(Page, { key: 'gov-1', size: 'LETTER', style: governanceStyles.page },
      e(View, { style: governanceStyles.twoColumn },
        // Main content
        e(View, { style: governanceStyles.mainColumn },
          e(Text, { style: standardStyles.h1 }, 'GOVERNANCE & STRUCTURE'),
          
          e(Text, { style: standardStyles.h2 }, 'Our Mission'),
          
          e(View, { style: governanceStyles.missionBox },
            e(Text, { style: standardStyles.bodyLarge },
              'To preserve and enhance the natural beauty, property values, and quality of life in the Blue Mountain community through responsible governance, transparent communication, and active member participation.'
            )
          ),

          e(Text, { style: standardStyles.h2 }, 'What We Do'),
          
          e(ChecklistBox, {
            title: 'CORE RESPONSIBILITIES',
            items: [
              'Maintain private roads and common areas',
              'Manage community amenities (Lodge, Deer Lake)',
              'Enforce covenants and architectural standards',
              'Coordinate emergency preparedness',
              'Organize community events and communications',
              'Collect assessments and manage finances',
              'Represent owners in county matters'
            ]
          }),

          e(Text, { style: standardStyles.h3 }, 'Sanitary District'),
          
          e(Text, { style: standardStyles.body },
            'BMPOA works closely with the Blue Mountain Sanitary District, a separate entity managing water and sewer services. While independent, we coordinate on infrastructure projects affecting both organizations.'
          ),
          
          e(InfoBox, {
            type: 'info',
            icon: '💧',
            title: 'SANITARY DISTRICT CONTACT',
            content: 'Call (540) 635-7900 for water/sewer issues'
          })
        ),
        
        // Sidebar
        e(View, { style: governanceStyles.sidebarColumn }, ...governanceSidebar)
      ),
      
      e(PageFooter, { pageNumber: pageNumberMap['governance'] || '—' })
    ),

    // Page 2: Structure & Voting
    e(Page, { key: 'gov-2', size: 'LETTER', style: governanceStyles.page },
      e(View, { style: governanceStyles.twoColumn },
        // Main content
        e(View, { style: governanceStyles.mainColumn },
          e(Text, { style: standardStyles.h2 }, 'Board Structure'),
          
          e(EnhancedTable, {
            headers: ['Position', 'Term', 'Responsibilities'],
            rows: [
              ['President', '3 years', 'Lead meetings, represent BMPOA'],
              ['Vice President', '3 years', 'Assist president, chair committees'],
              ['Secretary', '3 years', 'Meeting minutes, correspondence'],
              ['Treasurer', '3 years', 'Financial management, reporting'],
              ['Directors (5)', '3 years', 'Committee participation, voting']
            ],
            caption: 'Board positions are elected by property owners',
            columnWidths: [{ width: '30%' }, { width: '20%' }, { width: '50%' }]
          }),

          e(Text, { style: standardStyles.h2 }, 'Your Voting Rights'),
          
          e(Text, { style: standardStyles.body },
            'Every property owner has important voting rights that shape our community\'s future. Your participation ensures decisions reflect the collective will of residents.'
          ),
          
          e(CalloutBox, {
            type: 'info',
            icon: '🗳️',
            title: 'ANNUAL ELECTIONS',
            content: 'Board elections occur each October at the Annual Meeting. Three positions rotate yearly, ensuring continuity while bringing fresh perspectives.'
          }),
          
          e(Text, { style: standardStyles.h3 }, 'How to Vote'),
          
          e(ChecklistBox, {
            title: 'VOTING PROCESS',
            items: [
              'Receive ballot by mail 30 days before election',
              'Vote in person at Annual Meeting',
              'Submit absentee ballot by mail',
              'Assign proxy to another owner if needed',
              'Results announced at meeting conclusion'
            ],
            type: 'success'
          })
        ),
        
        // Sidebar
        e(View, { style: governanceStyles.sidebarColumn }, ...structureSidebar)
      ),
      
      e(PageFooter, { pageNumber: (pageNumberMap['governance'] || 0) + 1 })
    )
  ];
}