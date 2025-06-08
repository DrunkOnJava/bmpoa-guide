import React from 'react';
import { Document } from '@react-pdf/renderer';
// import CoverPageNoJSX from './components/CoverPageNoJSX.js';
// import TestBlankPage from './components/TestBlankPage.js'; // Removed - causing blank pages
import FrontCoverPageFixed from './components/FrontCoverPageFixed.js';
import TOCPageNoJSXFixed from './components/TOCPageNoJSX-Fixed.js';
import WelcomeLetterPageNoJSX from './components/WelcomeLetterPageNoJSX.js';
import IntroductionPageNoJSX from './components/IntroductionPageNoJSX-Timeline.js';
import GovernancePageNoJSX from './components/GovernancePageNoJSX-Basic.js';
import MountainHomePageNoJSX from './components/MountainHomePageNoJSX-Consolidated-Fixed.js';
import WoodChippingPageNoJSX from './components/WoodChippingPageNoJSX-Dense.js';
import FireSafetyPageNoJSX from './components/FireSafetyPageNoJSX-Dense.js';
import CommunityServicesPageNoJSX from './components/CommunityServicesPageNoJSX-Compact-Fixed.js';
import DeerLakePageNoJSX from './components/DeerLakePageNoJSX-Enhanced-Fixed.js';
import LodgePageNoJSX from './components/LodgePageNoJSX-Enhanced-Fixed.js';
import CommunicationPageNoJSX from './components/CommunicationPageNoJSX-Enhanced.js';
import ContactsPageNoJSX from './components/ContactsPageNoJSX-Enhanced.js';
import NaturalAttractionsPageNoJSX from './components/NaturalAttractionsPageNoJSX-Consolidated-Fixed.js';
import ConstructionPageNoJSX from './components/ConstructionPageNoJSX-Consolidated-Fixed.js';
import BearSafetyPageNoJSX from './components/BearSafetyPageNoJSX-Enhanced-Fixed.js';
import BackCoverPageNoJSX from './components/BackCoverPageNoJSX-Fixed.js';
import SectionDividerFixed from './components/SectionDividerFixed.js';
import { colors } from './designTokens.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, 'assetMap.json'), 'utf8'));

export default function FullAppNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // Some components return arrays of pages, so we need to flatten them
  const pages = [
    e(FrontCoverPageFixed, { pageNumberMap }),  // Fixed cover implementation
    e(TOCPageNoJSXFixed, { pageNumberMap }),
    e(WelcomeLetterPageNoJSX, { pageNumberMap }),
    e(IntroductionPageNoJSX, { pageNumberMap }),
    // Governance Section
    e(SectionDividerFixed, {
      number: '01',
      title: 'GOVERNANCE &\nSTRUCTURE',
      description: 'Understanding how our mountain community is organized and governed',
      backgroundColor: colors.sectionDividerBg
    }),
    e(GovernancePageNoJSX, { pageNumberMap }),
    // Mountain Home Section
    e(SectionDividerFixed, {
      number: '02',
      title: 'A MOUNTAIN HOME',
      description: 'Living on Blue Mountain offers a unique combination of natural beauty, privacy, and community',
      backgroundColor: colors.sectionDividerBg,
      backgroundImage: assetMap.mountainvistaoriginal
    }),
    MountainHomePageNoJSX({ pageNumberMap }), // This returns an array
    // Wood Chipping Section
    e(SectionDividerFixed, {
      number: '03',
      title: 'WOOD-CHIPPING PROGRAM',
      description: 'Our annual wood-chipping program helps reduce wildfire risk while keeping our mountain beautiful',
      backgroundColor: colors.sectionDividerBg
    }),
    WoodChippingPageNoJSX({ pageNumberMap }), // This returns an array
    // Fire Safety Section
    e(SectionDividerFixed, {
      number: '04',
      title: 'FIRE SAFETY &\nEMERGENCY PREPAREDNESS',
      description: 'Protecting our mountain community from wildfire through awareness, preparation, and collective action',
      backgroundColor: colors.sectionDividerBg,
      backgroundImage: assetMap.debrisfire
    }),
    FireSafetyPageNoJSX({ pageNumberMap }), // This returns an array
    // Community Services Section
    e(SectionDividerFixed, {
      number: '05',
      title: 'COMMUNITY SERVICES\n& AMENITIES',
      description: 'Essential services, utilities, and infrastructure that support mountain living',
      backgroundColor: colors.forestGreen
    }),
    e(CommunityServicesPageNoJSX, { pageNumberMap }), // This returns an array
    // Deer Lake Section
    e(SectionDividerFixed, {
      number: '06',
      title: 'DEER LAKE\nRECREATION',
      description: 'A peaceful mountain retreat for fishing, swimming, and gathering with fellow property owners',
      backgroundColor: colors.primary,
      backgroundImage: assetMap.deerlakedock
    }),
    e(DeerLakePageNoJSX, { pageNumberMap }), // This returns an array
    // Lodge Section
    e(SectionDividerFixed, {
      number: '07',
      title: 'THE LODGE',
      description: 'Our historic community center for gatherings, events, and mountain hospitality',
      backgroundColor: colors.saddleBrown,
      backgroundImage: assetMap.lodgeinterior
    }),
    LodgePageNoJSX({ pageNumberMap }), // This returns an array
    // Communication Section
    e(SectionDividerFixed, {
      number: '08',
      title: 'COMMUNICATION\n& CONNECTIVITY',
      description: 'Staying connected in our mountain community through digital and traditional channels',
      backgroundColor: colors.blueAlt
    }),
    e(CommunicationPageNoJSX, { pageNumberMap }), // This returns an array
    // Contacts Section
    e(SectionDividerFixed, {
      number: '09',
      title: 'IMPORTANT\nCONTACTS',
      description: 'Essential phone numbers and contacts for community services and emergencies',
      backgroundColor: colors.primary
    }),
    ContactsPageNoJSX({ pageNumberMap }), // This returns an array
    // Natural Attractions Section
    e(SectionDividerFixed, {
      number: '10',
      title: 'NATURAL\nATTRACTIONS',
      description: 'Exploring the natural beauty, trails, and wildlife of Blue Mountain',
      backgroundColor: colors.forestGreen
    }),
    NaturalAttractionsPageNoJSX({ pageNumberMap }), // This returns an array
    // Construction Section
    e(SectionDividerFixed, {
      number: '11',
      title: 'CONSTRUCTION\nGUIDELINES',
      description: 'Building requirements and architectural standards for maintaining our mountain character',
      backgroundColor: colors.brownDark
    }),
    ConstructionPageNoJSX({ pageNumberMap }), // This returns an array
    // Bear Safety Section
    e(SectionDividerFixed, {
      number: '12',
      title: 'BEAR SAFETY\n& WILDLIFE',
      description: 'Living safely alongside the black bears and wildlife of Blue Mountain',
      backgroundColor: colors.saddleBrown
    }),
    BearSafetyPageNoJSX({ pageNumberMap }), // This returns an array
    e(BackCoverPageNoJSX, { pageNumberMap })
  ].flat();
  
  return e(
    Document,
    {
      title: 'Blue Mountain Property Owners Association Guide',
      author: 'BMPOA',
      subject: 'Community Guide for Blue Mountain Property Owners',
      keywords: 'BMPOA, Blue Mountain, Property Owners, Community Guide'
    },
    ...pages
  );
}