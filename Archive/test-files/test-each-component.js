import React from 'react';
import { renderToBuffer, Document } from '@react-pdf/renderer';

const components = [
  { name: 'CoverPageNoJSX', path: './src/components/CoverPageNoJSX.js', isElement: true },
  { name: 'TOCPageNoJSX', path: './src/components/TOCPageNoJSX.js', isElement: true },
  { name: 'IntroductionPageNoJSX', path: './src/components/IntroductionPageNoJSX.js', isElement: true },
  { name: 'GovernancePageNoJSX', path: './src/components/GovernancePageNoJSX.js', isFunction: true },
  { name: 'MountainHomePageNoJSX', path: './src/components/MountainHomePageNoJSX.js', isFunction: true },
  { name: 'WoodChippingPageNoJSX', path: './src/components/WoodChippingPageNoJSX.js', isFunction: true },
  { name: 'FireSafetyPageNoJSX', path: './src/components/FireSafetyPageNoJSX.js', isFunction: true },
  { name: 'CommunityServicesPageNoJSX', path: './src/components/CommunityServicesPageNoJSX.js', isFunction: true },
  { name: 'DeerLakePageNoJSX', path: './src/components/DeerLakePageNoJSX.js', isFunction: true },
  { name: 'LodgePageNoJSX', path: './src/components/LodgePageNoJSX.js', isFunction: true },
  { name: 'CommunicationPageNoJSX', path: './src/components/CommunicationPageNoJSX.js', isFunction: true },
  { name: 'ContactsPageNoJSX', path: './src/components/ContactsPageNoJSX.js', isFunction: true },
  { name: 'NaturalAttractionsPageNoJSX', path: './src/components/NaturalAttractionsPageNoJSX.js', isFunction: true },
  { name: 'ConstructionPageNoJSX', path: './src/components/ConstructionPageNoJSX.js', isFunction: true },
  { name: 'BearSafetyPageNoJSX', path: './src/components/BearSafetyPageNoJSX.js', isFunction: true },
  { name: 'BackCoverPageNoJSX', path: './src/components/BackCoverPageNoJSX.js', isElement: true }
];

async function testComponent(comp) {
  console.log(`\n▶️  Testing: ${comp.name}`);
  try {
    const Component = (await import(comp.path)).default;
    
    let pages;
    if (comp.isFunction) {
      // Call as function (returns array of pages)
      pages = Component({ pageNumberMap: {} });
    } else {
      // Create element
      pages = React.createElement(Component, { pageNumberMap: {} });
    }
    
    // Ensure pages is an array
    if (!Array.isArray(pages)) {
      pages = [pages];
    }
    
    const doc = React.createElement(Document, null, ...pages);
    
    const start = Date.now();
    const buffer = await Promise.race([
      renderToBuffer(doc),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout after 15 seconds')), 15000)
      )
    ]);
    
    const elapsed = Date.now() - start;
    console.log(`✅ [${comp.name}] Rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
    return true;
  } catch (err) {
    console.error(`❌ [${comp.name}] Failed:`, err.message);
    return false;
  }
}

(async () => {
  console.log('Testing each component individually...\n');
  
  for (const comp of components) {
    const success = await testComponent(comp);
    if (!success) {
      console.log(`\n🔴 Found problematic component: ${comp.name}`);
      console.log('Stopping test - fix this component first!');
      break;
    }
  }
  
  console.log('\n✅ All individual components tested');
})();