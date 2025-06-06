import React from 'react';
import { renderToBuffer, Document, Page, Text } from '@react-pdf/renderer';

const components = [
  { name: 'CoverPageNoJSX', path: './src/components/CoverPageNoJSX.js', isElement: true },
  { name: 'TOCPageNoJSX', path: './src/components/TOCPageNoJSX.js', isElement: true },
  { name: 'IntroductionPageNoJSX', path: './src/components/IntroductionPageNoJSX.js', isElement: true },
  { name: 'GovernancePageNoJSX', path: './src/components/GovernancePageNoJSX.js', isElement: false },
  { name: 'MountainHomePageNoJSX', path: './src/components/MountainHomePageNoJSX.js', isElement: false },
  { name: 'FireSafetyPageNoJSX', path: './src/components/FireSafetyPageNoJSX.js', isElement: false },
];

async function testComponent(comp) {
  try {
    console.log(`\nTesting ${comp.name}...`);
    const Component = (await import(comp.path)).default;
    
    let pages;
    if (comp.isElement) {
      pages = React.createElement(Component, { pageNumberMap: {} });
    } else {
      pages = Component({ pageNumberMap: {} });
    }
    
    // Wrap in array if not already
    if (!Array.isArray(pages)) {
      pages = [pages];
    }
    
    const doc = React.createElement(
      Document,
      null,
      ...pages
    );
    
    const startTime = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - startTime;
    
    console.log(`✅ ${comp.name} rendered in ${elapsed}ms (${buffer.length} bytes)`);
  } catch (error) {
    console.error(`❌ ${comp.name} failed:`, error.message);
  }
}

(async () => {
  for (const comp of components) {
    await testComponent(comp);
  }
  
  console.log('\n🔍 Testing all components together...');
  try {
    const { default: FullAppNoJSX } = await import('./src/FullAppNoJSX.js');
    const element = React.createElement(FullAppNoJSX, { pageNumberMap: {} });
    
    const startTime = Date.now();
    await renderToBuffer(element);
    const elapsed = Date.now() - startTime;
    
    console.log(`✅ Full document rendered in ${elapsed}ms`);
  } catch (error) {
    console.error('❌ Full document failed:', error.message);
  }
})();