import React from 'react';
import { Document } from '@react-pdf/renderer';
import CoverPageNoJSX from './components/CoverPageNoJSX.js';
import TOCPageNoJSX from './components/TOCPageNoJSX.js';
import IntroductionPageNoJSX from './components/IntroductionPageNoJSX.js';
import GovernancePageNoJSX from './components/GovernancePageNoJSX-Enhanced.js';
import MountainHomePageNoJSX from './components/MountainHomePageNoJSX-Dense.js';
import WoodChippingPageNoJSX from './components/WoodChippingPageNoJSX-Dense.js';
import FireSafetyPageNoJSX from './components/FireSafetyPageNoJSX-Dense.js';
import CommunityServicesPageNoJSX from './components/CommunityServicesPageNoJSX-Dense.js';
import DeerLakePageNoJSX from './components/DeerLakePageNoJSX-Dense.js';
import LodgePageNoJSX from './components/LodgePageNoJSX-Dense.js';
import CommunicationPageNoJSX from './components/CommunicationPageNoJSX.js';
import ContactsPageNoJSX from './components/ContactsPageNoJSX-Dense.js';
import NaturalAttractionsPageNoJSX from './components/NaturalAttractionsPageNoJSX.js';
import ConstructionPageNoJSX from './components/ConstructionPageNoJSX.js';
import BearSafetyPageNoJSX from './components/BearSafetyPageNoJSX.js';
import BackCoverPageNoJSX from './components/BackCoverPageNoJSX.js';

export default function FullAppNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  // Some components return arrays of pages, so we need to flatten them
  const pages = [
    e(CoverPageNoJSX, { pageNumberMap }),
    e(TOCPageNoJSX, { pageNumberMap }),
    e(IntroductionPageNoJSX, { pageNumberMap }),
    GovernancePageNoJSX({ pageNumberMap }), // This returns an array
    MountainHomePageNoJSX({ pageNumberMap }), // This returns an array
    WoodChippingPageNoJSX({ pageNumberMap }), // This returns an array
    FireSafetyPageNoJSX({ pageNumberMap }), // This returns an array
    CommunityServicesPageNoJSX({ pageNumberMap }), // This returns an array
    DeerLakePageNoJSX({ pageNumberMap }), // This returns an array
    LodgePageNoJSX({ pageNumberMap }), // This returns an array
    CommunicationPageNoJSX({ pageNumberMap }), // This returns an array
    ContactsPageNoJSX({ pageNumberMap }), // This returns an array
    NaturalAttractionsPageNoJSX({ pageNumberMap }), // This returns an array
    ConstructionPageNoJSX({ pageNumberMap }), // This returns an array
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