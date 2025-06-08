import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors } from '../theme.js';
import {
  DecorativeStars,
  ImageCaptionBox,
  FullWidthInfoBox,
  ChecklistBox,
  NumberedRequirements,
  SectionHeaderUnderlined,
  RiskLevelBox,
  ContactCard,
  BurnBanBox,
  MeetingPlaces,
  SeasonalInfo,
  SpecificationList
} from './ExtendedLayoutComponents.js';
import { 
  DenseText, 
  CompactSectionHeader,
  CompactSubsectionHeader 
} from './EnhancedLayoutComponents.js';

// Example 1: Emergency Planning Page
export function EmergencyPlanningPage() {
  const e = React.createElement;
  
  const evacuationChecklist = [
    'Identify two escape routes from each room',
    'Choose multiple evacuation routes from your neighborhood',
    'Establish meeting places: near your home and outside the area',
    'Designate an out-of-area contact person',
    'Plan for pets and livestock evacuation',
    'Prepare an emergency supply kit',
    'Create a home inventory with photos for insurance',
    'Identify special needs (elderly, disabled, children)'
  ];
  
  const meetingPlaces = [
    'Near your home for sudden evacuations',
    'Outside the subdivision for community evacuations'
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(SectionHeaderUnderlined, { title: 'FAMILY EMERGENCY PLANNING' }),
      
      e(DenseText, null,
        'Creating a family emergency plan specifically for wildfire events is essential for all Blue Mountain residents. This preparation can make all the difference during an evacuation situation.'
      ),
      
      e(CompactSubsectionHeader, null, 'DEVELOP YOUR EVACUATION PLAN'),
      
      e(DenseText, null, 'Your family\'s evacuation plan should be:'),
      
      e(SpecificationList, { items: [
        'Simple enough to be followed when under stress',
        'Detailed enough to cover key elements',
        'Understood by everyone residing in your home',
        'Practiced regularly to ensure familiarity',
        'Updated as your family situation changes'
      ]}),
      
      e(ChecklistBox, {
        title: 'FAMILY EVACUATION PLAN CHECKLIST',
        items: evacuationChecklist
      }),
      
      e(MeetingPlaces, {
        title: 'FAMILY MEETING PLACES',
        places: meetingPlaces
      })
    )
  );
}

// Example 2: Fire Safety Page with Risk Levels
export function FireSafetyRiskPage() {
  const e = React.createElement;
  
  const fireSeasons = [
    { label: 'Spring Fire Season', dates: 'February 15 - April 30' },
    { label: 'Fall Fire Season', dates: 'October 15 - November 30' }
  ];
  
  const preventionEfforts = [
    'Annual wood-chipping program to reduce fuel loads',
    'Community-wide evacuation planning',
    'Educational programs on defensible space',
    'Participation in the Firewise USA program'
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(SectionHeaderUnderlined, { title: 'WILDFIRE RISK UNDERSTANDING' }),
      
      e(DenseText, null,
        'Blue Mountain\'s wooded environment, while beautiful, presents significant wildfire risks that all community members should be aware of. Our location in a Wildland-Urban Interface (WUI) area means homes are interspersed with forests, increasing vulnerability to wildfires.'
      ),
      
      e(CompactSubsectionHeader, null, 'FIRE SEASON'),
      
      e(SeasonalInfo, { seasons: fireSeasons }),
      
      e(SpecificationList, { items: ['Summer drought conditions can extend risk periods'] }),
      
      e(CompactSubsectionHeader, null, 'UNDERSTANDING RISK LEVELS'),
      
      e(RiskLevelBox, {
        level: 'High Risk Areas',
        description: 'Steep slopes, areas with dense vegetation, properties with unmaintained defensible space, and homes with wooden decks/roofs are at highest risk.'
      }),
      
      e(RiskLevelBox, {
        level: 'Moderate Risk Areas',
        description: 'Properties with partial defensible space, some vegetation management, and homes with some fire-resistant features but remaining vulnerabilities.'
      }),
      
      e(RiskLevelBox, {
        level: 'Lower Risk Areas',
        description: 'Properties with well-maintained defensible space (at least 30ft), fire-resistant landscaping, and homes with fire-resistant roofing and construction.'
      }),
      
      e(BurnBanBox, {
        content: 'During designated fire seasons, Virginia law restricts open burning before 4:00 PM. All fires must be attended at all times and completely extinguished before leaving. Check with Warren County Fire & Rescue for current burn restrictions before burning anything outdoors.'
      }),
      
      e(CompactSubsectionHeader, null, 'COMMUNITY FIRE PREVENTION EFFORTS'),
      
      e(DenseText, null,
        'The BMPOA works with local fire authorities and the Virginia Department of Forestry to implement fire prevention measures:'
      ),
      
      e(SpecificationList, { items: preventionEfforts })
    )
  );
}

// Example 3: Construction Requirements Page
export function ConstructionRequirementsPage() {
  const e = React.createElement;
  
  const buildingRequirements = [
    'Residences are to be constructed of such materials as to meld into the natural beauty of Blue Mountain. The exterior is to be of wood or wood-look materials, with a finish and colors compatible with the natural flora of Blue Mountain.',
    'The approved types of siding are wood siding such as cedar lap siding, fiber cement siding such as HardiPlank or other solid synthetic materials. Vinyl siding is not allowed nor will be considered.',
    'Solid log homes are acceptable as well.',
    'Colors chosen for all exterior exposures should be reflective of surrounding nature. Muted colors and greens, browns and tans are preferred. Bright, vibrant colors will not be allowed.',
    'It is strongly advised to use fire-resistant materials on exterior surfaces including the roof, siding, and decking.',
    'Buildings shall be built no closer than seventy-five (75) feet from the centerline of Route 638 and no closer than seventy (70) feet from the centerline of any internal road or right of way, twenty (20) feet from the side lines and twenty-five (25) feet from the rear line of any lot.',
    'New dwellings shall have approximately one thousand (1,000) square feet minimum of living space and manufactured homes must satisfy Class A design restrictive criteria.',
    'Any garage or accessory building must conform generally in appearance and material with the residence.',
    'During new construction trees felled will be staged on the property so to be unobtrusive or removed from the lot.',
    'Permanent outside toilet facilities shall not be constructed or maintained on any lot.'
  ];
  
  const roadSpecifications = [
    'The new roadway shall be positioned only within the previously surveyed roadway easement.',
    'The road bed shall consist of no less than 3" of compacted #3 gravel, and topped with a surface of compacted crusher run gravel no less than 2".',
    'It shall be ten feet in width between ditch lines or gravel edges.',
    'Cut in and graded or crowned so as to not allow rain water to collect or pool.',
    'Culvert pipes (12" minimum corrugated and double walled plastic) at low collection points.'
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(CompactSectionHeader, null, 'NEW HOME CONSTRUCTION REQUIREMENTS'),
      
      e(CompactSubsectionHeader, null, '2. BUILDING REQUIREMENTS'),
      
      e(NumberedRequirements, { items: buildingRequirements }),
      
      e(CompactSubsectionHeader, null, '3. BUILDING ON AN UNPAVED ROAD'),
      
      e(DenseText, null,
        'The policy of the POA on undeveloped roads is that the developer of the lot(s) on an undeveloped road will be responsible for the construction of said roadway within the platted road easement. They will be required to build to BMPOA specifications and once constructed the POA will assume responsibility for maintenance.'
      ),
      
      e(DenseText, null, 'The specifications are:'),
      
      e(SpecificationList, { items: roadSpecifications }),
      
      e(CompactSubsectionHeader, null, '4. FENCE REQUIREMENTS'),
      
      e(DenseText, null,
        'Before constructing a fence on any property, you must provide the detailed plans including design and materials to the ARC for approval. The only authorized fences are Split Rail fences.'
      ),
      
      e(CompactSubsectionHeader, null, '5. FAILURE TO COMPLY WITH REQUIREMENTS'),
      
      e(DenseText, null,
        'Failure to comply with these requirements may result in legal action and fines.'
      )
    )
  );
}

// Example 4: Wood Chip Program Page
export function WoodChipProgramPage() {
  const e = React.createElement;
  
  const woodChipUses = [
    'Landscaping and garden mulch',
    'Erosion control on steep slopes',
    'Path creation through wooded areas',
    'Suppressing weeds around ornamental plants',
    'Composting (when mixed with nitrogen-rich materials)'
  ];
  
  const communalPileGuidelines = [
    'Bring your own containers, tarps, or truck',
    'Take only what you need',
    'Clean up any spillage',
    'Consider returning in multiple smaller trips for large projects'
  ];
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(SectionHeaderUnderlined, { title: 'WOOD CHIP ACCESS & DELIVERY' }),
      
      e(CompactSubsectionHeader, null, 'WOOD CHIP AVAILABILITY'),
      
      e(DenseText, null,
        'The wood-chipping program generates large quantities of wood chips that are available to Blue Mountain residents at no charge. These chips can be valuable resources for:'
      ),
      
      e(SpecificationList, { items: woodChipUses }),
      
      e(DenseText, null,
        'Wood chips are available in two ways: direct delivery to your property during the chipping process or pickup from community stockpile locations.'
      ),
      
      e(CompactSubsectionHeader, null, 'DIRECT DELIVERY OPTIONS'),
      
      e(DenseText, null,
        'Surplus wood chips are typically available for delivery to your property during the chipping process, free of charge. When the chipping crew comes to process your brush pile, you can request that they leave the resulting chips rather than hauling them away.'
      ),
      
      e(DenseText, null,
        'You can also arrange for delivery of chips from other properties if you need more than your own brush pile will generate. This is particularly useful for residents with landscaping projects that require substantial amounts of mulch.'
      ),
      
      e(ContactCard, {
        icon: '📧',
        label: 'Coordinate Delivery:',
        value: 'jcook0313@gmail.com'
      }),
      
      e(CompactSubsectionHeader, null, 'COMMUNITY ACCESS POINTS'),
      
      e(DenseText, null,
        'Wood chips are also available at communal stockpile locations for any homeowners in need. These locations are accessible year-round, not just during the chipping season:'
      ),
      
      e(SpecificationList, { items: [
        'Lodge Parking Area: A pile is maintained near the Blue Mountain Lodge at 540 Cliff Road',
        'Dam Parking Area at Deer Lake: Chips are available at the parking area near the dam'
      ]}),
      
      e(DenseText, null, 'When taking chips from these communal piles:'),
      
      e(SpecificationList, { items: communalPileGuidelines })
    )
  );
}

// Example 5: Community Communication Page
export function CommunicationPage() {
  const e = React.createElement;
  
  return e(Page, { size: 'LETTER', style: styles.page },
    e(View, null,
      e(CompactSectionHeader, null, 'COMMUNITY COMMUNICATION'),
      
      e(DecorativeStars, { count: 3 }),
      
      e(CompactSubsectionHeader, null, '2. WEEKEND AND SEASONAL RESIDENTS'),
      
      e(DenseText, null,
        'A significant portion of Blue Mountain homeowners use their properties as:'
      ),
      
      e(SpecificationList, { items: [
        'Weekend retreats from urban areas like Washington D.C.',
        'Seasonal homes for different times of the year',
        'Vacation properties for family gatherings',
        'Future retirement homes'
      ]}),
      
      e(DenseText, null,
        'These residents add vibrancy to our community, especially during weekends and holidays when the mountain population swells.'
      ),
      
      e(FullWidthInfoBox, {
        title: 'SEASONAL SCHEDULING',
        content: 'Major community events and meetings are scheduled with both full-time and seasonal residents in mind. Weekend and holiday scheduling ensures that seasonal residents can participate in governance and community activities.'
      }),
      
      e(CompactSubsectionHeader, null, 'C. NATURAL BEAUTY & WILDLIFE'),
      
      e(DecorativeStars, { count: 3 }),
      
      e(ImageCaptionBox, {
        caption: 'Fall sunset view from Blue Mountain showcases the spectacular seasonal colors that grace our mountain community'
      }),
      
      e(CompactSubsectionHeader, null, '1. SCENIC VIEWS'),
      
      e(DenseText, null,
        'Blue Mountain is known for its spectacular vistas, particularly:'
      ),
      
      e(SpecificationList, { items: [
        'Sweeping views of the Shenandoah Valley',
        'Distant mountain ranges visible on clear days',
        'Dramatic sunrises and sunsets',
        'Star-filled night skies with minimal light pollution'
      ]})
    )
  );
}

export default {
  EmergencyPlanningPage,
  FireSafetyRiskPage,
  ConstructionRequirementsPage,
  WoodChipProgramPage,
  CommunicationPage
};