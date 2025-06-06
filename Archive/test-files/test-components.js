import React from 'react';
import { renderToBuffer, Document, Page, Text } from '@react-pdf/renderer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import components one by one
const componentPaths = [
  './src/components/CoverPageNoJSX.js',
  './src/components/TableOfContentsPageNoJSX.js',
  './src/components/IntroPageNoJSX.js',
  './src/components/GovernancePageNoJSX.js',
];

async function testComponent(path, name) {
  try {
    console.log(`\nTesting ${name}...`);
    const Component = (await import(path)).default;
    
    const doc = React.createElement(
      Document,
      null,
      React.createElement(Component, { pageNumberMap: {} })
    );
    
    const startTime = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - startTime;
    
    console.log(`✅ ${name} rendered successfully in ${elapsed}ms (${buffer.length} bytes)`);
  } catch (error) {
    console.error(`❌ ${name} failed:`, error.message);
  }
}

// Test each component
(async () => {
  for (let i = 0; i < componentPaths.length; i++) {
    await testComponent(componentPaths[i], componentPaths[i].split('/').pop());
  }
})();